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
async function getCategories() {

    const response = await fetch(`${url}/categories`);
    const dataCategories = await response.json();
    console.log(dataCategories);
    
    generateFilters("Tous", () => onClick(dataWorks.filter(work => work.userId === 1)));
    generateFilters(dataCategories[0].name, () => onClick(dataWorks.filter(work => work.category.id === 1)));
    generateFilters(dataCategories[1].name, () => onClick(dataWorks.filter(work => work.category.id === 2)));
    generateFilters(dataCategories[2].name, () => onClick(dataWorks.filter(work => work.category.id === 3)));

}

getCategories()

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