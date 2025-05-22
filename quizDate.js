const quizData = [
  {
    question: "Какое качество тебе ближе?",
    answers: [
      { text: "Решительность", planet: "Марс" },
      { text: "Мудрость", planet: "Сатурн" },
      { text: "Спокойствие", planet: "Нептун" },
      { text: "Энергия", planet: "Юпитер" },
    ],
  },
  {
    question: "Что тебе больше нравится делать?",
    answers: [
      { text: "Лидировать", planet: "Марс" },
      { text: "Планировать и структурировать", planet: "Сатурн" },
      { text: "Мечтать и творить", planet: "Нептун" },
      { text: "Общаться и веселиться", planet: "Юпитер" },
    ],
  },
  {
    question: "Твой идеальный отдых:",
    answers: [
      { text: "Активный спорт и приключения", planet: "Марс" },
      { text: "Медитация и спокойствие", planet: "Нептун" },
      { text: "Путешествия с друзьями", planet: "Юпитер" },
      { text: "Учеба и саморазвитие", planet: "Сатурн" },
    ],
  },
];

let currentQuestion = 0;
const answersCount = {};

const quizContainer = document.getElementById("quiz-container");
const nextBtn = document.getElementById("next-btn");
const resultDiv = document.getElementById("result");
const quizMain = document.getElementById("quiz-main");

function loadQuestion() {
  resultDiv.textContent = "";
  const q = quizData[currentQuestion];
  quizContainer.innerHTML = `<div class="quiz__title">${q.question}</div>`;
  const ul = document.createElement("ul");
  ul.className = "quiz__answers";

  q.answers.forEach((answer, idx) => {
    const li = document.createElement("li");
    const className = `answer-${idx + 1}`;
    li.innerHTML = `
      <label class="${className}">
        <input type="radio" name="answer"  value="${answer.planet}" />
        <span>${answer.text}</span>
      </label>
    `;
    ul.appendChild(li);
  });

  quizContainer.appendChild(ul);

  nextBtn.textContent =
    currentQuestion === quizData.length - 1 ? "Показать результат" : "Далее";
}

function showResult() {
  quizContainer.innerHTML = "";
  nextBtn.style.display = "none";
  quizMain.classList.add("active");
  setTimeout(() => {
    let maxPlanet = null;
    let maxCount = 0;
    for (const planet in answersCount) {
      if (answersCount[planet] > maxCount) {
        maxCount = answersCount[planet];
        maxPlanet = planet;
      }
    }

    const descriptions = {
      Марс: "Ты — Марс! Энергичный, решительный и смелый.",
      Сатурн: "Ты — Сатурн! Мудрый, ответственный и дисциплинированный.",
      Нептун: "Ты — Нептун! Творческий, спокойный и мечтательный.",
      Юпитер: "Ты — Юпитер! Общительный, жизнерадостный и щедрый.",
    };

    resultDiv.textContent =
      descriptions[maxPlanet] || "Результат не определён.";

    // Убедимся, что .visible сброшен
    resultDiv.classList.remove("active");

    // Заставим браузер пересчитать layout, чтобы transition сработал
    void resultDiv.offsetWidth;

    // Добавим класс с небольшой задержкой (или сразу)
    setTimeout(() => {
      resultDiv.classList.add("active");
    }, 10); // 10 мс достаточно
  }, 1000);
}

nextBtn.addEventListener("click", () => {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    alert("Пожалуйста, выбери ответ!");
    return;
  }

  const planet = selected.value;
  answersCount[planet] = (answersCount[planet] || 0) + 1;

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

loadQuestion();
