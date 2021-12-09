// *** GERER et AFFICHER les informations des Produits sur leurs propres pages ***

// *** Récupération de l'id du produit ***

let productUrl = new URL(window.location.href);
let productId = productUrl.searchParams.get("id");

/*
    *** Requête API ***
    *** Récupération des données du produit uniquement ***
*/ 

fetch('http://localhost:3000/api/products/' + productId)
    .then(response => response.json())
    .then(productId => {
        
        loadImage(productId);
        loadDataProductId(productId);
        loadOption(productId);

    })

// *** Affichage de l'image du produit ***

function loadImage(productId) {
    let item__img = document.querySelector(".item__img");
    let image = document.createElement('img');
    image.src = productId.imageUrl; 
    image.alt = productId.altTxt ;
    item__img.appendChild(image);
}

// *** Affichage des information du produit ***

function loadDataProductId(productId) {
    let h1 = document.querySelector("#title");
    let span = document.querySelector("#price");
    let p = document.querySelector("#description");
    document.title = productId.name;
    h1.textContent = productId.name ;
    span.textContent = productId.price;
    p.textContent = productId.description ;  
}

// *** Affichage des options ***

function loadOption(productId) {
    productId.colors.forEach(element => {
        let color = document.querySelector("#colors");
        let option = document.createElement('option');
        option.setAttribute("value", element);
        option.textContent = element;
        color.appendChild(option);
        
    });
}

/*
    *** Evènement au click du boutton ajouter au panier ***
    *** Sauvegarder les données dans le localStorage ***
*/

let button = document.querySelector('#addToCart');
button.addEventListener("click", ()=>{
    let cart = [];
    let lCart = localStorage.getItem('cart');
    if (lCart) {
        lCart = JSON.parse(lCart);
        let isPresent = false;
        console.log(lCart);
        lCart.forEach (element =>{
            if (element.id === productId && element.colors === productId.colors) {
                element.quantity = document.getElementById('quantity').value;
                isPresent =true;
            }
        })
        console.log(lCart);
        cart = lCart;
    }else{
        let item = {
            id: productId,
            name: productId.name,
            colors: document.getElementById('colors').value,
            quantity: document.getElementById('quantity').value
        }
        console.log(lCart);
        cart.push(item);
        console.log(cart);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
});


//Dans la page panier

//Supprimer un produit du panier

//Changer la quantité d'un produit

//Calcul du nombre total de produit dans le panier

//Calcul du prix total du panier
