
class CTABanner{
  constructor(){
    console.log("Test class");
    console.log("Page loaded");
    this.createHTMLStructure();
    

    const navbar = document.getElementById("navbar0");
    const canvas = document.getElementById("canvas2");
    const container = document.getElementById("container0");
    
    
    // a   partir d'ici on peut ajouter des éléments dans notre HTML bouton / dropdown / modal ect..

    // Crée un bouton "Click me!"
    this.create_button(navbar, {
      text: "Click me!",
      onClick: () => alert("Hello!"),
      classes: ["a"] 
    });
    
    this.create_dropdown({
      parentId: "navbar0",
      buttonText: "Menu déroulant",
      menuId: "myDropdown"
    });
    

    this.create_dropdown_list("myDropdown", [
      { text: "Parameters", onClick: () => this.openModal()},
      { text: "Link 2", href: "#link2" },
      { text: "Link 3", href: "#link3" }
    ]);
    
    
    this.Open_dropdown(window);
    this.create_modal(); 
    this.style_any();
    // this.style_body_html(document.body);  ça crée un problème si on l'ajoute donc on le désactive
    this.style_hover();
    this.style_container0(container);
    this.style_navbar();
    this.style_navbar_children(navbar);
    this.style_dropdown();
    this.style_dropbtn();
    this.style_dropdown_content();
    this.style_dropdown_content_a();
    this.style_dropdown_content_parameters();
    this.style_modal(document.getElementById("parametersModal"));
    this.style_modal_content();
    
    this.style_modal_content_button();
    this.style_close();
    
    
    
    // this.style_canvas(canvas)

  }
  Deroulant() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

// Ouvre le modal

  
openModal() {
  const modal = document.getElementById("parametersModal");
  if (modal) {
    modal.style.display = "block";
  } else {
    console.error("Modal not found.");
  }
  


}


// Ferme le modal si l"utilisateur clique en dehors de celui-ci
closeModal() {
  document.getElementById("parametersModal").style.display = "none";
window.onclick = function(event) {
  const modal = document.getElementById("parametersModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
}
isDragging = false;
offsetX;
offsetY;
  modal;
// Commencer le drag
startDrag(event) {
  this.isDragging = true;
  this.modal = document.getElementById("parametersModal");

  // Calculer l'offset par rapport à la souris
  this.offsetX = event.clientX - this.modal.getBoundingClientRect().left;
  this.offsetY = event.clientY - this.modal.getBoundingClientRect().top;

  // Écouter les événements de déplacement et d'arrêt
  document.addEventListener("mousemove", this.drag.bind(this));
  document.addEventListener("mouseup", this.stopDrag.bind(this));
}

// Déplacer le modal
drag(event) {
  if (!this.isDragging) return;

  this.modal = document.getElementById("parametersModal");
   this.modal.style.left = `${event.clientX - this.offsetX}px`;
    this.modal.style.top = `${event.clientY - this.offsetY}px`;
}

// Arrêter le drag
 stopDrag() {
  this.isDragging = false;
  document.removeEventListener("mousemove", this.drag.bind(this));
  document.removeEventListener("mouseup", this.stopDrag.bind(this));
}

 
//----------------------------- fonction de creation notre HTML -------------------------------------------

    create_modal() {
      const modal = document.createElement("div");
      modal.id = "parametersModal";
      modal.className = "modal";
      document.body.appendChild(modal);
    
      const modalContent = document.createElement("div");
      modalContent.className = "modal-content";
      modal.appendChild(modalContent);
      modalContent.addEventListener("mousedown", this.startDrag.bind(this));
    
      const closeModalSpan = document.createElement("span");
      closeModalSpan.className = "close";
      closeModalSpan.innerHTML = "&times;";
      closeModalSpan.onclick = this.closeModal;
      modalContent.appendChild(closeModalSpan);
    
      const modalTitle = document.createElement("h2");
      modalTitle.textContent = "Parameters";
      modalContent.appendChild(modalTitle);
    
        // ici pour modifier ce que vous voulez afficher dans le modal (paramètres)
        
        this.create_button(modalContent, { 
          text: "Click me!",
          onClick: () => alert("Hello!"),
          
        });
        this.create_button(modalContent, {
          text: "Click me!",
          onClick: () => alert("Hello!"),
          
        });
        this.create_button(modalContent, {
          text: "Click me!",
          onClick: () => alert("Hello!"),
          
        });
      
      modalContent.addEventListener("mousedown", this.startDrag.bind(this));
    }

    // Crée un menu déroulant générique
 create_dropdown({ parentId, buttonText, menuId }) {
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
  dropdownButton.id = "dropbtn";
  dropdownButton.onclick = () => this.toggleDropdown(menuId); // Fonction générique pour afficher/masquer le menu
  dropdownMenu.appendChild(dropdownButton);
  

  const dropdownContent = document.createElement("div");
  dropdownContent.className = "dropdown-content";
  dropdownContent.id = menuId;
  dropdownMenu.appendChild(dropdownContent);
}
// Ajoute des éléments dans le menu déroulant de manière générique
create_dropdown_list(menuId, items) {
  const dropdownContent = document.getElementById(menuId);
  if (!dropdownContent) {
    console.error(`Dropdown content with id ${menuId} not found.`);
    return;
  }

  items.forEach(item => {
    const link = document.createElement("a");
    link.href = item.href || "#"; // Définit l"URL ou laisse vide si non spécifié
    link.textContent = item.text;
    if (item.onClick) {
      link.onclick = item.onClick.bind(this); // Associe la fonction si spécifiée
      link.href = "javascript:void(0);"; // Prevent default link behavior if onClick is specified
    }
    
    dropdownContent.appendChild(link);
  });
}

// Fonction pour afficher/masquer le menu déroulant
// Gestionnaire unique pour tous les clics
Open_dropdown(window) {
  window.onclick = function (event) {
    // Ferme le menu déroulant si l'utilisateur clique à l'extérieur
    if (!event.target.matches(".dropbtn")) {
      const dropdowns = document.getElementsByClassName("dropdown-content");
      Array.from(dropdowns).forEach(dropdown => {
        if (dropdown.classList.contains("show")) {
          dropdown.classList.remove("show");
          dropdown.style.display = "none"; // Assure que le menu est masqué
        }
      });
    }
  }
  
    // Ferme le modal si l'utilisateur clique en dehors
    const modal = document.getElementById("parametersModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  // Fonction pour afficher/masquer le menu déroulant
 toggleDropdown(menuId) {
  const dropdown = document.getElementById(menuId);
  if (dropdown) {
    const isShown = dropdown.classList.contains("show");
    dropdown.classList.toggle("show", !isShown); // Ajoute/retire la classe "show"
    dropdown.style.display = isShown ? "none" : "block"; // Met à jour le style
  }
}

// Fonction pour créer et insérer un bouton dans un conteneur
create_button(container, { text = "Click me!", onClick = () => alert("Button clicked!"), position = "before", referenceElement = null, classes = [] }) {
  const button = document.createElement("button");
  button.textContent = text;
  button.style.border = "none";
  button.classList.add("child", ...classes);
  button.onclick = onClick;
  button.position = position;

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
createHTMLStructure() {
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
  
  

  // const canvas = document.createElement("canvas");
  // canvas.id = "canvas2";
  // container.appendChild(canvas);
  
}

// Crée un menu déroulant générique
create_dropdown({ parentId, buttonText, menuId }) {
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
  dropdownButton.id = "dropbtn";
  dropdownButton.onclick = () => this.toggleDropdown(menuId); // Fonction générique pour afficher/masquer le menu
  dropdownMenu.appendChild(dropdownButton);
  

  const dropdownContent = document.createElement("div");
  dropdownContent.className = "dropdown-content";
  dropdownContent.id = menuId;
  dropdownMenu.appendChild(dropdownContent);
}
// Ajoute des éléments dans le menu déroulant de manière générique
 create_dropdown_list(menuId, items) {
  const dropdownContent = document.getElementById(menuId);
  if (!dropdownContent) {
    console.error(`Dropdown content with id ${menuId} not found.`);
    return;
  }

  items.forEach(item => {
    const link = document.createElement("a");
    link.href = item.href || "#"; // Définit l"URL ou laisse vide si non spécifié
    link.textContent = item.text;
    link.onclick = item.onClick || null; // Associe la fonction si spécifiée
    dropdownContent.appendChild(link);
  });
}

// Fonction pour afficher/masquer le menu déroulant
// Gestionnaire unique pour tous les clics
Open_dropdown(window) {                                   // voir si on doit les calls dans notre constructor 
window.onclick = function (event) {
  // Ferme le menu déroulant si l'utilisateur clique à l'extérieur
  if (!event.target.matches(".dropbtn")) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    Array.from(dropdowns).forEach(dropdown => {
      if (dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
        dropdown.style.display = "none"; // Assure que le menu est masqué
      }
    });
  }

  // Ferme le modal si l'utilisateur clique en dehors
  const modal = document.getElementById("parametersModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
}

// Fonction pour afficher/masquer le menu déroulant
toggleDropdown(menuId) {
  const dropdown = document.getElementById(menuId);
  if (dropdown) {
    const isShown = dropdown.classList.contains("show");
    dropdown.classList.toggle("show", !isShown); // Ajoute/retire la classe "show"
    dropdown.style.display = isShown ? "none" : "block"; // Met à jour le style
  }
}

// Fonction pour créer et insérer un bouton dans un conteneur   // attention le onclick
create_button(container, { text = "Click me!", onClick = () => alert("Button clicked!"), position = "before", referenceElement = null, classes = [] }) {
  const button = document.createElement("button");
  button.textContent = text;
  button.style.border = "none";
  button.classList.add("child", ...classes);
  button.onclick = onClick;
  button.position = position;

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
 createHTMLStructure() {
  const container = document.createElement("div");
  container.className = "container";
  document.body.appendChild(container);
  container.id = "container0";

  const navbar = document.createElement("div");
  navbar.className = "navbar";
  navbar.id = "navbar0";
  container.appendChild(navbar);
  navbar.style.width = window.innerWidth;
  


  const logoLink = document.createElement("a");
  logoLink.href = "https://portail.terra-numerica.org/games";
  logoLink.className = "no_hover";
  navbar.appendChild(logoLink);

  const logoImg = document.createElement("img");
  logoImg.src = "https://terra-numerica.org/files/2020/10/cropped-favicon-rond.png";
  logoLink.appendChild(logoImg);
  logoImg.style.width = "40px";

  const aboutLink = document.createElement("a");
  aboutLink.href = "#about";
  aboutLink.textContent = "About";
  navbar.appendChild(aboutLink);


  

  
  

  // const canvas = document.createElement("canvas");
  // canvas.id = "canvas2";
  // container.appendChild(canvas);
  
  
}



// -----------------------------------------------------------------------------
//-----------------------fonction de Style -------------------------------------------


 style_navbar_children(navbar) {
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

 style_modal(element) {
  element.style.display = "none";
  element.style.position=" fixed";
  element.style.top=" 50%";
  element.style.right=" 10%"; 
  element.style.width="300px";
  element.style.backgroundColor="transparent";
  element.style.border="none";
  element.style.boxShadow=" none";
  element.style.padding="15px";
  element.style.zIndex="1000";
  
  element.addEventListener ="startDrag(event)";
}

//  style_canvas(element) {
//   element.style.width = "100%";
//   element.style.height = "100%";
//   element.style.flexGrow = "1";
//   element.style.border = "3px solid red";
// }

 style_body_html (element){
  element.style.width = "100%";
  element.style.height = "100%";
  element.style.display = "flex";
  element.style.justifyContent = "center";
  element.style.alignItems = "center";

}

 style_container0(element) {
  element.style.width = "100%";
  element.style.height = "100%";
  element.style.display = "flex";
  element.style.flexDirection = "column";
  console.log("container0");
  
}

 style_any (){
  const elements = document.querySelectorAll("*");
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.margin = "0";
    elements[i].style.padding = "0";
    elements[i].style.boxSizing = "border-box";
  }
  
}
 style_navbar(){
  const navbar = document.getElementById("navbar0");
  navbar.style.backgroundColor = "#333";
  navbar.style.overflow = "visible";
  navbar.style.fontFamily ="Arial, Helvetica, sans-serif";
  navbar.style.textAlign = "center";
  
 }
 style_dropdown(){
  const dropdown = document.getElementById("myDropdown");
  dropdown.style.float = "left";
  dropdown.style.overflow = "hidden";
  dropdown.style.cursor = "pointer";
  dropdown.style.fontSize = "16px";
  dropdown.style.border = "none";
  dropdown.style.outline = "none";
  dropdown.style.color = "white";
  dropdown.style.padding = "14px 16px";
  dropdown.style.backgroundColor = "white";
  dropdown.style.fontFamily = "inherit";
  dropdown.style.margin = "0";


}
 style_dropbtn(){
  const dropbtn = document.getElementById("dropbtn");
  dropbtn.style.cursor = "pointer";
  dropbtn.style.fontSize = "16px";
  dropbtn.style.border = "none";
  dropbtn.style.outline = "none";
  dropbtn.style.color = "white";
  dropbtn.style.padding = "none";
  dropbtn.style.backgroundColor = "inherit";
  dropbtn.style.fontFamily = "inherit";
  dropbtn.style.margin = "0";
  dropbtn.style.textAlign = "center";
}
 style_hover() { // trouve pourquoi menu déroulant n'est pas comme les autres
  const navbarLinks = document.querySelectorAll(".navbar a:not(.no_hover)");
  navbarLinks.forEach(link => {
    link.addEventListener("mouseover", () => {
      link.style.backgroundColor = "red";
    });
    link.addEventListener("mouseout", () => {   // sert pour reset la couleur
      link.style.backgroundColor ="inherit"; 
    });
  });
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach(dropdown => {
    const dropbtn = dropdown.querySelector(".dropbtn");
    dropdown.addEventListener("mouseover", () => {
      if (dropbtn) dropbtn.style.backgroundColor = "red";
    });
    dropdown.addEventListener("mouseout", () => {
      if (dropbtn) dropbtn.style.backgroundColor = ""; 
    });
  });
  const allButtons = document.querySelectorAll("button", "  .dropdown-content");
  allButtons.forEach(button => {
    button.addEventListener("mouseover", () => {
      button.style.backgroundColor = "red";
    });
    button.addEventListener("mouseout", () => {
      button.style.backgroundColor = "inherit"; 
    });
    button.addEventListener("focus", () => {
      button.style.backgroundColor = "red";
    });
    button.addEventListener("blur", () => {
      button.style.backgroundColor = "inherit"; 
    });
  });
}

 style_dropdown_content() {
  const dropdownContents = document.querySelectorAll('.dropdown-content');

  dropdownContents.forEach(dropdown => {
    dropdown.style.display = 'none';
    dropdown.style.position = 'absolute';
    dropdown.style.backgroundColor = '#f9f9f9';
    dropdown.style.minWidth = '160px';
    dropdown.style.boxShadow = '0px 8px 16px 0px rgba(0,0,0,0.2)';
    dropdown.style.zIndex = '1';
  });
}
 style_dropdown_content_a() {
  // Styles pour .dropdown-content a
  const dropdownLinks = document.querySelectorAll('.dropdown-content a');
  dropdownLinks.forEach(link => {
    link.style.float = 'none';
    link.style.color = 'white';
    link.style.padding = '12px 16px';
    link.style.textDecoration = 'none';
    link.style.display = 'block';
    link.style.textAlign = 'left';
    
    // Hover effect: background-color change
    link.addEventListener('mouseover', () => {
      link.style.backgroundColor = "red";
    });
    link.addEventListener('mouseout', () => {
      link.style.backgroundColor = "inherit"; // Reset
    });
  });

  
}
style_dropdown_content_parameters() {
  
  const parametersDropdowns = document.querySelectorAll('.dropdown-content');
  
  parametersDropdowns.forEach(button => {
    button.style.cursor = 'pointer';
    button.style.color = 'black';
    button.style.padding = '12px 16px';
    button.style.textDecoration = 'none';
    button.style.display = 'block';
    button.style.textAlign = 'left';
    button.style.backgroundColor = '#333';
    button.style.fontSize = '16px';
    button.style.border = 'none';
    button.style.outline = 'none';
    button.style.display = 'none';
    
    
  });
}
 style_modal_content() {
  const modalContent = document.querySelectorAll('.modal-content');
  modalContent.forEach(content => {
    content.style.backgroundColor = 'white';
    content.style.margin = '15% auto';
    content.style.padding = '20px';
    content.style.borderRadius = '8px';  
    content.style.width = '300px';
    content.style.textAlign = 'center';
    content.style.position = 'relative';
    content.style.cursor="grab";
  });
}
 style_close() {
  const closeButtons = document.querySelectorAll('.close');
  closeButtons.forEach(button => {
    button.style.color = 'black';
    button.style.fontSize = '28px';
    button.style.fontWeight = 'bold';
    button.style.cursor = 'pointer';
    button.style.right = '20px';
    button.style.top='10px';
    button.style.position = 'absolute';
  });

  

}

 style_modal_content_button() {
  const modalContentButtons = document.querySelectorAll('.modal-content button');
  modalContentButtons.forEach(button => {
    button.style.display = 'block';
    
    button.style.padding = '14px 20px';
    button.style.cursor = 'pointer';
    button.style.margin = '10px auto';
  });
}
//------------------------------------------------------------
    

}


export default CTABanner;