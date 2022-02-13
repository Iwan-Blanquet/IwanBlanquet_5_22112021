// *** AFFICHER et GERER le panier et le formulaire ***

let cart = localStorage.getItem('cart');
let isValid = true;
let nbError = 0

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
        image.src = i.imageUrl;
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

        // *** Affichage du nombre d'article total ***
        document.querySelector("#totalQuantity").textContent = getTotalQuantity();

        // *** Affichage du prix total ***
        document.querySelector('#totalPrice').textContent = getTotalPrice();
    };
}

// *** Affichage du panier ***
if(window.location.href.search("cart") > 0){
    loadCart();
    if (cart == null || cart == '[]'){
        let item = document.querySelector('#cart__items');
        let h2 = document.createElement('h2');
        h2.textContent = 'Votre panier est vide';
        item.appendChild(h2);
    }

    // *** Formulaire ***
    document.querySelector('input[type="submit"]').addEventListener('click', (e)=> {
        e.preventDefault();
        let form = document.querySelector('form');

        // *** Vérification de la validité des champs ***

        validFirstName(form.firstName);
        validLastName(form.lastName);
        validAddress(form.address);
        validCity(form.city);
        validEmail(form.email);

        //*** Vérification des erreurs des champs ***
        if (nbError > 0) {
            isValid = false;
        } else {
            isValid = true;
        }

        //*** réinitialisation du nombre d'erreur ***
        nbError = 0;
        
        // *** Envoi du formulaire valide ***
        if(isValid){

            // *** Vérifiez que le panier n'est pas vide ***
            if (cart == null || cart == '[]') {
                    alert('votre panier est vide');
            } else {

                //Création d'un objet contact (données du formulaire)
                let contact = {
                    firstName: form.firstName.value,
                    lastName: form.lastName.value,
                    address: form.address.value,
                    city: form.city.value,
                    email: form.email.value,
                };
                let products = [];
                let orderId = undefined;
                collectOrderData();
                sendData();

                //Création du tableau des produits
                function collectOrderData() {
                    let cart = getCart();
                    for(let article of cart) {
                        products.push(article.id);
                    }
                }

                //Envoi des données au server avec une requête POST
                function sendData(){
                    let order ={
                        contact,
                        products
                    };
                    fetch('http://localhost:3000/api/products/order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(order),
                    })
                    .then(response => {
                        response.json().then(data=>{
                            orderId = data.orderId
                            if (orderId != undefined || orderId != null) {
                                location.href="confirmation.html?" + orderId;
                            }
                        })
                    })
                }
            }        
        }
    });
} else {
    //Si nous sommes sur la page confirmation
    if(window.location.href.search("confirmation") > 0) {
        let orderId = window.location.search.replace("?", "");
        document.getElementById("orderId").innerHTML = orderId;
        localStorage.removeItem('cart');
    }
}


// *** Calcul du nombre total d'artcle ***
function getTotalQuantity() {
    let cart = getCart(); 
    let quantity = 0;
    for (let product of cart) {
        quantity += parseInt(product.quantity); 
    }
    return quantity;
}

// *** Calcul du prix total ***
function getTotalPrice() {
    let cart = getCart(); 
    let price = 0;
    for (let product of cart) {
        price += parseInt(product.price) * parseInt(product.quantity); 
    }
    return price;
}

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

// *** Modifier la quantité du produit ***
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

// *** Validation du champ prénom ***
function validFirstName(input) {
    let firstNameRegExp = new RegExp("[a-zA-Z-]", "g");
    let testfirstName = firstNameRegExp.test(input.value);
    
    if(testfirstName) {
        input.nextElementSibling.innerHTML = "";
    } else {
        nbError ++;
        if (input.validity.valueMissing) {
            input.nextElementSibling.innerHTML = "Ce champ est obligatoire.";
        } else {
            input.nextElementSibling.innerHTML = "Votre Prénom ne peut contenir que des lettres.";
        }
    }
}

// *** Validation du champ nom ***
function validLastName(input) {
    let lastNameRegExp = new RegExp("[a-zA-Z-]", "g");
    let testLastName = lastNameRegExp.test(input.value);
    
    if(testLastName) {
        input.nextElementSibling.innerHTML = "";
    } else {
        nbError ++;
        if (input.validity.valueMissing) {
            input.nextElementSibling.innerHTML = "Ce champ est obligatoire.";
        } else {
            input.nextElementSibling.innerHTML = "Votre Nom ne peut contenir que des lettres.";
        }
    }
}

// *** Validation du champ adresse ***
function validAddress(input) {
    let addressRegExp = new RegExp("[a-zA-Z-0-9']", "g");
    let testAddress = addressRegExp.test(input.value);
    
    if(testAddress) {
        input.nextElementSibling.innerHTML = "";
    } else {
        nbError ++;
        if (input.validity.valueMissing) {
            input.nextElementSibling.innerHTML = "Ce champ est obligatoire.";
        } else {
            input.nextElementSibling.innerHTML = "Votre Adresse ne peut pas contenir que caractères spéciaux.";
        }
    }
}

// *** Validation du champ ville ***
function validCity(input) {
    let cityRegExp = new RegExp("[a-zA-Z-']", "g");
    let testCity = cityRegExp.test(input.value);
    
    if(testCity) {
        input.nextElementSibling.innerHTML = "";
    } else {
        nbError ++;
        if (input.validity.valueMissing) {
            input.nextElementSibling.innerHTML = "Ce champ est obligatoire.";
        } else {
            input.nextElementSibling.innerHTML = "Votre Ville ne peut contenir que des lettres.";
        }
    }
}

// *** Validation du champ email ***
function validEmail(input) {
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
    let testEmail = emailRegExp.test(input.value);
    
    if(testEmail) {
        input.nextElementSibling.innerHTML = "";
    } else {
        nbError ++;
        if (input.validity.valueMissing) {
            input.nextElementSibling.innerHTML = "Ce champ est obligatoire.";
        } else {
            input.nextElementSibling.innerHTML = "Votre email n'est pas valide, exemple : kolo@gmail.com."
        }
    }
}