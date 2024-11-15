window.onload = function() {
  
  console.log("Page loaded");
  createHTMLStructure();
  

  const navbar = document.getElementById("navbar0");
  const canvas = document.getElementById("canvas2");
  const container = document.getElementById("container0");
  
  

  // Crée un bouton "Click me!"
  create_button(navbar, {
    text: "Click me!",
    onClick: () => alert("Hello!"),
    classes: ["a"] 
  });
  
  create_dropdown({
    parentId: "navbar0",
    buttonText: "Menu déroulant",
    menuId: "myDropdown"
  });

  create_dropdown_list("myDropdown", [
    { text: "Parameters", onClick: openModal },
    { text: "Link 2", href: "#link2" },
    { text: "Link 3", href: "#link3" }
  ]);

  create_modal();
  style_any();
  style_body_html(document.body);
  style_container0(container);
  style_navbar_children(navbar);
  style_canvas(canvas);
  style_modal(parametersModal);
};

// Affiche/masque le menu déroulant
function Deroulant() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Ferme le menu déroulant si l'utilisateur clique à l'extérieur
window.onclick = function(e) {
  if (!e.target.matches('.dropbtn')) {
    const myDropdown = document.getElementById("myDropdown");
    if (myDropdown && myDropdown.classList.contains('show')) {
      myDropdown.classList.remove('show');
    }
  }
};

// Ouvre le modal
function openModal() {
  document.getElementById("parametersModal").style.display = "block";
}

// Ferme le modal
function closeModal() {
  document.getElementById("parametersModal").style.display = "none";
}

// Ferme le modal si l'utilisateur clique en dehors de celui-ci
window.onclick = function(event) {
  const modal = document.getElementById("parametersModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Crée le modal "Parameters"
function create_modal() {
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
  closeModalSpan.onclick = closeModal;
  modalContent.appendChild(closeModalSpan);

  const modalTitle = document.createElement("h2");
  modalTitle.textContent = "Parameters";
  modalContent.appendChild(modalTitle);

  for (let i = 1; i <= 3; i++) {
    const button = document.createElement("button");
    button.textContent = `Button ${i}`;
    modalContent.appendChild(button);
  }
}

// Crée un menu déroulant générique
function create_dropdown({ parentId, buttonText, menuId }) {
  const parent = document.getElementById(parentId);
  if (!parent) {
    console.error(`Parent element with id ${parentId} not found.`);
    return;
  }

  const dropdownMenu = document.createElement("div");
  dropdownMenu.className = "menu_deroulant";
  parent.appendChild(dropdownMenu);

  const dropdownButton = document.createElement("button");
  dropdownButton.className = "dropbtn";
  dropdownButton.textContent = buttonText;
  dropdownButton.onclick = () => toggleDropdown(menuId); // Fonction générique pour afficher/masquer le menu
  dropdownMenu.appendChild(dropdownButton);

  const dropdownContent = document.createElement("div");
  dropdownContent.className = "dropdown-content";
  dropdownContent.id = menuId;
  dropdownMenu.appendChild(dropdownContent);
}

// Ajoute des éléments dans le menu déroulant de manière générique
function create_dropdown_list(menuId, items) {
  const dropdownContent = document.getElementById(menuId);
  if (!dropdownContent) {
    console.error(`Dropdown content with id ${menuId} not found.`);
    return;
  }

  items.forEach(item => {
    const link = document.createElement("a");
    link.href = item.href || "#"; // Définit l'URL ou laisse vide si non spécifié
    link.textContent = item.text;
    link.onclick = item.onClick || null; // Associe la fonction si spécifiée
    dropdownContent.appendChild(link);
  });
}

// Fonction pour afficher/masquer le menu déroulant
function toggleDropdown(menuId) {
  const dropdown = document.getElementById(menuId);
  if (dropdown) {
    dropdown.classList.toggle("show");
  }
}


// Ferme le menu déroulant si l'utilisateur clique en dehors
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    Array.from(dropdowns).forEach(dropdown => {
      if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
      }
    });
  }
};


// Fonction pour créer et insérer un bouton dans un conteneur
function create_button(container, { text = "Click me!", onClick = () => alert("Button clicked!"), position = "before", referenceElement = null, classes = [] }) {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add("child", ...classes);
  button.onclick = onClick;

  if (referenceElement && container.contains(referenceElement)) {
    if (position === "before") {
      container.insertBefore(button, referenceElement);
    } else if (position === "after") {
      container.insertBefore(button, referenceElement.nextSibling);
    }
  } else {
    container.appendChild(button);
  }
}


// Crée la structure HTML de base
function createHTMLStructure() {
  const container = document.createElement("div");
  container.className = "container";
  document.body.appendChild(container);
  container.id = "container0";

  const navbar = document.createElement("div");
  navbar.className = "navbar";
  navbar.id = "navbar0";
  container.appendChild(navbar);
  


  const logoLink = document.createElement("a");
  logoLink.href = "https://portail.terra-numerica.org/games";
  logoLink.className = "no_hover";
  navbar.appendChild(logoLink);

  const logoImg = document.createElement("img");
  logoImg.src = "https://terra-numerica.org/files/2020/10/cropped-favicon-rond.png";
  logoLink.appendChild(logoImg);

  const aboutLink = document.createElement("a");
  aboutLink.href = "#about";
  aboutLink.textContent = "About";
  navbar.appendChild(aboutLink);
  
  

  const canvas = document.createElement("canvas");
  canvas.id = "canvas2";
  container.appendChild(canvas);
  
}

function style_navbar_children(navbar) {
  const children = navbar.children;
  for (let i = 0; i < children.length; i++) {
    const element = children[i];
    element.style.float = "left";
    element.style.fontSize = "16px";
    element.style.color = "white";
    element.style.textAlign = "center";
    element.style.padding = "14px 16px";
    element.style.textDecoration = "none";
    element.style.backgroundColor = "transparent";
    }
}


//style modal 
function style_modal(element) {
  element.modal.style.display = "none";
  element.modal.style.position = "fixed";
  element.modal.style.zIndex = "1";
  element.modal.style.paddingTop = "100px";
  element.modal.style.left = "0";
  element.modal.style.top = "0";
  element.modal.style.width = "100%";
  element.modal.style.height = "100%";
  element.modal.style.overflow = "auto";
  element.modal.style.backgroundColor = "rgb(0,0,0)";
  element.modal.style.backgroundColor = "rgba(0,0,0,0.4)";
}
function style_canvas(element) {
  element.style.width = "100%";
  element.style.flexGrow = "1";
  element.style.border = "3px solid red";
}
function style_body_html (element){
  element.style.width = "100%";
  element.style.height = "100%";
  element.style.display = "flex";
  element.style.justifyContent = "center";
  element.style.alignItems = "center";

}

function style_container0(element) {
  element.style.width = "100%";
  element.style.height = "100%";
  element.style.display = "flex";
  element.style.flexDirection = "column";
  console.log("container0");
}

function style_any (){
  const elements = document.querySelectorAll('*');
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.margin = "0";
    elements[i].style.padding = "0";
    elements[i].style.boxSizing = "border-box";
  }
  
}