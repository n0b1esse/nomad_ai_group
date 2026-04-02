const revealElements = document.querySelectorAll(".hidden");
const header = document.querySelector(".site-header");
const magneticButtons = document.querySelectorAll(".magnetic");
const contactForm = document.querySelector("#contact-form");

if (revealElements.length) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          entry.target.classList.remove("hidden");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}

if (header) {
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

magneticButtons.forEach((button) => {
  let isHovering = false;

  button.addEventListener("mouseenter", () => {
    isHovering = true;
  });

  button.addEventListener("mouseleave", () => {
    isHovering = false;
    button.style.transform = "translate3d(0, 0, 0)";
  });

  button.addEventListener("mousemove", (event) => {
    if (!isHovering) return;

    const rect = button.getBoundingClientRect();
    const relX = event.clientX - rect.left - rect.width / 2;
    const relY = event.clientY - rect.top - rect.height / 2;
    const moveX = relX * 0.12;
    const moveY = relY * 0.18;

    button.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
  });
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitWrap = contactForm.querySelector(".submit-wrap");
    const submitButton = contactForm.querySelector('button[type="submit"]');

    if (!submitWrap || !submitButton) return;
    submitWrap.classList.add("loading");
    submitButton.disabled = true;

    setTimeout(() => {
      submitWrap.classList.remove("loading");
      submitButton.disabled = false;
      contactForm.reset();
    }, 1400);
  });
}
