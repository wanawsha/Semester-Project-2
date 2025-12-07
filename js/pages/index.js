import { getAllListings } from "../api/listings.js";
import { createListingCard } from "../components/listingCard.js";

const listingsContainer = document.getElementById("listings-container");

async function loadListings() {
    const listings = await getAllListings();

    listingsContainer.innerHTML = "";

    listings.forEach(listing => {
        const card = createListingCard(listing);
        listingsContainer.appendChild(card);
    });
}

loadListings();