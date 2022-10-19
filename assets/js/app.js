let productContainer = document.getElementById('product-container');
let cartItemCount = document.querySelector('.cart-items');



let cartBasket = JSON.parse(localStorage.getItem('data')) || []; //get item from local storage if there's any

let addProductstoCart;
let generateShop = () => {
    return productContainer.innerHTML = shopItemData.map(function(x){
        return    `
            <div id="product-item-${x.id}" class="sneaker-product product-1 my-5 col-sm-6 col-md-4 col-lg-3 ">
                <img class="img-fluid product-image  p-3 d-block mx-auto"  src="${x.img}" alt="Responsive Image">
                <button class="add-to-cart d-block mx-auto" onclick="addProductstoCart(${x.id})"><i class="fa-solid fa-cart-arrow-down d-block mx-auto w-25 p-2"></i>Add to Cart</button>
                <h5 class="product-name text-center">${x.name}</h5>
                <span class="product-price text-center d-block mx-auto">${x.price} NGN</span><br>
            </div>
        `;
    }).join("");
        
}

generateShop();

addProductstoCart = (id) =>{
    console.log(id);
    let selectedItem = id;
    let searchforId = cartBasket.find((x)=> x.id === selectedItem); 
    if(searchforId === undefined){
        cartBasket.push({
            id: selectedItem,
            item: 1
        });
    } else{
        searchforId.item += 1;
    }
    
    // console.log(cartBasket);

    update(selectedItem);
    // set the localStorage
    localStorage.setItem('data', JSON.stringify(cartBasket));

}

let update = (id) => {
    let searchforId = cartBasket.find((x)=> x.id === id);
    cartItemCount.innerHTML = searchforId.item;
    calculateTotal();
    localStorage.setItem('data', JSON.stringify(cartBasket));
}

let calculateTotal = () => {
    cartItemCount.innerHTML = cartBasket.map((x)=> x.item).reduce((x,y)=>x+y,0);
    // console.log(cartBasket.map((x)=> x.item).reduce((x,y)=>x+y,0));
}

calculateTotal();

