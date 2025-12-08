import { getStoredUser, getStoredCredits, logout } from "./storage.js";

export function setupNavbar() {
    const creditsEl = document.getElementById("nav-credits");
    const logoutBtn = document.getElementById("logout-btn");

    const loginLink = document.getElementById("nav-login");
    const registerLink = document.getElementById("nav-register");

    const user = getStoredUser();

    if (!user) {
        if (creditsEl) creditsEl.hidden = true;
        if (logoutBtn) logoutBtn.hidden = true;

        if (loginLink) loginLink.hidden = false;
        if (registerLink) registerLink.hidden = false;
        return;
    }

    const credits = getStoredCredits() || 0;
    if (creditsEl) {
        creditsEl.hidden = false;
        creditsEl.textContent = `${credits} Credits`;
    }

    if (loginLink) loginLink.hidden = true;
    if (registerLink) registerLink.hidden = true;

    if (logoutBtn) {
        logoutBtn.hidden = false;
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            logout();
        });
    }
}

