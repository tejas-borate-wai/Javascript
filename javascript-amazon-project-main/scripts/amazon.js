import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

let html = "";
products.forEach((product) => {
  html += `
            <div class="product-container">
                <div class="product-image-container">
                <img class="product-image" src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                ${product.name}
                </div>

                <div class="product-rating-container">
                <img class="product-rating-stars" src="images/ratings/rating-${
                  product.rating.stars * 10
                }.png" >
                <div class="product-rating-count link-primary">
                    ${product.rating.count}
                </div>
                </div>

                <div class="product-price">
                $${product.priceCents / 100}
                </div>

                <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                </div>

                <div class="product-spacer"></div>

                <div class="added-to-cart js-added-to-cart-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
                </div>

                <button class="add-to-cart-button button-primary js-add-to-cart" data-product-name="${
                  product.name
                }" data-product-price="${
    product.priceCents / 100
  }"  data-product-id="${product.id}">
                Add to Cart
                </button>
            </div>
    `;
});

document.querySelector(".products-grid").innerHTML = html;
let addedMessageTimeouts = {};

function addToCart(product_id) {
  let quantity_selector = document.querySelector(
    `.js-quantity-selector-${product_id}`
  );
  let quantity = Number(quantity_selector.value);
  let matching_item;
  cart.forEach((item) => {
    if (item.product_id == product_id) {
      matching_item = item;
      return;
    }
  });

  if (matching_item) {
    matching_item.quantity = matching_item.quantity + quantity;
  } else {
    cart.push({
      product_id,
      //   product_name,
      //   product_price,
      quantity,
    });
  }
}

document.querySelectorAll(".js-add-to-cart").forEach((product) => {
  product.addEventListener("click", () => {
    // let product_name = product.dataset.productName;
    // let product_price = product.dataset.productPrice;
    let product_id = product.dataset.productId;

    addToCart(product_id);

    let cart_quantity = 0;
    cart.forEach((item) => {
      cart_quantity = cart_quantity + item.quantity;
    });

    let addedMessage = document.querySelector(
      `.js-added-to-cart-${product_id}`
    );

    addedMessage.classList.add("added-to-cart-visible");

    let previousTimeoutId = addedMessageTimeouts[product_id];

    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }
    let timeoutId = setTimeout(() => {
      addedMessage.classList.remove("added-to-cart-visible");
    }, 2000);
    // console.log(cart_quantity);
    // console.log(cart);

    addedMessageTimeouts[product_id] = timeoutId;
    document.querySelector(".cart-quantity").innerText = cart_quantity;
  });
});
