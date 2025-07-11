# riskwise
Risk assessment multi criteria tool

A strategic, lightweight and structured decision-support tool designed to help individual, teams and organisations make clearer and cleaner choices by applying core economic principals. It enables users to idenitfy and catergorise risk, assess actual vs. perceived risk, evaluate opportunity costs, and analyse decisions within a competitive landscape using game theory analysis. 

Features:

- Identify classes of risk
- Evaluate actual vs. perceived risk
- Incorporate opportunity cost in decision making
- Analyse trade-offs and opportunity costs
- Quantitative output for risk assessment
- Optimising strategic decisions based on competitor choices 
- Exploring if risk can be leveraged to support business activities and meet organisational objectives within governance frameworks
- Are actions taken to mitigate risk inadvertently increasing risk exposure



Forumulas 
Actual 
AR = POE * IOE

Perecieved
PR = PP * PI

Measure the gap difference
Gap = AR - PR

Quualitative scenarios
{Perceived Risk Score} = (P_s) \times (I_s) \times (F_h) \times (F_c)
Where:
	•	P_s: Subjective Probability Score (1–5)
	•	I_s: Subjective Impact Score (1–5)
	•	F_h: Heuristic Factors (familiarity, media coverage, trust, brand etc.)
	•	F_c: Contextual Factors (power dynamics, org culture, org objectivs, resource allocation.)



Game Theory

Pay-off used where there are fixed players, limit amount of strategic choices and finite games.


Player B: Hold
Player B: Pass
Player A: Hold
(value, Value)
(Value, Value)
Player A: Pass
(Value, Value)
(Value, Value)


Terms:
Nash equilibrium
Let:
	•	S_i: Strategy set for player i
	•	u_i(s_1, s_2, …, s_n): Payoff for player i given the strategy profile (s_1, …, s_n)

A strategy profile (s_1^, …, s_n^) is a Nash Equilibrium if:

\forall i, \forall s_i \in S_i: \quad u_i(s_i^, s_{-i}^) \geq u_i(s_i, s_{-i}^*)

Meaning: Player i cannot improve their payoff by switching to any other strategy s_i, given that the other players stick to s_{-i}^*

Competitive
Non-competitive 
Social choice and incentive problems



Tech stack:
?
python 
?? next.js & D3??

Framework:
Flask




