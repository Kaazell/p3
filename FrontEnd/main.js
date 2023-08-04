// Fonction permettant la suppression de la gallerie de base.
const removeGallery = () => document.querySelector(".gallery").remove()
removeGallery();

const url = "http://localhost:5678/api"

// Ajout de la <div class="gallery"> au portfolio
const portfolio = document.getElementById("portfolio");
const gallery = document.createElement("div")
gallery.className = "gallery"
portfolio.append(gallery) 

// Fonction d'appel Fetch pour récupérer les travaux 
async function getWorks() {
    const response = await fetch(`${url}/works`);
    works = await response.json();
    
    // Une fois la promesse résolue, j'utilise les données dans la fonction displayWorks()
    displayWorks(works)
}
getWorks()

// Fonction qui permettra d'afficher les travaux dynamiquements. Je l'utilise dans getWorks()
function displayWorks(data) {
    for(i = 0; i < data.length; i++) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = works[i].imageUrl
        const figcaption = document.createElement("figcaption");
        figcaption.innerText = works[i].title

        gallery.append(figure);
        figure.append(img)
        figure.append(figcaption)
    }
}
