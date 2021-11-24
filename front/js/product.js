/*
    GERER et AFFICHER les informations des Produits sur leurs propres pages
*/

//Erreur dans le code
fetch("http://localhost:3000/api/products")
    .then(dataProduct => dataProduct.json())
    .then(product => {
        console.log(product)
            // let image =document.createElement('img');
            // image.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}" />`;
            // document.getElementsByClassName("item_img").appendChild(image);
    });
// let image =document.createElement('img');
// image.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}" />`;
// document.getElementsByClassName("item_img").append(image);