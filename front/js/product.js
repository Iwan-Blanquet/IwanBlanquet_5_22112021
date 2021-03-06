// *** GERER et AFFICHER les informations des Produits sur leurs propres pages ***

// *** Récupération de l'id du produit ***

const productUrl = new URL(window.location.href);
const productId = productUrl.searchParams.get("id");
/*
    *** Requête API ***
    *** Récupération des données du produit uniquement ***
*/ 

fetch('http://localhost:3000/api/products/' + productId)
    .then(response => response.json())
    .then(currentProduct => {
        
        loadImage(currentProduct);
        loadDataProductId(currentProduct);
        loadOption(currentProduct);

    })

// *** Affichage de l'image du produit ***

function loadImage(currentProduct) {
    let item__img = document.querySelector(".item__img");
    let image = document.createElement('img');
    image.src = currentProduct.imageUrl; 
    image.alt = currentProduct.altTxt ;
    item__img.appendChild(image);
}

// *** Affichage des information du produit ***

function loadDataProductId(currentProduct) {
    let h1 = document.querySelector("#title");
    let span = document.querySelector("#price");
    let p = document.querySelector("#description");
    document.title = currentProduct.name;
    h1.textContent = currentProduct.name ;
    span.textContent = currentProduct.price;
    p.textContent = currentProduct.description ;  
}

// *** Affichage des options ***

function loadOption(currentProduct) {
    currentProduct.colors.forEach(element => {
        let color = document.querySelector("#colors");
        let option = document.createElement('option');
        option.setAttribute("value", element);
        option.textContent = element;
        color.appendChild(option);
        
    });
}

//***Sauvegarder les données dans le localStorage ***
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// *** Récuperer les données du localStorage ***
function getCart() {
    cart = localStorage.getItem('cart');
    if(cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}

// *** Ajout au panier ***
function addToCart(cart){
    cart = getCart();
    if (cart) {
        let isPresent = false;
        // *** Vérifier que le produit est déjà dans le localStorage ***
        cart.forEach (element =>{
            if (element.id === productId && element.colors === document.getElementById('colors').value) {
                element.quantity = parseInt(element.quantity) + parseInt(document.getElementById('quantity').value);
                isPresent = true;
            };
        });
        // *** Créer et sauvegarder le produit dans le localStorage ***
        if (isPresent == false) {
            let item = {
                id: productId,
                name: document.querySelector("#title").textContent,
                colors: document.getElementById('colors').value,
                quantity: document.getElementById('quantity').value,
                price: document.getElementById('price').textContent,
                imageUrl : document.querySelector(".item__img").children[0].src,
                altTxt : document.querySelector(".item__img").children[0].alt
                
            }
            cart.push(item); 
        }
    saveCart(cart);
    }
} 

// *** Evènement qui permet l'ajout dans le panier ***
const button = document.querySelector('#addToCart');
button.addEventListener("click", (e) => {
    e.preventDefault();
    let quantity = document.getElementById('quantity').value;
    let option = document.getElementById('colors').value;
    if (option == "") {
        alert(' Veuillez choisir une couleur')
    } else if (quantity < 1 || quantity > 100){
        alert('Vous devez choisir une quantité entre 1 et 100 !');
    } else {
        addToCart();
        alert('Votre article a été ajouté au panier !');
        if (confirm('Voulez-vous voir votre panier ?')) {
            window.location.href = "cart.html";
        }
    } 
});