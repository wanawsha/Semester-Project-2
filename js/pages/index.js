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

    if (!showActiveBidsOnly) {
        listings.forEach((listing) => {
            const card = createListingCard(listing);
            listingsContainer.appendChild(card);
        });
    }

    currentPage++;
}

function renderListings(listings) {
    listingsContainer.innerHTML = "";

    if (listings.length === 0) {
        listingsContainer.innerHTML = "<p>No listings found.</p>";
        return;
    }

    listings.forEach((listing) => {
        const card = createListingCard(listing);
        listingsContainer.appendChild(card);
    });
}

function getActiveBidListings() {
    const now = new Date();

    return allListings.filter((listing) => {
        const isActive = new Date(listing.endsAt) > now;
        const hasBids = listing.bids && listing.bids.length > 0;

        return isActive && hasBids;
    });
}


searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    const filtered = allListings.filter((listing) =>
        listing.title.toLowerCase().includes(query)
    );

    renderListings(filtered);
});

activeBidsToggle.addEventListener("change", () => {
    showActiveBidsOnly = activeBidsToggle.checked;

    if (showActiveBidsOnly) {
        renderListings(getActiveBidListings());
        loadMoreBtn.classList.add("hidden");
    } else {
        renderListings(allListings);
        loadMoreBtn.classList.remove("hidden");
    }
});

loadMoreBtn.addEventListener("click", () => {
    loadListings();
});

loadListings(true);

