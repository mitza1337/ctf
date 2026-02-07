(function () {
  const menuBtn = document.getElementById("menuBtn");
  const siteNav = document.getElementById("siteNav");

  if (menuBtn && siteNav) {
    menuBtn.addEventListener("click", () => {
      siteNav.classList.toggle("open");
    });
  }

  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));

  document.querySelectorAll("pre").forEach((pre) => {
    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.type = "button";
    btn.textContent = "Copy";

    btn.addEventListener("click", async () => {
      const code = pre.querySelector("code");
      const value = code ? code.innerText : pre.innerText;
      try {
        await navigator.clipboard.writeText(value);
        btn.textContent = "Copied";
      } catch (_err) {
        btn.textContent = "Failed";
      }
      setTimeout(() => {
        btn.textContent = "Copy";
      }, 1200);
    });

    pre.appendChild(btn);
  });
})();
