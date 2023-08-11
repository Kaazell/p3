// Fonction permettant la suppression de la gallerie de base.
const removeGallery = () => document.querySelector(".gallery").remove()
removeGallery();

const url = "http://localhost:5678/api"
let dataWorks;

// Ajout de la <div class="gallery"> au portfolio
const portfolio = document.getElementById("portfolio");
const gallery = document.createElement("div")
gallery.className = "gallery"
portfolio.append(gallery) 
// Création du conteneur des categories
const categories = document.createElement("div");
categories.className = "categories"
portfolio.prepend(categories);


// Fonction d'appel Fetch pour récupérer les travaux 
async function getWorks() {
    const response = await fetch(`${url}/works`);
    dataWorks = await response.json();
    
    // Une fois la promesse résolue, j'utilise les données dans la fonction generateWorks()
    generateWorks(dataWorks)
}
getWorks()

// Fonction qui permettra d'afficher les travaux dynamiquements. Je l'utilise dans getWorks()
function generateWorks(data) {
    for(let i = 0; i < data.length; i++) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = data[i].imageUrl
        const figcaption = document.createElement("figcaption");
        figcaption.innerText = data[i].title

        gallery.append(figure);
        figure.append(img)
        figure.append(figcaption)
    }
};

// Categories //
// Fonction d'appel Fetch pour récupérer les categories 
async function getCategories() {

    const response = await fetch(`${url}/categories`);
    const dataCategories = await response.json();
    console.log(dataCategories);
    
    // Utilisation d'une fonction permettant de générer les boutons: on met le nom du bouton en premier paramètre et le filtre appliqué en 2eme paramètre.
    generateFilters("Tous", () => onClick(dataWorks.filter(work => work.userId === 1)));
    generateFilters(dataCategories[0].name, () => onClick(dataWorks.filter(work => work.category.id === 1)));
    generateFilters(dataCategories[1].name, () => onClick(dataWorks.filter(work => work.category.id === 2)));
    generateFilters(dataCategories[2].name, () => onClick(dataWorks.filter(work => work.category.id === 3)));

}
getCategories()

// La fonction generateFilters sera utilisé dans getCategories()
function generateFilters(name, onClick) {

    const button = document.createElement('button');
    button.innerText = name;
    button.addEventListener("click", onClick);
    categories.append(button)
    
}

function onClick(filter) {
    gallery.innerHTML = ""
    let filtered = filter;
    generateWorks(filtered);
}

// Bannière noire "Mode édition"
const token = sessionStorage.getItem("token");
const editBanner = document.querySelector('#edit');
const logButton = document.querySelector("#log");
// La bannière est invisible lorsque l'utilisateur n'est pas connecté.
editBanner.style.visibility = 'collapse'
function connected() {
    // Si le token = true, on fait apparaitre la bannière et le login devient logout
    if(token){
    edit.style.visibility = "visible"
    logButton.innerHTML = '<a style="color: black; text-decoration: none;" href="login.html">logout</a>'
    }
}
connected()

// L'utilisateur est déconnecté et le token supprimé lorsqu'il clique sur logout
function removeToken() {
    if(logButton.innerText === "logout") {
        logButton.addEventListener("click", () => sessionStorage.removeItem("token"));
    }
}
removeToken()


// Modal

const openModal = function (e) {
    e.preventDefault();
  
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = null;
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');
    modal = target;
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
  };
  
  const closeModal = function (e) {
    if (modal === null) return;
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    modal = null;
  };
  
  const stopPropagation = function (e) {
    e.stopPropagation();
  };
  
  document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener('click', openModal);
  });
  
  window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      closeModal(e);
    }
  });
  

  // Display des éléments dans la modal
  const modalWrapper = document.querySelector('.modal-wrapper');
  
  // Appel API pour display la gallery dans la modal
  function displayGalleryModal(d) {
    const galleryModal = document.createElement('div');
    modalWrapper.append(galleryModal);
    galleryModal.className = "works-modal";
    for (let i = 0; i < d.length; i++) {
        let figure = document.createElement('figure');
        let img = document.createElement('img');
        let trashIcon = document.createElement('i');
        
        // Rajout de l'icone poubelle pour supprimer des éléments
        trashIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        img.src = d[i].imageUrl;

        galleryModal.append(figure);
        figure.append(trashIcon);
        figure.append(img);
        figure.append("éditer");
        trashIcon.addEventListener("click", handleDelete)
    }
  }
  
  async function getJsonModal() {
    try {
      const response = await fetch(`${url}/works`, {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error('Une erreur est survenue.');
      }
      const dataModal = await response.json();
      displayGalleryModal(dataModal);
      // La balise hr permet de rajouter une ligne horizontale
      const hr = document.createElement('hr');
      const modalButtons = document.createElement('div');
      modalButtons.setAttribute('id','gallery-edit-buttons')
      modalButtons.innerHTML = "<button class='gallery-edit'>Ajouter une photo</button><button id='delete-gallery' class='delete-gallery'>Supprimer la galerie</button>";
      modalWrapper.append(hr);
      modalWrapper.append(modalButtons);
    } catch (error) {
      alert(error.message);
    }
  }
  getJsonModal()

  // Delete


//Il manque l'autorisation avec le token
async function handleDelete() {
response = await fetch(`${url}/works/{1}`,{
    method: "DELETE"
})
dataDelete = await response.json()
console.log(dataDelete)
// alert("DELETE")
}
