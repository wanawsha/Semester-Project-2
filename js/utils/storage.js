const USER_KEY = "bidster_user";
const TOKEN_KEY = "bidster_token";
const CREDITS_KEY = "bidster_credits";

export function storeUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getStoredUser() {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
}

export function clearStoredUser() {
    localStorage.removeItem(USER_KEY);
}

export function storeToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function getStoredToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function clearStoredToken() {
    localStorage.removeItem(TOKEN_KEY);
}

export function storeCredits(credits) {
    localStorage.setItem(CREDITS_KEY, String(credits));
}

export function getStoredCredits() {
    const value = localStorage.getItem(CREDITS_KEY);
    return value ? Number(value) : 0;
}

export function logout() {
    clearStoredUser();
    clearStoredToken();
    localStorage.removeItem(CREDITS_KEY);

    window.location.href = "../index.html";
}

