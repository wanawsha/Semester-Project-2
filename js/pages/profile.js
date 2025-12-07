import { getStoredUser } from "../utils/storage.js";
import { setupNavbar } from "../utils/navbar.js";
import { getProfile, getUserListings } from "../api/profileApi.js";

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
}


async function loadProfile() {
    try {
        const profile = await getProfile(user.name);

        // Fill UI
        nameEl.textContent = profile.name;
        emailEl.textContent = profile.email;
        bioEl.textContent = profile.bio || "No bio yet.";
        creditsEl.textContent = `${profile.credits} Credits`;

        // Avatar & banner
        avatarEl.style.backgroundImage = `url('${profile.avatar || ""}')`;
        bannerEl.style.backgroundImage = `url('${profile.banner || ""}')`;

        loadMyListings(profile.name);
        loadMyBids(profile.name);

    } catch (error) {
        console.error(error);
        alert("Could not load profile: " + error.message);
    }
}


async function loadMyListings(username) {
    try {
        const listings = await getUserListings(username);

        if (listings.length === 0) {
            myListingsContainer.innerHTML = "<p>You haven't created any listings yet.</p>";
            return;
        }

        listings.forEach(listing => {
            const card = document.createElement("a");
            card.href = `./listing.html?id=${listing.id}`;
            card.classList.add("profile-listing-card");

            card.innerHTML = `
                <div class="profile-listing-image" 
                     style="background-image:url('${listing.media?.[0] || ""}')"></div>
                <h3>${listing.title}</h3>
            `;

            myListingsContainer.appendChild(card);
        });

    } catch (error) {
        myListingsContainer.innerHTML = "<p>Error loading your listings.</p>";
    }
}

async function loadMyBids(username) {
    try {
        const allListingsResponse = await fetch(`https://v2.api.noroff.dev/auction/listings?_bids=true`);
        const result = await allListingsResponse.json();

        if (!allListingsResponse.ok) {
            throw new Error(result.errors?.[0]?.message || "Failed to fetch all listings");
        }

        const listings = result.data;

        const myBids = listings.filter(listing =>
            listing.bids?.some(bid => bid.bidderName === username)
        );

        if (myBids.length === 0) {
            myBidsContainer.innerHTML = "<p>You haven't placed any bids yet.</p>";
            return;
        }

        myBids.forEach(listing => {
            const highestBid = listing.bids.length
                ? Math.max(...listing.bids.map(b => b.amount))
                : 0;

            const card = document.createElement("a");
            card.href = `./listing.html?id=${listing.id}`;
            card.classList.add("profile-bid-card");

            card.innerHTML = `
                <h3>${listing.title}</h3>
                <p>Your bid is in this auction</p>
                <p>Current highest bid: ${highestBid} Credits</p>
            `;

            myBidsContainer.appendChild(card);
        });

    } catch (error) {
        myBidsContainer.innerHTML = "<p>Error loading your bids.</p>";
    }
}


loadProfile();
