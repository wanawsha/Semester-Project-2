import { getStoredToken } from "./storage.js";

const API_KEY = "f4cce5be-e6d9-480d-a9a1-1d87bb099c77";

export function authHeaders() {
    const token = getStoredToken();

    return {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "",
        "X-Noroff-API-Key": API_KEY,
    };
}

export function jsonHeaders() {
    return {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
    };
}
