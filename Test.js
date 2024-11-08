window.onload = function() {
  console.log("Page loaded");
}

function Deroulant() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  // Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
    var myDropdown = document.getElementById("myDropdown");
      if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
    }
  }

  // Function to open the modal
function openModal() {
  document.getElementById("parametersModal").style.display = "block";
}

// Function to close the modal
function closeModal() {
  document.getElementById("parametersModal").style.display = "none";
}

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
  const modal = document.getElementById("parametersModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

function createHTMLStructure() {
  
  // Création de la structure du corps
  const container = document.createElement("div");
  container.className = "container";
  document.body.appendChild(container);

 
  // Création de la barre de navigation
  const navbar = document.createElement("div");
  navbar.className = "navbar";
  container.appendChild(navbar);


  // Lien avec l'image
  const logoLink = document.createElement("a");
  logoLink.href = "";
  logoLink.className = "no_hover";
  navbar.appendChild(logoLink);

  const logoImg = document.createElement("img");
  logoImg.src = "https://terra-numerica.org/files/2020/10/cropped-favicon-rond.png";
  logoLink.appendChild(logoImg);
  

  // Lien vers "About"
  const aboutLink = document.createElement("a");
  aboutLink.href = "#about";
  aboutLink.textContent = "About";
  navbar.appendChild(aboutLink);

 

  // Canvas
  const canvas = document.createElement("canvas");
  canvas.id = "canvas2";
  container.appendChild(canvas);

}
// Appeler la fonction pour générer la structure


function create_modal() {
    // Structure du Modal
    const modal = document.createElement("div");
    modal.id = "parametersModal";
    modal.className = "modal";
    document.body.appendChild(modal);
  
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    modal.appendChild(modalContent);
  
    const closeModalSpan = document.createElement("span");
    closeModalSpan.className = "close";
    closeModalSpan.innerHTML = "&times;";
    closeModalSpan.onclick = function() { closeModal(); };
    modalContent.appendChild(closeModalSpan);
  
    const modalTitle = document.createElement("h2");
    modalTitle.textContent = "Parameters";
    modalContent.appendChild(modalTitle);
  
    // Boutons du Modal
    for (let i = 1; i <= 3; i++) {
      const button = document.createElement("button");
      button.textContent = `Button ${i}`;
      modalContent.appendChild(button);
    }
  }
  function create_dropdown() {
    
  // Menu déroulant
  const dropdownMenu = document.createElement("div");
  dropdownMenu.className = "menu_deroulant";
  navbar.appendChild(dropdownMenu);

  const dropdownButton = document.createElement("button");
  dropdownButton.className = "dropbtn";
  dropdownButton.textContent = "Menu déroulant";
  dropdownButton.onclick = function() { Deroulant(); };
  dropdownMenu.appendChild(dropdownButton);

  const dropdownContent = document.createElement("div");
  dropdownContent.className = "dropdown-content";
  dropdownContent.id = "myDropdown";
  dropdownMenu.appendChild(dropdownContent);

  }
  function create_dropdown_list () {
     // Liens du menu déroulant
  const parametersLink = document.createElement("a");
  dropdownContent.appendChild(parametersLink);

  const parametersButton = document.createElement("button");
  parametersButton.className = "parameters_dropdown";
  parametersButton.textContent = "Parameters";
  parametersButton.onclick = function() { openModal(); };
  parametersLink.appendChild(parametersButton);

  const link2 = document.createElement("a");
  link2.href = "#link2";
  link2.textContent = "Link 2";
  dropdownContent.appendChild(link2);

  const link3 = document.createElement("a");
  link3.href = "#link3";
  link3.textContent = "Link 3";
  dropdownContent.appendChild(link3);
  }
  


 /**
 * Fonction générale pour créer et insérer un bouton dans un conteneur.
 * 
 * @param {HTMLElement} container - Le conteneur où insérer le bouton.
 * @param {Object} options - Options pour configurer le bouton.
 * @param {string} options.text - Texte du bouton.
 * @param {Function} options.onClick - Fonction à appeler lors du clic.
 * @param {string} options.position - Position où insérer le bouton ("before" ou "after").
 * @param {HTMLElement} options.referenceElement - Élément de référence pour la position.
 * @param {string[]} options.classes - Classes CSS supplémentaires pour le bouton.
 */
function create_button(container, { text = "Click me!", onClick = () => alert("Button clicked!"), position = "before", referenceElement = null, classes = [] }) {
  // Crée le bouton
  const button = document.createElement("button");
  button.textContent = text;
  
  // Applique les classes CSS supplémentaires
  button.classList.add("child", ...classes);

  // Définit l'action du bouton
  button.onclick = onClick;

  // Vérifie s'il y a un élément de référence pour la positionnement
  if (referenceElement && container.contains(referenceElement)) {
    if (position === "before") {
      container.insertBefore(button, referenceElement); // Insère avant l'élément de référence
    } else if (position === "after") {
      container.insertBefore(button, referenceElement.nextSibling); // Insère après l'élément de référence
    }
  } else {
    // Par défaut, ajoute le bouton à la fin du conteneur si aucune référence n'est spécifiée
    container.appendChild(button);
  }
}

// Exemple d'utilisation
const navbar = document.getElementById("123");
const menuDeroulant = navbar.querySelector(".menu_deroulant");


create_button(navbar, {
  text: "Click me!",
  onClick: () => alert("Hello!"),
  position: "before",
  referenceElement: menuDeroulant,
  classes: ["a"] // Ajoute des classes CSS supplémentaires, si nécessaire
});


