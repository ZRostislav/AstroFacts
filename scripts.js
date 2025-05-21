fetch("https://api.spaceflightnewsapi.net/v4/articles")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("news-container");
    container.innerHTML = "";
    data.results.slice(0, 8).forEach((article) => {
      const card = document.createElement("div");
      card.className = "news-card";
      card.innerHTML = `
            <img src="${article.image_url}" alt="Обложка">
            <div class="news-content">
              <div class="news-title">${article.title}</div>
              <div class="news-date">${new Date(
                article.published_at
              ).toLocaleDateString()}</div>
              <div class="read-more">
                <a href="${article.url}" target="_blank">Читать</a>
              </div>
            </div>
          `;
      container.appendChild(card);
    });
  })
  .catch((err) => {
    document.getElementById("news-container").innerText =
      "Ошибка загрузки новостей.";
    console.error(err);
  });
