import modal from '../../framework/js/modal.js'; // this import is necessary for the modal to work for the 2D version
// for 2D
// import CTABanner from '../../framework/js/CTABanner';
// const ctaBanner = new CTABanner();
// ctaBanner.create_button("Button 1", () => alert("Hello World"));
// const md = new modal(ctaBanner);
// md.getPermanentModal({
//     title: "titre",
//     position: { top: 10, right: 10 },
//     width: "350px",
//     theme: "light", // or "dark"
//     id: "gameSettingsModal" // custom ID allows multiple modals
//   });

//------------------------------------------------------------







// for 3D
import * as THREE from 'three';
import Framework from '../../framework/js/framework.js';
const fw = new Framework();
const modal1 = fw.getPermanentModal({
    title: "titre",
    position: { top: 10, right: 10 },
    width: "350px",
    theme: "dark", // or "light"
    id: "gameSettingsModal", // custom ID allows multiple modals  
  });
  //rajouer un bouton dans le modal avec la méthode addButton
  modal1.AddButtonToModal("Button 1", () => alert("Hello World"));

  
  

const scene = fw.mainParameters.scene;
const renderer = fw.mainParameters.renderer;
const camera = fw.mainParameters.camera;


function printaMessage(nb){
    console.log("Hello World");
}

fw.startLoadingScreen();
fw.removeLoadingScreen();


var button1 = fw.addButtonToNavbar({textButton : "Button 1", onclickFunction : printaMessage}); 
var button2 = fw.addButtonToNavbar({textButton : "Button 2", onclickFunction : printaMessage});
var button3 = fw.addDropdownToNavbar({textButton : "DropDown 1", dropdownList : [{ text: "Button DropDown 1", onClick: printaMessage },{ text: "Button DropDown 2", onClick: () => alert("Hello!") }]})
var button4 = fw.addDropdownToNavbar({textButton : "DropDown 2",dropdownList : [{ text: "Button DropDown 3", onClick: printaMessage},{ text: "Button DropDown 4", onClick: () => alert("Hello World!") }]})

const raycaster = new THREE.Raycaster();
const direction = new THREE.Vector3(1, 0, 0);


fw.onResize();
fw.addSimpleSceneWithTable();
//  fw.addSimpleSceneWithoutTable();
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();



