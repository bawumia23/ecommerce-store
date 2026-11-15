# ShopEase - E-Commerce Product Catalog & Shopping Cart

ShopEase is a modern, responsive e-commerce web application built with HTML5, CSS3, and vanilla JavaScript. It allows users to explore products, search and filter categories, manage a shopping cart, calculate order totals, and simulate checkout.

The application retrieves product information dynamically from FakeStoreAPI and uses browser localStorage to preserve shopping cart data between page reloads.

## Live Demo

https://bawumia23.github.io/ecommerce-store/.

## Project Overview

ShopEase provides a simple and interactive online shopping experience with a clean user interface, responsive product catalog, and functional shopping cart.

## Features

### Product Catalog
- Fetches product information from FakeStoreAPI.
- Displays product images, names, prices, categories, and ratings.
- Dynamically renders product cards.
- Handles API loading and error states.

### Search and Filtering
- Search products by name or category.
- Filter products by:
  - All Products
  - Electronics
  - Jewelry
  - Men's Clothing
  - Women's Clothing

### Shopping Cart
- Add products to the shopping cart.
- Increase and decrease product quantities.
- Remove products from the cart.
- Display the total number of cart items.
- Automatically update shopping cart calculations.
- Persist cart information using localStorage.

### Shopping Calculations
- Subtotal calculation.
- 10% sales tax calculation.
- Fixed $5.00 shipping fee when the cart contains products.
- Automatic grand total calculation.

### Checkout
- Interactive checkout confirmation modal.
- Simulated order completion.
- Automatic cart clearing after checkout.

### Responsive Design
- Mobile-friendly layout.
- Responsive product grid.
- Interactive buttons and transitions.
- Slide-out shopping cart drawer.

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Semantic page structure |
| CSS3 | Styling and responsive layout |
| JavaScript ES6+ | Application logic and interactivity |
| Fetch API | Retrieving external product data |
| Async/Await | Asynchronous API requests |
| FakeStoreAPI | Product data source |
| localStorage | Shopping cart persistence |
| Git & GitHub | Version control and source hosting |

## API Integration

ShopEase uses FakeStoreAPI to retrieve product information.

API Endpoint:

https://fakestoreapi.com/products

The application uses JavaScript's Fetch API and async/await to retrieve and display product data dynamically.

## Project Structure

```text
ecommerce-store/
|
|-- index.html       # Main application structure
|-- style.css        # Responsive application styling
|-- script.js        # JavaScript functionality
|-- README.md        # Project documentation
|-- .gitignore       # Git ignored files


Getting Started
Follow these instructions to run ShopEase locally.
Prerequisites
- A modern web browser.
- Python 3 or another local development server.
- Internet connection to retrieve products from FakeStoreAPI.
1. Clone the Repository
git clone https://github.com/bawumia23/ecommerce-store.git


2. Navigate to the Project Directory
cd ecommerce-store


3. Start a Local Development Server
python3 -m http.server 8000


4. Open the Application
Visit:

http://localhost:8000

You can now explore the ShopEase storefront.
Testing
The following functionality has been manually tested:
- [x] Product loading from FakeStoreAPI
- [x] Product search
- [x] Category filtering
- [x] Adding products to the cart
- [x] Increasing and decreasing quantities
- [x] Removing products
- [x] Cart item count updates
- [x] Subtotal, tax, shipping, and total calculations
- [x] Shopping cart persistence after page refresh
- [x] Checkout confirmation modal
- [x] Responsive application layout
JavaScript syntax was also verified using:
node --check script.js


Shopping Calculation Rules
ItemCalculation
SubtotalSum of product prices multiplied by quantities
Tax10% of subtotal
Shipping$5.00 when cart is not empty
TotalSubtotal + Tax + Shipping

Currency: USD ($)
Important Notice
ShopEase is an educational portfolio project developed to demonstrate frontend development and JavaScript programming skills.

The checkout process is simulated. The application does not process real payments, collect payment information, or submit actual orders.
Learning Objectives
This project demonstrates practical experience with:
- DOM manipulation.
- JavaScript event handling.
- Arrays and objects.
- Array methods such as filter(), find(), and reduce().
- Asynchronous JavaScript.
- REST API integration.
- Fetch API and error handling.
- Browser localStorage.
- Dynamic UI rendering.
- Shopping cart state management.
- Responsive web design.
Author
Tajudeen Bawumia

Aspiring Software Engineer | Backend Development Enthusiast
- GitHub: https://github.com/bawumia23
- Portfolio: https://bawumia23.github.io/developer-portfolio/
License
This project is developed for educational and portfolio purposes. You are welcome to explore the source code and learn from its implementation.
