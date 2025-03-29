/** 🟢 Khởi tạo dữ liệu và setup sự kiện */
function initAuthorData() {
  setupScrollButtons();
}

let authors = [];
/** 🟢 Lấy danh sách tác giả từ JSON */
async function fetchAuthors() {
  try {
    const response = await fetch("src/config/author.json");
    authors = await response.json();
    renderAuthors(authors);
  } catch (error) {
    console.error("Lỗi khi tải danh sách tác giả:", error);
  }
}

/** 🟢 Render danh sách tác giả vào HTML */
function renderAuthors(authors) {
  const authorContainer = document.getElementById("author-list");
  authorContainer.innerHTML = authors.map(createAuthorHTML).join("");
}

/** 🟢 Tạo HTML cho mỗi tác giả */
function createAuthorHTML(author) {
  return `
    <div class="author-card">
      <img src="${author.image}" alt="${author.name}" class="author-img">
      <div class="author-overlay">
        <h4>${author.name}</h4>
        <p>Năm sinh: ${author.birthYear}</p>
        <p><strong>Vị trí</strong></p>
        <ul class="author-positions">
          ${author.positions.map((pos) => `<li>${pos}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
}

/** 🟢 Thiết lập sự kiện cho nút scroll */
async function setupScrollButtons() {
  const container = document.querySelector(".author-list-wrapper");
  const leftBtn = document.querySelector(".scroll-left");
  const rightBtn = document.querySelector(".scroll-right");
  const scrollAmount = 300;

  await fetchAuthors();
  if (authors.length > 1) {
    startAutoScroll(container);
  }

  if (container && leftBtn && rightBtn) {
    leftBtn.addEventListener("click", () =>
      scrollContainer(container, -scrollAmount)
    );
    rightBtn.addEventListener("click", () =>
      scrollContainer(container, scrollAmount)
    );
  }
}

function scrollContainer(container, amount) {
  container.scrollBy({ left: amount, behavior: "smooth" });
}

/**  Auto-scroll danh sách tác giả */
let isHovered = false;

function startAutoScroll(container) {
  console.log("Bắt đầu auto-scroll");

  // Dừng auto-scroll khi hover vào danh sách
  container.addEventListener("mouseenter", () => {
    isHovered = true;
  });

  container.addEventListener("mouseleave", () => {
    isHovered = false;
  });

  // Bắt đầu auto-scroll liên tục với requestAnimationFrame
  function autoScrollLoop() {
    if (!isHovered && container.scrollWidth > container.clientWidth) {
      autoScrollStep(container);
    }
    // Gọi lại tự động
    requestAnimationFrame(autoScrollLoop);
  }

  // Bắt đầu vòng lặp auto-scroll
  requestAnimationFrame(autoScrollLoop);
}

let isScrollingLeft = false; // Biến xác định hướng cuộn (sang phải hoặc sang trái)

function autoScrollStep(container) {
  const maxScrollLeft = container.scrollWidth - container.clientWidth;

  // Nếu đang cuộn sang phải và đã đến cuối, chuyển sang cuộn ngược lại sang trái
  if (
    !isScrollingLeft &&
    (container.scrollLeft >= maxScrollLeft ||
      maxScrollLeft - container.scrollLeft < 3)
  ) {
    isScrollingLeft = true; // Đổi hướng cuộn sang trái
  }

  // Nếu đang cuộn sang trái và đã đến đầu, chuyển sang cuộn ngược lại sang phải
  if (isScrollingLeft && container.scrollLeft <= 0) {
    isScrollingLeft = false; // Đổi hướng cuộn sang phải
  }

  // Cuộn theo hướng hiện tại
  if (isScrollingLeft) {
    container.scrollLeft -= 3; // Cuộn sang trái
  } else {
    container.scrollLeft += 3; // Cuộn sang phải
  }
}
