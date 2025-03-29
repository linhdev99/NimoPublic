document.addEventListener("DOMContentLoaded", function () {
  fetch("src/config/author.json")
    .then((response) => response.json())
    .then((authors) => {
      const authorContainer = document.getElementById("author-list");
      authorContainer.innerHTML = authors
        .map(
          (author) => `
          <div class="col-md-4">
            <div class="author-card">
              <img src="${author.image}" alt="${
            author.name
          }" class="author-img">
              <div class="author-overlay">
                <h4>${author.name}</h4>
                <p>Năm sinh: ${author.birthYear}</p>
                <p><strong>Vị trí</strong></p>
                <ul class="author-positions">
                  ${author.positions.map((pos) => `<li>${pos}</li>`).join("")}
                </ul>
              </div>
            </div>
          </div>
        `
        )
        .join("");
    })
    .catch((error) => console.error("Lỗi khi tải danh sách tác giả:", error));
});
