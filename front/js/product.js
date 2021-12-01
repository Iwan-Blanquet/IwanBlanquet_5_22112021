/*
    GERER et AFFICHER les informations des Produits sur leurs propres pages
*/

//URLSearchParams

// Récupération de l'id du produit

let productUrl = new URL(window.location.href);
let productId = productUrl.searchParams.get("id");

console.log(productUrl);
console.log(productId);

/*
    Requête API
    Récupération des données du produit uniquement 
*/ 

fetch('http://localhost:3000/api/products/' + productId)
    .then(response => response.json())
    .then(productId => {
        console.log(productId);
        loadImage(productId);
        loadDataProductId(productId);
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
    h1.textContent = productId.name ;
    span.textContent = productId.price;
    p.textContent = productId.description ;  
}

// Affichage des options
/*
    Pour chaque option de couleur (for option of color)
        Selectionner le bloc où sera créer les options (document.querySelector(colors))
        Créer un élément option (document.createElement(option))
        On donne à l'élément option la classe value (option.classList = value)
        On assigne la valeur de color à la classe value (??)
        On ajoute au texte de l'élément le nom de la valeur (option.textContent = ??)
        On implente l'élément créer au html
*/
/*
function loadOption(productId) {
    let colors = document.querySelector("#colors");
    let option = document.createElement('option');

}
*/