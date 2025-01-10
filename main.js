import * as THREE from 'three';
import Framework from './framework';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Table from './table';
import CTABanner from './CTABanner';



const fw = new Framework();
console.log(fw.CTABannerParameter);
//fw.previewCTABanner();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight-80);
document.body.appendChild(renderer.domElement);

camera.position.z = 60;
camera.position.y = 50;
const camera2 = new OrbitControls(camera, renderer.domElement);
camera2.update();


fw.onResize(renderer, window, camera);



const raycaster = new THREE.Raycaster();
const direction = new THREE.Vector3(1, 0, 0);


////////////////////

const textures = ["src/textures/wood_floor.jpg", "src/textures/wall.jpg", "src/textures/roof.jpg"];
fw.addScene(scene, textures, fw);

 const maxDistance = 1000;


camera2.addEventListener('change', () => {
    const distance = camera.position.length(); // Distance from (0, 0, 0)
    if (distance > maxDistance) {
        // Restrict the camera's position by scaling it back to maxDistance
        camera.position.normalize().multiplyScalar(maxDistance);
        controls.update(); // Update controls to reflect new position
    }

});

let table = new Table(50,50);
scene.add(table.getTable());

fw.attachLight(scene, 'white', 1, table.getTable())

////////////////////

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();