const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

//оптимизировать код ниже
class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._getProducts() //вот здесь промис - его оптимизировать
            .then(data => {
                this.goods = [...data];
                this.render()
            });
    }

    /*    _fetchProduct() {
            this.goods = [
                {id: 1, title: 'Laptop', price: 2000, img: 'img/laptop.png'},
                {id: 2, title: 'Mouse', price: 20, img: 'img/mouse.png'},
                {id: 3, title: 'Keyboard', price: 200, img: 'img/keyboard.png'},
                {id: 4, title: 'Gamepad', price: 50, img: 'img/gamepad.png'},
            ]
        }*/


    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());

        }

    }

    //метод, считающий сумму всех товаров
    calcTotal() {
        // console.log(this.goods);
        let sum = 0;

        for (let product of this.goods) {
            sum = sum + product.price;
        }
        // console.log(sum);
        return sum;
    }
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
                <button class="buy-btn btn">Купить</button>
            </div>`
    }
}

let list = new ProductsList();
list.calcTotal();


//вывести по клику на корзину данные json getBasket
class Basket {

    get() {
        return fetch(`${API}/getBasket.json`)
            .then((response) => response.json())
            .catch(error => {
                console.log(error);
            })
    }

    addGoods() {

    }

    removeGoods() {

    }

    changeGoods() {

    }
}

class elemBasket {

}


function showModal() {

    let basket = new Basket();
    basket.get().then(data => {
        let basketElements = data;

        // console.log(basketElements.amount);
        // document.getElementById('amount').innerText = (`${basketElements.amount}`);

        basketElements.contents.forEach(function (item) {
            let cart = document.getElementById('cart-product');
            let html = '<div class="cart-products"><p class="cart-id_product">' + item.id_product + '</p>\n' +
                '<p class="cart-product_name">' + item.product_name + '</p>\n' +
                '<p class="cart-price">' + item.price + '</p>\n' +
                '<p class="cart-quantity">' + item.quantity + '</p></div>';

            cart.insertAdjacentHTML('beforeend', html);
        });

        let total = document.getElementById('total');
        let totalHtml = '<span class="count bold">Количество товаров: '+basketElements.countGoods+'</span>\n' +
            '<p class="final bold">Стоимость товаров: '+basketElements.amount+'</p>';
        total.innerHTML = totalHtml;

        let myModal = document.getElementById('myModal');
        myModal.classList.add('show');
    });


}

function closeModal() {
    let closeModal = document.getElementById('myModal');
    closeModal.classList.remove('show');

}

