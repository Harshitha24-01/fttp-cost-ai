from __future__ import annotations

import asyncio
import json
import re
from typing import Any

from groq import Groq

from .utils import get_settings


class LLMConfigurationError(RuntimeError):
    pass


def _groq_client() -> Groq:
    settings = get_settings()
    if not settings.groq_api_key:
        raise LLMConfigurationError("GROQ_API_KEY not set")
    return Groq(api_key=settings.groq_api_key)


def _call_llm(prompt: str) -> str:
    try:
        settings = get_settings()
        client = _groq_client()
        resp = client.chat.completions.create(
            # Keep model configurable via env: GROQ_MODEL / groq_model in Settings
            model=settings.groq_model,
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.3,
        )
        return str(resp.choices[0].message.content or "").strip()
    except LLMConfigurationError:
        raise
    except Exception as e:
        # Normalize Groq/network/auth errors into a single error type
        raise LLMConfigurationError(f"Groq call failed: {e}") from e


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


def _extract_json(text: str) -> dict[str, Any]:
    # 1) strict JSON
    try:
        obj = json.loads(text)
        if isinstance(obj, dict):
            return obj
    except Exception:
        pass

    # 2) extract JSON substring (also handles ```json fences)
    m = re.search(r"\{[\s\S]*\}", text)
    if m:
        obj = json.loads(m.group(0))
        if isinstance(obj, dict):
            return obj

    raise ValueError("LLM did not return valid JSON")


def explain_cost(data: dict[str, Any], total_cost: float) -> str:
    prompt = (
        "You are a telecom network expert.\n\n"
        "Explain the FTTP cost in simple terms.\n\n"
        "Inputs:\n"
        f"Fiber length: {data.get('fiber_length')} km\n"
        f"Premises: {data.get('premises_count')}\n"
        f"Equipment cost: {data.get('equipment_cost')}\n"
        f"Labour cost: {data.get('labour_cost')}\n"
        f"Civil cost: {data.get('civil_cost')}\n"
        f"Total cost: {total_cost}\n\n"
        "Explain why the cost is high or low in simple language.\n"
    )
    return _call_llm(prompt)


def optimize_cost(data: dict[str, Any]) -> list[str]:
    prompt = (
        "You are a telecom cost optimization expert.\n\n"
        "Analyze the FTTP network build cost and suggest ways to reduce cost.\n\n"
        "Inputs:\n"
        f"Fiber length: {data.get('fiber_length')}\n"
        f"Premises: {data.get('premises_count')}\n"
        f"Equipment cost: {data.get('equipment_cost')}\n"
        f"Labour cost: {data.get('labour_cost')}\n"
        f"Civil cost: {data.get('civil_cost')}\n\n"
        "Give 3 practical cost optimization suggestions.\n"
        "Return ONLY valid JSON in this format:\n"
        '{ "suggestions": ["...", "...", "..."] }\n'
    )
    text = _call_llm(prompt)
    try:
        obj = _extract_json(text)
        if isinstance(obj.get("suggestions"), list):
            return [str(s).strip() for s in obj["suggestions"] if str(s).strip()][:3]
    except Exception:
        pass
    return _parse_suggestions(text)


def parse_user_input(text: str) -> dict[str, Any]:
    prompt = (
        "Convert the following user request into structured JSON.\n\n"
        f"User Input: {text}\n\n"
        "Return JSON with:\n"
        "fiber_length\n"
        "premises_count\n"
        "equipment_cost (optional default 0)\n"
        "labour_cost (optional default 0)\n"
        "civil_cost (optional default 0)\n"
        "Return ONLY JSON.\n"
    )
    raw = _call_llm(prompt)
    obj = _extract_json(raw)

    # defaults + normalization
    obj.setdefault("equipment_cost", 0)
    obj.setdefault("labour_cost", 0)
    obj.setdefault("civil_cost", 0)

    normalized = {
        "fiber_length": float(obj["fiber_length"]),
        "premises_count": int(obj["premises_count"]),
        "equipment_cost": float(obj.get("equipment_cost", 0)),
        "labour_cost": float(obj.get("labour_cost", 0)),
        "civil_cost": float(obj.get("civil_cost", 0)),
    }
    return normalized


def generate_report(data: dict[str, Any], total_cost: float) -> str:
    prompt = (
        "You are a telecom analyst.\n\n"
        "Generate a professional summary report for FTTP cost.\n\n"
        "Include:\n"
        "- Total cost\n"
        "- Key cost drivers\n"
        "- Insights\n"
        "- Recommendations\n\n"
        "Inputs:\n"
        f"{json.dumps(data, indent=2)}\n"
        f"Total cost: {total_cost}\n"
    )
    return _call_llm(prompt)


async def generate_ai_suggestions(data: dict[str, Any]) -> dict[str, Any]:
    """
    Backwards-compatible helper used by `/ai-optimize`.
    Returns: { "optimization_suggestions": [ ... ] }
    """
    # Run sync Groq call in a thread so async endpoints don't block the loop.
    try:
        suggestions = await asyncio.to_thread(optimize_cost, data)
        return {"optimization_suggestions": suggestions}
    except Exception as e:
        raise LLMConfigurationError(str(e)) from e

