import { cart } from "../../data/cart.js"
import { products } from "../../data/products.js"
import { deliveryOptions } from "../../data/deliveryoptions.js";
import { currencyFormat } from "../money.js";
export function renderPaymentSummary()
{
    let matchingProduct;
    let price=0;
    let shipping=0;
    
    for(let i=0;i<cart.length;i++)
    {
        for(let j=0;j<products.length;j++)
        {
            if(products[j].id===cart[i].productId)
        {
            price+=cart[i].quantity*products[j].priceCents;
            for(let z=0;z<deliveryOptions.length;z++)
            {
                if(cart[i].deliveryOptionId===deliveryOptions[z].id)
                {
                    shipping+=deliveryOptions[z].priceCents;
                }
            }
            
        }

        }
        
    }
    
  

    const beforeTax=price+shipping;
    const afterTax=beforeTax+beforeTax*0.1;
    console.log("price bill");
    console.log(price);
    console.log("shipping bill");
    console.log(shipping);
    console.log("before tax");
    console.log(beforeTax);
    console.log("after tax");
    console.log(afterTax);


    const paymentSummaryHtml=`<div class="payment-summary">
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">
      $${currencyFormat(price)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
      $${currencyFormat(shipping)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
      $${currencyFormat(beforeTax)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
      $${currencyFormat(beforeTax*0.1)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
      $${currencyFormat(afterTax)}
      </div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button> `;

    document.querySelector(".js-payment-summary").innerHTML=paymentSummaryHtml;
}
