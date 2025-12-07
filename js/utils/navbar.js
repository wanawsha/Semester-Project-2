import { getStoredUser, getStoredCredits, logout } from "./storage.js";

export function setupNavbar() {
    const creditsEl = document.getElementById("nav-credits");
    const logoutBtn = document.getElementById("logout-btn");

    const user = getStoredUser();

    if (!user) {
        if (creditsEl) creditsEl.style.display = "none";
        if (logoutBtn) logoutBtn.style.display = "none";
        return;
    }

    const credits = getStoredCredits() || 0;
    if (creditsEl) creditsEl.textContent = `${credits} Credits`;

    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            logout();
        });
    }
}
