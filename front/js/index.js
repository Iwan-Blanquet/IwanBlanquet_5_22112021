/*
    AFFICHER et GERER les produits sur la page d'accueil
*/

// Requête API 
let root =  document.querySelector(".items");
fetch("http://localhost:3000/api/products")
    .then(dataProduct => dataProduct.json())
    .then(jsonListProduct => {
        for(let product of jsonListProduct) {
            loadProduct(product);
        }
    })

    // Créer et gérer les balises html pour les produits
function loadProduct(product) {
    let a = document.createElement('a');
    a.href = `./product.html?id=${product._id}`;

    let article = document.createElement('article');

    let img = document.createElement('img');
    img.src = product.imageUrl;
    img.alt = product.altTxt;

    let h3 = document.createElement('h3');
    h3.innerHTML = product.name;
    h3.classList = "productName";

    let p = document.createElement('p');
    p.innerHTML = product.description;
    p.classList = "productDescription";

    article.appendChild(img);
    article.appendChild(h3);
    article.appendChild(p);
    a.appendChild(article);
    root.appendChild(a);
}
