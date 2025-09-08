
export let cart = [];
export let count;

function refreshsafe () {
    if (JSON.parse(localStorage.getItem('cart')) !== null) {
        cart = JSON.parse(localStorage.getItem('cart'))
    }else {
        cart = [];
    }
    if ((JSON.parse(localStorage.getItem('count')))>0) {
        count=JSON.parse(localStorage.getItem('count'))
    }else {
        count=0;
    }
}

refreshsafe();

export function priceof (priceC) {
    return ((Math.round(priceC))/100).toFixed(2);
}

export function cartcount () {
  document.querySelector('.cart-link').innerHTML = `
    <img class="cart-icon" src="images/icons/cart-icon.png">
    <div class="cart-quantity">${count}</div>
    <div class="cart-text">Cart</div>
  `;
}

export function savelocal () {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('count', JSON.stringify(count));
}

export function AddToCart () {
    document.querySelectorAll('.button-primary').forEach((button)=> {
    button.addEventListener('click', ()=> {
        const incart = button.dataset.userId;
        let matching;
        cart.forEach((value) => {
        if (incart === value.productId) {
            matching=value;
        }
        });

        if (matching) {
            matching.quantity+=1;
            count++;
            savelocal ();
        }else {
            cart.push({
                productId: incart,
                quantity: 1,
                shipping: 1
            })
            count++;
            savelocal ();
        }
        cartcount();
  });
});
}

export function removecart (productId) {
    const newcart = [];
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newcart.push(cartItem);
        }
    })
    cart=newcart;
    savelocal ();

}

export function deleteitem () {
    document.querySelectorAll('.delete-quantity-link').forEach((dclick) => {
        const deleteid = dclick.dataset.delete;
        dclick.addEventListener('click', () => {
            removecart(deleteid);
            countcal ();
            location.reload(true);
        })
        
    })
}

export function countcal () {
    let tedad = 0;
    cart.forEach((products) => {
        if (products.quantity) {
            tedad += products.quantity;
        }
    })
    count = tedad;
    savelocal();
    return count;
}



export function cartreset () {
    cart = [];
    count = 0;
    savelocal();
}