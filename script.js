
// Smooth scroll (safe version)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});


// Fade-in on scroll (optimized)
const elements = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target); // run once only
    }
  });
}, {
  threshold: 0.15
});



document.addEventListener("DOMContentLoaded", function () {

  const phone = "+9779867993602";
  document.getElementById("email").innerText =
  "lazybiaak" + "@gmail.com";
  const phoneLink = document.getElementById("phoneLink");
  const phoneText = document.getElementById("phoneText");

  phoneLink.href = "tel:" + phone;
  phoneText.innerText = phone;

});
// Initial setup
elements.forEach(el => {
  el.classList.add("hidden");
  observer.observe(el);
});