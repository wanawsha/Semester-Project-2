import { getStoredUser, getStoredCredits, logout } from "./storage.js";

export function setupNavbar() {
    const user = getStoredUser();

    const loginLink = document.getElementById("login-link");
    const registerLink = document.getElementById("register-link");
    const profileLink = document.getElementById("profile-link");
    const logoutBtn = document.getElementById("logout-btn");
    const createLink = document.getElementById("create-link");
    const creditsEl = document.getElementById("nav-credits");

    const show = (el) => el && el.classList.remove("hidden");
    const hide = (el) => el && el.classList.add("hidden");

    if (!user) {
        hide(profileLink);
        hide(logoutBtn);
        show(createLink);
        show(loginLink);
        show(registerLink);
        hide(creditsEl);
        return;
    }

    hide(loginLink);
    hide(registerLink);
    show(profileLink);
    show(logoutBtn);
    show(createLink);

    if (creditsEl) {
        creditsEl.textContent = `${getStoredCredits() || 0} Credits`;
        show(creditsEl);
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            logout();

            window.location.href = "/pages/profile.html";
    
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuOverlay = document.getElementById("menu-overlay");
  const iconMenu = document.getElementById("icon-menu");
  const iconClose = document.getElementById("icon-close");

  if (!menuToggle || !mobileMenu || !menuOverlay) return;

  function openMenu() {
    mobileMenu.classList.remove("translate-x-full");
    menuOverlay.classList.remove("hidden");

    iconMenu?.classList.add("hidden");
    iconClose?.classList.remove("hidden");

    menuToggle.setAttribute("aria-expanded", "true");
    mobileMenu.setAttribute("aria-hidden", "false");
  }

  function closeMenu() {
    mobileMenu.classList.add("translate-x-full");
    menuOverlay.classList.add("hidden");

    iconMenu?.classList.remove("hidden");
    iconClose?.classList.add("hidden");

    menuToggle.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  menuOverlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });
});

window.addEventListener("load", () => {
    const loader = document.getElementById("page-loader");
    if (loader) {
        loader.classList.add("hidden");
    }
});
