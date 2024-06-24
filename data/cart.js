import { products } from "../data/products.js";
import { deliveryOptions } from "./deliveryoptions.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [
    {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        deliveryOptionId: '1',
        quantity: 2
    },
    {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        deliveryOptionId: '2',
        quantity: 1
    }
];

export function saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

let totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

export function addToCart(productId) {
    let productFound = false;

    for (let i = 0; i < cart.length; i++) {
        if (productId === cart[i].productId) {
            cart[i].quantity += 1;
            totalQuantity += 1;
            productFound = true;
            break;
        }
    }

    if (!productFound) {
        totalQuantity += 1;
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    }

    saveToLocalStorage();
    return totalQuantity;
}

export function update_cart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    saveToLocalStorage();
}

export function updateDeliveryOption(productId,deliveryOptionId)
{

    let matchingProduct;
    for(let i=0;i<cart.length;i++)
    {
        if(productId===cart[i].productId)
        {
            matchingProduct=cart[i];
            
        }
    }
    
    matchingProduct.deliveryOptionId=deliveryOptionId;
    saveToLocalStorage();
}
