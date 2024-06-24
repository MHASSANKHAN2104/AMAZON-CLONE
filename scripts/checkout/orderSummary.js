import { cart,  update_cart , updateDeliveryOption } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryoptions.js";
import { products } from "../../data/products.js";
import { currencyFormat } from "../money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
//import {renderOrderSummary} from "./orderSummary"
import { renderPaymentSummary } from "./paymentSummary.js";
export function renderOrderSummary(){

let cartSummaryHtml = '';
cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingproduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingproduct = product;
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  const dateString = deliveryDate.format('dddd, MMMM DD');
  
  cartSummaryHtml += `
    <div class="cart-item-container js-cart-item-container-${matchingproduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>
      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingproduct.image}">
        <div class="cart-item-details">
          <div class="product-name">${matchingproduct.name}</div>
          <div class="product-price">$${currencyFormat(matchingproduct.priceCents)}</div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">Update</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingproduct.id}">Delete</span>
          </div>
        </div>
        <div class="delivery-options">
          <div class="delivery-options-title">Choose a delivery option:</div>
          ${deliveryOptionHtml(matchingproduct, cartItem)}
        </div>
      </div>
    </div>`;
});

function deliveryOptionHtml(matchingproduct, cartItem) {
  let html = '';
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM DD');
    let priceString = deliveryOption.priceCents === 0
      ? 'FREE'
      : `$${currencyFormat(deliveryOption.priceCents)}`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    html += `
      <div class="delivery-option js-delivery-option" 
      data-product-id="${matchingproduct.id}"
       data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" ${isChecked ? 'checked' : ''}
         class="delivery-option-input" name="delivery-option-${matchingproduct.id}">
        <div>
          <div class="delivery-option-date">${dateString}</div>
          <div class="delivery-option-price">${priceString} - Shipping</div>
        </div>
      </div>`;
  });
  return html;
}

document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;

document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    update_cart(productId);
    document.querySelector(`.js-cart-item-container-${productId}`).remove();
    renderPaymentSummary();
  });
});

document.querySelectorAll('.js-delivery-option').forEach((element) => {
  element.addEventListener('click', () => {
    const { productId, deliveryOptionId } = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
    renderOrderSummary();
    renderPaymentSummary();
  });
});
}
