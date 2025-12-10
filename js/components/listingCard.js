export function createListingCard(listing) {
    const card = document.createElement("div");
    card.classList.add("listing-card");

    const image = document.createElement("div");
    image.classList.add("listing-image");

    const firstImage = listing.media?.[0]?.url 
        || "https://via.placeholder.com/300?text=No+Image";

    image.style.backgroundImage = `url('${firstImage}')`;
    card.appendChild(image);

    const title = document.createElement("h3");
    title.classList.add("listing-title");
    title.textContent = listing.title;
    card.appendChild(title);

    const seller = document.createElement("p");
    seller.classList.add("listing-seller");
    seller.textContent = `By ${listing.seller?.name || "Unknown"}`;
    card.appendChild(seller);

    const description = document.createElement("p");
    description.classList.add("listing-description");

    const rawDescription = String(listing.description || "");
    const trimmedDescription =
        rawDescription.length > 80
            ? rawDescription.slice(0, 80) + "..."
            : rawDescription;

    description.textContent = trimmedDescription;
    card.appendChild(description);

    const price = document.createElement("div");
    price.classList.add("listing-price");

    if (listing.bids?.length > 0) {
        const highestBid = Math.max(...listing.bids.map(b => b.amount));
        price.textContent = `${highestBid} credits`;
    } else {
        price.textContent = "0 credits";
    }
    card.appendChild(price);

    const btn = document.createElement("a");
    btn.classList.add("view-details-btn");

    btn.href = `/pages/listing.html?id=${listing.id}`;
    btn.textContent = "View Details";

    card.appendChild(btn);

    return card;
}


