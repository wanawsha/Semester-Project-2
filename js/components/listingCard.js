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

    const fullTitle = listing.title || "";
    const shortTitle = fullTitle.length > 20 ? fullTitle.slice(0, 20) + "..." : fullTitle;

    const title = document.createElement("h3");
    title.className = "mt-6 font-heading text-xl text-dark";
    title.textContent = shortTitle;
    card.appendChild(title);

    const seller = document.createElement("p");
    seller.className = "text-subtext text-sm mt-1 break-all";
    seller.textContent = `By ${listing.seller?.name || "Unknown"}`;
    card.appendChild(seller);

    const fullDesc = listing.description || "";
    const shortDesc = fullDesc.length > 80 ? fullDesc.slice(0, 23) + "..." : fullDesc;

    const description = document.createElement("p");
    description.className = "text-subtext text-sm mt-4 break-all";
    description.textContent = shortDesc;
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
    btn.className ="block w-full bg-button text-white py-3 rounded-md text-center font-heading tracking-wide hover:opacity-80 transition";
    btn.href = `/pages/listing.html?id=${listing.id}`;
    btn.textContent = "VIEW DETAILS";

    bottom.appendChild(btn);
    card.appendChild(bottom);

    return card;
}



export function createUserBidCard({ listing, amount, user }) {
    const card = document.createElement("div");
    card.className = "relative flex flex-col bg-white rounded-md shadow-md p-6 h-full";

    const highestBid = listing.bids?.length
        ? Math.max(...listing.bids.map(b => b.amount))
        : 0;

    const isWinning = amount === highestBid;

    if (isWinning) {
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
    title.textContent = listing.title;
    card.appendChild(title);

    const seller = document.createElement("p");
    seller.className = "text-subtext text-sm mt-1";
    seller.textContent = `By ${listing.seller?.name || "Unknown"}`;
    card.appendChild(seller);

    const credit = document.createElement("p");
    credit.className = "text-accent font-heading text-xl mt-6";
    credit.textContent = `${amount} Credits`;
    card.appendChild(credit);

    const btn = document.createElement("a");
    btn.href = `/pages/listing.html?id=${listing.id}`;
    btn.textContent = "VIEW DETAILS";
    btn.className =
        "block mt-auto w-full text-center bg-button text-white py-3 rounded-md font-heading hover:opacity-80 transition";

    card.appendChild(btn);

    return card;
}










