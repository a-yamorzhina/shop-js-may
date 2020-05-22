/*const products = [
    {id: 1, title: 'Laptop', price: 2000, img: 'img/laptop.png'},
    {id: 2, title: 'Mouse', price: 20, img: 'img/mouse.png'},
    {id: 3, title: 'Keyboard', price: 200, img: 'img/keyboard.png'},
    {id: 4, title: 'Gamepad', price: 50, img: 'img/gamepad.png'},
];

const renderProduct = (title = 'заголовок', price = 'цена', img = 'адрес') => { // 2 - значения по умолчанию
    return `<div class="product-item">
                <h3>${title}</h3>
                 <img class="product-img" src="${img}" alt="img" width="300">
                <p class="price">${price} &#8381 </p>
                <button class="btn buy-btn">Купить</button>
            </div>`
};
const renderPage = list => { //используя стрелочные функции, мы сокращаем код
    console.log(list);
    const productsList = list.map(item => renderProduct(item.title, item.price, item.img));

    let uniteProducts = productsList.join(' ');

    document.querySelector('.products').innerHTML = uniteProducts; // 3 - когда innerHTML принимает массив, он вставляет
    //запятые. Поэтому, мы заранее с помощью метода join объединяем массив в строку
};

renderPage(products);*/

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchProduct();
        this.render();
    }

    _fetchProduct() {
        this.goods = [
            {id: 1, title: 'Laptop', price: 2000, img: 'img/laptop.png'},
            {id: 2, title: 'Mouse', price: 20, img: 'img/mouse.png'},
            {id: 3, title: 'Keyboard', price: 200, img: 'img/keyboard.png'},
            {id: 4, title: 'Gamepad', price: 50, img: 'img/gamepad.png'},
        ]
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
            //block.innerHTML += productObj.render();
        }
    }




class ProductItem {
    constructor(product, img = "https://placehold.it/200x150") {
        this.title = product.title;
        this.id = product.id;
        this.img = product.img;
        this.price = product.price;
    }

    render() {
        return `<div class="product-item">
                <img class="product-img" alt="img" src="${this.img}" width="300">
                <h3>${this.title}</h3>
                <p class="price">${this.price}</p>
                <button class="btn buy-btn">Купить</button>
            </div>`
    }
}

let list = new ProductsList();




