import { getStoredToken } from "./storage.js";

export function authHeaders() {
    const token = getStoredToken();

    return {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
    };
}