import * as THREE from 'three';
import Framework from '../../framework/js/framework.js';

const fw = new Framework();
const scene = fw.mainParameters.scene;
const camera = fw.mainParameters.camera;
const renderer = fw.mainParameters.renderer;

function printaMessage(){
    console.log("Hello World");
}

fw.startLoadingScreen();
fw.removeLoadingScreen();

fw.addButtonToNavbar("Button 1", printaMessage);
fw.addButtonToNavbar("Button 2", printaMessage);
fw.addDropdownToNavbar("DropDown 1",[{ text: "Button DropDown 1", onClick: printaMessage },{ text: "Button DropDown 2", onClick: () => alert("Hello!") }])
fw.addDropdownToNavbar("DropDown 2",[{ text: "Button DropDown 3", onClick: printaMessage},{ text: "Button DropDown 4", onClick: () => alert("Hello World!") }])

fw.changeTextOfButton(1,'hello');

const raycaster = new THREE.Raycaster();
const direction = new THREE.Vector3(1, 0, 0);

const table = fw.addScene(50, 50);

fw.onResize(renderer, window, camera);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();