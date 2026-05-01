
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
  const skill_grid = document.getElementById("skills-grid");
  const skills = [
    "Embedded Programming C/C++",
    "PCB Design, Analysis and Debugging",
    "Communication Protocol",
    "Digital Logic & Analog Circuits",
    "RTOS (Real-Time Operating Systems)",
    "PLC Programming & HMI",
    "Hardware Prototyping & Debugging",
    "Industrial Internet of Things (IIoT)"
  ];
  const skillsDescriptions = [
    "Mastery of firmware development, interrupt handling, and memory management for microcontrollers (STM32, ESP32, AVR).",
    "Multi-layer board design using tools like Altium, KiCad, or Allegro, focusing on signal integrity and EMI/EMC compliance.",
    "Deep knowledge of serial (UART, SPI, I2C), networking (TCP/IP, CAN bus), and industrial standards (Modbus, Profibus).",
    "Designing and simulating digital circuits using VHDL/Verilog and implementation of logic gates/state machines.",
    "Experience with FreeRTOS or Zephyr for managing multi-threaded applications and task scheduling.",
    "Expertise in IEC 61131-3 languages (Ladder Logic, Structured Text) and designing Human-Machine Interfaces.",
    "Proficiency with oscilloscopes, logic analyzers, and spectrum analyzers to troubleshoot hardware-firmware interactions.",
    "Integrating embedded sensors with cloud platforms (MQTT, AWS IoT) to bridge the gap between the factory floor and data analytics."
  ];
  const skills_icon = [
    "fa-solid fa-laptop-code",
    "fas fa-diagram-project",
    "fas fa-network-wired",
    "fa-solid fa-memory",
    "fas fa-clock",
    "fa-solid fa-plug",
    "fas fa-screwdriver-wrench",
    "fa-solid fa-gauge-high",
  ];
  let skill_card = "";
  for (let i = 0; i < skills.length; i++) {
    skill_card += `
    <div class="skill-card">
      <div class="icon"><i class="${skills_icon[i]}"></i></div>
      <h3>${skills[i]}</h3>
      <p>${skillsDescriptions[i]}</p>
    </div>
  `;
  }
  skill_grid.innerHTML = skill_card;

  const projects_container = document.getElementById("projects_container");
  const projects = [
    "Combact Robotics",
    "Custom Embedded Hardware Platforms",
    "Smart Industrial Automation",
    "Wireless Communication"
  ]
  const projectsDescriptions = [
    "Projects involving motor control (BLDC/Stepper), sensor fusion (IMUs, Lidar), and real-time navigation algorithms.",
    "Design and manufacture of proprietary PCBs, such as a custom data logger, a wearable health monitor, or an edge-computing gateway.",
    "Deployment of PLC-based control systems for manufacturing lines, featuring automated sorting, PID control loops, or SCADA integration.",
    "Development of mesh networks or long-range monitoring systems using LoRaWAN, Zigbee, or BLE for remote data acquisition."
  ]
  const projects_icon = [
    "fa-solid fa-robot",
    "fa-solid fa-microchip",
    "fas fa-gears",
    "fa-solid fa-wifi"
  ];
  let project_card = "";
  for (let i = 0; i < projects.length; i++) {
    project_card += `
  <a href="projects.html?group=${encodeURIComponent(projects[i])}" class="project-card">
    <div class="icon"><i class="${projects_icon[i]}"></i></div>
    <br>
    <h3>${projects[i]}</h3>
    <br>
    <p>${projectsDescriptions[i]}</p>
    <br>
  </a>
`;
  }
  projects_container.innerHTML = project_card;

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