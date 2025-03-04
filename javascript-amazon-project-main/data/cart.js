export let cart = [];

export function addToCart(product_id) {
  let quantity_selector = document.querySelector(
    `.js-quantity-selector-${product_id}`
  );
  let quantity = Number(quantity_selector.value);

  let matching_item = cart.find((item) => item.product_id == product_id);

  if (matching_item) {
    matching_item.quantity += quantity;
  } else {
    cart.push({ product_id, quantity });
  }
}
