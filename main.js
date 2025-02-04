import * as THREE from 'three';
import Framework from '../../framework/js/framework.js';

const fw = new Framework();
const scene = fw.mainParameters["scene"];
const camera = fw.mainParameters["camera"];
const renderer = fw.mainParameters["renderer"];

function printaMessage(){
    console.log("Hello World");
}

fw.addButtonToNavbar("Button 1", printaMessage);
fw.addButtonToNavbar("Button 2", printaMessage);
fw.addDropdownToNavbar("DropDown 1",[{ text: "Button DropDown 1", onClick: printaMessage },{ text: "Button DropDown 2", onClick: () => alert("Hello!") }])
fw.addDropdownToNavbar("DropDown 2",[{ text: "Button DropDown 3", onClick: printaMessage},{ text: "Button DropDown 4", onClick: () => alert("Hello World!") }])

const raycaster = new THREE.Raycaster();
const direction = new THREE.Vector3(1, 0, 0);

const textures = ["framework/textures/wood_floor.jpg", "framework/textures/wall.jpg", "framework/textures/roof.jpg"];
const table = fw.addScene(textures, fw, {width: 50, depth: 50});

fw.onResize(renderer, window, camera);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();