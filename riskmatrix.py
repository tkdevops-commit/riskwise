import matplotlib.pyplot as plt
import numpy as np

# Risk categories
severity = ['Very Low', 'Low', 'Moderate', 'High', 'Extreme']
likelihood = ['Rare', 'Unlikely', 'Possible', 'Likely', 'Almost Certain']

# Create a matrix of risk scores (1-25)
risk_matrix = np.array([
    [1, 2, 3, 4, 5],
    [2, 4, 6, 8, 10],
    [3, 6, 9, 12, 15],
    [4, 8, 12, 16, 20],
    [5, 10, 15, 20, 25]
])

# Create the plot
fig, ax = plt.subplots(figsize=(8, 6))
cax = ax.matshow(risk_matrix, cmap='Reds')

# Add text to each cell
for i in range(risk_matrix.shape[0]):
    for j in range(risk_matrix.shape[1]):
        ax.text(j, i, str(risk_matrix[i, j]), va='center', ha='center', color='black')

# Set axis ticks and labels
ax.set_xticks(np.arange(len(severity)))
ax.set_yticks(np.arange(len(likelihood)))
ax.set_xticklabels(severity)
ax.set_yticklabels(likelihood)
ax.set_xlabel("Severity of Impact")
ax.set_ylabel("Likelihood of Occurrence")
plt.title("Risk Assessment Matrix")

# Add coloourbar
fig.colorbar(cax, label="Risk Score")

plt.tight_layout()
plt.show()
