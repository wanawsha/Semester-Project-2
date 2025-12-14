# Bidster – Semester Project 2

Bidster is an auction-based web application where users can create listings, place bids, and manage their profile.  
The project was built as part of Semester Project 2 and focuses on working with APIs, authentication, and dynamic UI updates using JavaScript.

---

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

---

## ⚙️ How to Run the Project

1. Clone the repository
2. Open the project in VS Code
3. Run Tailwind in watch mode (if applicable)
4. Open `index.html` using Live Server

---

## Author

**Wanawsha Ahmad**  
Semester Project 2 – Frontend Development
