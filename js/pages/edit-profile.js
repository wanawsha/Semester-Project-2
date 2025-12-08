import { getStoredUser, storeUser, storeCredits } from "../utils/storage.js";
import { setupNavbar } from "../utils/navbar.js";
import { authHeaders } from "../utils/api.js";

setupNavbar();

const form = document.getElementById("edit-profile-form");
const avatarInput = document.getElementById("avatar-url");
const bannerInput = document.getElementById("banner-url");
const bioInput = document.getElementById("bio");

const user = getStoredUser();
if (!user) {
    window.location.href = "./login.html";
}

avatarInput.value = user.avatar || "";
bannerInput.value = user.banner || "";
bioInput.value = user.bio || "";

async function updateProfile(e) {
    e.preventDefault();

    const updatedProfile = {
        avatar: avatarInput.value.trim() || null,
        banner: bannerInput.value.trim() || null,
        bio: bioInput.value.trim() || null,
    };

    try {
        const response = await fetch(
            `https://v2.api.noroff.dev/auction/profiles/${user.name}`,
            {
                method: "PUT",
                headers: {
                    ...authHeaders(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProfile),
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.errors?.[0]?.message || "Update failed");
        }

        storeUser(result.data);
        storeCredits(result.data.credits);

        alert("Profile updated successfully!");

        window.location.href = "./profile.html";

    } catch (error) {
        alert("Error: " + error.message);
    }
}

form.addEventListener("submit", updateProfile);
