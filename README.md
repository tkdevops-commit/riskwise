#RiskWise – Multi-Criteria Risk Assessment & Strategic Decision Tool

Overview:
RiskWise is a strategic, lightweight, and structured decision-support tool designed to help individuals, teams, and organizations make clearer, more confident choices. Grounded in core economic principles, it enables users to identify and categorise risk, assess actual vs. perceived risk, evaluate opportunity costs, and apply game theory to analyse decisions in competitive environments. This is a experimental concept which aims to combine economic principals and business practise into a functional single use app. 

Tools under consideration:

1. Risk Matrix: Determine the severity of risk. 
2. PEST Analysis: Examine the political, economical, social and techonological environments.
Political: Two predominant factors to consider 1. Political stability and 2. Degree of government intervention
Economic: Domestic economic policies, trade agreements, disposable income, FDI, consumer confidence, interest rates and inflation.
Social: Skilled labour force, umemployment levels, culture and consumer behaviour, digital literacy, mobility.
Technological: RnD, supporting infrustructure, tech ecosystems.
3. SWOT Analysis: Determine the organisations internal and external advantages and disadvantage, seek oppprtunities and manage risk. (Category prefix and numbering?) 
4. Business Impact Analysis: Assess the impact of disruption.
5. Scenario Planning: Contigency planning.
6. FMEA: Determine possible points of failures. 

     

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
	•	Support strategic prioritisation in line with organizational objectives

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
	
 Purpose and process:
		1. Identify - Is there uncertainty in the situation? Are there potential threats?
		2. Analyse - Is this actual risk or percieved risk? 
		3. Assess - Rating scale: The level and likelihood of risks.
		4. Caluclate - Which matrix is applicable given the situation. Map the risk on the risk maxtrix to its corrosponding score.
		5. Evaluate - Measure the risk and solution in a broader context. Regulatory requirements, strategic alignment etc.
		7. Develop - Implementation stage - in-house, sourcing externally. Risk avoidence components.
		8. Monitor and Review - Updates, environmental change, objective completion etc.

  3. PEST Analysis:
Poltitical
	Political stability: A) Determining the strength of instituitions B) Frequency of power transitions C) Levels of corruption.
     	A) Can institutions operate without interference? Degree of public trusts in institutions? Are there protections for independence? 
	Governemtent intervention: A) Economic intervention - Taxation, tariffs, privitisation etc B) Regulatory intervention - compliance requirements, anti-trust laws, IR statutes etc

In determining the Political aspect programmatically, there will be combination of indicators, scoring systems and real-tiime data sources.
Political Factor
How to Measure (Metric / Source)
Political Stability
World Bank Political Stability Index, Fragile States Index, Global Peace Index
Corruption
Transparency International’s Corruption Perceptions Index (CPI)
Government Effectiveness
World Bank Government Effectiveness Indicator (part of Worldwide Governance Indicators)
Regulatory Quality
World Bank Regulatory Quality Index
Rule of Law
World Justice Project Rule of Law Index
Ease of Doing Business
World Bank’s (historical) or Heritage Economic Freedom Index
Freedom of the Press
Reporters Without Borders – World Press Freedom Index
Government Intervention
Fraser Institute’s Economic Freedom Index or case-based flags (e.g. subsidies, nationalisation)
Bureaucracy / Red Tape
World Bank data + business climate reports (OECD, IMF)
Recent Policy Changes or Reforms
Scraped from government websites or real-time feeds (e.g. legal databases, news APIs)

1. Used recognised scores from glable indices -refer json file.
2. Intergrate data feeds:
   Governance indicators
   Scrape government press releases API's
       

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






