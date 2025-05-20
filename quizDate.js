  const quizData = [
    {
      question: "Какое качество тебе ближе?",
      answers: [
        { text: "Решительность", planet: "Марс" },
        { text: "Мудрость", planet: "Сатурн" },
        { text: "Спокойствие", planet: "Нептун" },
        { text: "Энергия", planet: "Юпитер" },
      ]
    },
    {
      question: "Что тебе больше нравится делать?",
      answers: [
        { text: "Лидировать", planet: "Марс" },
        { text: "Планировать и структурировать", planet: "Сатурн" },
        { text: "Мечтать и творить", planet: "Нептун" },
        { text: "Общаться и веселиться", planet: "Юпитер" },
      ]
    },
    {
      question: "Твой идеальный отдых:",
      answers: [
        { text: "Активный спорт и приключения", planet: "Марс" },
        { text: "Медитация и спокойствие", planet: "Нептун" },
        { text: "Путешествия с друзьями", planet: "Юпитер" },
        { text: "Учеба и саморазвитие", planet: "Сатурн" },
      ]
    },
  ];

  let currentQuestion = 0;
  const answersCount = {};

  const quizContainer = document.getElementById('quiz-container');
  const nextBtn = document.getElementById('next-btn');
  const resultDiv = document.getElementById('result');

  function loadQuestion() {
    resultDiv.textContent = '';
    const q = quizData[currentQuestion];
    quizContainer.innerHTML = `<div class="question">${q.question}</div>`;
    const ul = document.createElement('ul');
    ul.className = 'answers';

    q.answers.forEach((answer, idx) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <label>
          <input type="radio" name="answer" value="${answer.planet}" />
          ${answer.text}
        </label>
      `;
      ul.appendChild(li);
    });

    quizContainer.appendChild(ul);

    if (currentQuestion === quizData.length - 1) {
      nextBtn.textContent = 'Показать результат';
    } else {
      nextBtn.textContent = 'Далее';
    }
  }

  function showResult() {
    // Найдём планету с максимальным количеством баллов
    let maxPlanet = null;
    let maxCount = 0;
    for (const planet in answersCount) {
      if (answersCount[planet] > maxCount) {
        maxCount = answersCount[planet];
        maxPlanet = planet;
      }
    }

    // Описания планет
    const descriptions = {
      "Марс": "Ты — Марс! Энергичный, решительный и смелый.",
      "Сатурн": "Ты — Сатурн! Мудрый, ответственный и дисциплинированный.",
      "Нептун": "Ты — Нептун! Творческий, спокойный и мечтательный.",
      "Юпитер": "Ты — Юпитер! Общительный, жизнерадостный и щедрый.",
    };

    quizContainer.innerHTML = '';
    nextBtn.style.display = 'none';
    resultDiv.textContent = descriptions[maxPlanet] || "Результат не определён.";
  }

  nextBtn.addEventListener('click', () => {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
      alert('Пожалуйста, выберите ответ!');
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