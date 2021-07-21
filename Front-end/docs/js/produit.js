const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
let produitUnique= document.getElementById('produit');

fetch("http://localhost:3000/api/cameras/"+ productId)
        
            .then( res => res.json())
            .then( function(data) {
                console.log(data)
                const maCamera =  `           
                <div class="card">
                   <img src=${data.imageUrl} class="card-img-top border border-bottom-0" alt="...">
                   <div class="card-body border border-top-0">
                        <h5 class="card-title">${data.name}</h5>
                        <p class="card-price">${data.price} €</p>
                        <p class="card-text">${data.description}</p>
                        <select id="lenses"> </select>
                        <label for="quantite">Quantité: </label>
                        <input type="number" id="quantite" name="quantite" min="1" max="100">
                        <button type="button" id="btnAdd" class="btn btn-secondary">Ajouter au panier</button>
                   </div>
                </div>`
                produitUnique.innerHTML += maCamera;

                //Mes options de mon produit
                const optionProduit = data.lenses;
                console.log(optionProduit)
                structureOption = [];
                for (let o = 0; o < optionProduit.length; o++) {
                   structureOption = structureOption + `           
                   <option value ="${optionProduit[o]}">${optionProduit[o]}</option>
                `;
                const positionOption = document.querySelector("#lenses");
                positionOption.innerHTML = structureOption;
                }

                //AJOUT DANS LE PANIER
                let productsBasket = JSON.parse(localStorage.getItem("productsBasket") || "[]");
                const buttonAdd = document.getElementById('btnAdd');
                const idForm = document.querySelector('#lenses');
                const quantiteInput = document.getElementById('quantite');

                console.log(buttonAdd);
                if (buttonAdd) {
                    buttonAdd.addEventListener('click',function(e){
                        e.preventDefault(); 
                
                        const choixForm = idForm.value;
                        const quantite =  quantiteInput.value

                        let optionProduit = {
                            id:data._id,
                            name:data.name,
                            price:data.price,
                            lenses:choixForm,
                            quantite: quantite
                        }
                        productsBasket.push(optionProduit);
                        localStorage.setItem("productsBasket", JSON.stringify(productsBasket));
                
                    // Fentre Confirmation 
                    const fenetreConfirmation = ()=> {
                    if (window.confirm(`${data.name} a bien été ajouté au panier
                    Consulter le panier OK ou revenir à l'accueil ANNULER`)) {
                        window.location.href = "panier.html"
                        
                    } else {
                        window.location.href = "index.html"
                    }
                    }
                    fenetreConfirmation();
                    });
                }
            });




