import * as THREE from 'three';
import createScene from './createScene';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import CTABanner from './CTABanner';

class Framework {
    CTABannerParameter;

    constructor(){
        console.log('Framework constructor');
        //this.boundResize = this.resize.bind(this); // Create a bound resize function
        const Banner = new CTABanner();

        Banner.createHTMLStructure();
        const navbar = Banner.getNavbar();
        Banner.style_navbar();
        const container = Banner.getContainer();
        Banner.style_container0(container);
        
        this.CTABannerParameter = {"Banner": Banner,"navbar": navbar, "container": container};
    }
      /**
     * Enables automatic resizing of the Three.js renderer and camera when the browser window is resized.
     * By default, resizing is enabled.
     *
     * @param {THREE.WebGLRenderer} renderer - The renderer responsible for rendering the scene.
     * @param {Window} window - The browser window containing the Three.js canvas.
     * @param {THREE.PerspectiveCamera} camera - The camera used to view the scene, typically a PerspectiveCamera.
     * @param {boolean} [enabled=true] - A boolean to enable or disable automatic resizing. Defaults to true.
     */
    onResize(renderer, window, camera, enabled = true) {
        if (enabled === false) {
            console.log('onResize disabled');
            window.removeEventListener('resize', this.boundResize); // Use bound resize here
        } else {
            console.log('onResize enabled');
            this.boundResize = this.resize.bind(this, renderer, window, camera); // Bind resize with parameters
            window.addEventListener('resize', this.boundResize); // Add the bound resize listener
        }
    }

    /**
     * Updates the occlusion visibility of objects in the scene to optimize performance.
     * Objects that are far from the camera or completely occluded by other objects will be hidden.
     * Only objects of type THREE.Mesh will be considered for occlusion visibility.
     * 
     * @param {THREE.Scene} scene - The scene containing all objects to check for occlusion.
     * @param {THREE.Camera} camera - The camera position, from which the raycasting will start.
     * @param {number} cameraDistanceThreshold - The maximum distance at which to check for occlusion.
     *     Objects farther than this threshold will be hidden automatically.
     * @param {THREE.Raycaster} raycaster - The raycaster used for detecting intersections between objects.
     * @param {THREE.Vector3} direction - A reusable vector to specify the direction of the raycasting.
     */
    updateOcclusionVisibility(scene, camera, cameraDistanceThreshold, raycaster, direction) {
        scene.children.forEach((object) => {
            
            if (object.isMesh) {
                console.log('object is mesh');
                object.visible = !this.isObjectFullyOccluded(object, scene, camera, cameraDistanceThreshold, raycaster, direction);
            }
        });
    }

    /**
     * This function is used in pair with onResize. Because we need the same code and parameter to remove the event listener.
     * @param {*} renderer 
     * @param {*} window 
     * @param {*} camera 
     */
    resize(renderer, window, camera){
        console.log('resize');
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
    
    /**
     * Used with updateOcclusionVisibility to determine if an object is fully occluded.
     * @param {*} object 
     * @param {*} scene 
     * @param {*} camera 
     * @param {*} cameraDistanceThreshold 
     * @param {*} raycaster 
     * @param {*} direction 
     * @returns 
     */
    isObjectFullyOccluded(object, scene, camera, cameraDistanceThreshold, raycaster, direction) {
        if (camera.position.distanceTo(object.position) > cameraDistanceThreshold) {
            return true;
        }

        const boundingBox = new THREE.Box3().setFromObject(object);
        const pointsToCheck = [
            boundingBox.getCenter(new THREE.Vector3()),  // Center point
            boundingBox.min,                             // Minimum corner
            boundingBox.max,                             // Maximum corner
        ];
        
        for (let point of pointsToCheck) {
            direction.subVectors(point, camera.position).normalize();
            raycaster.set(camera.position, direction);
            const intersects = raycaster.intersectObjects(scene.children, true);

            if (intersects.length > 0 && intersects[0].object === object) {
                return false;
            }
        }

        return true;  // All points are occluded
    }

    /**
     * Loads a 3D model from a specified path and adds it to the scene with a given name and size.
     * The model is initially set to invisible after loading.
     * 
     * @param {THREE.Scene} scene - The scene where the model will be added.
     * @param {string} path - The path to the GLTF model file.
     * @param {string} name - The name to assign to the loaded model.
     * @param {number} size - The scale factor to apply to the model after loading.
     * @param {number} [timeToWait=500] - The delay (in milliseconds) to wait after loading the model.
     */
    async loadModel(scene, path, name, size, timeToWait=500) {
        const loader = new GLTFLoader();
        let model3D;
        loader.load(path, function(gltf){
            gltf.scene.scale.set(size, size, size);
            gltf.scene.name = name;
            model3D = gltf.scene;
            scene.add(model3D);
            scene.getObjectByName(name).position.set(0, 0, 0);
            scene.getObjectByName(name).visible = false;
            console.log("model uploaded");
        })
        await new Promise(r => setTimeout(r, timeToWait));
    }

    /**
     * Creates a copy of an existing model in the scene, using the specified name and size.
     * The copied model is positioned at the origin (0, 0, 0) and made visible.
     * The name of the copy is generated by appending "_copy" followed by an incrementing index.
     * 
     * @param {THREE.Scene} scene - The scene containing the original model to copy.
     * @param {string} name - The name of the model to copy.
     * @param {number} [size=1] - The scale factor to apply to the copied model.
     */
    create_copy(scene, name, size = 1) {
        const copy = scene.getObjectByName(name).clone();
        copy.position.set(0, 0, 0);
        copy.scale.set(size, size, size);
        copy.visible = true;
        let i=0
        for(let j=0; j<scene.children.length; j++) {
            if(scene.children[j].name.includes(name+"_copy")) {
                i++;
            }
        }
        copy.name = name + "_copy" + i;
        scene.add(copy);
        console.log("copy created from" + name + " with name " + copy.name);
    }

    attachLight(scene, color,intensity ,object){
        const directionalLight = new THREE.DirectionalLight(color, intensity);
        directionalLight.position.set(object.position.x, object.position.y + object.scale.y + 2, object.position.z);
        scene.add(directionalLight);
    }

    loadTexture(path, repeat = 1){
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(path);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(repeat, repeat);
        return texture; 
    }

    addScene(scene, textures, fw){
        const cs = new createScene();
        let dimensions= {x : 250, y: 250};
        cs.createBox(scene, textures, fw, dimensions);
    }

    addButtonToNavbar(){
        console.log('addButtonToNavbar');
        const Banner = this.CTABannerParameter.Banner;
        const navbar = this.CTABannerParameter.navbar;
        const container = this.CTABannerParameter.container;
        Banner.create_button(navbar, { text: "click em", onClick: () => alert("click"), classes: ["a"] });
        Banner.style_any();
        Banner.style_hover();
        Banner.style_navbar_children(navbar);
    }

    previewCTABanner(){
        console.log('previewCTABanner');
        const Banner = new CTABanner();
        Banner.createHTMLStructure();
        const navbar = Banner.getNavbar();
        const canvas = Banner.getCanvas();
        const container = Banner.getContainer();

        if (navbar) {
            Banner.create_button(navbar, { text: "click em", onClick: () => alert("click"), classes: ["a"] });
            Banner.create_dropdown({ parentId: "navbar0", buttonText: "menu déroulant", menuId: "myDropdown" });
          }
          
          Banner.create_modal();
          
        //   Banner.create_dropdown_list("myDropdown", [
        //       { text: "Parameters", onClick: () => Banner.openModal() },
        //       { text: "Link 2", href: "#link2" },
        //       { text: "Link 3", href: "#link3" }
        //     ]);
            
            //const modalContent = Banner.getModal_content();
            // if (modalContent) {
            //   Banner.create_button(modalContent, {
            //     text: "Click me!",
            //     onClick: () => alert("Hello!"),
            //   });
            //   Banner.create_button(modalContent, {
            //     text: "Click me!",
            //     onClick: () => alert("Hello!"),
                
            //   });
            //   Banner.create_button(modalContent, {
            //     text: "Click me!",
            //     onClick: () => alert("Hello!"),
                
            //   });
            // }
            
            //Banner.Open_dropdown(window);
            
            Banner.style_any();
            Banner.style_hover();
            if (container) {
              Banner.style_container0(container);
            }
            Banner.style_navbar();
            if (navbar) {
              Banner.style_navbar_children(navbar);
            }
            Banner.style_dropdown();
            Banner.style_dropbtn();
            Banner.style_dropdown_content();
            Banner.style_dropdown_content_a();
            Banner.style_dropdown_content_parameters();
            Banner.style_modal(document.getElementById("parametersModal"));
            Banner.style_modal_content();
            Banner.style_modal_content_button();
            Banner.style_close();
    }


}

export default Framework;
