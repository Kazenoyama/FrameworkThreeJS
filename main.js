import * as THREE from 'three';
import Framework from '../framework/framework.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Table from '../framework/table.js';

const fw = new Framework();

function printaMessage(){
    console.log("Hello World");
}

fw.addButtonToNavbar("Button 1", printaMessage);
fw.addButtonToNavbar("Button 2", printaMessage);
fw.addDropdownToNavbar("DropDown 1",[{ text: "Button DropDown 1", onClick: printaMessage },{ text: "Button DropDown 2", onClick: () => alert("Hello!") }])
fw.addDropdownToNavbar("DropDown 2",[{ text: "Button DropDown 3", onClick: printaMessage},{ text: "Button DropDown 4", onClick: () => alert("Hello World!") }])

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(fw.getWindowWidth(), fw.getWindowHeight());
document.body.appendChild(renderer.domElement);

camera.position.z = 60;
camera.position.y = 50;
const camera2 = new OrbitControls(camera, renderer.domElement);
camera2.update();



const raycaster = new THREE.Raycaster();
const direction = new THREE.Vector3(1, 0, 0);

const textures = ["src/textures/wood_floor.jpg", "src/textures/wall.jpg", "src/textures/roof.jpg"];
fw.addScene(scene, textures, fw);

 const maxDistance = 100;


camera2.addEventListener('change', () => {
    const distance = camera.position.length();
    if (distance > maxDistance) {
        camera.position.normalize().multiplyScalar(maxDistance);
        controls.update();
    }
});

let table = new Table(50,50);
scene.add(table.getTable());

fw.attachLight(scene, 'white', 1, table.getTable())
fw.onResize(renderer, window, camera);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();