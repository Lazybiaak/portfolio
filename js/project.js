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


const container = document.getElementById("project_container");
const title = document.getElementById("title");

// Get group from URL
const params = new URLSearchParams(window.location.search);
const selectedGroup = params.get("group");
const page_title = document.getElementById("page-title");

page_title.innerHTML = "Projects | " +`${selectedGroup}`;
title.innerHTML = "Projects | " +`${selectedGroup}`;

async function loadProjects() {
  const response = await fetch("projects.json");
  const projects = await response.json();

  const filtered = projects.filter(project =>
    project.groups.includes(selectedGroup)
  );

  renderProjects(filtered);
}

function renderProjects(projects) {
  container.innerHTML = "";

  if (projects.length === 0) {
    container.innerHTML = "<p>No projects found.</p>";
    return;
  }

  projects.forEach(project => {
    const card = document.createElement("div");

    // match your classes
    card.classList.add("project-card", "projects-card");

    card.innerHTML = `
      <div class="thumbnail">
        <img src="${project.image}" alt="${project.name}">
      </div>

      <h3>${project.name}</h3>

      <p>${project.description}</p>

      <div class="project-links">
        <a href="${project.github}" target="_blank">GitHub</a>
      </div>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", function () {
    loadProjects();
    const phone = "+977 9867993602";
    const email = "lazybiaak" + "@gmail.com";
    const emailLink = document.getElementById("emailLink");
    const emailText = document.getElementById("email");
    const phoneLink = document.getElementById("phoneLink");
    const phoneText = document.getElementById("phoneText");
    phoneLink.href = "tel:" + phone;
    emailLink.href = "mailto:lazybiaak@gmail.com?subject=Hello&body=Hi%20There";
    phoneText.innerText = phone;
    emailText.innerHTML = email;
});

// Initial setup
elements.forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});