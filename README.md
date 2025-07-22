#RiskWise – Multi-Criteria Risk Assessment & Strategic Decision Tool

Overview:
RiskWise is a strategic, lightweight, and structured decision-support tool designed to help individuals, teams, and organizations make clearer, more confident choices. Grounded in core economic principles, it enables users to identify and categorize risk, assess actual vs. perceived risk, evaluate opportunity costs, and apply game theory to analyze decisions in competitive environments.

⸻

Key Features:

🧠 Risk Analysis
	•	Identify and classify different types of risk
	•	Compare actual vs. perceived risk to reveal decision bias
	•	Measure the gap between rational and intuitive risk responses
	•	Determine whether risk mitigation strategies may inadvertently increase exposure

💡 Opportunity Cost Evaluation
	•	Quantify trade-offs to support resource allocation decisions
	•	Integrate opportunity cost into riskk and reward analysis
	•	Support strategic prioritization in line with organizational objectives

🎯 Strategic & Competitive Intelligence
	•	Use game theory to model and anticipate competitor or stakeholder decisions
	•	Evaluate finite games with fixed players and limited strategic choices
	•	Analyze Nash Equilibria to determine optimal responses
	•	Explore non-competitive and social-choice scenarios

📊 Quantitative Output
	•	Provide measurable outputs to support governance, compliance, and board-level reporting
	•	Enable scenario-based qualitative assessments

⸻

Formulas & Frameworks

1. Quantitative Risk Scores
	•	Actual Risk (AR):
AR = POE × IOE
(Probability of Event × Impact of Event)
	•	Perceived Risk (PR):
PR = PP × PI
(Perceived Probability × Perceived Impact)
	•	Gap Analysis:
Gap = AR – PR
(Difference between actual and perceived risk)

2. Risk = Likelihood × Consequence
	•	Likelihood: How probable it is that the event will occur (e.g. Rare, Unlikely, Possible, Likely, Almost Certain)
	•	Consequence (or Severity): How serious the impact would be (e.g. Minor, Moderate, Major, Critical, Catastrophic)
Process:
1. Identify - Is there uncertainty in the situation? Are ther potential threats?
2. Analyse - Is this actual risk or percieved risk? 
3. Assess - Rating scale the level and secerity of risk.
4. Caluclate - Map the risk on the risk maxtrix to its corrosponding score
5. Evaluate - Measure the risk and solution in a broader context. Regulatory requirements, strategic alignment etc.
7. Develop - Implentations in-house, external. Risk avoidence comonents.
8. Monitor and Review - Updates, environmental change etc.

## ▶️ How to Run

To run this project, use:

1. Save risk_score_calculator.py

2. In your terminal:
   	python risk_score_calculator.py

⸻

2. Qualitative Scenario Model

Perceived Risk Score
PRS = (P_s × I_s × F_h × F_c)
Where:
	•	P_s: Subjective Probability Score (1–5)
	•	I_s: Subjective Impact Score (1–5)
	•	F_h: Heuristic Factors (e.g., familiarity, media, trust, brand)
	•	F_c: Contextual Factors (e.g., power dynamics, culture, resources)

⸻

3. Game Theory Framework

Used when:
	•	Fixed number of players
	•	Limited strategy sets
	•	Finite outcomes

Nash Equilibrium Definition
A strategy profile (s₁*, …, sₙ*) is a Nash Equuilibrium if:

∀ i, ∀ sᵢ ∈ Sᵢ:  uᵢ(sᵢ*, s₋ᵢ*) ≥ uᵢ(sᵢ, s₋ᵢ*)
*This means no player can improve their payoff by unilaterally changing strategy.

-----

Tech Stack (Proposed)
	•	Frontend: Next.js + D3.js (for dynamic, interactive data visualization)
	•	Backend: Python (risk engine, logic, simulations)
	•	Optional: Flask or FastAPI (API layer), PostgreSQL (storage for scenarios), Pandas/Numpy (data ops)?






