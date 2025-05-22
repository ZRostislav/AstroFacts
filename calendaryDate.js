let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

const phaseDescriptions = [
  "Новолуние — Первая фаза лунного цикла; наступает в начале обращения Луны по орбите. Луна находится между Землей и Солнцем, поэтому сторона Луны, находящаяся в тени, обращена к Земле. Она выглядит абсолютно темной, обычно невидимой невооруженным глазом.",
  "Растущий серп — Вторая фаза лунного цикла; наступает между новолунием и первой четвертью. Растущие фазы означают увеличение освещенности Луны, поэтому в начале этой фазы Луна имеет форму тонкого полумесяца, а затем освещенная область постепенно увеличивается пока не наступает фаза первой четверти.",
  "Первая четверть — Третья фаза лунного цикла; наступает, когда Луна проходит четверть пути по своей орбите. При наблюдении с Земли Луна располагается под прямым углом по отношению к Солнцу. Она выглядит наполовину освещенной и видна на вечернем небе.",
  "Прибывающая Луна — Четвертая фаза лунного цикла; наступает между первой четвертью и полнолунием. Растущая фаза представляет собой увеличение освещенности Луны, поэтому в начале этой фазы Луна выглядит наполовину освещенной, а затем освещенная область постепенно увеличивается пока не наступает полнолуние.",
  "Полнолуние — Пятая фаза лунного цикла; наступает, когда Луна проходит половину своей орбиты. Луна и Солнце расположены по разные стороны от Земли, поэтому вся сторона Луны, обращенная к Земле, освещена. На ночном небе Луна выглядит как яркий круглый диск и видна всю ночь.",
  "Убывающая Луна — Шестая фаза лунного цикла; наступает между полнолунием и фазой последней четверти. Убывающие фазы означают уменьшение освещенности Луны, поэтому в начале этой фазы мы видим почти полностью освещенный лунный диск, а затем освещенная область постепенно уменьшается, пока не наступает фаза последней четверти.",
  "Последняя четверть — Седьмая фаза лунного цикла; наступает, когда Луна проходит три четверти своей орбиты. При наблюдении с Земли Луна располагается под прямым углом по отношению к Солнцу. Она выглядит наполовину освещенной и видна на вечернем небе.",
  "Старая Луна — Восьмая и последняя фаза лунного цикла; наступает между фазой последней четверти и новолунием. Убывающие фазы означает уменьшение освещенности Луны, поэтому в начале этой фазы мы видим половину лунного диска почти полностью освещенной, а затем освещенная область постепенно уменьшается пока не наступает новолуние.",
];

function getMoonEmoji(phase) {
  const emojis = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];
  return emojis[phase];
}

function getMoonPhaseName(phase) {
  const names = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];
  return names[phase];
}

function getMoonPhaseIndex(date) {
  const synodicMonth = 29.53058867;
  const newMoon = new Date(Date.UTC(2000, 0, 6, 18, 14));
  const daysSinceNew = (date - newMoon) / 86400000;
  const currentPhase = (daysSinceNew % synodicMonth) / synodicMonth;
  return Math.floor(currentPhase * 8 + 0.5) % 8;
}

function updateCurrentMoonPhase() {
  const now = new Date();
  const options = { day: "numeric", month: "long", year: "numeric" };
  const timeString = now.toLocaleTimeString();
  const dateString = now.toLocaleDateString("ru-RU", options);

  const phaseIndex = getMoonPhaseIndex(now);
  const emoji = getMoonEmoji(phaseIndex);
  const name = getMoonPhaseName(phaseIndex);

  document.getElementById("current-date").textContent = dateString;
  document.getElementById("current-time").textContent = timeString;
  document.getElementById("today-moon-name").textContent = name;
  document.getElementById(
    "phase-description"
  ).textContent = `${name} ${phaseDescriptions[phaseIndex]}`;
}

function generateMoonCalendar(year, month) {
  const today = new Date();
  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  document.getElementById(
    "calendar-month-year"
  ).textContent = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  const totalCells = 42;

  const grid = document.getElementById("calendar-grid");
  grid.innerHTML = "";

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

  for (let i = 0; i < totalCells; i++) {
    let displayDay,
      cellDate,
      isCurrentMonth = true;

    if (i < startOffset) {
      displayDay = daysInPrevMonth - startOffset + 1 + i;
      cellDate = new Date(prevYear, prevMonth, displayDay);
      isCurrentMonth = false;
    } else if (i >= startOffset + daysInMonth) {
      displayDay = i - (startOffset + daysInMonth) + 1;
      const nextMonth = (month + 1) % 12;
      const nextYear = month === 11 ? year + 1 : year;
      cellDate = new Date(nextYear, nextMonth, displayDay);
      isCurrentMonth = false;
    } else {
      displayDay = i - startOffset + 1;
      cellDate = new Date(year, month, displayDay);
    }

    const phaseIndex = getMoonPhaseIndex(cellDate);
    const emoji = getMoonEmoji(phaseIndex);

    const isToday =
      cellDate.getDate() === today.getDate() &&
      cellDate.getMonth() === today.getMonth() &&
      cellDate.getFullYear() === today.getFullYear();

    grid.innerHTML += `
      <div class="${isToday ? "today" : ""} ${
      isCurrentMonth ? "" : "other-month"
    }">
        <div class="day">${displayDay}</div>
        <div class="moon">${emoji}</div>
      </div>`;
  }
}

document.getElementById("prev-month").addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateMoonCalendar(currentYear, currentMonth);
});

document.getElementById("next-month").addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateMoonCalendar(currentYear, currentMonth);
});

updateCurrentMoonPhase();
generateMoonCalendar(currentYear, currentMonth);
setInterval(updateCurrentMoonPhase, 1000);
