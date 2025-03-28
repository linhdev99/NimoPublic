document.addEventListener("DOMContentLoaded", function () {
    const email = "adhppl99@gmail.com";
    const effectiveDate = "2025-03-28";

    const emailElements = document.querySelectorAll("#contact-email");
    emailElements.forEach(el => el.innerHTML = `<a href="mailto:${email}">${email}</a>`);

    document.getElementById("effective-date").textContent = effectiveDate;
    document.getElementById("banner-img").src = "banner.png";
    document.getElementById("icon-img").src = "icon.png";
});
