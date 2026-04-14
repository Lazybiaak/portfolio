
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

document.getElementById("email").innerText =
  "lazybiaak" + "@gmail.com";

const phone = "+977 9867993602";

document.getElementById("phoneText").innerText = phone;
document.getElementById("phoneLink").href = "tel:" + phone;
// Initial setup
elements.forEach(el => {
  el.classList.add("hidden");
  observer.observe(el);
});