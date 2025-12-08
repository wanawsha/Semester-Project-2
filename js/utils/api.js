import { getStoredToken } from "./storage.js";

export function authHeaders() {
    const token = getStoredToken();

    const headers = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
}

export function jsonHeaders() {
    return {
        "Content-Type": "application/json",
    };
}
