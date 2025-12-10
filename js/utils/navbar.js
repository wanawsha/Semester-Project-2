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
        });
    }
}




