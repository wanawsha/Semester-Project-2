import { getStoredUser, getStoredCredits, logout } from "./storage.js";

export function setupNavbar() {
    const user = getStoredUser();

    const loginLink = document.getElementById("login-link");
    const registerLink = document.getElementById("register-link");
    const profileLink = document.getElementById("profile-link");
    const logoutBtn = document.getElementById("logout-btn");
    const createLink = document.getElementById("create-link");
    const creditsEl = document.getElementById("nav-credits");

    if (createLink) {
        createLink.classList.remove("hidden"); 

        if (user) {
            createLink.href = "./pages/create.html";  
        } else {
            createLink.href = "./pages/login.html";   
        }
    }

    if (!user) {
        loginLink.classList.remove("hidden");
        registerLink.classList.remove("hidden");

        profileLink.classList.add("hidden");
        logoutBtn.classList.add("hidden");
        creditsEl.classList.add("hidden");

        return;
    }

    loginLink.classList.add("hidden");
    registerLink.classList.add("hidden");

    profileLink.classList.remove("hidden");
    logoutBtn.classList.remove("hidden");

    creditsEl.textContent = `${getStoredCredits() || 0} Credits`;
    creditsEl.classList.remove("hidden");

    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        logout();
    });
}



