import { storeUser, storeToken, storeCredits } from "../utils/storage.js";

const AUTH_BASE = "https://v2.api.noroff.dev/auth";
const PROFILE_BASE = "https://v2.api.noroff.dev/auction/profiles";


export async function registerUser(name, email, password) {
    if (!email.endsWith("@stud.noroff.no")) {
        throw new Error("Email must end with @stud.noroff.no");
    }

    const body = JSON.stringify({ name, email, password });

    try {
        const response = await fetch(`${AUTH_BASE}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.errors?.[0]?.message || "Registration failed");
        }

        return data.data;
    } catch (error) {
        throw new Error(error.message || "Something went wrong during registration");
    }
}

export async function loginUser(email, password) {
    const body = JSON.stringify({ email, password });

    try {
        const response = await fetch(`${AUTH_BASE}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.errors?.[0]?.message || "Login failed");
        }

        const token = data.data.accessToken;
        storeToken(token);

        const profile = await fetchUserProfile(data.data.name);

        storeUser(profile);
        storeCredits(profile.credits);

        return profile;
    } catch (error) {
        throw new Error(error.message || "Something went wrong during login");
    }
}

export async function fetchUserProfile(username) {
    try {
        const response = await fetch(`${PROFILE_BASE}/${username}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.errors?.[0]?.message || "Could not fetch profile");
        }

        return data.data;
    } catch (error) {
        throw new Error(error.message || "Profile fetch error");
    }
}
