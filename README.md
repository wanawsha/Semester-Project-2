# Bidster – Semester Project 2

Bidster is an auction-based web application where users can create listings, place bids, and manage their profile.  
The project was built as part of Semester Project 2 and focuses on working with APIs, authentication, and dynamic UI updates using JavaScript.

## Live Site 
https://bidsterr.netlify.app/

## Repository

https://github.com/wanawsha/Semester-Project-2

## Screenshots
<img width="1390" height="794" alt="bidsterafter" src="https://github.com/user-attachments/assets/e5d0e34e-1a5b-45b6-a693-d2a584fee5e0" />---
<img width="1267" height="775" alt="Skjermbilde 2026-06-06 kl  20 49 23" src="https://github.com/user-attachments/assets/1049c5a8-aecb-4581-8c74-876ea3c8b5a4" />

## Portfolio Improvements

For Portfolio 2, I reviewed the project and made improvements to prepare it for professional presentation.

### Improvements Made

- Added a fallback image solution for listings without media
- Improved the visual consistency of listing cards
- Improved the overall user experience on the listings overview page

### Related Commit

https://github.com/wanawsha/Semester-Project-2/commit/1577a175346534b0e9f5c91918e4ba286550774f
## Project Overview

In this project, I built a fully functional auction site using the Noroff Auction API.  
Users can register, log in, create listings, place bids, and view their activity on a profile page.

The main goal was to demonstrate understanding of:
- API communication
- Authentication & authorization
- Dynamic DOM manipulation
- State handling with localStorage
- Responsive design

---

##  Tech Stack

- **HTML**
- **CSS (Tailwind CSS)**
- **JavaScript (ES Modules)**
- **Noroff Auction API**

---

##  Features

### Authentication
- User registration and login
- Token and user data stored in localStorage
- Protected routes for creating, editing, and deleting listings

### Listings
- View all listings on the homepage
- Create new listings with title, description, images, and end date
- Edit and delete your own listings
- View listing details with bid history

### Bidding
- Place bids on other users’ listings
- See live bid history
- Your own bids are highlighted in the bid history
- Highest bid is clearly displayed

### Profile Page
- View your own listings
- View listings you have bid on
- Clear visual layout for managing your activity

### Navigation & UX
- Responsive navigation with a hamburger menu on mobile
- Conditional navigation links based on login state
- Credits displayed in the navigation when logged in
- Clean and consistent UI across pages

---

## 📂 Project Structure

**Root:**

index.html – Homepage showing all active listings

**Pages:**

login.html – User login page

register.html – User registration page

profile.html – User profile with own listings and bids

listing.html – Single listing page with details and bidding

create.html – Create a new auction listing

**js:**
**api:**

listings.js – Handles all listing-related API requests (fetch, delete, etc.)

auth.js – Handles login and registration requests

**components:**

listingCard.js – Reusable components for listing cards and bid cards

**utils:**

storage.js – Handles localStorage (user, token, credits)

api.js – Shared API helpers and auth headers

navbar.js – Navbar logic (login/logout, credits, mobile menu)

**pages:**

index.js – Logic for loading and filtering listings on the homepage

listing.js – Logic for a single listing (details, bids, owner actions)

profile.js – Logic for user profile, listings, and bids

create.js – Logic for creating a new listing

**css:**

output.css – Compiled Tailwind CSS file

style.css

---

## ⚙️ How to Run the Project

### Installation

1. Clone the repository:

```bash
git clone https://github.com/wanawsha/Semester-Project-2.git
```

2. Navigate to the project folder:

```bash
cd Semester-Project-2
```

3. Install dependencies:

```bash
npm install
```

4. Run Tailwind CSS in development mode:

```bash
npm run dev
```

5. Open `index.html` using Live Server in Visual Studio Code.

---

## Author

**Wanawsha Ahmad**  
Semester Project 2 – Frontend Development
