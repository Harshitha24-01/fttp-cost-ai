from __future__ import annotations

import json
import re
from typing import Any

import httpx

from .utils import get_settings


class LLMConfigurationError(RuntimeError):
    pass


def _prompt(data: dict[str, Any]) -> str:
    return (
        "You are a telecom network planning expert.\n"
        "Analyze the FTTP network build cost inputs below and suggest ways to reduce deployment cost.\n\n"
        "Inputs:\n"
        f"Fiber length: {data['fiber_length']} km\n"
        f"Premises: {data['premises_count']}\n"
        f"Equipment cost: {data['equipment_cost']}\n"
        f"Labour cost: {data['labour_cost']}\n"
        f"Civil cost: {data['civil_cost']}\n\n"
        "Provide 3 cost optimization suggestions.\n"
        "Return ONLY valid JSON in this format:\n"
        '{ "optimization_suggestions": ["...", "...", "..."] }\n'
    )


def _parse_suggestions(text: str) -> list[str]:
    # 1) Try strict JSON.
    try:
        obj = json.loads(text)
        if isinstance(obj, dict) and isinstance(obj.get("optimization_suggestions"), list):
            return [str(s).strip() for s in obj["optimization_suggestions"] if str(s).strip()][:3]
    except Exception:
        pass

    # 2) Try to extract JSON substring.
    m = re.search(r"\{[\s\S]*\}", text)
    if m:
        try:
            obj = json.loads(m.group(0))
            if isinstance(obj, dict) and isinstance(obj.get("optimization_suggestions"), list):
                return [str(s).strip() for s in obj["optimization_suggestions"] if str(s).strip()][:3]
        except Exception:
            pass

    # 3) Fallback: parse bullet/lines.
    lines = []
    for raw in text.splitlines():
        raw = raw.strip()
        raw = re.sub(r"^[-*\d.\)]\s+", "", raw)
        if raw:
            lines.append(raw)
    return lines[:3]


async def _call_groq(prompt: str) -> str:
    settings = get_settings()
    if not settings.groq_api_key:
        raise LLMConfigurationError("GROQ_API_KEY not set")

    url = "https://api.groq.com/openai/v1/chat/completions"
    payload = {
        "model": settings.groq_model,
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.3,
    }
    headers = {"Authorization": f"Bearer {settings.groq_api_key}"}

    async with httpx.AsyncClient(timeout=30) as client:
        r = await client.post(url, json=payload, headers=headers)
        r.raise_for_status()
        data = r.json()
        return data["choices"][0]["message"]["content"]


async def _call_huggingface(prompt: str) -> str:
    settings = get_settings()
    if not settings.hf_api_token:
        raise LLMConfigurationError("HF_API_TOKEN not set")

    url = f"https://api-inference.huggingface.co/models/{settings.hf_model}"
    headers = {"Authorization": f"Bearer {settings.hf_api_token}"}
    payload = {
        "inputs": prompt,
        "parameters": {"max_new_tokens": 200, "temperature": 0.3, "return_full_text": False},
    }

    async with httpx.AsyncClient(timeout=60) as client:
        r = await client.post(url, json=payload, headers=headers)
        r.raise_for_status()
        data = r.json()

        # HF can return list[{"generated_text": "..."}] or {"generated_text": "..."} depending on backend.
        if isinstance(data, list) and data and isinstance(data[0], dict) and "generated_text" in data[0]:
            return str(data[0]["generated_text"])
        if isinstance(data, dict) and "generated_text" in data:
            return str(data["generated_text"])
        return json.dumps(data)


async def generate_ai_suggestions(data: dict[str, Any]) -> dict[str, Any]:
    """
    Calls a free LLM API (Groq preferred; otherwise HuggingFace) and returns:
    { "optimization_suggestions": [ ... ] }
    """
    prompt = _prompt(data)

    last_err: Exception | None = None
    for caller in (_call_groq, _call_huggingface):
        try:
            text = await caller(prompt)
            suggestions = _parse_suggestions(text)
            return {"optimization_suggestions": suggestions}
        except Exception as e:
            last_err = e
            continue

    raise LLMConfigurationError(
        "No LLM provider configured or all providers failed. "
        "Set GROQ_API_KEY (recommended) or HF_API_TOKEN."
    ) from last_err

