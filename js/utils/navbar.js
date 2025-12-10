import { getStoredUser, getStoredCredits, logout } from "./storage.js";

export function setupNavbar() {
    const user = getStoredUser();

    const loginLink = document.getElementById("login-link");
    const registerLink = document.getElementById("register-link");
    const profileLink = document.getElementById("profile-link");
    const logoutBtn = document.getElementById("logout-btn");
    const createLink = document.getElementById("create-link");
    const creditsEl = document.getElementById("nav-credits");

    if (!user) {
        if (loginLink) loginLink.style.display = "inline";
        if (registerLink) registerLink.style.display = "inline";

        if (profileLink) profileLink.style.display = "none";
        if (logoutBtn) logoutBtn.style.display = "none";
        if (createLink) createLink.style.display = "none";
        if (creditsEl) creditsEl.style.display = "none";

        return;
    }

    if (loginLink) loginLink.style.display = "none";
    if (registerLink) registerLink.style.display = "none";

    if (profileLink) profileLink.style.display = "inline";
    if (logoutBtn) logoutBtn.style.display = "inline";
    if (createLink) createLink.style.display = "inline";

    const credits = getStoredCredits() || 0;

    if (creditsEl) {
        creditsEl.textContent = `${credits} Credits`;
        creditsEl.style.display = "inline";
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            logout();
        });
    }
}
