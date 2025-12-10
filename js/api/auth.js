import { storeUser, storeToken, storeCredits } from "../utils/storage.js";

const AUTH_BASE = "https://v2.api.noroff.dev/auth";
const PROFILE_BASE = "https://v2.api.noroff.dev/auction/profiles";

const API_KEY = "f4cce5be-e6d9-480d-a9a1-1d87bb099c77"; 

export async function registerUser(name, email, password) {
    if (!email.endsWith("@stud.noroff.no")) {
        throw new Error("Email must end with @stud.noroff.no");
    }

    const body = JSON.stringify({ name, email, password });

    const response = await fetch(`${AUTH_BASE}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Noroff-API-Key": API_KEY,    
        },
        body,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.errors?.[0]?.message || "Registration failed");
    }

    return data.data;
}

export async function loginUser(email, password) {
    const body = JSON.stringify({ email, password });

    const response = await fetch(`${AUTH_BASE}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Noroff-API-Key": API_KEY, 
        },
        body,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.errors?.[0]?.message || "Login failed");
    }

    const token = data.data.accessToken;
    const username = data.data.name;

    storeToken(token);

    const profile = await fetchUserProfile(username, token);

    storeUser(profile);
    storeCredits(profile.credits);

    return profile;
}

export async function fetchUserProfile(username, token) {
    const response = await fetch(`${PROFILE_BASE}/${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "X-Noroff-API-Key": API_KEY,  
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.errors?.[0]?.message || "Could not fetch profile");
    }

    return data.data;
}
