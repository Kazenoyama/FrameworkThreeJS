import * as THREE from 'three';
import Framework from '../../framework/js/framework.js';

const fw = new Framework();
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

fw.addSimpleSceneWithTable();
// fw.addSimpleSceneWithoutTable();

fw.onResize();

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();