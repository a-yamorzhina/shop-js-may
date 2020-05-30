const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
let products = [];
let basket = [];
let cart = [];

//оптимизировать код ниже
class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const block = document.querySelector(this.container);

        this._getProducts()
            .then(data => {
                this.goods = [...data];
                for (let product of this.goods) {
                    const productObj = new ProductItem(product);
                    this.allProducts.push(productObj);
                    products.push(productObj);
                    block.insertAdjacentHTML('beforeend', productObj.render());
                }
            });
    }
}

//метод, считающий сумму всех товаров
function calcTotal() {

    let sum = 0;

    for (let product of this.goods) {
        sum = sum + product.price;
    }

    return sum;
}


class ProductItem {
    constructor(product, img = "https://placehold.it/200x150") {
        this.product_name = product.product_name;
        this.id_product = product.id_product;
        this.img = img;
        this.price = product.price;
    }

    render() {
        return `<div class="product-item">
                <img class="product-img" alt="img" src="${this.img}" width="300">
                <h3>${this.product_name}</h3>
                <p class="price">${this.price}</p>
                <button class="buy-btn btn" onclick="clickBasket(${this.id_product})">Купить</button>
            </div>`
    }
}

let list = new ProductsList();
list.render();
// list.calcTotal();


//вывести по клику на корзину данные json getBasket
class Basket {

    getJson(url){
        return fetch(url)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    get() {
        return fetch(`${API}/getBasket.json`)
            .then((response) => response.json())
            .catch(error => {
                console.log(error);
            })
    }


    addToBasket(id) {

        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if(data.result === 1){
                    let product = null;
                    products.forEach(function (item, i, allProducts) {
                        if (id === item.id_product) {
                            product = item;
                        }
                    });

                    if(product !== null) {
                        let isNew = true;
                        basket.forEach(function (item, i, arr) {
                            if (item.id_product === product.id_product) {
                                isNew = false;
                                basket[i].quantity++;
                            }
                        });
                        if(isNew) {
                            product.quantity = 1;
                            basket.push(product);
                        }
                    }
                    this.recall();

                    let newQuantity = 1;

                    basket.forEach(function (item, i, arr) {
                        if (item.id_product === id) {
                            newQuantity = item.quantity;
                        }
                    });

                    let block = document.querySelector(`.cart-products[data-id="${id}"]`);

                    if(block) {
                        block.querySelector('.product-quantity').textContent = newQuantity;
                    }
                } else {
                    alert('Error');
                }
            });


    }

    delFromBasket(id) {

        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if(data.result === 1){
                    let product = null;
                    products.forEach(function (item, i, allProducts) {
                        if (id === item.id_product) {
                            product = item;
                        }
                    });

                    if(product !== null) {
                        basket.forEach(function (item, i, arr) {
                            if (item.id_product === product.id_product) {
                                basket[i].quantity--;
                                if(basket[i].quantity < 1) {
                                    basket.splice(i, 1);
                                }
                            }
                        });
                    }

                    let newQuantity = 0;

                    basket.forEach(function (item, i, arr) {
                        if (item.id_product === id) {
                            newQuantity = item.quantity;
                        }
                    });

                    let block = document.querySelector(`.cart-products[data-id="${id}"]`);

                    if(newQuantity > 0) {
                        block.querySelector('.product-quantity').textContent = newQuantity;
                    }

                    if(newQuantity === 0) {
                        block.remove();
                    }

                    if(basket.length < 1) {
                        let disabled = document.querySelector('.clean');
                        disabled.disabled = true;
                    }

                    this.recall();
                } else {
                    alert('Error');
                }
            });
    }

    recall() {

        let countGoods = 0;
        let amount = 0;

        console.log(basket);
        basket.forEach(function (item) {

            // console.log(amount);
            countGoods += item.quantity;
            amount += item.price * item.quantity;
        });

        let total = document.getElementById('total');
        let totalHtml = '<hr> <span class="count">Количество товаров: ' + '<span class="bold"> ' + countGoods + ' </span>' + '</span>\n' +
            '<p class="final">Стоимость товаров: ' + '<span class="bold"> ' + amount + ' </span>' + '</p>';
        total.innerHTML = totalHtml;
    }

    //очищает корзину
    remove() {
        basket = [];
        this.recall();
    }
}

function clickBasket(id) {

    let basket = new Basket();
    basket.addToBasket(id);

}


function showModal() {

    cart = document.getElementById('cart-product');
    cart.innerHTML = null;

    basket.forEach(function (item) {
        let html = '<div class="cart-products" data-id=' + item.id_product +'><p class="cart-id_product">' + item.id_product + '</p>\n' +
            '<p class="cart-product_name">' + item.product_name + '</p>\n' +
            '<p class=cart-price">' + item.price + '</p>\n' +
            '<p class="cart-quantity"> <svg onclick="minusEl(' + item.id_product + ')" class="minus" xmlns="http://www.w3.org/2000/svg" height="14px"\n' +
            '                                                               viewBox="0 -192 469.33333 469" width="14px">\n' +
            '                                <path d="m437.332031.167969h-405.332031c-17.664062 0-32 14.335937-32 32v21.332031c0\n' +
            '                                17.664062 14.335938 32 32 32h405.332031c17.664063 0 32-14.335938\n' +
            '                                32-32v-21.332031c0-17.664063-14.335937-32-32-32zm0 0"/></svg><span class="product-quantity"> ' + item.quantity + ' </span>\t<svg\n' +
            '                                    onclick="plusEl(' + item.id_product + ')" class="plus" height="14px" viewBox="0 0 469.33333 469.33333" width="14px"\n' +
            '                                    xmlns="http://www.w3.org/2000/svg"><path d="m437.332031 192h-405.332031c-17.664062\n' +
            '                                    0-32 14.335938-32 32v21.332031c0 17.664063 14.335938 32 32 32h405.332031c17.664063\n' +
            '                                    0 32-14.335937 32-32v-21.332031c0-17.664062-14.335937-32-32-32zm0 0"/><path d="m192\n' +
            '                                    32v405.332031c0 17.664063 14.335938 32 32 32h21.332031c17.664063 0 32-14.335937\n' +
            '                                    32-32v-405.332031c0-17.664062-14.335937-32-32-32h-21.332031c-17.664062 0-32 14.335938-32\n' +
            '                                    32zm0 0"/></svg></p></div>';

        cart.insertAdjacentHTML('beforeend', html);
    });

    let basketClass = new Basket();
    basketClass.recall();

    let myModal = document.getElementById('myModal');
    myModal.classList.add('show');

    let disabled = document.querySelector('.clean');
    if(basket.length < 1) {
        disabled.disabled = true;
    } else {
        disabled.disabled = false;
    }
}

function minusEl(id_product) {
    let basketClass = new Basket();
    basketClass.delFromBasket(id_product);
}

function plusEl(id_product) {
    let basketClass = new Basket();
    basketClass.addToBasket(id_product);
}

function closeModal() {
    let closeModal = document.getElementById('myModal');
    closeModal.classList.remove('show');
}

//очищает корзину
function clearBasket() {
    let basket = new Basket();
    basket.remove();


    let disabled = document.querySelector('.clean');
    disabled.disabled = true;

    let block = document.querySelector(`.cart-products`);
        block.remove();
}

//оформление заказа
function checkout() {
    alert('clear');
}



