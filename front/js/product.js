/*
    GERER et AFFICHER les informations des Produits sur leurs propres pages
*/

//Refaire un fetch avec GET id ?

// let product = ; RECUPERER l'id du produit

// let image = document.createElement('img');
// image.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}" />`;
// document.querySelector("item__img").appendChild(image);

let parsedUrl = new URL(window.location.href);
console.log(window.location.href)
console.log(parsedUrl.searchParams.get("id"))