"use strict";

// ==========================================
// 1. DOM ELEMENTS
// ==========================================

const productGrid = document.getElementById("product-grid");
const loadingMessage = document.getElementById("loading-message");
const errorMessage = document.getElementById("error-message");
const searchInput = document.getElementById("search-input");
const categoryFilters = document.getElementById("category-filters");

const cartButton = document.getElementById("cart-button");
const cartCount = document.getElementById("cart-count");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const closeCartButton = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");

const cartSubtotal = document.getElementById("cart-subtotal");
const cartTax = document.getElementById("cart-tax");
const cartShipping = document.getElementById("cart-shipping");
const cartTotal = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-button");

const checkoutModal = document.getElementById("checkout-modal");
const closeModalButton = document.getElementById("close-modal");
const continueShoppingButton = document.getElementById("continue-shopping");

// ==========================================
// 2. APPLICATION STATE
// ==========================================

const API_URL = "https://fakestoreapi.com/products";
const CART_STORAGE_KEY = "shopease-cart";
const TAX_RATE = 0.1;
const SHIPPING_COST = 5;

let products = [];
let activeCategory = "all";
let searchTerm = "";
let cart = loadCart();

// ==========================================
// 3. LOAD AND SAVE CART
// ==========================================

function loadCart() {
  try {
    const savedCart = JSON.parse(
      localStorage.getItem(CART_STORAGE_KEY)
    );

    if (Array.isArray(savedCart)) {
      return savedCart.filter(item =>
        item &&
        typeof item.id === "number" &&
        typeof item.quantity === "number" &&
        item.quantity > 0
      );
    }
  } catch (error) {
    console.error("Could not load cart:", error);
  }

  return [];
}

function saveCart() {
  try {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cart)
    );
  } catch (error) {
    console.error("Could not save cart:", error);
  }
}

// ==========================================
// 4. FETCH PRODUCTS
// ==========================================

async function fetchProducts() {
  loadingMessage.hidden = false;
  errorMessage.hidden = true;

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    products = await response.json();

    if (!Array.isArray(products)) {
      throw new Error("Invalid product data received.");
    }

    renderProducts();
  } catch (error) {
    console.error("Could not fetch products:", error);

    errorMessage.hidden = false;
  } finally {
    loadingMessage.hidden = true;
  }
}

// ==========================================
// 5. DISPLAY PRODUCTS
// ==========================================

function getFilteredProducts() {
  return products.filter(product => {
    const matchesCategory =
      activeCategory === "all" ||
      product.category === activeCategory;

    const searchableText =
      `${product.title} ${product.category}`.toLowerCase();

    const matchesSearch =
      searchableText.includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });
}

function renderProducts() {
  const filteredProducts = getFilteredProducts();

  productGrid.innerHTML = "";

  if (filteredProducts.length === 0 && products.length > 0) {
    productGrid.innerHTML =
      '<p class="status-message">No products found.</p>';
    return;
  }

  filteredProducts.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    const image = document.createElement("img");
    image.className = "product-image";
    image.src = product.image;
    image.alt = product.title;

    const category = document.createElement("p");
    category.className = "product-category";
    category.textContent = product.category;

    const title = document.createElement("h3");
    title.textContent = product.title;

    const rating = document.createElement("p");
    rating.className = "product-rating";
    rating.textContent =
      `★ ${product.rating.rate} (${product.rating.count} reviews)`;

    const footer = document.createElement("div");
    footer.className = "product-footer";

    const price = document.createElement("strong");
    price.className = "product-price";
    price.textContent = formatCurrency(product.price);

    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.className = "add-to-cart";
    addButton.textContent = "Add to Cart";

    addButton.addEventListener("click", () => {
      addToCart(product);
    });

    footer.append(price, addButton);

    card.append(image, category, title, rating, footer);

    productGrid.appendChild(card);
  });
}

// ==========================================
// 6. SEARCH AND CATEGORY FILTERING
// ==========================================

searchInput.addEventListener("input", event => {
  searchTerm = event.target.value.trim();
  renderProducts();
});

categoryFilters.addEventListener("click", event => {
  const button = event.target.closest(".filter-button");

  if (!button) {
    return;
  }

  activeCategory = button.dataset.category;

  document
    .querySelectorAll(".filter-button")
    .forEach(filterButton => {
      filterButton.classList.remove("active");
    });

  button.classList.add("active");

  renderProducts();
});

// ==========================================
// 7. SHOPPING CART
// ==========================================

function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart();
  renderCart();
}

function updateQuantity(productId, change) {
  const item = cart.find(cartItem => cartItem.id === productId);

  if (!item) {
    return;
  }

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter(cartItem => cartItem.id !== productId);
  }

  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);

  saveCart();
  renderCart();
}

// ==========================================
// 8. DISPLAY CART AND CALCULATIONS
// ==========================================

function renderCart() {
  cartItems.innerHTML = "";

  const itemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  cartCount.textContent = itemCount;

  checkoutButton.disabled = cart.length === 0;

  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p class="empty-cart-message">Your cart is empty.</p>';
  } else {
    cart.forEach(item => {
      const cartItem = document.createElement("article");
      cartItem.className = "cart-item";

      const image = document.createElement("img");
      image.className = "cart-item-image";
      image.src = item.image;
      image.alt = item.title;

      const details = document.createElement("div");

      const title = document.createElement("h3");
      title.textContent = item.title;

      const price = document.createElement("p");
      price.className = "cart-item-price";
      price.textContent = formatCurrency(item.price);

      const controls = document.createElement("div");
      controls.className = "cart-item-controls";

      const decreaseButton = document.createElement("button");
      decreaseButton.type = "button";
      decreaseButton.className = "quantity-button";
      decreaseButton.textContent = "−";
      decreaseButton.setAttribute(
        "aria-label",
        `Decrease quantity of ${item.title}`
      );

      decreaseButton.addEventListener("click", () => {
        updateQuantity(item.id, -1);
      });

      const quantity = document.createElement("span");
      quantity.textContent = item.quantity;

      const increaseButton = document.createElement("button");
      increaseButton.type = "button";
      increaseButton.className = "quantity-button";
      increaseButton.textContent = "+";
      increaseButton.setAttribute(
        "aria-label",
        `Increase quantity of ${item.title}`
      );

      increaseButton.addEventListener("click", () => {
        updateQuantity(item.id, 1);
      });

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "remove-button";
      removeButton.textContent = "Remove";

      removeButton.addEventListener("click", () => {
        removeFromCart(item.id);
      });

      controls.append(
        decreaseButton,
        quantity,
        increaseButton,
        removeButton
      );

      details.append(title, price, controls);

      cartItem.append(image, details);

      cartItems.appendChild(cartItem);
    });
  }

  updateCartTotals();
}

function updateCartTotals() {
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const tax = subtotal * TAX_RATE;
  const shipping = subtotal > 0 ? SHIPPING_COST : 0;
  const total = subtotal + tax + shipping;

  cartSubtotal.textContent = formatCurrency(subtotal);
  cartTax.textContent = formatCurrency(tax);
  cartShipping.textContent = formatCurrency(shipping);
  cartTotal.textContent = formatCurrency(total);
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount);
}

// ==========================================
// 9. CART DRAWER
// ==========================================

function openCart() {
  cartOverlay.hidden = false;
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");

  setTimeout(() => {
    if (!cartDrawer.classList.contains("open")) {
      cartOverlay.hidden = true;
    }
  }, 300);
}

cartButton.addEventListener("click", openCart);
closeCartButton.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

// ==========================================
// 10. CHECKOUT MODAL
// ==========================================

function openCheckoutModal() {
  if (cart.length === 0) {
    return;
  }

  checkoutModal.hidden = false;
}

function closeCheckoutModal() {
  checkoutModal.hidden = true;
}

function completeCheckout() {
  cart = [];
  saveCart();
  renderCart();
  closeCheckoutModal();
  closeCart();
}

checkoutButton.addEventListener("click", openCheckoutModal);
closeModalButton.addEventListener("click", closeCheckoutModal);
continueShoppingButton.addEventListener("click", completeCheckout);

// ==========================================
// 11. INITIALIZE APPLICATION
// ==========================================

renderCart();
fetchProducts();
