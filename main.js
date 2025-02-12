import * as THREE from 'three';
import Framework from '../../framework/js/framework.js';

const fw = new Framework();
const scene = fw.mainParameters.scene;
// const camera = fw.mainParameters.camera;
const renderer = fw.mainParameters.renderer;
await fw.addSceneFromJson("src/models/test.json");
const camera = fw.mainParameters.camera;

function printaMessage(){
    console.log("Hello World");
}

fw.startLoadingScreen();
fw.removeLoadingScreen();

var button1 = fw.addButtonToNavbar("Button 1", printaMessage);
var button2 = fw.addButtonToNavbar("Button 2", printaMessage);
var button3 = fw.addDropdownToNavbar("DropDown 1",[{ text: "Button DropDown 1", onClick: printaMessage },{ text: "Button DropDown 2", onClick: () => alert("Hello!") }])
var button4 = fw.addDropdownToNavbar("DropDown 2",[{ text: "Button DropDown 3", onClick: printaMessage},{ text: "Button DropDown 4", onClick: () => alert("Hello World!") }])

// button1.textContent = "Button 1 is changed";
// button3.children[0].textContent = "DropDown 1 is changed";
// button3.children[1].children[0].textContent = "Sub section 1 is changed";

const raycaster = new THREE.Raycaster();
const direction = new THREE.Vector3(1, 0, 0);

// const table = fw.addSimpleSceneWithTable(50, 50);
// fw.addSimpleSceneWithoutTable();

fw.onResize(renderer, window, camera);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();