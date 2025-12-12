import { getStoredUser } from "../utils/storage.js";
import { setupNavbar } from "../utils/navbar.js";
import { getProfile, getUserListings } from "../api/profileApi.js";
import { createProfileCard } from "../components/profileCard.js";
import { createUserBidCard } from "../components/listingCard.js";

setupNavbar();

const nameEl = document.getElementById("profile-name");
const emailEl = document.getElementById("profile-email");
const bioEl = document.getElementById("profile-bio");
const creditsEl = document.getElementById("profile-credits");
const avatarEl = document.getElementById("profile-avatar");
const bannerEl = document.getElementById("profile-banner");

const myListingsContainer = document.getElementById("my-listings-container");
const myBidsContainer = document.getElementById("my-bids-container");

const user = getStoredUser();

if (!user) {
    window.location.href = "./login.html";
} else {
    loadProfile();
}


async function loadProfile() {
    try {
        const profile = await getProfile(user.name);

        nameEl.textContent = profile.name;
        emailEl.textContent = profile.email;
        bioEl.textContent = profile.bio || "No bio yet.";
        creditsEl.textContent = `${profile.credits} Credits`;

        const avatarUrl =
            typeof profile.avatar === "string"
                ? profile.avatar
                : profile.avatar?.url;

        avatarEl.style.backgroundImage = `url('${
            avatarUrl || "../images/profileImg-placeholder.jpeg"
        }')`;


        bannerEl.style.backgroundImage = `url('${
            profile.banner?.url || "/images/banner-placeholder.jpg"
        }')`;

        loadMyListings(profile.name);
        loadMyBids(profile.name);

    } catch (error) {
        alert("Could not load profile: " + error.message);
    }
}


async function loadMyListings(username) {
    try {
        const listings = await getUserListings(username);

        if (!listings.length) {
            myListingsContainer.innerHTML = "<p>You haven't created any listings yet.</p>";
            return;
        }

        myListingsContainer.innerHTML = "";

        listings.forEach(listing => {
            const card = createProfileCard(listing);
            myListingsContainer.appendChild(card);
        });

    } catch {
        myListingsContainer.innerHTML = "<p>Error loading your listings.</p>";
    }
}

async function loadMyBids(username) {
    try {
        const response = await fetch(
            "https://v2.api.noroff.dev/auction/listings?_bids=true&_seller=true"
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.errors?.[0]?.message || "Failed to fetch listings");
        }

        const listings = result.data;

        const myBids = listings.filter(listing =>
            listing.bids?.some(bid => bid.bidder?.name === username)
        );

        if (!myBids.length) {
            myBidsContainer.innerHTML = "<p>You haven't placed any bids yet.</p>";
            return;
        }

        myBidsContainer.innerHTML = "";

        myBids.forEach(listing => {
            const userBid = listing.bids.find(b => b.bidder?.name === username);

            const card = createUserBidCard({
                listing,
                amount: userBid.amount,
            });

            myBidsContainer.appendChild(card);
        });

    } catch {
        myBidsContainer.innerHTML = "<p>Error loading your bids.</p>";
    }
}

document.addEventListener("click", async (e) => {
    const btn = e.target.closest("button[data-id]");
    if (!btn) return;

    const id = btn.dataset.id;

    if (!confirm("Are you sure you want to delete this listing?")) return;

    try {
        const response = await fetch(
            `https://v2.api.noroff.dev/auction/listings/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${user.accessToken}`,
                    "Content-Type": "application/json",
                }
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete listing.");
        }

        btn.closest(".profile-listing-card")?.remove();

        alert("Listing deleted!");

    } catch (error) {
        alert(error.message);
    }
});




