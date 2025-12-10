import { authHeaders } from "../utils/api.js";

const PROFILE_BASE = "https://v2.api.noroff.dev/auction/profiles";

export async function getProfile(username) {
    try {
        const response = await fetch(`${PROFILE_BASE}/${username}`, {
            headers: authHeaders(), 
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.errors?.[0]?.message || "Failed to fetch profile");
        }

        return result.data;
    } catch (error) {
        console.error("Profile fetch error:", error);
        throw error;
    }
}

export async function getUserListings(username) {
    try {
        const response = await fetch(
            `${PROFILE_BASE}/${username}/listings?_bids=true`,
            { headers: authHeaders() } // FIXED
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.errors?.[0]?.message || "Failed to fetch user listings");
        }

        return result.data;
    } catch (error) {
        console.error("User listings error:", error);
        throw error;
    }
}

export async function getUserBids(username) {
    try {
        const response = await fetch(
            `${PROFILE_BASE}/${username}/bids?_listings=true`,
            { headers: authHeaders() } 
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.errors?.[0]?.message || "Failed to fetch user bids");
        }

        return result.data;
    } catch (error) {
        console.error("User bids error:", error);
        throw error;
    }
}

