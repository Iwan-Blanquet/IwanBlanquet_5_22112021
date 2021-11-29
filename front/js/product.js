/*
    GERER et AFFICHER les informations des Produits sur leurs propres pages
*/

//URLSearchParams

// let image = document.createElement('img');
// image.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}" />`;
// document.querySelector("item__img").appendChild(image);

let productUrl = new URL(window.location.href);
let productId = productUrl.searchParams.get("id");


