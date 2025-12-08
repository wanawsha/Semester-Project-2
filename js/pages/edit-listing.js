import { getListingById } from "../api/listings.js";
import { getStoredUser } from "../utils/storage.js";
import { authHeaders } from "../utils/api.js";
import { setupNavbar } from "../utils/navbar.js";

setupNavbar();

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const form = document.getElementById("edit-listing-form");

const titleInput = document.getElementById("edit-title");
const descriptionInput = document.getElementById("edit-description");
const endDateInput = document.getElementById("edit-end-date");
const mediaInput = document.getElementById("edit-media");

const user = getStoredUser();

if (!user) {
    alert("You must be logged in to edit a listing.");
    window.location.href = "./login.html";
}

async function loadListing() {
    const listing = await getListingById(id);

    if (!listing) {
        alert("Listing not found.");
        window.location.href = "../index.html";
        return;
    }

    if (listing.seller.name !== user.name) {
        alert("You cannot edit someone else's listing.");
        window.location.href = `./listing.html?id=${id}`;
        return;
    }

    titleInput.value = listing.title;
    descriptionInput.value = listing.description || "";
    endDateInput.value = new Date(listing.endsAt).toISOString().slice(0, 16);
    mediaInput.value = listing.media?.join(", ") || "";
}

async function updateListing(e) {
    e.preventDefault();

    const updatedListing = {
        title: titleInput.value.trim(),
        description: descriptionInput.value.trim(),
        endsAt: new Date(endDateInput.value).toISOString(),
        media: mediaInput.value
            .split(",")
            .map(url => url.trim())
            .filter(url => url.length > 0),
    };

    if (!updatedListing.title || !updatedListing.description) {
        alert("Please fill in all fields.");
        return;
    }

    if (new Date(updatedListing.endsAt) <= new Date()) {
        alert("End date must be in the future.");
        return;
    }

    try {
        const response = await fetch(
            `https://v2.api.noroff.dev/auction/listings/${id}`,
            {
                method: "PUT",
                headers: authHeaders(),
                body: JSON.stringify(updatedListing),
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.errors?.[0]?.message || "Update failed");
        }

        alert("Listing updated successfully!");
        window.location.href = `./listing.html?id=${id}`;

    } catch (error) {
        alert("Error: " + error.message);
    }
}

form.addEventListener("submit", updateListing);

loadListing();

