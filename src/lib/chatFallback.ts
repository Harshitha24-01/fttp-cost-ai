// Client-side fallback responses when LLM is unavailable

type FallbackRule = { keywords: string[]; response: string };

const rules: FallbackRule[] = [
  {
    keywords: ["fttp", "what is fttp", "fiber to the premises"],
    response: `Hello! Great question! 😊

**FTTP (Fiber to the Premises)** means running fiber optic cables directly to homes and buildings — giving users ultra-fast internet (up to 1 Gbps+).

**Why it matters:**
- 🚀 Much faster than copper/DSL
- 📈 Future-proof infrastructure
- 💰 High initial investment, but excellent long-term ROI

**How this platform helps:**
1. Estimate deployment costs accurately
2. Compare multiple routes
3. Find the most cost-effective plan

Would you like to know how cost is calculated?`
  },
  {
    keywords: ["cost", "expensive", "price", "how much", "estimate"],
    response: `Hi there! Let me break down FTTP costs for you. 😊

**Key cost components:**
- 🔌 **Fiber cable**: ₹6,000–8,000 per km
- 📡 **OLT equipment**: ₹1–1.5 lakh per unit
- 📦 **ONT (per home)**: ₹1,500–2,500
- 🏗️ **Civil works**: Biggest variable — depends on terrain

**What affects cost most:**
| Factor | Impact |
|--------|--------|
| Underground vs Aerial | Underground costs ~45% more |
| Urban vs Rural | Urban has higher permit costs |
| Distance | Longer routes = more fiber + labor |

**💡 Tip:** Use aerial deployment where possible to reduce costs by 25-40%.

Try selecting a route on the Map page to see a detailed breakdown!`
  },
  {
    keywords: ["underground", "trenching", "duct"],
    response: `Hello! Underground deployment is a popular topic. 😊

**Why is underground deployment costlier?**
- 🏗️ **Trenching**: Digging costs ₹800–2,000/meter
- 🛡️ **Duct installation**: Additional ₹200–500/meter
- 📋 **Permits**: Municipal approvals take time and money
- 👷 **Labor**: 3-4x more workers needed

**However, underground has advantages:**
- ✅ More durable (25+ year lifespan)
- ✅ Weather-resistant
- ✅ Lower maintenance costs long-term

**💡 Recommendation:** Use underground in high-traffic urban areas, aerial in rural/semi-urban zones. This "hybrid" approach balances cost and reliability.`
  },
  {
    keywords: ["aerial", "pole", "overhead"],
    response: `Hi! Aerial deployment is the budget-friendly option. 😊

**Benefits of aerial fiber:**
- 💰 **40-45% cheaper** than underground
- ⚡ **Faster deployment** (days vs weeks)
- 🔧 **Easier maintenance** and upgrades

**Trade-offs:**
- ⚠️ Vulnerable to weather and accidents
- 🌳 Tree clearance may be needed
- 📋 Pole rental agreements required

**💡 Best for:** Rural areas, highways, and quick rollouts where speed matters more than long-term durability.`
  },
  {
    keywords: ["profit", "revenue", "roi", "return", "margin", "arpu"],
    response: `Hello! Let's talk about FTTP profitability. 📊

**Revenue model:**
- Monthly ARPU (Average Revenue Per User): ₹400–800
- **Annual revenue** = Premises × ARPU × 12
- **5-year projection** = Annual × 5

**Typical ROI timeline:**
| Phase | Timeline |
|-------|----------|
| Investment | Year 1-2 (negative profit is normal!) |
| Break-even | Year 2-3 |
| Profitable | Year 3-5+ |

**💡 Key insight:** If your current plan shows negative profit, don't worry! FTTP is a long-term investment. Most operators see ROI within 3-5 years.

**To improve profitability:**
1. Increase subscriber density (more premises)
2. Use aerial fiber where possible
3. Negotiate bulk ONT pricing`
  },
  {
    keywords: ["route", "best route", "path", "shortest", "optimal"],
    response: `Hi! Let me explain route selection. 🗺️

**This platform generates 4 route types:**

| Route | Color | Best For |
|-------|-------|----------|
| 🟢 Shortest | Green | Minimum distance |
| 🔵 Low Cost | Blue | Budget optimization |
| 🔴 Risky | Red | When speed is critical |
| 🟡 Eco-Friendly | Teal | Forest/sensitive areas |

**How the "Best Route" is chosen:**
A business score (0-100) weighing cost, risk, distance, and environmental impact.

**💡 Recommendation:** Start with the "Low Cost" route, then compare with "Shortest" to find the sweet spot between cost and efficiency.

Go to the **Map** page, select source & destination, and see all routes visualized!`
  },
  {
    keywords: ["reduce", "save", "optimize", "cheaper", "lower cost"],
    response: `Great question! Here are proven ways to reduce FTTP costs. 💡

**Top 5 cost-saving strategies:**

1. **Use aerial fiber** where terrain allows → saves 25-40%
2. **Bulk purchase ONTs** → negotiate ₹1,200-1,500 per unit
3. **Phased rollout** → deploy in high-density areas first
4. **Shared infrastructure** → use existing poles/ducts
5. **Optimize route** → avoid hilly terrain when possible

**Quick wins:**
- Choose "Low Cost Route" on the map
- Switch to aerial deployment in rural areas
- Increase premises count to improve per-unit economics

**💡 Pro tip:** A hybrid approach (underground in urban + aerial in rural) typically delivers the best cost-to-reliability ratio.`
  },
  {
    keywords: ["risk", "danger", "flood", "forest"],
    response: `Hi! Understanding risk is crucial for FTTP planning. ⚠️

**Risk factors in FTTP deployment:**
- 🌊 **Flood zones**: Higher maintenance, cable damage risk
- 🌲 **Forest areas**: Clearance permits, environmental regulations
- 🏙️ **Urban congestion**: Traffic disruption, permit delays
- ⛰️ **Hilly terrain**: Difficult access, higher labor costs

**Risk levels explained:**
| Level | Meaning | Cost Impact |
|-------|---------|-------------|
| Low | Clear terrain, good access | Baseline |
| Medium | Some obstacles | +20-30% |
| High | Major challenges | +40-60% |

**💡 Tip:** The platform's "Eco-Friendly" route automatically avoids high-risk environmental zones.`
  },
  {
    keywords: ["help", "how to use", "guide", "tutorial", "start"],
    response: `Welcome! Here's how to use this platform step by step. 📋

**Quick Start Guide:**

**Step 1️⃣ — Select Location**
Go to the Map page → Choose State → City → Source & Destination colonies

**Step 2️⃣ — Configure Parameters**
Set deployment type (Aerial/Underground), premises count, and ARPU

**Step 3️⃣ — View Routes**
See 4 color-coded routes on the map with cost/risk for each

**Step 4️⃣ — Analyze Costs**
Check the Analysis page for detailed cost breakdowns and charts

**Step 5️⃣ — Compare & Decide**
Use route comparison cards to pick the best option

**💡 Tip:** Click the "Help" button in the top bar for detailed explanations of each feature!`
  },
  {
    keywords: ["workforce", "worker", "team", "labor", "manpower"],
    response: `Hi! Workforce planning is key to successful deployment. 👷

**Typical team sizing:**
| Distance | Workers Needed | Duration |
|----------|---------------|----------|
| < 10 km | 8-12 | 2-3 weeks |
| 10-50 km | 15-25 | 1-2 months |
| 50+ km | 30-50 | 3-6 months |

**Roles needed:**
- 🏗️ Civil workers (trenching/pole installation)
- 🔌 Fiber splicers (specialized)
- 📡 Equipment installers (OLT/ONT)
- 📋 Project managers

**💡 Tip:** Underground deployment needs 3-4x more civil workers than aerial.`
  },
];

export function getFallbackResponse(query: string): string {
  const lower = query.toLowerCase();

  for (const rule of rules) {
    if (rule.keywords.some(kw => lower.includes(kw))) {
      return rule.response;
    }
  }

  return `Hello! 👋 Thanks for your question.

I'm your FTTP planning assistant. Here's what I can help with:

- **📊 Cost estimation** — How deployment costs are calculated
- **🗺️ Route analysis** — Comparing shortest, cheapest, and safest routes
- **💰 Profit & ROI** — Understanding revenue projections
- **🏗️ Deployment types** — Aerial vs underground trade-offs
- **⚠️ Risk assessment** — Environmental and terrain factors

**Try asking:**
- "How is FTTP cost calculated?"
- "Which route is best?"
- "How to reduce deployment cost?"

I'm here to make telecom planning simple! 😊`;
}
