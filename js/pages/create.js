import { getStoredUser } from "../utils/storage.js";
import { setupNavbar } from "../utils/navbar.js";
import { authHeaders } from "../utils/api.js";

setupNavbar();

const form = document.getElementById("create-listing-form");
if (!form) return;
const titleInput = document.getElementById("listing-title");
const descriptionInput = document.getElementById("listing-description");
const endDateInput = document.getElementById("listing-end-date");
const mediaInput = document.getElementById("listing-media");

const user = getStoredUser();
if (!user) {
    alert("You must be logged in to create a listing.");
    window.location.href = "./login.html";
}

async function createListing(e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const endsAt = new Date(endDateInput.value).toISOString();

    if (!title || !description || !endDateInput.value) {
        alert("Please fill in all fields.");
        return;
    }

    if (new Date(endsAt) <= new Date()) {
        alert("End date must be in the future.");
        return;
    }

   const media = mediaInput.value
    .split(",")
    .map(url => url.trim())
    .filter(url => url.length > 0)
    .map(url => ({
        url: url,
        alt: "Listing image"
    }));

    const newListing = {
        title,
        description,
        endsAt,
        media,
    };

    try {
        const response = await fetch("https://v2.api.noroff.dev/auction/listings", {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify(newListing),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.errors?.[0]?.message || "Could not create listing");
        }

        alert("Listing created successfully!");

        window.location.href = `listing.html?id=${result.data.id}`;

    } catch (error) {
        alert("Error: " + error.message);
    }
}

form.addEventListener("submit", createListing);
