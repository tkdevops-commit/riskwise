const questions = [
  {
    type: "classification",
    text: "What kind of risk are you evaluating?",
    options: ["Strategic", "Operational", "Financial", "Reputational"]
  },
  {
    type: "perception",
    text: "How risky does this situation feel to you?",
    options: ["Low", "Moderate", "High", "Severe"]
  },
  {
    type: "actual",
    text: "What is the actual likelihood of this risk occurring?",
    options: ["Rare", "Unlikely", "Possible", "Likely", "Almost Certain"]
  },
  {
    type: "mitigation",
    text: "Do your current strategies increase your exposure in any way?",
    options: ["Yes", "No", "Not Sure"]
  }
];

let currentQuestion = 0;
const userAnswers = [];

function startQuiz() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question-text").textContent = q.text;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(option => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="option" value="${option}" />
      ${option}
    `;
    optionsDiv.appendChild(label);
  });
}

function nextQuestion() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Please select an option.");
    return;
  }

  userAnswers.push({
    question: questions[currentQuestion].text,
    answer: selected.value
  });

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("results").style.display = "block";

  const container = document.getElementById("summary-container");
  container.innerHTML = "";

  userAnswers.forEach((entry, i) => {
    const p = document.createElement("p");
    p.innerHTML = `<strong>Q${i + 1}:</strong> ${entry.question}<br /><em>Answer:</em> ${entry.answer}`;
    container.appendChild(p);
  });
}
