import { getStoredUser, storeCredits, storeUser } from "../utils/storage.js";
import { authHeaders } from "../utils/api.js";
import { setupNavbar } from "../utils/navbar.js";
import { getListingById, deleteListing } from "../api/listings.js";


setupNavbar();

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
        new Date(listing.endsAt).toLocaleString();
    document.getElementById("listing-description").textContent =
        listing.description || "";

    const highestBid = listing.bids?.length
        ? Math.max(...listing.bids.map(b => b.amount))
        : 0;

    document.getElementById("listing-highest-bid").innerHTML = `
    <span>Highest bid:</span>
    <span class="mx-2 text-accent font-heading text-lg">${highestBid}</span>
    <span">Credits</span>
    `;

    const mainImageEl = document.getElementById("listing-main-image");
    const mainImage =
        listing.media?.length && listing.media[0].url
            ? listing.media[0].url
            : "https://via.placeholder.com/400x300?text=No+Image";

    mainImageEl.style.backgroundImage = `url('${mainImage}')`;

    const galleryEl = document.getElementById("listing-gallery");

    if (galleryEl) {
        galleryEl.innerHTML = "";
        if (listing.media?.length > 1) {
            listing.media.forEach((img, i) => {
            const thumb = document.createElement("img");
            thumb.src = img.url;
            thumb.alt = img.alt || `Image ${i + 1}`;
            thumb.className = "gallery-thumb";

            thumb.addEventListener("click", () => {
                mainImageEl.style.backgroundImage = `url('${img.url}')`;
            });

            galleryEl.appendChild(thumb);
            });

        }
    }

    renderBidHistory(listing.bids);
    setupOwnerActions(listing);
    setupBidForm(listing);
}

function renderBidHistory(bids = []) {
    const bidHistoryEl = document.getElementById("bid-history");
    const currentUser = getStoredUser();

    if (!bids.length) {
        bidHistoryEl.innerHTML = `<p class="text-subtext">No bids yet.</p>`;
        return;
    }

    bidHistoryEl.innerHTML = "";

    bids
        .sort((a, b) => b.amount - a.amount)
        .forEach((bid) => {
            const isMyBid = currentUser && bid.bidder?.name === currentUser.name;

            const row = document.createElement("div");
            row.className = `
                grid grid-cols-3 rounded p-4 mb-3 text-sm font-body
                ${isMyBid ? "bg-primary/20 border border-primary" : "bg-grayMain/20"}
            `;

            row.innerHTML = `
                <span class="font-heading ${isMyBid ? "text-primary" : ""}">
                    ${bid.bidder?.name || "Unknown"}
                    ${isMyBid ? " (My bid)" : ""}
                </span>
                <span class="text-subtext">
                    ${new Date(bid.created).toLocaleDateString("en-GB")}
                </span>
                <span class="text-accent font-heading text-right">
                    ${bid.amount} CREDITS
                </span>
            `;

            bidHistoryEl.appendChild(row);
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

        document
            .getElementById("delete-listing-btn")
            .addEventListener("click", async () => {
            const success = await deleteListing(listing.id);
            if (success) {
                window.location.href = "/pages/profile.html";
            }
        });
    }
}

function setupBidForm(listing) {
    const user = getStoredUser();
    const form = document.getElementById("place-bid-form");

    form.classList.add("hidden");

    if (!user) {
        form.classList.remove("hidden");
        form.innerHTML = `
            <a href="./login.html"
               class="mx-auto block w-60 bg-primary text-white text-center py-2 rounded-md font-heading tracking-wide hover:opacity-90 transition">
                Log in to place a bid
            </a>
        `;
        return;
    }

    if (user.name === listing.seller.name) {
        return;
    }

    form.classList.remove("hidden");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const amount = Number(document.getElementById("bid-amount").value);
        if (amount < 1) {
            return alert("Bid must be at least 1 credit.");
        }

        try {
            const response = await fetch(
                `https://v2.api.noroff.dev/auction/listings/${listing.id}/bids`,
                {
                    method: "POST",
                    headers: authHeaders(),
                    body: JSON.stringify({ amount }),
                }
            );

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.errors?.[0]?.message || "Could not place bid");
            }

            alert("Bid placed successfully!");
            loadListing();
        } catch (error) {
            alert(error.message);
        }
    });
}

loadListing();


