/*
    balise article avec class="cart__item" 
                        data-id="{product-ID}" 
                        data-color="{product-color}"

        balise div avec class="cart__item__img"  (enfant de article)

            balise image avec src "image du produit" alt "du produit" (enfant de div)
                  <img src="../images/product01.jpg" alt="Photographie d'un canapé">

        balise div (enfant de article et qui suis la première div) avec class="cart__item__content"  

            div class="cart__item__content__description" (enfant de cart item content)

                h2 avec nom du produit (enfant de div description)
                p avec colors (enfant de div description, suit le h2)
                p avec prix (enfant de div description suit le p)

            div class="cart__item__content__settings" (enfant de content suite de description)

                div class="cart__item__content__settings__quantity" (efant de settings)

                    p avec quantité (enfant de settings quantity)
                    input pour changer le nombre (enfant de settings quantity suite de p)

                div class="cart__item__content__settings__delete"

                    p class="deleteItem" (enfant de delete)
*/
// Pour chaque id && colors
let item = document.querySelector("#cart_items");
let article = document.createElement('article');
let image = document.createElement('img');
item.appendChild(article);