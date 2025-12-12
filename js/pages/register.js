import { registerUser, loginUser } from "../api/auth.js";
import { setupNavbar } from "../utils/navbar.js";

setupNavbar();

const form = document.getElementById("register-form");
const nameInput = document.getElementById("register-name");
const emailInput = document.getElementById("register-email");
const passwordInput = document.getElementById("register-password");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (name.length < 3) {
        return alert("Username must be at least 3 characters.");
    }

    if (!email.endsWith("@stud.noroff.no")) {
        return alert("Email must end with @stud.noroff.no");
    }

    if (password.length < 6) {
        return alert("Password must be at least 6 characters.");
    }

    try {
        await registerUser(name, email, password);

        alert("Account created successfully! Logging you in...");

        await loginUser(email, password);

        window.location.href = "/pages/login.html";

    } catch (error) {
        alert(`Registration failed:\n${error.message}`);
    }
});


