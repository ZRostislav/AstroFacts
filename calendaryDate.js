const moonPhases = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];
const phaseDescriptions = {
  "🌑": "Новолуние — время начинаний и тишины.",
  "🌒": "Растущий серп — зарождение идей.",
  "🌓": "Первая четверть — движение вперёд.",
  "🌔": "Почти полная — активность и рост.",
  "🌕": "Полнолуние — пик энергии.",
  "🌖": "Убывающая — подведение итогов.",
  "🌗": "Последняя четверть — анализ и выводы.",
  "🌘": "Стареющий серп — отдых и восстановление.",
};

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectedDay = null;

function getMoonPhase(day) {
  // Упрощённо: цикл 29.5 дней, просто для примера
  const synodicMonth = 29.530588853;
  const newMoon = new Date(Date.UTC(2000, 0, 6, 18, 14));
  const daysSinceNewMoon = (day - newMoon) / (1000 * 60 * 60 * 24);
  const currentPhase = (daysSinceNewMoon % synodicMonth) / synodicMonth;
  const index = Math.floor(currentPhase * 8) % 8;
  return moonPhases[index];
}

function renderCalendar(month, year) {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";
  const firstDay = new Date(year, month).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const row = calendar.insertRow();

  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = calendar.insertRow();
    for (let j = 0; j < 7; j++) {
      const cell = row.insertCell();
      if (i === 0 && j < firstDay) {
        cell.innerHTML = "";
      } else if (date > daysInMonth) {
        break;
      } else {
        const cellDate = new Date(year, month, date);
        const isToday = cellDate.toDateString() === today.toDateString();

        const emoji = getMoonPhase(cellDate);
        cell.innerHTML = `<div>${date}</div><div>${emoji}</div>`;
        if (isToday) cell.classList.add("today");
        if (
          selectedDay &&
          cellDate.toDateString() === selectedDay.toDateString()
        ) {
          cell.classList.add("selected");
        }

        cell.addEventListener("click", () => {
          selectedDay = cellDate;
          updateCurrentInfo();
          renderCalendar(month, year);
        });

        date++;
      }
    }
  }

  document.getElementById("month-year").textContent = `${today.toLocaleString(
    "default",
    { month: "long" }
  )} ${year}`;
}

function updateCurrentInfo() {
  const day = selectedDay || today;
  const emoji = getMoonPhase(day);
  const desc = phaseDescriptions[emoji] || "Неизвестная фаза";
  document.getElementById(
    "date-title"
  ).textContent = `${day.toLocaleDateString()} — ${emoji}`;
  document.getElementById("phase-description").textContent = desc;
}

document.getElementById("prev-month").addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  today = new Date(currentYear, currentMonth);
  renderCalendar(currentMonth, currentYear);
});

document.getElementById("next-month").addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  today = new Date(currentYear, currentMonth);
  renderCalendar(currentMonth, currentYear);
});

// инициализация
updateCurrentInfo();
renderCalendar(currentMonth, currentYear);
