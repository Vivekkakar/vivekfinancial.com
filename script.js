(() => {
  const $ = (sel, root = document) => root.querySelector(sel);

  // Footer year
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Header shadow on scroll
  const header = $(".header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const menuBtn = $(".menu-btn");
  const nav = $("#primary-nav");
  if (menuBtn && nav) {
    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
    };

    menuBtn.addEventListener("click", () => {
      setOpen(!nav.classList.contains("is-open"));
    });

    nav.addEventListener("click", (e) => {
      if (e.target && e.target.closest("a")) setOpen(false);
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });

    document.addEventListener("click", (e) => {
      const inside = nav.contains(e.target) || menuBtn.contains(e.target);
      if (!inside) setOpen(false);
    });
  }

  // Reveal on scroll
  const reveals = Array.from(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        }
      },
      { threshold: 0.14 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }
})();
