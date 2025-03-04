export let cart = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 10,
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 10,
  },
  {
    id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    quantity: 50,
  },
];

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
