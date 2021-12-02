/*
    GERER et AFFICHER les informations des Produits sur leurs propres pages
*/

//URLSearchParams

// Récupération de l'id du produit

let productUrl = new URL(window.location.href);
let productId = productUrl.searchParams.get("id");

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


//Message à l'ajout au panier