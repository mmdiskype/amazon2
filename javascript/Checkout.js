import {priceof, deleteitem, cart, countcal, savelocal} from './cart.js';
import {products} from '../data/products.js';
import {deliopt} from '../data/delivery.js';
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.18/+esm';
let htmlitem = '';

export let matchingPro=[];
export let totalPrice=0;

cart.forEach((oncart) => {
    const equal = oncart.productId;
    products.forEach((selected) => {
        if (selected.id===equal) {
          selected.quantity = oncart.quantity;
          selected.shipping = oncart.shipping;
          matchingPro.push(selected);
          totalPrice+=(selected.priceCents)*oncart.quantity;
        }
    });
});

// console.log(totalPrice);
deleteitem();
export function cardgen () {
  matchingPro.forEach((productd) => {
  htmlitem += `
    <div class="cart-item-container" data-delete-container="${productd.id}">
        <div class="delivery-date">
          Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${productd.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${productd.name}
            </div>
            <div class="product-price">
              ${priceof(productd.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${productd.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary" data-delete="${productd.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            <div class="delivery-option">
            ${delidate(productd.id , productd.shipping)}
            </div>
          </div>
        </div>
    </div>
`;
})
}

cardgen();

document.querySelector('.order-summary').innerHTML = htmlitem;

document.querySelector('.checkout-header-middle-section').innerHTML = `
            Checkout (<a class="return-to-home-link"
            href="amazon.html">${countcal()} items</a>)
`;

deleteitem();


function delidate (productId , productf) {
  let htmldeli = '';
  shippingcheck (productf);
  console.log(deliopt);
  deliopt.forEach((deliveryopt) => {
  const today = dayjs();
  const delivery = today.add(deliveryopt.deliverydays, 'days');
  const daystring = delivery.format('dddd, MMMM D');
  const pricestring = deliveryopt.price === 0 ? 'FREE' : `$${priceof(deliveryopt.price)} - `;
  htmldeli +=`
          <input type="radio" ${deliveryopt.state} class="delivery-option-input" name="${productId}" data-id-cost = "${deliveryopt.id}">
          <div class="bnana">
            <div class="delivery-option-date">
              ${daystring}
            </div>
            <div class="delivery-option-price">
              ${pricestring} Shipping
            </div>
          </div>
  `;
  })
  return htmldeli;
}

function shippingcart () {
  document.querySelectorAll('.delivery-option-input').forEach((inputelement) => {
  inputelement.addEventListener('click', () => {
    cart.forEach((citem) => {
      if (citem.productId === inputelement.getAttribute('name')){
        citem.shipping = Number(inputelement.dataset.idCost);
        savelocal ();
        console.log(shippingcost());
        cartSummary();
      }
    })
  })
})
}

shippingcart ();

function shippingcheck (shippingid) {
  deliopt.forEach((bro) => {
    bro.state = '';
  })
  if (shippingid === 1) {
    deliopt[0].state = 'checked';
  }else if (shippingid === 2) {
    deliopt[1].state = 'checked';
  }else if (shippingid === 3) {
    deliopt[2].state = 'checked';
  }
}

function shippingcost () {
  let shippingsum = 0;
  cart.forEach((items) => {
    if (items.shipping === 1) {
      shippingsum += 0
    }else if (items.shipping === 2) {
      shippingsum += 499
    }else if (items.shipping === 3) {
      shippingsum += 999
    }
  })
  return shippingsum;
}


function cartSummary () {
  document.querySelector('.payment-summary').innerHTML = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${countcal()}):</div>
            <div class="payment-summary-money">$${priceof(totalPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${priceof(shippingcost())}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${priceof(totalPrice+shippingcost())}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${priceof((totalPrice+shippingcost())/10)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${priceof((totalPrice+shippingcost())*110/100)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `;
}

cartSummary();
