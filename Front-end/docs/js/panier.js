const positionPanier = document.getElementById('text');
const productsBasket = JSON.parse(localStorage.getItem("productsBasket"));

// -------------  Afficher mon panier ---------------------
function afficherPanier(productsBasket) {
    for (let i = 0; i < productsBasket.length; i++) {
        
        const panierFinal = `
    <tr>
      <th scope="row">${productsBasket[i].name}</th>
      <td>${productsBasket[i].price}</td>
      <td>${productsBasket[i].quantite}</td>
      <td>${productsBasket[i].lenses} <button class="btn-supp" onclick="removeItem(productsBasket,${[i]} )"> Supprimer</button></td>
    </tr>
    `
        //Injection du code HTML dans la page panier
        positionPanier.innerHTML += panierFinal ;  
    };
}
function afficherPanierVide() {
    const panierVide = `
    <tr>
      Panier Vide
    </tr>
    `
    positionPanier.innerHTML = panierVide;
}

function removeItem(productsBasket, i) {
    
        let getId = productsBasket[i].id;
        productsBasket= productsBasket.filter(
            (el) => el.id !== getId
        );
        console.log(productsBasket);
        localStorage.setItem("productsBasket",JSON.stringify(productsBasket));

        alert("Ce produit a été supprimé du panier");
        window.location.href = "panier.html"
    
}

if (productsBasket == 0) {
    afficherPanierVide()
} else {
    afficherPanier(productsBasket);
}

//-------------Montant total du panier -----------
function calculTotal(productsBasket) {
    const tableauPrix = [];

    for (let p = 0; p < productsBasket.length; p++) {

        let prixProduits = productsBasket[p].price * productsBasket[p].quantite;
        tableauPrix.push(prixProduits);
    };
    //Additionner les prix du tableau prixTotal
    const reducer = (accumulator, currentValue) => accumulator + currentValue ;
    prixTotal = tableauPrix.reduce(reducer,0);
    const recapPrix = 
    `
    <tbody>
        <tr class="container-total">
        <td>Le prix total est de ${prixTotal} €</td>
        </tr>
    </tbody>`;
    positionPanier.insertAdjacentHTML("beforeend", recapPrix);
    localStorage.setItem("tableauPrix",JSON.stringify(prixTotal));
    return recapPrix;
}
calculTotal(productsBasket);

