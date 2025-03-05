import { cart, removeFromCart, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/currency_converter.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
let html = "";

cart.forEach((cartItem) => {
  let matchingItem;

  products.forEach((productItem) => {
    if (productItem.id === cartItem.id) {
      matchingItem = productItem;
      console.log(matchingItem);
    }
  });
  html += `
    <div class="cart-item-container js-cart-item-container-${cartItem.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingItem.image}">

        <div class="cart-item-details">
          <div class="product-name">${matchingItem.name}</div>
          <div class="product-price">$${formatCurrency(
            matchingItem.priceCents
          )}</div>
          <div class="product-quantity">

            <span>Quantity: <span class="quantity-label js-quantity-label-${
              matchingItem.id
            }">${cartItem.quantity}</span></span></span>
            
            <span class="update-quantity-link link-primary js-update-quantity-link" data-update-quantity=${
              cartItem.id
            }>Update</span>

             <input class="quantity-input  js-quantity-input-${cartItem.id}">

            <span class="save-quantity-link link-primary js-save-link"
              data-product-id="${cartItem.id}">
              Save
            </span>

            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
              cartItem.id
            }">Delete</span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">Choose a delivery option:</div>
          <div class="delivery-option">
            <input type="radio" checked class="delivery-option-input" name="delivery-option-${
              cartItem.id
            }">
            <div>
              <div class="delivery-option-date">Tuesday, June 21</div>
              <div class="delivery-option-price">FREE Shipping</div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-${
              cartItem.id
            }">
            <div>
              <div class="delivery-option-date">Wednesday, June 15</div>
              <div class="delivery-option-price">$4.99 - Shipping</div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-${
              cartItem.id
            }">
            <div>
              <div class="delivery-option-date">Monday, June 13</div>
              <div class="delivery-option-price">$9.99 - Shipping</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

const orderSummaryElement = document.querySelector(".order-summary");

if (orderSummaryElement) {
  orderSummaryElement.innerHTML = html;
} else {
  console.error("Error: .order-summary element not found in HTML");
}

// Handle delete item event
document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    let productId = link.dataset.productId;
    removeFromCart(productId);

    let productContainer = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    if (productContainer) {
      productContainer.remove();
    }
  });
});

document.querySelectorAll(".js-save-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.remove("is-editing-quantity");

    const quantityInput = document.querySelector(
      `.js-quantity-input-${productId}`
    );
    const newQuantity = Number(quantityInput.value);
    if (newQuantity < 0 || newQuantity >= 1000) {
      alert("Quantity must be at least 0 and less than 1000");
      return;
    }
    updateQuantity(productId, newQuantity);

    const quantityLabel = document.querySelector(
      `.js-quantity-label-${productId}`
    );
    quantityLabel.innerHTML = newQuantity;

    updateQuantity();
    checkoutQuantity();
  });
});

export function checkoutQuantity() {
  let qty = 0;
  cart.forEach((cartItem) => {
    qty = qty + cartItem.quantity;
  });
  document.querySelector(".js-return-to-home-link").innerText = `${qty} Items`;
}

checkoutQuantity();

document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    let productId = link.dataset.updateQuantity;
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.add("is-editing-quantity");
  });
});

hello();
let today = dayjs();
console.log(today);

let a = today.add(7, "day");
console.log(a);

console.log(a.format("dddd MMMM D"));
