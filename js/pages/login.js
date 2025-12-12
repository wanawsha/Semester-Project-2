import { loginUser } from "../api/auth.js";
import { setupNavbar } from "../utils/navbar.js";

setupNavbar();

const form = document.getElementById("login-form");
const emailInput = document.getElementById("login-email");
const passwordInput = document.getElementById("login-password");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email.endsWith("@stud.noroff.no")) {
        alert("Email must end with @stud.noroff.no");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    try {
        const user = await loginUser(email, password);

        alert(`Welcome back, ${user.name}!`);

        window.location.href = "./profile.html";

    } catch (error) {
        alert("Login failed: " + error.message);
    }
});


