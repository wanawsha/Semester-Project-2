import { getListingById } from "../api/listings.js";
import { getStoredUser } from "../utils/storage.js";
import { authHeaders } from "../utils/api.js";
import { setupNavbar } from "../utils/navbar.js";

setupNavbar();

const listingContainer = document.getElementById("single-listing-section");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");


async function loadListing() {
    console.log("bid history element:", document.getElementById("bid-history"));

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
        listing.description || "";

    const highestBid = listing.bids?.length
        ? Math.max(...listing.bids.map(b => b.amount))
        : 0;

    document.getElementById("listing-highest-bid").textContent =
        `${highestBid} Credits`;

    
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
                thumb.src = img;
                thumb.alt = `Image ${i + 1}`;
                thumb.className = "gallery-thumb";
                thumb.addEventListener("click", () => {
                    mainImageEl.style.backgroundImage = `url('${img}')`;
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

    if (!bids.length) {
        bidHistoryEl.innerHTML = `<p class="text-subtext">No bids yet.</p>`;
        return;
    }

    bidHistoryEl.innerHTML = "";

    bids
        .sort((a, b) => b.amount - a.amount)
        .forEach(bid => {
            const row = document.createElement("div");
            row.className =
                "grid grid-cols-3 bg-grayMain/20 rounded p-4 mb-3 text-sm font-body";

            const bidder = bid.bidder?.name || "Unknown";
            const date = new Date(bid.created).toLocaleDateString("en-GB");
            const amount = `${bid.amount} CREDITS`;

            row.innerHTML = `
                <span class="font-heading">${bidder}</span>
                <span class="text-subtext">${date}</span>
                <span class="text-accent font-heading text-right">${amount}</span>
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

        document.getElementById("delete-listing-btn")
            .addEventListener("click", () => deleteListing(listing.id));
    }
}

async function deleteListing(listingId) {
    const confirmDelete = confirm("Are you sure you want to delete this listing?");
    if (!confirmDelete) return;

    try {
        const response = await fetch(
            `https://v2.api.noroff.dev/auction/listings/${listingId}`,
            {
                method: "DELETE",
                headers: authHeaders(),
            }
        );

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.errors?.[0]?.message || "Delete failed");
        }

        alert("Listing deleted successfully.");
        window.location.href = "../index.html";
    } catch (error) {
        alert(error.message);
    }
}

function setupBidForm(listing) {
    const user = getStoredUser();
    const form = document.getElementById("place-bid-form");

    if (!user) {
        form.innerHTML = `
            <a href="./login.html"
            class="mx-auto block w-60 bg-primary text-white text-center py-2 rounded-md font-heading tracking-wide hover:opacity-90 transition">
                Log in to place a bid
            </a>
        `;
        return;
    }

    if (user.name === listing.seller.name) {
        form.innerHTML = `<p>You cannot bid on your own listing.</p>`;
        return;
    }

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

