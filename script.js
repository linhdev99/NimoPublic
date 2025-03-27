document.addEventListener("DOMContentLoaded", function () {
    const email = "support@nimoproject.com"; // Thay email tại đây
    const effectiveDate = new Date().toISOString().split("T")[0]; // Định dạng YYYY-MM-DD

    const emailElements = document.querySelectorAll("#contact-email");
    emailElements.forEach(el => el.innerHTML = `<a href="mailto:${email}">${email}</a>`);

    document.getElementById("effective-date").textContent = effectiveDate;
});
