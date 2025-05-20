// Дата запуска в формате UTC
const launchDate = new Date("2025-06-08T13:00:00Z").getTime();

const countdownElement = document.getElementById("countdown");

function updateCountdown() {
  const now = new Date().getTime();
  const diff = launchDate - now;

  if (diff <= 0) {
    countdownElement.innerHTML = "🚀 Запуск состоялся!";
    clearInterval(timerInterval);
    return;
  }

  // Вычисляем время
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  countdownElement.innerHTML = `
    ${days} дн 
    ${hours.toString().padStart(2, "0")} ч 
    ${minutes.toString().padStart(2, "0")} мин 
    ${seconds.toString().padStart(2, "0")} сек
  `;
}

// Запускаем обновление каждую секунду
updateCountdown();
const timerInterval = setInterval(updateCountdown, 1000);
