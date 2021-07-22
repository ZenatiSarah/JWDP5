function getData (){
    return  fetch("http://localhost:3000/api/cameras").then(obj => {
          return obj.json();
      }).catch(function (error) {
          console.error('Something went wrong!'+ error)
      })
};


getData().then(obj =>{
    let listeCamera = document.getElementById('cards');
    
    for (let i = 0; i < obj.length; i++) {
        const cameras = `           
        <div class="card">
            <img src=${obj[i].imageUrl} class="card-img-top border border-bottom-0" alt="...">
            <div class="card-body border border-top-0">
                <h5 class="card-title">${obj[i].name}</h5>
                <p class="card-price">${obj[i].price} €</p>
                <p class="card-text">${obj[i].description}</p>
                <button class="btn btn-secondary" id="btnProduit" onclick="window.location.href= 'produit.html?id=${obj[i]._id}'">Voir plus</button>
                </div>
            </div>
        `;    
        listeCamera.innerHTML += cameras;
 }});
