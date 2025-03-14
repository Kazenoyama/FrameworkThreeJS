import * as THREE from 'three';
import Framework from '../../framework/js/framework.js';
import Modal from '../../framework/js/modal.js';

const fw = new Framework();
const md = new Modal(fw.CTABannerParameter.Banner);
// const scene = fw.mainParameters.scene;
// const renderer = fw.mainParameters.renderer;
// const camera = fw.mainParameters.camera;

function printaMessage(nb){
    console.log("Hello World");
}

// fw.startLoadingScreen();
// fw.removeLoadingScreen();

var button1 = fw.addButtonToNavbar({textButton : "Button 1", onclickFunction : printaMessage}); 
var button2 = fw.addButtonToNavbar({textButton : "Button 2", onclickFunction : printaMessage});
var button3 = fw.addDropdownToNavbar({textButton : "DropDown 1", dropdownList : [{ text: "Button DropDown 1", onClick: printaMessage },{ text: "Button DropDown 2", onClick: () => alert("Hello!") }]})
var button4 = fw.addDropdownToNavbar({textButton : "DropDown 2",dropdownList : [{ text: "Button DropDown 3", onClick: printaMessage},{ text: "Button DropDown 4", onClick: () => alert("Hello World!") }]})

const raycaster = new THREE.Raycaster();
const direction = new THREE.Vector3(1, 0, 0);
// Example usage of the permanent modal
// Create a parameters modal
const paramsModal = md.getPermanentModal({
    title: "Parameters",
    position: { top: 10, right: 10 },
    width: "350px",
    theme: "light", // or "dark"
    id: "gameSettingsModal" // custom ID allows multiple modals
  });
  
  // Add different controls to the modal
  paramsModal.addLabel("Controls", { bold: true, fontSize: "16px" });
  paramsModal.addSeparator();
  
  paramsModal.addSlider("sliders", 1, 10, 5, (value) => {
    console.log("Game speed set to:", value);
  }, { formatValue: (val) => val + "x" });
  
  
  
  paramsModal.addDropdown("Dropdown", [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" }
  ], "medium", (value) => {
    console.log("Difficulty set to:", value);
  });
  
  paramsModal.addSeparator();
 

  
  // Add action buttons
  paramsModal.addButton("bouton", () => {
    alert("www");
  }, { color: "#333" });
  
  ;

// fw.addSimpleSceneWithTable();
//  fw.addSimpleSceneWithoutTable();

// fw.onResize();

// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
// }

// animate();