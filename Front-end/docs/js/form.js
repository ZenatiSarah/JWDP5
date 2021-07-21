const buttonEnvoyer = document.querySelector('.btn-panier');
const inputQuantite = document.querySelectorAll('.quantite');
const elementForm = document.querySelector('.formulaire-commande') ;

function afficherFormPanier() {
    const structureFormPanier = `           
        <div class="title-formulaire">
            <h2>Remplissez le formulaire pour valider la commande</h2>
        </div>
    <div class="formulaire">
        <form>
            <label for="firstName">Prénom : </label>
            <input type="text" id="firstName" name="firstName" required>
            <label for="lastName">Nom : </label>
            <input type="text" id="lastName" name="lastName" required>
            <label for="address">Adresse : </label>
            <textarea id="address" name="address" required></textarea>
            <label for="city">Ville : </label>
            <input type="text" id="city" name="city" required>
            <label for="codePostal">Code Postal : </label>
            <input type="text" id="codePostal" name="codePostal" required>
            <label for="email">Email : </label>
            <input type="text" id="email" name="email" required>
            <button onclick="buttonForm()" type="button" id="envoyerForm">Commander</button>
        </form>
    </div>
`;
//Injection du code sur ma page
elementForm.insertAdjacentHTML("afterend",structureFormPanier);
}
afficherFormPanier();

//REGEX
const textAlert = (value)=>{
    return `${value}: Chiffre et symbole ne sont pas autorisé\nNe pas dépasser 20 caractères, minimum 3 caractères`
}   
const regExFirstNameLastNameCity = (value) =>{
    return /^[A-Za-z]{3,20}$/.test(value)
}
const regExCodePostal = (value) =>{
    return /^[0-9]{5}$/.test(value)
}
const regExEmail = (value) =>{
    return /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(value)
}
const regExAddress = (value) =>{
    return /^[A-Za-z0-9]{5,50}$/.test(value)
}

// BUTTON COMMANDER
function buttonForm() {
    const contact = {
        firstName:document.getElementById('firstName').value,
        lastName:document.getElementById('lastName').value,
        address:document.getElementById('address').value,
        city:document.getElementById('city').value,
        codePostal: document.getElementById('codePostal').value,
        email:document.getElementById('email').value
    }
    console.log(contact)

    // CONTROLE FORMULAIRE
    function firstNameControle() {
        const lefirstName = contact.firstName;
        if (regExFirstNameLastNameCity(lefirstName)) {
            return true;
        } else {
            console.log("ko");
            alert(textAlert("firstName"))
            return false;
        }
    }

    function lastNameControle() {
        const lenom = contact.nom;
        if (regExFirstNameLastNameCity(lenom)) {
            return true;
        } else {
            console.log("ko");
            alert(textAlert("Nom"))
            return false;
        }
    }
    function codePostalControle() {
        const leCodePostal = contact.codePostal;
        if (regExCodePostal(leCodePostal)) {
            return true;
        } else {
            console.log("ko");
            alert("Code Postal: doit être composé de 5 chiffres")
            return false;
        }
    }

    function emailControle() {
        const lemail = contact.email;
        if (regExEmail(lemail)) {
            return true;
        } else {
            alert("Email: remplissez correctement ce champ")
            return false;
        }
    }
    
    function addressControle() {
    const laddress = contact.lemail;
    if (regExAddress(laddress)) {
        return true;
    } else {
        console.log("ko");
        alert("address: remplissez correctement ce champ")
        return false;
    }
    }
    
    function postCommande() {
        const contact = {
            firstName:document.getElementById('firstName').value,
            lastName:document.getElementById('lastName').value,
            address:document.getElementById('address').value,
            city:document.getElementById('city').value,
            codePostal: document.getElementById('codePostal').value,
            email:document.getElementById('email').value
        }
        const url = "http://localhost:3000/api/cameras/order";
        const products = []

        //GET id de mes produits
        for (let g = 0; g < productsBasket.length; g++) {
            const element = productsBasket[g].id;
            console.log(element)
            products.push(element)
        } 
        //ENVOYER AU SERVEUR CONTACT + PRODUCTS
        const aEnvoyer = {contact: contact, products: products};
        console.log(aEnvoyer);

        // REQUEST
        const request = new Request(url,{
            method: 'POST',
            headers : new Headers({"Content-Type":"application/json"}),
            body: JSON.stringify(aEnvoyer)
        })
        fetch(request)
        .then(res => res.json())
        .then(res => {
    	    let orderId = JSON.stringify(res)
    	    localStorage.setItem('orderId', orderId)
        //Redirection
    	window.location.href = './commande.html';
        })
        .catch(function(error) {
	        alert('Impossible d\'envoyer la requête');
	    })
    }

    if (firstNameControle() && lastNameControle() && addressControle() && codePostalControle() && emailControle() ) {
        localStorage.setItem("contact",JSON.stringify(contact));
        postCommande()
        } else {
        alert("Veuillez remplir correctement le formulaire")
        }
}