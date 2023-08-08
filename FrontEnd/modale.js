// Enlever la galerie de base en HTML
const removeGallery = () => document.querySelector(".gallery").remove()
removeGallery();
let data;
const url = "http://localhost:5678/api"

// Fonction pour récupérer les catégories afin d'utiliser les filtres
async function getCategories() {
    const requestCat = await fetch(url + "/categories",{
        method: 'GET'
    })
    if(!requestCat.ok){
        alert('Une erreur est survenue.')
    } else {
        dataCat = await requestCat.json();
        generateFilters(dataCat)
    }
}

// Fonction pour générer les filtres
function generateButtons(textContent, className, onClick) {
    const button = document.createElement("button");
    button.textContent = textContent
    button.className = className
    button.addEventListener("click", onClick)
    filters.append(button)
}

function onClick(filter) {
    let filtered = filter;
    document.querySelector(".gallery").remove();
    displayGallery(filtered);
}

let filters;
function generateFilters() {
    filters = document.createElement("div");
    filters.id = "filters"
    portfolio.prepend(filters)   
    generateButtons("Tous", "_filters tous", () => onClick(data.filter(objet => objet.userId == 1)));
    generateButtons("Objets", "_filters objet", () => onClick(data.filter(objet => objet.category.id === 1)));
    generateButtons("Appartements", "_filters objet", () => onClick(data.filter(objet => objet.category.id === 2)));
    generateButtons("Hôtels & restaurants", "_filters objet", () => onClick(data.filter(objet => objet.category.id === 3)));  
}

function displayGallery(d){
    const portfolio = document.querySelector('#portfolio')
    const gallery = document.createElement('div');
    portfolio.append(gallery)
    gallery.className = "gallery"
    for(let i = 0; i < d.length; i++){
        let figure = document.createElement('figure');
        let img = document.createElement('img');
        let figCaption = document.createElement('figcaption');

        img.src = d[i].imageUrl;
        figCaption.innerText = d[i].title;

        gallery.append(figure);
        figure.append(img);
        figure.append(figCaption);
    }
}

async function getJson(){
    const requestWorks = await fetch(url + "/works",{
        method: 'GET'
    })
    if(!requestWorks.ok){
        alert('Une erreur est survenue.')
    } else {
        data = await requestWorks.json();
        displayGallery(data);
    }
}

getJson()
getCategories()

// Edit mode
const token = sessionStorage.getItem("token");
const editBanner = document.querySelector('#edit');
const logButton = document.querySelector("#log");
editBanner.style.visibility = 'collapse'
function connected() {
    if(token){
    edit.style.visibility = "visible"
    logButton.innerHTML = '<a style="color: black; text-decoration: none;" href="login.html">logout</a>'
    }
}

connected()

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
  
  const modalDisp = document.querySelector('.modal-wrapper');
  
  function displayGalleryModal(d) {
    const gallery = document.createElement('div');
    modalDisp.append(gallery);
    gallery.className = "works-modal";
    for (let i = 0; i < d.length; i++) {
      let figure = document.createElement('figure');
      let img = document.createElement('img');
      let crossImg = document.createElement('i');
      let figCaption = document.createElement('figcaption');
  
      crossImg.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
      img.src = d[i].imageUrl;
      figCaption.innerText = d[i].title;
  
      gallery.append(figure);
      figure.append(crossImg);
      figure.append(img);
      figure.append("éditer");
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
      const hr = document.createElement('hr');
      const galleryEdit = document.createElement('div');
      galleryEdit.setAttribute('id','gallery-edit-buttons')
      galleryEdit.innerHTML = "<button class='gallery-edit'>Ajouter une photo</button><button id='delete-gallery' class='delete-gallery'>Supprimer la galerie</button>";
      modalDisp.append(hr);
      modalDisp.append(galleryEdit);
    } catch (error) {
      alert(error.message);
    }
  }
  
  getJsonModal();

//   Delete



async function deleteWork(){
    const requestWorks = await fetch(url + "/delete",{
        method: 'DELETE'
    })
    if(!requestWorks.ok){
        alert('Une erreur est survenue.')
    } else {
        data = await requestWorks.json();
        displayGallery(data);
    }
}
