
// =========================================
// 01. WEBSITE INITIALIZATION
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation();
});


// =========================================
// 02. ACTIVE NAVIGATION
// =========================================

function initializeNavigation() {
  const navigationLinks = document.querySelectorAll(
      '.navbar nav a[href^="#"]'
  );

  const sections = document.querySelectorAll(
      "main section[id]"
  );

  if (!navigationLinks.length || !sections.length) {
    return;
  }

  const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
                (a, b) =>
                    b.intersectionRatio - a.intersectionRatio
            );

        if (!visibleSections.length) {
          return;
        }

        const currentId = visibleSections[0].target.id;

        navigationLinks.forEach((link) => {
          const isActive =
              link.getAttribute("href") === `#${currentId}`;

          if (isActive) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      },
      {
        rootMargin: "-15% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75],
      }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}
