import { deleteListing } from "../api/listings.js";
import { getStoredUser } from "../utils/storage.js";

export function createProfileCard(listing) {
    const card = document.createElement("div");
    card.className = "flex flex-col bg-white rounded-md shadow-md p-6 h-full";

    const imgWrap = document.createElement("div");
    imgWrap.className = "w-full h-48 rounded-md bg-grayMain bg-center bg-cover";

    const firstImage =
        listing.media?.length && listing.media[0].url
        ? listing.media[0].url
        : listing.media?.[0] || "https://via.placeholder.com/300?text=No+Image";

    imgWrap.style.backgroundImage = `url('${firstImage}')`;
    card.appendChild(imgWrap);

    const title = document.createElement("h3");
    title.className = "mt-6 font-heading text-xl text-dark";
    title.textContent = listing.title;
    card.appendChild(title);

    const seller = document.createElement("p");
    seller.className = "text-subtext text-sm mt-1";

    const currentUser = getStoredUser();
    seller.textContent = "Created by me";
    seller.classList.add("italic");
    card.appendChild(seller);

    const desc = document.createElement("p");
    desc.className = "text-subtext text-sm mt-4";
    const raw = String(listing.description || "");
    desc.textContent = raw.length > 80 ? raw.slice(0, 80) + "..." : raw;
    card.appendChild(desc);

    const highestBid = listing.bids?.length
        ? Math.max(...listing.bids.map((b) => b.amount))
        : 0;

    const price = document.createElement("p");
    price.className = "text-accent font-heading text-xl mt-6";
    price.textContent = `${highestBid} Credits`;
    card.appendChild(price);

    const btnRow = document.createElement("div");
    btnRow.className = "flex gap-4 mt-6";

    const editBtn = document.createElement("a");
    editBtn.href = `/pages/edit-listing.html?id=${listing.id}`;
    editBtn.textContent = "EDIT LISTING";
    editBtn.className ="flex-1 bg-primary text-white font-heading text-sm tracking-wider py-3 rounded-md text-center hover:opacity-90 transition";

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button"; 
    deleteBtn.textContent = "DELETE";
    deleteBtn.dataset.id = listing.id;
    deleteBtn.className =
    "flex-1 bg-delete text-white font-heading text-sm tracking-wider py-3 rounded-md hover:opacity-80 transition";

    deleteBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation(); 

        const confirmed = confirm("Are you sure you want to delete this listing?");
        if (!confirmed) return;

        const success = await deleteListing(listing.id);

        if (success) {
            card.remove();
        } else {
            alert("Failed to delete listing.");
        }
    });

    btnRow.append(editBtn, deleteBtn);
    card.appendChild(btnRow);

    const viewBtn = document.createElement("a");
    viewBtn.href = `/pages/listing.html?id=${listing.id}`;
    viewBtn.textContent = "VIEW DETAILS";
    viewBtn.className ="mt-4 w-full bg-button text-white font-heading text-sm tracking-wider py-4 rounded-md text-center hover:opacity-80 transition";

    card.appendChild(viewBtn);

    return card;
}



