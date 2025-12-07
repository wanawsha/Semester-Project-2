import { authHeaders } from "../utils/api.js";

const PROFILE_BASE = "https://v2.api.noroff.dev/auction/profiles";

export async function getProfile(username) {
    const response = await fetch(`${PROFILE_BASE}/${username}`, {
        headers: authHeaders(),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.errors?.[0]?.message || "Failed to fetch profile");
    }

    return result.data;
}

export async function getUserListings(username) {
    const response = await fetch(`${PROFILE_BASE}/${username}/listings`, {
        headers: authHeaders(),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.errors?.[0]?.message || "Failed to fetch user listings");
    }

    return result.data;
}
