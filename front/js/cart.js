
//***Sauvegarder les données dans le localStorage ***
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// *** Recuperer le localStorage ***
function getCart() {
    cart = localStorage.getItem('cart');
    if(cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}

// *** Charger le tableau pour chaque elément du localStorage ***
function loadCart() {
    let item = document.querySelector('#cart__items');
    let products = getCart();
    for (let i of products) {
        let article = document.createElement('article');
        article.classList.add('cart__item');
        article.setAttribute('data-id', `${i.id}`);
        article.setAttribute('data-color', `${i.colors}`)
    
        let divImg = document.createElement('div');
        divImg.classList.add('cart__item__img');
    
        let image = document.createElement('img');
        image.src = i.imageURL;
        image.alt = i.altTxt;
    
        let divContent = document.createElement('div');
        divContent.classList.add('cart__item__content');
    
        let divDescription = document.createElement('div');
        divDescription.classList.add('cart__item__content__description');
    
        let h2 = document.createElement('h2');
        h2.textContent = i.name;
    
        let pColor = document.createElement('p');
        pColor.textContent = i.colors;
    
        let pPrice = document.createElement('p');
        pPrice.textContent = i.price;
    
        let divSettings = document.createElement('div');
        divSettings.classList.add('cart__item__content__settings');
    
        let divQuantity = document.createElement('div');
        divQuantity.classList.add('cart__item__content__settings__quantity');
    
        let pQuantity = document.createElement('p');
        pQuantity.textContent = 'Qté : ';
        
        let input = document.createElement('input');
        input.setAttribute('type', 'number');
        input.classList.add('itemQuantity');
        input.setAttribute('name', 'itemQuantity');
        input.setAttribute('min', '1');
        input.setAttribute('max', '100');
        input.setAttribute('value', i.quantity);

        let divDelete = document.createElement('div');
        divDelete.classList.add('cart__item__content__settings__delete');

        let pDelete = document.createElement('p');
        pDelete.classList.add('deleteItem');
        pDelete.textContent = 'Supprimer';
        // pDelete.id = `${i.id}`;
        // pDelete.classList.add(`${i.colors}`);
 
        article.appendChild(divImg);
        divImg.appendChild(image);
        article.appendChild(divContent);
        divContent.appendChild(divDescription);
        divDescription.appendChild(h2);
        divDescription.appendChild(pColor);
        divDescription.appendChild(pPrice);
        divContent.appendChild(divSettings);
        divSettings.appendChild(divQuantity);
        divQuantity.appendChild(pQuantity);
        divQuantity.appendChild(input);
        divSettings.appendChild(divDelete);
        divDelete.appendChild(pDelete);
        item.appendChild(article);
    };
}

// *** Affichage du panier ***
loadCart();

// *** Calcul du nombre total d'artcle ***
function getTotalQuantity() {
    let cart = getCart(); 
    let quantity = 0;
    for (let product of cart) {
        quantity += parseInt(product.quantity); 
    }
    return quantity;
}

// *** Affichage du nombre d'article total ***
document.querySelector("#totalQuantity").textContent = getTotalQuantity();

// *** Calcul du prix total ***
function getTotalPrice() {
    let cart = getCart(); 
    let price = 0;
    for (let product of cart) {
        price += parseInt(product.price) * parseInt(product.quantity); 
    }
    return price;
}
// *** Affichage du prix total ***
document.querySelector('#totalPrice').textContent = getTotalPrice();

// *** Supprimer un article ***

function removeFromCart (productDataId, productDataColors){
    let cart = getCart();
    cart = cart.filter(p => {
        if (p.id != productDataId) {
            return true;
        } else {
            if (p.colors != productDataColors) {
                return true;
            } else {
                return false;
            }
        }
    });
    console.log(cart);
    saveCart(cart);
    window.location.reload();
}

// *** Event au click sur supprimer, suppression de l'article ***

document.querySelectorAll('.deleteItem').forEach( (item) => {
        item.addEventListener('click', () => {
            let product = item.closest('.cart__item');
            let productDataId = product.dataset.id
            let productDataColors = product.dataset.color
            removeFromCart(productDataId, productDataColors);
        })
    });


// *** Modifier la quantité d'un produit***


// *** Changer la quantité du produit ***

function changeQuantity(quantityEvent) {
    let cart = getCart();
    let newQuantity = quantityEvent.target.value;
    let currentProduct = this.closest('.cart__item');
    let currentProductDataId = currentProduct.dataset.id
    let currentProductDataColors = currentProduct.dataset.color
    let foundCurrentProduct = cart.find(p => {
        if (p.id == currentProductDataId) {
            if (p.colors == currentProductDataColors) {
                p.quantity = newQuantity;
                if (p.quantity <= 0) {
                    removeFromCart(currentProductDataId, currentProductDataColors)
                } else {
                    saveCart(cart);
                    window.location.reload();
                }
            }
        }
    });
}
// *** Event au changement de l'input d'un produit ***

let itemQuantity = document.querySelectorAll(".itemQuantity");
for( let item of itemQuantity ) {
   item.addEventListener('change', changeQuantity);
}