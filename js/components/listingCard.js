export function createListingCard(listing) {
    const card = document.createElement("div");
    card.classList.add("listing-card");

    const image = document.createElement("div");
    image.classList.add("listing-image");
    if (listing.media && listing.media.length > 0) {
        image.style.backgroundImage = `url(${listing.media[0]})`;
    }
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
    description.textContent = listing.description;
    card.appendChild(description);

    const price = document.createElement("div");
    price.classList.add("listing-price");

    if (listing.bids && listing.bids.length > 0) {
        const highestBid = Math.max(...listing.bids.map(b => b.amount)); 
        price.textContent = `${highestBid} Credits`;  
    } else {
        price.textContent = "0 Credits"; 
    }
    card.appendChild(price);

    const btn = document.createElement("a");
    btn.classList.add("view-details-btn");
    btn.href = `./pages/listing.html?id=${listing.id}`;
    btn.textContent = "View Details";
    card.appendChild(btn);

    return card;
}