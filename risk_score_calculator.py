from dataclasses import dataclass

# -----------------------------
# Data structures
# -----------------------------

@dataclass
class RiskInputs:
    poe: float  # Probability of Event
    ioe: float  # Impact of Event
    pp: float   # Perceived Probability
    pi: float   # Perceived Impact


@dataclass
class RiskResults:
    actual_risk: float
    perceived_risk: float
    risk_gap: float
    actual_level: str
    perceived_level: str
    interpretation: str


# -----------------------------
# Utility functiions
# -----------------------------

def classify_risk(score: float) -> str:
    """
    Classify risk magnitude.
    Adjust thresholds depending on org risk appetite.
    """
    if score < 2:
        return "Low"
    elif score < 5:
        return "Medium"
    elif score < 8:
        return "High"
    else:
        return "Critical"


def validate_input(value: float, name: str):
    if not (0 <= value <= 10):
        raise ValueError(f"{name} must be between 0 and 10.")


# -----------------------------
# Core risk engine
# -----------------------------

def calculate_risk(inputs: RiskInputs) -> RiskResults:
    # Validate inputs
    validate_input(inputs.poe, "POE")
    validate_input(inputs.ioe, "IOE")
    validate_input(inputs.pp, "PP")
    validate_input(inputs.pi, "PI")

    # Core calculations
    actual_risk = inputs.poe * inputs.ioe
    perceived_risk = inputs.pp * inputs.pi
    risk_gap = actual_risk - perceived_risk

    # Classification
    actual_level = classify_risk(actual_risk)
    perceived_level = classify_risk(perceived_risk)

    # Interpretation logic
    if risk_gap > 1:
        interpretation = (
            "⚠️ Actual risk exceeds perceived risk. "
            "This indicates underestimation and elevated governance failure risk."
        )
    elif risk_gap < -1:
        interpretation = (
            "🟠 Perceived risk exceeds actual risk. "
            "This may indicate overreaction, fear-based controls, or moral panic."
        )
    else:
        interpretation = (
            "✅ Perceived and actual risks are aligned. "
            "Risk governance appears proportionate."
        )

    return RiskResults(
        actual_risk=actual_risk,
        perceived_risk=perceived_risk,
        risk_gap=risk_gap,
        actual_level=actual_level,
        perceived_level=perceived_level,
        interpretation=interpretation
    )


# -----------------------------
# CLI Interface
# -----------------------------

def get_input(prompt):
    while True:
        try:
            return float(input(prompt))
        except ValueError:
            print("Please enter a valid number between 0 and 10.")


if __name__ == "__main__":
    print("\nQuantitative Risk Gap Calculator (Actual vs Perceived)\n")

    inputs = RiskInputs(
        poe=get_input("Probability of Event (0–10): "),
        ioe=get_input("Impact of Event (0–10): "),
        pp=get_input("Perceived Probability (0–10): "),
        pi=get_input("Perceived Impact (0–10): ")
    )

    results = calculate_risk(inputs)

    print("\n--- Risk Analysis ---")
    print(f"Actual Risk Score     : {results.actual_risk:.2f} ({results.actual_level})")
    print(f"Perceived Risk Score  : {results.perceived_risk:.2f} ({results.perceived_level})")
    print(f"Risk Gap (AR − PR)    : {results.risk_gap:.2f}")
    print(f"\nInterpretation: {results.interpretation}")
