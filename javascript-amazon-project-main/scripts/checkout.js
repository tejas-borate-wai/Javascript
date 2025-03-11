import { checkoutOrderSummery } from "./checkout/orderSummery.js";
import { paymentSummery } from "./checkout/paymentSummery.js";

// import "../data/cart-oop.js";
// import "../data/cart-class.js";
import "../data/backend-practice.js";
checkoutOrderSummery();
paymentSummery();

// function first(a) {
//   console.log("3");
//   a();
// }

// console.log("1");
// new Promise((resolve) => {
//   console.log("2");
//   first((resolve) => {
//     resolve;
//   });
// }).then(() => {
//   console.log(".then called");
//   console.log("4");
// });

function loadProducts() {
  fetch(" https://supersimplebackend.dev/products")
    .then((response) => {
      return response.json();
    })
    .then((productData) => {
      console.log(productData);
    });
}

loadProducts();
