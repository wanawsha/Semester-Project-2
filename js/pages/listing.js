import { getListingById } from "../api/listings.js";
import { getStoredUser, getStoredToken } from "../utils/storage.js";

const listingContainer = document.getElementById("single-listing-section");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadListing() {
    const listing = await getListingById(id);

    if (!listing) {
        listingContainer.innerHTML = "<p>Listing not found.</p>";
        return;
    }

    document.getElementById("listing-title").textContent = listing.title;

    document.getElementById("listing-seller").textContent =
        listing.seller?.name || "Unknown";

    document.getElementById("listing-end-date").textContent =
        "Ends at: " + new Date(listing.endsAt).toLocaleString();

    document.getElementById("listing-description").textContent =
        listing.description;

    const highestBid = listing.bids?.length
        ? Math.max(...listing.bids.map((b) => b.amount))
        : 0;

    document.getElementById("listing-highest-bid").textContent =
        `Highest Bid: ${highestBid} Credits`;

    const mainImageEl = document.getElementById("listing-main-image");
    const mainImage = listing.media?.length ? listing.media[0] : "";
    mainImageEl.style.backgroundImage = `url('${mainImage}')`;

    const galleryEl = document.getElementById("listing-gallery");
    galleryEl.innerHTML = "";

    listing.media?.forEach((img, i) => {
        const thumb = document.createElement("img");
        thumb.src = img;
        thumb.alt = `Image ${i + 1}`;
        thumb.addEventListener("click", () => {
            mainImageEl.style.backgroundImage = `url('${img}')`;
        });
        galleryEl.appendChild(thumb);
    });

    renderBidHistory(listing.bids);

    setupOwnerActions(listing);

    handleBidForm(listing);
}

function renderBidHistory(bids = []) {
    const bidHistoryEl = document.getElementById("bid-history");

    if (!bids.length) {
        bidHistoryEl.textContent = "No bids yet.";
        return;
    }

    bidHistoryEl.innerHTML = "";

    bids.sort((a, b) => b.amount - a.amount).forEach((bid) => {
        const el = document.createElement("p");
        el.textContent = `${bid.bidderName}: ${bid.amount} Credits`;
        bidHistoryEl.appendChild(el);
    });
}

function setupOwnerActions(listing) {
    const user = getStoredUser();
    if (!user) return;

    if (user.name === listing.seller.name) {
        const actionsEl = document.getElementById("listing-actions");

        actionsEl.innerHTML = `
            <a href="./edit-listing.html?id=${listing.id}">Edit Listing</a>
            <button id="delete-listing-btn">Delete Listing</button>
        `;
    }
}

function handleBidForm(listing) {
    const user = getStoredUser();
    const form = document.getElementById("place-bid-form");

    if (!user) {
        form.innerHTML = `<p>You must <a href="./login.html">log in</a> to place a bid.</p>`;
        return;
    }

    if (user.name === listing.seller.name) {
        form.innerHTML = `<p>You cannot bid on your own listing.</p>`;
        return;
    }
}

loadListing();
