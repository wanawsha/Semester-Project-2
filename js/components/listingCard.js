export function createListingCard(listing) {
    const card = document.createElement("div");
    card.className = "flex flex-col bg-white rounded-md shadow-md p-6 h-full overflow-hidden";

    const imgWrap = document.createElement("div");
    imgWrap.className = "w-full h-48 rounded-md bg-grayMain bg-center bg-cover";

    const firstImage =
        listing.media?.length && listing.media[0].url
            ? listing.media[0].url
            : "https://via.placeholder.com/300?text=No+Image";

    imgWrap.style.backgroundImage = `url('${firstImage}')`;
    card.appendChild(imgWrap);

    const title = document.createElement("h3");
    title.className = "mt-6 font-heading text-xl text-dark";
    title.textContent =
        listing.title.length > 20
            ? listing.title.slice(0, 20) + "..."
            : listing.title;
    card.appendChild(title);
 
    const seller = document.createElement("p");
    seller.className = "text-subtext text-sm mt-1 break-all";
    seller.textContent = `By ${listing.seller?.name || "Unknown"}`;
    card.appendChild(seller);

    const description = document.createElement("p");
    description.className = "text-subtext text-sm mt-3 line-clamp-2";
    description.textContent = listing.description;
    card.appendChild(description);

    const highestBid = listing.bids?.length
        ? Math.max(...listing.bids.map(b => b.amount))
        : 0;

    const price = document.createElement("p");
    price.className = "text-accent font-heading text-xl mt-6";
    price.textContent = `Highest Bid: ${highestBid} Credits`;
    card.appendChild(price);

    const bottom = document.createElement("div");
    bottom.className = "mt-auto pt-6";

    const btn = document.createElement("a");
    btn.href = "/pages/listing.html?id=" + listing.id; 
    btn.textContent = "VIEW DETAILS";
    btn.className ="block w-full bg-button text-white py-3 rounded-md text-center font-heading tracking-wide hover:opacity-80 transition";

    bottom.appendChild(btn);
    card.appendChild(bottom);

    return card;
}

export function createUserBidCard({ listing, amount }) {
    const card = document.createElement("div");
    card.className =
        "relative flex flex-col bg-white rounded-md shadow-md p-6 h-full overflow-hidden";

    const highestBid = listing.bids?.length
        ? Math.max(...listing.bids.map(b => b.amount))
        : 0;

    if (amount === highestBid) {
        const badge = document.createElement("div");
        badge.textContent = "YOU ARE WINNING";
        badge.className =
            "absolute top-3 right-3 bg-accent text-white text-xs font-heading px-3 py-1 rounded-md shadow";
        card.appendChild(badge);
    }

    const imgWrap = document.createElement("div");
    imgWrap.className = "w-full h-48 rounded-md bg-grayMain bg-center bg-cover";

    const firstImage =
        listing.media?.length && listing.media[0].url
            ? listing.media[0].url
            : "https://via.placeholder.com/300?text=No+Image";

    imgWrap.style.backgroundImage = `url('${firstImage}')`;
    card.appendChild(imgWrap);

    const title = document.createElement("h3");
    title.className = "mt-6 font-heading text-xl text-dark";
    title.textContent =
        listing.title.length > 20
            ? listing.title.slice(0, 20) + "..."
            : listing.title;
    card.appendChild(title);

    // const seller = document.createElement("p");
    // seller.className = "text-subtext text-sm mt-1 break-all";
    // seller.textContent = `By ${listing.seller?.name || "Unknown"}`;
    // card.appendChild(seller);

    if (listing.description) {
        const description = document.createElement("p");
        description.className = "text-subtext text-sm mt-3 line-clamp-2";
        description.textContent = listing.description;
        card.appendChild(description);
    }

    const credit = document.createElement("p");
    credit.className = "mt-6";
    credit.innerHTML = `
        <span class="text-subtext font-heading text-sm block">Your bid:</span>
        <span class="text-accent font-heading text-xl">${amount} Credits</span>
    `;
    card.appendChild(credit);

    const bottom = document.createElement("div");
    bottom.className = "mt-auto pt-6";

    const btn = document.createElement("a");
    btn.href = "/pages/listing.html?id=" + listing.id; 
    btn.textContent = "VIEW DETAILS";
    btn.className ="block w-full text-center bg-button text-white py-3 rounded-md font-heading tracking-wide hover:opacity-80 transition";

    bottom.appendChild(btn);
    card.appendChild(bottom);

    return card;
}













