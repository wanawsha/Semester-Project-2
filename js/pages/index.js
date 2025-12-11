import { getAllListings } from "../api/listings.js";
import { createListingCard } from "../components/listingCard.js";
import { setupNavbar } from "../utils/navbar.js";

setupNavbar();

const listingsContainer = document.getElementById("listings-container");
const searchInput = document.getElementById("search-input");
const loadMoreBtn = document.getElementById("load-more");

let currentPage = 1;
const LIMIT = 21;
let hasMore = true;

let allListings = [];

async function loadListings(reset = false) {

    if (reset) {
        currentPage = 1;
        hasMore = true;
        allListings = [];
        listingsContainer.innerHTML = "";
        loadMoreBtn.classList.remove("hidden");
    }

    if (!hasMore) return;

    const result = await getAllListings({
        page: currentPage,
        limit: LIMIT,
    });

    const listings = result.data;

    if (!listings || listings.length === 0) {
        hasMore = false;
        loadMoreBtn.classList.add("hidden");
        return;
    }

    allListings = [...allListings, ...listings];

    listings.forEach((listing) => {
        const card = createListingCard(listing);
        listingsContainer.appendChild(card);
    });

    currentPage++;
}

function renderListings(listings) {
    listingsContainer.innerHTML = "";

    if (listings.length === 0) {
        listingsContainer.innerHTML = "<p>No listings match your search.</p>";
        return;
    }

    listings.forEach((listing) => {
        const card = createListingCard(listing);
        listingsContainer.appendChild(card);
    });
    }

    searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    const filtered = allListings.filter((listing) =>
        listing.title.toLowerCase().includes(query)
    );

    renderListings(filtered);
    });

    loadMoreBtn.addEventListener("click", () => {
    loadListings();
});

loadListings(true);


