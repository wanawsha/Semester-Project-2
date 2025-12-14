import { getAllListings } from "../api/listings.js";
import { createListingCard } from "../components/listingCard.js";
import { setupNavbar } from "../utils/navbar.js";

setupNavbar();

const listingsContainer = document.getElementById("listings-container");
const searchInput = document.getElementById("search-input");
const loadMoreBtn = document.getElementById("load-more");
const activeBidsToggle = document.getElementById("active-bids-toggle");

let currentPage = 1;
const LIMIT = 21;
let hasMore = true;

let allListings = [];
let showActiveBidsOnly = false;
let isSearching = false;

async function loadListings(reset = false) {
    if (isSearching) return;

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

    allListings.push(...listings);

    renderListings(
        showActiveBidsOnly ? getActiveBidListings() : allListings
    );

    currentPage++;
}

let searchTimeout;

async function searchListings(query) {
    const result = await getAllListings({
        search: query,
        limit: 100,
    });

    const listings = result.data || [];

    renderListings(
        showActiveBidsOnly ? filterActiveBids(listings) : listings
    );
}

searchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);

    const query = searchInput.value.trim();

    if (!query) {
        isSearching = false;
        renderListings(
            showActiveBidsOnly ? getActiveBidListings() : allListings
        );
        loadMoreBtn.classList.remove("hidden");
        return;
    }

    isSearching = true;
    loadMoreBtn.classList.add("hidden");

    searchTimeout = setTimeout(() => {
        searchListings(query);
    }, 300);
});

function getActiveBidListings() {
    return filterActiveBids(allListings);
}

function filterActiveBids(listings) {
    const now = new Date();

    return listings.filter((listing) => {
        const isActive = new Date(listing.endsAt) > now;
        const hasBids = listing.bids?.length > 0;
        return isActive && hasBids;
    });
}

activeBidsToggle.addEventListener("change", () => {
    showActiveBidsOnly = activeBidsToggle.checked;

    if (isSearching) {
        const query = searchInput.value.trim();
        if (query) {
            searchListings(query);
        }
        return;
    }

    renderListings(
        showActiveBidsOnly ? getActiveBidListings() : allListings
    );

    loadMoreBtn.classList.toggle("hidden", showActiveBidsOnly);
});


function renderListings(listings) {
    listingsContainer.innerHTML = "";

    if (!listings.length) {
        listingsContainer.innerHTML = "<p>No listings found.</p>";
        return;
    }

    listings.forEach((listing) => {
        listingsContainer.appendChild(createListingCard(listing));
    });
}

loadMoreBtn.addEventListener("click", () => {
    loadListings();
});

loadListings(true);
