const BASE_URL = "https://v2.api.noroff.dev/auction/listings";

export async function getAllListings({ includeSeller = true, includeBids = true } = {}) {
    const query = [];

    if (includeSeller) query.push("_seller=true");
    if (includeBids) query.push("_bids=true");

    const url = `${BASE_URL}?${query.join("&")}`;

    try {
        const response = await fetch(url);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.errors?.[0]?.message || "Failed to fetch listings");
        }

        return result.data || [];
    } catch (error) {
        console.error("Error fetching listings:", error);
        return [];
    }
}

export async function getListingById(id, includeRelations = true) {
    let url = `${BASE_URL}/${id}`;

    if (includeRelations) {
        url += "?_seller=true&_bids=true";
    }

    try {
        const response = await fetch(url);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.errors?.[0]?.message || "Failed to fetch listing");
        }

        return result.data || null;
    } catch (error) {
        console.error("Error fetching listing:", error);
        return null;
    }
}
