document.addEventListener("DOMContentLoaded", function () {
  loadSections(["home", "story", "author", "download", "thank-you"]);
});

// Hàm tải các section từ file riêng
function loadSections(sections) {
  const contentDiv = document.getElementById("content");
  let loadedCount = 0;

  sections.forEach((section) => {
    fetch(`sections/${section}.html`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Lỗi khi tải ${section}: ${response.statusText}`);
        }
        return response.text();
      })
      .then((html) => {
        contentDiv.insertAdjacentHTML("beforeend", html);
        loadedCount++;

        if (loadedCount === sections.length) {
          initializeContent();
          observeElements();
          setupHomeLogoAnimation();
          initAuthorData();
        }
      })
      .catch((error) => {
        console.error(error);
        contentDiv.insertAdjacentHTML(
          "beforeend",
          `<p class='error'>Không thể tải ${section}</p>`
        );
      });
  });
}

// Hàm cập nhật nội dung trang (email, ngày tháng, hình ảnh)
function initializeContent() {
  const email = "adhppl99@gmail.com";
  const effectiveDate = "2025-03-28";

  updateEmail(email);
  updateTextContent("effective-date", effectiveDate);
  updateImageSrc("banner-img", "src/img/banner.png");
  updateImageSrc("icon-img", "src/img/icon.png");
}

// Hàm cập nhật email
function updateEmail(email) {
  document.querySelectorAll("#contact-email").forEach((el) => {
    el.innerHTML = `<a href="mailto:${email}">${email}</a>`;
  });
}

// Hàm cập nhật nội dung thẻ theo ID
function updateTextContent(elementId, text) {
  const element = document.getElementById(elementId);
  if (element) element.textContent = text;
}

// Hàm cập nhật hình ảnh theo ID
function updateImageSrc(elementId, src) {
  const element = document.getElementById(elementId);
  if (element) element.src = src;
}

// Hàm quan sát phần tử xuất hiện trên màn hình (Hiệu ứng cuộn)
function observeElements() {
  const elements = [
    ...document.querySelectorAll(".image-container, .home-image"),
  ].filter((el) => !el.closest("#home"));

  const storySection = document.getElementById("story");
  let starsAdded = false; // Đánh dấu đã thêm ngôi sao chưa

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  elements.forEach((el) => observer.observe(el));
  if (storySection) observer.observe(storySection);
}

// Hàm tạo ngôi sao
function createStars() {
  const storySection = document.getElementById("story");
  const starContainer = document.createElement("div");
  starContainer.classList.add("story-stars");

  const numStars = 50; // Tăng số lượng sao lên 50
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("div");
    star.classList.add("story-star");

    // Random vị trí trong khu vực section
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;

    // Random kích thước sao (nhỏ hơn sẽ xa hơn)
    const size = Math.random() * 15 + 5; // Kích thước từ 5px - 20px
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Random thời gian bay, delay để tránh đồng bộ
    star.style.animationDuration = `${Math.random() * 5 + 3}s`; // 3s - 8s
    star.style.animationDelay = `${Math.random() * 3}s`;

    starContainer.appendChild(star);
  }

  storySection.appendChild(starContainer);
}

// Gọi hàm khi DOM đã load xong
document.addEventListener("DOMContentLoaded", observeElements);

function setupHomeLogoAnimation() {
  const homeLogo = document.getElementById("home-logo");
  const homeTitle = document.querySelector(".home-title");
  const homeDescription = document.querySelector(".home-description");
  const homeButton = document.querySelector(".home-button");

  homeTitle.style.opacity = "0";
  homeTitle.style.transform = "translateX(100%)";
  homeDescription.style.opacity = "0";
  homeDescription.style.transform = "translateX(100%)";
  homeButton.style.opacity = "0";

  const startAnimations = () => {
    homeLogo.style.animation = "moveUp 1s ease-out forwards";

    setTimeout(() => {
      homeTitle.style.animation =
        "slideInLeft 1s ease-out forwards, fadeIn 1s ease-out forwards";
    }, 500);

    setTimeout(() => {
      homeDescription.style.animation = "slideInLeft 1s ease-out forwards";
    }, 1000);

    setTimeout(() => {
      homeButton.style.animation = "fadeIn 1s ease-out forwards";
    }, 1500);
  };

  if (homeLogo.complete) {
    startAnimations();
  } else {
    homeLogo.onload = startAnimations;
  }
}
