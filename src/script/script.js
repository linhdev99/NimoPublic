document.addEventListener("DOMContentLoaded", function () {
  loadSections([
    "home",
    "story",
    "download",
    "characters",
    "card",
    "tutorial",
    "author",
    "thank-you",
  ]);
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
  // Lọc các phần tử để bỏ qua những phần tử bên trong #home
  const elements = [
    ...document.querySelectorAll(".image-container, .home-image"),
  ].filter((el) => !el.closest("#home")); // Bỏ qua các phần tử bên trong #home

  // Tạo IntersectionObserver
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Ngừng quan sát sau khi kích hoạt
        }
      });
    },
    { threshold: 0.3 } // Giảm threshold để hiệu ứng mượt hơn
  );

  // Quan sát các phần tử đã lọc
  elements.forEach((el) => observer.observe(el));
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
