//Selecteurs
const commande = document.getElementById('recap_panierForm');
const panierCommande = document.getElementById('text');
const text = document.getElementById('textCommande')
const buttonEnvoyer = document.getElementById('envoyerForm');
const orderId = JSON.parse(localStorage.getItem("orderId"));
const productsBasket = JSON.parse(localStorage.getItem("productsBasket"));
const contact = JSON.parse(localStorage.getItem("contact"));
const totalPrix = JSON.parse(localStorage.getItem("tableauPrix"));
//-----------------------------------------------------
console.log(orderId)
console.log(orderId.contact)

const textCommande = `  
<h3> Nous vous remercions pour votre commande. </br>Votre numéro de commande est ${orderId.orderId}</h3>
`;
text.insertAdjacentHTML("beforebegin",textCommande);


//structure html pour le panier
for (let i = 0; i < productsBasket.length; i++) {
const structureCommande = `  
          <tr>
            <th scope="row">${productsBasket[i].name}</th>
            <td>${productsBasket[i].price}</td>
            <td>${productsBasket[i].quantite}</td>
            <td>${productsBasket[i].lenses}</td>
            </tr>
        
`;
//Injection du html
panierCommande.innerHTML += structureCommande;
};
const prix = 
`
<tbody>
    <tr class="container-total">
      <td class="prix">Le prix total est de ${totalPrix} €</td>
    </tr>
</tbody>
`;
panierCommande.insertAdjacentHTML("beforeend", prix);

//--------------------------------------------

  const structureDestinataire = `  
  <h2>Destinataire</h2>
  <table class="table table2" id="destinataire">
        <thead class="thead-dark">
        <tr>
        <th scope="col">Prénom</th>
        <th scope="col">Nom</th>
        <th scope="col">Adresse</th>
        <th scope="col">Ville</th>
        <th scope="col">Code Postal</th>
        <th scope="col">Email</th>
        </tr>
        </thead >
        <tbody id="text">
        <tr>
        <th scope="row">${contact.firstName}</th>
        <td>${contact.lastName}</td>
        <td>${contact.address}</td>
        <td>${contact.city}</td>
        <td>${contact.codePostal}</td>
        <td>${contact.email}</td>
        </tr>
        </tbody>
        </table>
  
  
  `;  
  
  // Injection du code HTML
  commande.innerHTML += structureDestinataire;
  


