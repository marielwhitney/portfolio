function initProjectCarousels() {
  document
    .querySelectorAll(".project-carousel .project")
    .forEach((project) => {
      const bg = project.dataset.bg;
      if (bg) {
        project.style.backgroundImage = `url(${bg})`;
      }
    });
}

function initZoomSection() {
  const section = document.getElementById("zoom");
  if (!section) return;

  const root = document.documentElement;
  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
  const lerp = (a, b, t) => a + (b - a) * t;

  function onScroll() {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = section.offsetHeight - vh;
    const scrolled = clamp(-rect.top, 0, total);
    const t = total > 0 ? scrolled / total : 0;

    const tWord = clamp(t / 0.65, 0, 1);
    const wordScale = lerp(1, 8.0, tWord);

    const tReveal = clamp((t - 0.15) / 0.55, 0, 1);
    const wordAlpha = lerp(1, 0, tReveal);
    const bgAlpha = lerp(0, 1, tReveal);
    const bgScale = lerp(1.12, 1.0, tReveal);

    root.style.setProperty("--wordScale", wordScale.toFixed(4));
    root.style.setProperty("--wordAlpha", wordAlpha.toFixed(4));
    root.style.setProperty("--bgAlpha", bgAlpha.toFixed(4));
    root.style.setProperty("--bgScale", bgScale.toFixed(4));
  }

  let ticking = false;
  function requestTick() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
    }
  }

  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
}

function initLaunchCompare() {
  document.querySelectorAll(".launch-compare").forEach((compare) => {
    const range = compare.querySelector(".launch-compare__range");
    if (!range) return;

    const updateCompare = () => {
      compare.style.setProperty("--compare-pos", `${range.value}%`);
    };

    range.addEventListener("input", updateCompare);
    updateCompare();
  });
}

function initPageScripts() {
  initProjectCarousels();
  initZoomSection();
  initLaunchCompare();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPageScripts);
} else {
  initPageScripts();
}
