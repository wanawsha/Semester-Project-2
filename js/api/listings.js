import { authHeaders } from "../utils/api.js";

const BASE_URL = "https://v2.api.noroff.dev/auction/listings";

const API_KEY = "f4cce5be-e6d9-480d-a9a1-1d87bb099c77";

const headers = {
    "Content-Type": "application/json",
    "X-Noroff-API-Key": API_KEY,
};

export async function getAllListings({
    includeSeller = true,
    includeBids = true,
    limit = 24,
    page = 1,
    sort = "created",
    sortOrder = "desc",
    } = {}) {
    const query = [];

    if (includeSeller) query.push("_seller=true");
    if (includeBids) query.push("_bids=true");

    query.push(`limit=${limit}`);
    query.push(`page=${page}`);
    query.push(`sort=${sort}`);
    query.push(`sortOrder=${sortOrder}`);

    const url = `${BASE_URL}?${query.join("&")}`;

    try {
        const response = await fetch(url, { headers });
        const result = await response.json();

        if (!response.ok) {
        throw new Error(result.errors?.[0]?.message || "Failed to fetch listings");
        }

        return result;
      } catch (error) {
        console.error("Error fetching listings:", error);
        return { data: [], meta: {} };
  }
}

export async function getListingById(id, includeRelations = true) {
    let url = `${BASE_URL}/${id}`;

    if (includeRelations) {
      url += "?_seller=true&_bids=true";
    }

    const response = await fetch(url, { headers });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.errors?.[0]?.message || "Failed to fetch listing");
    }

    return result.data;
}

export async function deleteListing(listingId) {
    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/auction/listings/${listingId}`,
        {
          method: "DELETE",
          headers: authHeaders(),
        }
      );

      if (response.status === 204) {
        return true;
      }

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.errors?.[0]?.message || "Failed to delete listing");
      }

      return true;
    } catch (error) {
      console.error("Delete error:", error);
      return false;
    }
}




