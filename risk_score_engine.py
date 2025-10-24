import numpy as np
import pandas as pd

# takiing raw data from various scources
data = {
    'likelihood': [3, 4, 2, 5, 4],   # scale 1–5
    'impact': [60, 80, 40, 90, 70],  # scale 0–100
    'vulnerability': [0.6, 0.8, 0.3, 0.9, 0.5]  # scale 0–1
}

df = pd.DataFrame(data)

# --- STEP 1: Standardize (Z-Score Normalization) ---
for col in df.columns:
    df[col + '_z'] = (df[col] - df[col].mean()) / df[col].std()

# --- STEP 2: Combine into a Risk Index (weighted average) ---
# Adjust weights depending on importance
weights = {
    'likelihood_z': 0.4,
    'impact_z': 0.4,
    'vulnerability_z': 0.2
}

df['risk_index'] = (
    df['likelihood_z'] * weights['likelihood_z'] +
    df['impact_z'] * weights['impact_z'] +
    df['vulnerability_z'] * weights['vulnerability_z']
)

# --- STEP 3: Optional — Convert to 0–100 scale for readability ---
df['risk_score'] = ((df['risk_index'] - df['risk_index'].min()) /
                   (df['risk_index'].max() - df['risk_index'].min())) * 100

print(df[['likelihood', 'impact', 'vulnerability', 'risk_score']])
