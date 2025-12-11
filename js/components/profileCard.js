export function createProfileCard(listing) {
    const card = document.createElement("div");
    card.className = "flex flex-col bg-white rounded-md shadow-md p-6 h-full";

    // IMAGE — EXACT SAME AS INDEX
    const imgWrap = document.createElement("div");
    imgWrap.className = "w-full h-48 rounded-md bg-grayMain bg-center bg-cover";

    const firstImage =
        listing.media?.length && listing.media[0].url
            ? listing.media[0].url
            : listing.media?.[0] || "https://via.placeholder.com/300?text=No+Image";

    imgWrap.style.backgroundImage = `url('${firstImage}')`;
    card.appendChild(imgWrap);

    // TITLE — SAME AS INDEX
    const title = document.createElement("h3");
    title.className = "mt-6 font-heading text-xl text-dark";
    title.textContent = listing.title;
    card.appendChild(title);

    // SELLER — SAME AS INDEX
    const seller = document.createElement("p");
    seller.className = "text-subtext text-sm mt-1";
    seller.textContent = `By ${listing.seller?.name || "Unknown"}`;
    card.appendChild(seller);

    // DESCRIPTION — SAME TRUNCATION AS INDEX
    const desc = document.createElement("p");
    desc.className = "text-subtext text-sm mt-4";
    const raw = String(listing.description || "");
    desc.textContent = raw.length > 80 ? raw.slice(0, 80) + "..." : raw;
    card.appendChild(desc);

    // PRICE — SAME STYLE AS INDEX
    const highestBid = listing.bids?.length
        ? Math.max(...listing.bids.map(b => b.amount))
        : 0;

    const price = document.createElement("p");
    price.className = "text-accent font-heading text-xl mt-6";
    price.textContent = `${highestBid} Credits`;
    card.appendChild(price);

    // BUTTON ROW (kept minimal to not distort layout)
    const btnRow = document.createElement("div");
    btnRow.className = "flex justify-between items-center mt-4";

    const editBtn = document.createElement("a");
    editBtn.href = `/pages/edit-listing.html?id=${listing.id}`;
    editBtn.textContent = "EDIT";
    editBtn.className =
        "bg-primary text-white text-xs px-3 py-1 rounded hover:opacity-90 transition";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "DELETE";
    deleteBtn.dataset.id = listing.id;
    deleteBtn.className =
        "bg-delete text-dark text-xs px-3 py-1 rounded hover:opacity-90 transition";

    btnRow.appendChild(editBtn);
    btnRow.appendChild(deleteBtn);
    card.appendChild(btnRow);

    const viewBtn = document.createElement("a");
    viewBtn.href = `/pages/listing.html?id=${listing.id}`;
    viewBtn.textContent = "VIEW DETAILS";
    viewBtn.className =
        "block mt-4 w-full text-center bg-button text-white py-3 rounded-md font-heading hover:opacity-80 transition";

    card.appendChild(viewBtn);

    return card;
}


