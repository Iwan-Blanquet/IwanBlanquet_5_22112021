/*
            balise image avec src "image du produit" alt "du produit" (enfant de div)
                  <img src="../images/product01.jpg" alt="Photographie d'un canapé">

*/

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
    products.forEach(element => {
        let article = document.createElement('article');
        article.classList.add('cart__item');
        article.setAttribute('data-id', `${element.id}`);
        article.setAttribute('data-color', `${element.colors}`)
    
        let divImg = document.createElement('div');
        divImg.classList.add('cart__item__img');
    
        let image = document.createElement('img');
        // image.src = product.imageURL;
        // image.alt = product.altTxt;
    
        let divContent = document.createElement('div');
        divContent.classList.add('cart__item__content');
    
        let divDescription = document.createElement('div');
        divDescription.classList.add('cart__item__content__description');
    
        let h2 = document.createElement('h2');
        h2.textContent = element.name;
    
        let pColor = document.createElement('p');
        pColor.textContent = element.colors;
    
        let pPrice = document.createElement('p');
        pPrice.textContent = element.price;
    
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
        input.setAttribute('value', element.quantity);

        let divDelete = document.createElement('div');
        divDelete.classList.add('cart__item__content__settings__delete');

        let pDelete = document.createElement('p');
        pDelete.classList.add('deleteItem');
        pDelete.textContent = 'Supprimer';
 
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
    });
}

// *** Affichage du panier ***
loadCart();

// *** Calcul du nombre total d'artcle ***
function getTotalQuantity() {
    let cart = getCart();
    let quantity = 0;
    for (let product of cart) {
        quantity = parseInt(quantity) + parseInt(product.quantity); 
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
        price = parseInt(price) + parseInt(product.price); 
    }
    return price;
}
// *** Affichage du prix total ***
document.querySelector('#totalPrice').textContent = getTotalPrice();

// *** Modifier la quantité ***

// *** Supprimer un article ***

