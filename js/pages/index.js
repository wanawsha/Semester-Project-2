import { getAllListings } from "../api/listings.js";
import { createListingCard } from "../components/listingCard.js";
import { setupNavbar } from "../utils/navbar.js";

setupNavbar();

const listingsContainer = document.getElementById("listings-container");
const searchInput = document.getElementById("search-input");

let allListings = [];

async function loadListings() {
    listingsContainer.innerHTML = "<p>Loading listings...</p>";

    allListings = await getAllListings();

    if (!allListings || allListings.length === 0) {
        listingsContainer.innerHTML = "<p>No listings available.</p>";
        return;
    }

    renderListings(allListings);
}

function renderListings(listings) {
    listingsContainer.innerHTML = "";

    if (listings.length === 0) {
        listingsContainer.innerHTML = "<p>No listings match your search.</p>";
        return;
    }

    listings.forEach(listing => {
        const card = createListingCard(listing);
        listingsContainer.appendChild(card);
    });
}

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    const filtered = allListings.filter(listing =>
        listing.title.toLowerCase().includes(query)
    );

    renderListings(filtered);
});

loadListings();

