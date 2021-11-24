/*
    AFFICHER les produits sur la page d'accueil
*/

fetch("http://localhost:3000/api/products")
    .then(dataProduct => dataProduct.json())
    .then(jsonListProduct => {
        for(let product of jsonListProduct) {
            document.querySelector(".items").innerHTML += `<a href="./product.html?id=${product._id}">
                                                            <article>
                                                            <img src="${product.imageUrl}" alt="${product.altTxt}, ${product.name}">
                                                            <h3 class="productName">${product.name}</h3>
                                                            <p class="productDescription">${product.description}</p>
                                                            </article>
                                                         </a>`
        }
    });