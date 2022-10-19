let cartItemCount = document.querySelector('.cart-items');
let cartBasket = JSON.parse(localStorage.getItem('data')) || []; 

let topLabel = document.getElementById('label');
let shoppingCart = document.getElementById('shoppingCart');



let update = (id) => {
    let searchforId = cartBasket.find((x)=> x.id === id);
    cartItemCount.innerHTML = searchforId.item;
    calculateTotal();
    totalPrice();
    localStorage.setItem('data', JSON.stringify(cartBasket));
}

let calculateTotal = () => {
    cartItemCount.innerHTML = cartBasket.map((x)=> x.item).reduce((x,y)=>x+y,0);
    // console.log(cartBasket.map((x)=> x.item).reduce((x,y)=>x+y,0));
}

calculateTotal();

let generateCartItems = () => {
    if(cartBasket.length !== 0){

        // console.log('Cart Basket is running');
        

        shoppingCart.innerHTML = `
        <div class="header-cart">
            <h2>Shopping Cart</h2>
            <span id="number-0f-items">${cartBasket.length} Item(s)</span>
        </div>
        <div class="sub-header-cart row">
            <h3 class="product-details col-lg-5">Product Details</h3>
            <h3 class="quantity col-lg-3">Quantity</h3>
            <h3 class="price col-lg-2">Unit Price</h3>
            <h3 class="total col-lg-1">Total</h3>
        </div>
        `;

        return shoppingCart.innerHTML += cartBasket.map((x)=>{
            let {id, item} = x;

            let search = shopItemData.find((k)=> k.id === id) || [];
            
                    return `
                <div class="shopping-cart-inner row my-5">
                    <div class="product-details col-lg-5">
                        <img src="${search.img}" width="150" class="img-fluid" alt="">
                        <div class="extraz ml-2">
                            <p>${search.name}</p>
                            <span onclick="deleteProduct(${id})" class="remove-product" id="remove-product"><i class="fa-solid fa-trash"></i></span>
                        </div>
                    </div>
                    <div class="price-and-quantity">
                        <div class="productQuantity ml-3 col-lg-3">
                            <i onclick="increaseQuantity(${id})" class="fa-solid fa-plus"></i>
                            <span class="quantityValue">${item}</span>
                            <i onclick="decreaseQunatity(${id})" class="fa-solid fa-minus"></i>
                        </div>
                        
                        <span class="price4product col-lg-2">${search.price} NGN</span>
                        
                        
                        <span class="total4product col-lg-1"> ${search.price * item} NGN</span>
                        
                    </div>
                </div>
                `;
            
            
        }).join("");


    }else{
        shoppingCart.innerHTML = ``;
        topLabel.innerHTML =  `
            <h2>Cart is Empty</h2>
            <a href="/index.html">
                <button class="homeButton">Go to Shop</button>
            </a>        
        `;
    }
}

generateCartItems();

let decreaseQunatity = (id) => {
    // console.log(id);
    let selectedItem = id;
    let search = cartBasket.find((x)=>x.id === selectedItem);
    console.log(search);
    if(search.item === 0) return;
    else if(search !== undefined){
        search.item -= 1;
    }

    update(selectedItem);
    cartBasket = cartBasket.filter((x)=>x.item !== 0);
    
    generateCartItems()
    localStorage.setItem('data', JSON.stringify(cartBasket));
}


let increaseQuantity = (id) => {
    // console.log(id);
    let selectedItem = id;
    let search = cartBasket.find((x)=> x.id === selectedItem);
    console.log(search);
    
    if(search !== undefined){
        search.item += 1;
    }
    update(selectedItem);
    generateCartItems()
    localStorage.setItem('data', JSON.stringify(cartBasket));

}


let totalPrice = () =>{
    if(cartBasket.length !== 0){
        let amount;
        amount = cartBasket.map((x)=>{
            let {id, item} = x;
            let search = shopItemData.find((k)=> k.id === id) || [];
            return item * search.price;
        }).reduce((x,y)=>x+y,0);
        topLabel.innerHTML = `
            <div class="totality-cart" id="totality-cart">
                <span>Total: ${amount} NGN</span>
                <div>
                    <a href="index.html" data-toggle="modal" data-target="#exampleModalCenter">Checkout</a>
                    <button onclick="emptyCart()">Clear</button>
                </div>
            </div>
        `;
    }else return;
} //the sum of all the product prices

let deleteProduct = (id) =>{
    let selectedItem = id;
    cartBasket = cartBasket.filter((x) => x.id !==  selectedItem);
    generateCartItems();
    calculateTotal();
    totalPrice();

    localStorage.setItem('data', JSON.stringify(cartBasket));

}

totalPrice();

let emptyCart = () => {
    cartBasket = [];
    generateCartItems();
    totalPrice();
    localStorage.setItem('data', JSON.stringify(cartBasket));
}


