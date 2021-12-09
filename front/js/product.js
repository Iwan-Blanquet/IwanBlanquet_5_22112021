/*
    GERER et AFFICHER les informations des Produits sur leurs propres pages
*/

//URLSearchParams

// Récupération de l'id du produit

let productUrl = new URL(window.location.href);
let productId = productUrl.searchParams.get("id");

/*
Pour la page panier
let price = null;
*/


/*
    Requête API
    Récupération des données du produit uniquement 
*/ 

fetch('http://localhost:3000/api/products/' + productId)
    .then(response => response.json())
    .then(productId => {
        
        loadImage(productId);
        loadDataProductId(productId);
        loadOption(productId);

    })


// Affichage de l'image du produit

function loadImage(productId) {
    let item__img = document.querySelector(".item__img");
    let image = document.createElement('img');
    image.src = productId.imageUrl; 
    image.alt = productId.altTxt ;
    item__img.appendChild(image);
}

// Affichage des information du produit

function loadDataProductId(productId) {
    let h1 = document.querySelector("#title");
    let span = document.querySelector("#price");
    let p = document.querySelector("#description");
    document.title = productId.name;
    h1.textContent = productId.name ;
    span.textContent = productId.price;
    p.textContent = productId.description ;  
}

// Affichage des options

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
    AJOUT du produit dans le panier
    (Créer un fichier ajout_au_panier.js  pour y écrire les fonctions à appeler ?)
    Sauvegarde des informations du produit au click (nom,option, nombre) dans le localStorage (sauvegarde de chaine de caractère)
    Afficher les informations du produit dans la page panier
        SI une sauvegarde existe déjà avec le même nom, option ajouter nombre de la nouvelle selection à l'ancien
        SINON faire une nouvelle sauvegarde à afficher dans le panier

    1-Sauvegarde du produit

        Event au click (document.querySelector("#addToCart").addEventListener("onclick", une_fonction_à_créer))

        une_fonction_à_créer doit : sauvegarder les données du produit (id, nom, option, nombre) dans le localStorage
        les informations (product) sont id: id_du_produit name: nom_du_produit, colors: option_choisi, number: nombre_choisi, Un Objet javascript à transformer en chaine de caractère (sérialiser) 
        JSON.stingify et JSON.parse                         

 */
/*
    Soit créer les fonctions et faire appel dans le fetch pour récupérer les données
    soit le faire en dehors et récup les données de la page html
*/

let product = {
    id: productId,
    name: document.querySelector("#title").textContent,
    price: document.querySelector("#price").textContent,
    colors: document.getElementById('colors').value,
    number: document.getElementById('quantity').value
}


// Evènement au click du boutton ajouter au panier
let button = document.querySelector('#addToCart');
button.addEventListener("click", addCart)

// Sauvegarder les données dans le localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    
}

// Récupérer les données dans le localStorage
function getCart() {
    let cart = localStorage.getItem('cart');
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(localStorage.getItem('cart'));
    }
}

//Ajouter un produit dans le panier (product = les données du produit)
function addCart(product) {
    let cart = getCart();
    cart.push(product);
    saveCart(cart);
}

//Supprimer un produit du panier

//Changer la quantité d'un produit

//Calcul du nombre total de produit dans le panier

//Calcul du prix total du panier
