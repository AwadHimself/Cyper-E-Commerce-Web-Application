# E-Commerce Application

[E-Commerce](https://cyper-e-commerce-web-application.vercel.app/) is a fully functional e-commerce platform built with **Next.js**.  
The application allows users to browse products, manage shopping carts, review products, and complete secure real payments.

---

## Overview

This project is a modern e-commerce web application focused on performance, scalability, and user experience.  
It implements authentication, dynamic product management, cart functionality, and secure checkout using modern web technologies.

---

## Features

### User Authentication
- **Login & Sign Up**: Users can create accounts and log in to access personalized features.
- **Secure Sessions**: Authentication and session handling using NextAuth.

### Product Management
- **Browse Products**: View products with detailed descriptions, images, brands, categories, and subcategories.
- **Product Reviews**: Users can review and rate products.

### Shopping Cart
- **Manage Cart**: Add, remove, and update product quantities with optimistic UI updates.
- **Persistent Cart**: Cart data is stored and synced with the backend.

### Payment Integration
- **Secure Checkout**: Real payment processing using Stripe.
- **Order Flow**: Smooth and safe checkout experience.

---

## User Interface
- **Home Page**: Features two types of sliders to showcase products.
- **Products Page**: Displays all available products with filtering and sorting options.
- **Single Product Page**: Shows detailed product information, image gallery, reviews, and add-to-cart functionality.
- **Responsive Navbar**: Easy navigation across all devices.
- **Not Found Page**: Friendly error handling for unknown routes.
- **Cart Page**: Manage selected items and quantities before checkout.
- **Logout Functionality**: Secure and simple logout process.

---

## Technologies Used
- **Next.js** – React framework for building fast, scalable web applications with server-side rendering.
- **React.js** – For creating reusable and interactive UI components.
- **JavaScript (ES6+)** – Application logic and dynamic behavior.
- **Tailwind CSS** – Utility-first CSS framework for responsive and modern UI.
- **Supabase** – Backend as a Service for database, authentication, and storage.
- **NextAuth.js** – User authentication, sessions, and route protection.
- **Stripe** – Secure online payment processing.
- **Context API & Server Actions** – Global state management (cart, user session).
- **RESTful APIs** – Server communication and data fetching.
- **Vercel** – Deployment and hosting with built-in CI/CD.
- **Git & GitHub** – Version control and collaboration.

---

## Installation

Follow these steps to run the project locally:

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v18 or later)
- **npm** or **yarn**
- **Git**

### Clone the Repository
```bash
git clone https://github.com/AwadHimself/Cyper-E-Commerce-Web-Application.git
cd Cyper-E-Commerce-Web-Application
npm install
# or
yarn install
Environment Variables

Create a .env.local file in the root directory and add:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

Run the Development Server
npm run dev
# or
yarn dev
```
---





