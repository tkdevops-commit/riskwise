def calculate_risk(poe, ioe, pp, pi):
    # Calculate Actual and Perceived Risk
    ar = poe * ioe
    pr = pp * pi
    gap = ar - pr

    print("\n--- Risk Analysis ---")
    print(f"Actual Risk (AR)      = {ar:.2f}")
    print(f"Perceived Risk (PR)   = {pr:.2f}")
    print(f"Gap (AR - PR)         = {gap:.2f}")

    # Interpretation
    if gap > 0:
        print("⚠️  Perceived risk is LOWER than actual risk — potential underestimation.")
    elif gap < 0:
        print("🟠 Perceived risk is HIGHER than actual risk — potential overestimation.")
    else:
        print("✅ Perceived and actual risk are aligned.")


def get_input(prompt):
    while True:
        try:
            return float(input(prompt))
        except ValueError:
            print("Please enter a valid number.")


if __name__ == "__main__":
    print("Quantitative Risk Score Calculator\n")

    poe = get_input("Enter Probability of Event (POE): ")
    ioe = get_input("Enter Impact of Event (IOE): ")
    pp = get_input("Enter Perceived Probability (PP): ")
    pi = get_input("Enter Perceived Impact (PI): ")

    calculate_risk(poe, ioe, pp, pi)
