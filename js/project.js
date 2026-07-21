// Smooth scroll
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

// Fade-in observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

// Get elements safely
const container = document.getElementById("project_container");
const title = document.getElementById("title");
const page_title = document.getElementById("page-title");

// Get group from URL
const params = new URLSearchParams(window.location.search);
const selectedGroup =
  params.get("group") || "All Projects";

// Update titles safely
if (page_title) {
  page_title.textContent =
    `Projects | ${selectedGroup}`;
}

if (title) {
  title.textContent =
    `Projects | ${selectedGroup}`;
}

// Load projects
async function loadProjects() {
  if (!container) return;

  try {
    const response =
      await fetch(
        "projects/projects.json"
      );

    const files =
      await response.json();

    const projects = (
      await Promise.all(
        files.map(async file => {
          try {
            const res =
              await fetch(file);

            if (!res.ok) {
              console.warn(
                `Missing: ${file}`
              );
              return null;
            }

            return await res.json();

          } catch (err) {
            console.warn(err);
            return null;
          }
        })
      )
    ).filter(Boolean);

    const filtered =
      projects.filter(project =>
        project.groups.includes(
          selectedGroup
        )
      );

    renderProjects(filtered);

  } catch (err) {
    console.error(err);

    container.innerHTML =
      "<p>You are too early. Projects are being built here.</p>";
  }
}

function renderProjects(projects) {
  if (!container) return;

  container.innerHTML = "";

  if (projects.length === 0) {
    container.innerHTML =
      "<p>You are too early. Projects are being built here.</p>";
    return;
  }

  projects.forEach(project => {
    const card = document.createElement("div");

    card.classList.add(
      "project-card",
      "projects-card"
    );

    const skillsHTML =
      project.skills &&
      project.skills.length
        ? project.skills
            .map(skill =>
              `<span class="skill-tag">${skill}</span>`
            )
            .join("")
        : "";

    card.innerHTML = `
  <div class="thumbnail">
    <img src="${project.image}"
         alt="${project.name}">
  </div>

  <h3>${project.name}</h3>

  <div class="project-meta">

    ${
      project.date
        ? `
        <span class="project-date">
          <i class="fa-solid fa-calendar"></i>
          ${project.date}
        </span>
        `
        : ""
    }

    ${
      project.status
        ? `
        <span class="project-status ${project.status
          .toLowerCase()
          .replace(/\s+/g, "-")}">
          ${project.status}
        </span>
        `
        : ""
    }

  </div>

  <p>${project.description}</p>

  <div class="project-links">
    ${
      project.github
        ? `<a href="${project.github}" target="_blank">GitHub</a>`
        : ""
    }

    ${
      project.details
        ? `<a href="${project.details}" target="_blank">Details</a>`
        : ""
    }
  </div>

  ${
    skillsHTML
      ? `
      <div class="skill-list">
        <h5>Skills Required:</h5>

        <div class="skill-tags">
          ${skillsHTML}
        </div>
      </div>
      `
      : ""
  }
`;

    container.appendChild(card);
  });
}

document.addEventListener(
  "DOMContentLoaded",
  function () {

    loadProjects();

    // Fade-in setup (Suggestion #7)
    document
      .querySelectorAll("section")
      .forEach(el => {
        el.classList.add("hidden");
        observer.observe(el);
      });

    // Contact information
    const phone = "+9779867993602";
    const email =
      "lazybiaak@gmail.com";

    const emailLink =
      document.getElementById(
        "emailLink"
      );

    const emailText =
      document.getElementById(
        "email"
      );

    const phoneLink =
      document.getElementById(
        "phoneLink"
      );

    const phoneText =
      document.getElementById(
        "phoneText"
      );

    if (phoneLink && phoneText) {
      phoneLink.href =
        "tel:" + phone;

      phoneText.textContent =
        phone;
    }

    if (emailLink && emailText) {
      emailLink.href =
        `mailto:${email}?subject=Hello&body=Hi%20There`;

      emailText.textContent =
        email;
    }
  }
);