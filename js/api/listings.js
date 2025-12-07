const BASE_URL = "https://v2.api.noroff.dev/auction/listings";

export async function getAllListings () {
    try {
        const response = await fetch (`${BASE_URL}?_seller=true&_bids=true`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching listings", error);
        return [];
    }
}

export async function getListingById(id) {
    try {
        const response = await fetch (`https://v2.api.noroff.dev/auction/listings/${id}?_seller=true&_bids=true`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching listing:", error);
        return null;
    }
 }
