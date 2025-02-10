import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import createScene from './createScene';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import CTABanner from './CTABanner';
import { ceil } from 'three/tsl';

class Framework {
    CTABannerParameter;         // Contains the following keys: Banner, navbar, container
    mainParameters;             // Contains the following keys: scene, camera, renderer, cameraOrbital
    pendingLoads = false;       // Boolean to check if there are pending loads
    pendingCopies = false;      // Boolean to check if there are pending copies
    numberPendingLoads = 0;     // Number of pending loads
    numberPendingCopies = 0;    // Number of pending copies

    /**
     * Constructs a new Framework object with a default scene, camera, and renderer.
     * To get the scene, camera, and renderer, use the mainParameters attribute.
     */
    constructor(){
        console.log('Framework constructor');
        
        const Banner = new CTABanner();
        Banner.createHTMLStructure();
        const navbar = Banner.getNavbar();
        Banner.style_navbar();
        const container = Banner.getContainer();
        Banner.style_container0(container);
        
        this.CTABannerParameter = {"Banner": Banner,"navbar": navbar, "container": container};
        this.mainParameters = this.#init();
    }

    /**
     * Enables automatic resizing of the Three.js renderer and camera when the browser window is resized.
     * By default, when calling this function, it enabled the automatic resizing of the window.
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
            this.boundResize = this.#resize.bind(this, renderer, window, camera); // Bind resize with parameters
            window.addEventListener('resize', this.boundResize); // Add the bound resize listener
        }
    }
 
    /**
     * Updates the occlusion visibility of objects in the scene to optimize performance.
     * Objects that are far from the camera or completely occluded by other objects will be hidden.
     * Only objects of type THREE.Mesh will be considered for occlusion visibility.
     * 
     * @param {THREE.Camera} camera - The camera position, from which the raycasting will start.
     * @param {number} cameraDistanceThreshold - The maximum distance at which to check for occlusion.
     *     Objects farther than this threshold will be hidden automatically.
     * @param {THREE.Raycaster} raycaster - The raycaster used for detecting intersections between objects.
     * @param {THREE.Vector3} direction - A reusable vector to specify the direction of the raycasting.
     */
    updateOcclusionVisibility(camera, cameraDistanceThreshold, raycaster, direction) {
        const scene = window.scene;
        scene.children.forEach((object) => {
            
            if (object.isMesh) {
                console.log('object is mesh');
                object.visible = !this.#isObjectFullyOccluded(object, scene, camera, cameraDistanceThreshold, raycaster, direction);
            }
        });
    }
 
    /**
     * Attach a light to an object in the scene with a specified color and intensity.
     * The light is positioned above the object, slightly offset in the y-direction.
     * 
     * @param {string} color - The color of the light, specified as a hexadecimal string.
     * @param {number} intensity - The intensity of the light, typically between 0 and 1.
     * @param {THREE.Object3D} object - The object to which the light will be attached.
     * @returns {THREE.DirectionalLight} - The created light object.
     */
    attachLight(color,intensity ,object){
        const scene = window.scene;
        const directionalLight = new THREE.DirectionalLight(color, intensity);
        directionalLight.position.set(object.position.x, object.position.y + object.scale.y + 2, object.position.z);
        scene.add(directionalLight);
        return directionalLight;
    }

    /**
     * Begin the loading screen when we want to wait for model to be loaded.
     * @returns {HTMLElement} - The created loading screen element.
     */
    startLoadingScreen(){
        const loadingScreen = document.createElement('div');
        loadingScreen.id = 'loading-screen';
        loadingScreen.style.position = 'fixed';
        loadingScreen.style.top = '0';
        loadingScreen.style.left = '0';
        loadingScreen.style.width = '100%';
        loadingScreen.style.height = '100%';
        loadingScreen.style.backgroundColor = '#000';
        loadingScreen.style.color = '#fff';
        loadingScreen.style.display = 'flex';
        loadingScreen.style.justifyContent = 'center';
        loadingScreen.style.alignItems = 'center';
        loadingScreen.style.zIndex = '1000';
        loadingScreen.image = document.createElement('img');
        loadingScreen.image.src = 'https://terra-numerica.org/files/2020/10/cropped-favicon-rond.png';
        loadingScreen.image.style.width = '100px';
        loadingScreen.appendChild(loadingScreen.image);
        loadingScreen.innerHTML += '<h1><pre>  Loading</pre></h1>';

        var pos = 115;
        for(let i = 0; i < 4; i++){
            const loadingDot = document.createElement('div');
            loadingDot.style.width = '10px';
            loadingDot.style.height = '10px';
            loadingDot.style.backgroundColor = '#fff';
            loadingDot.style.borderRadius = '50%';
            loadingDot.style.position = 'absolute';
            loadingDot.style.left = window.innerWidth / 2 + pos + 20 * i + 'px';
            loadingDot.style.top = window.innerHeight / 2 - 4 + 'px';
            loadingDot.style.animation = 'bounce 2s infinite';
            loadingDot.style.animationDelay = 0.15 * i + 's';
            loadingScreen.appendChild(loadingDot);
        }

        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-15px);
            }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(loadingScreen);

        return loadingScreen;
    }

    /**
     * Remove the loading screen.
     */
    removeLoadingScreen(){
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.remove();
    }

// ---------------------- 3D Model functions ----------------------

    /**
     * Loads a 3D model from a specified path and adds it to the scene with a given name and size.
     * The model is set to invisible after loading. To get back the model, use .then() to give the model to a variable you have already defined.
     * 
     * @param {string} path - The path to the GLTF model file.
     * @param {string} name - The name to assign to the loaded model.
     * @param {number} size - The scale factor to apply to the model after loading.
     * @param {number} [timeToWait=500] - The delay (in milliseconds) to wait after loading the model.
     * @returns {THREE.Object3D} - The loaded model object.
     */
    async loadModel(path, name, size, timeToWait = 500) {
        const loader = new GLTFLoader();
        let scene = window.scene;
        this.pendingLoads = true;
        this.numberPendingLoads++;
    
        let model3D = await new Promise((resolve, reject) => {
            loader.load(path, (gltf) => {
                gltf.scene.scale.set(size, size, size);
                gltf.scene.name = name;
                scene.add(gltf.scene);
                gltf.scene.position.set(0, 0, 0);
                gltf.scene.visible = false;
                console.log("Model uploaded: " + name);
                resolve(gltf.scene);
            }, undefined, reject);
        });

        let added = false;
        while (!added) {
            for (let j = 0; j < scene.children.length; j++) {
                if (scene.children[j].name === name) {
                    added = true;
                    this.numberPendingLoads--;
                    break;
                }
            }
            if (!added) await new Promise((r) => setTimeout(r, 250));
        }
    
        if (this.numberPendingLoads === 0) {
            this.pendingLoads = false;
        }
    
        return model3D;
    }
    

    /**
     * Creates a copy of an existing model in the scene, using the specified name and size.
     * The copied model is positioned at the origin (0, 0, 0) and made visible.
     * The name of the copy is generated by appending "_copy" followed by an incrementing index or an index given when the function is call.
     * 
     * @param {string} name - The name of the model to copy.
     * @param {number} [size=1] - The scale factor to apply to the copied model.
     * @param {number} [counter=0] - It can add a number to append to the copied model name. If nothing is given, it will resume its own naming.
     * @param {number} [timeToWait=100] - The delay (in milliseconds) to wait after creating the copy.
     * @returns {THREE.Object3D} - The created copy object.
     */
    async create_copy(name, size = 1, counter = 0, timeToWait=100) {
        let scene = window.scene;
        const copy = scene.getObjectByName(name).clone();

        this.pendingCopies = true;
        this.numberPendingCopies++;

        copy.position.set(0, 0, 0);
        copy.scale.set(size, size, size);
        copy.visible = true;

        if(counter === 0){
            let i=0
            for(let j=0; j<scene.children.length; j++) {
                if(scene.children[j].name.includes(name+"_copy")) {
                    i++;
                }
            }
            copy.name = name + "_copy" + i;
        }
        else{
            copy.name = name + "_copy" + counter;
            if(scene.getObjectByName(copy.name) != undefined) {
                console.log("copy name : " + copy.name +  " already exists");
                return;
            }
        }
        scene.add(copy);
        console.log("copy created from : " + name + " \nwith name : " + copy.name);
        let added = false;
        while(!added){
            for(let j = 0; j < scene.children.length; j++){
                if(scene.children[j].name === copy.name){
                    added = true;
                    this.numberPendingCopies--;
                    break;
                }
            }
            if(!added){await new Promise(r => setTimeout(r, 250));}
        }
        if(this.numberPendingCopies === 0){
            this.pendingCopies = false;
        }
        return copy;
    }

    /**
     * Deletes a copy of a model in the scene with the specified name.
     * @param {String} name  The name of the model to delete
     * @returns {Boolean} - Returns true if the copy was deleted, false otherwise.
     */
    async delete_copy(name){
        while(this.pendingCopies || this.pendingLoads){
            console.log("waiting for pending copies or loads");
            await new Promise(r => setTimeout(r, 250));
        }
        let scene = window.scene;
        scene.remove(scene.getObjectByName(name));
        console.log("copy deleted : " + name);
        return scene.getObjectByName(name) === undefined
    }

    /**
     * Deletes all copies of a model in the scene with the specified name with the original model.
     * @param {*} name  The name of the model to delete
     * @returns {Boolean} - Returns true if the copies were deleted, false otherwise.
     */
    async delete_model(name){
        while(this.pendingCopies || this.pendingLoads){
            console.log("waiting for pending copies or loads");
            await new Promise(r => setTimeout(r, 250));
        }

        let scene = window.scene;
        let alldeleted = false
        let beginning = 0
        while(!alldeleted){
            if(beginning < scene.children.length){
                for(let i = beginning; i < scene.children.length; i++){
                    if(scene.children[i].name === name || scene.children[i].name.includes(name+"_copy")){
                        scene.remove(scene.children[i]);
                        beginning = i;
                        break
                    }
                    else if(i === scene.children.length - 1){
                        alldeleted = true;
                    }
                }
            }
            else{
                alldeleted = true;
            }
        }
        console.log("model deleted : " + name);
        return scene.getObjectByName(name) === undefined
    }

    /**
     * Load a texture from a specified path and apply it to a material with optional repeat.
     * The texture is set to repeat in both the S and T directions by default.
     * 
     * @param {string} path - The path to the texture image file.
     * @param {number} [repeat=1] - The number of times to repeat the texture in both directions.
     * @returns {THREE.Texture} - The loaded texture object.
     */
    loadTexture(path, repeat = 1){
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(path);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(repeat, repeat);
        return texture; 
    }

    /**
     * Create a simple scene with a box geometry and apply textures to its faces.
     * The box is centered at the origin (0, 0, 0) and has dimensions specified by the 'dimensions' object.
     * To access to the top layer of the table, use the name you initilized the table with and .children[0].
     * 
     * @param {Integer} width - The width of the table.
     * @param {Integer} depth - The depth of the table.
     * @param {Integer} YoffSet - The Y offset of the table.
     * @param {Integer} widthSpace - The width of the space between the table and the wall.
     * @param {Integer} heightSpace - The height of the space between the table and the ceiling.
     * @param {string} floor - The path to the texture image file for the floor. By default, it is a wood floor.
     * @param {string} wall - The path to the texture image file for the walls. By default, it is a brick wall.
     * @param {string} ceiling - The path to the texture image file for the ceiling. By default, it is a wood ceiling.
     * @returns {THREE.Mesh} - The created box mesh object.
     */
    addSimpleSceneWithTable(width, depth, YoffSet = -10,widthSpace = 250 , heightSpace = 250 ,  floor = "framework/textures/wood_floor.jpg",wall = "framework/textures/wall.jpg", ceiling = "framework/textures/roof.jpg"){
        const cs = new createScene();
        const scene = window.scene;
        let dimensions= {x : widthSpace, y: heightSpace};
        var textures = [floor, wall, ceiling];
        cs.createBox(scene, textures, this, dimensions, YoffSet);
        const table = cs.createTable(scene, this, {width, depth});
        return table;
    }

    /**
     * Add a scene with a box geometry and apply textures to its faces. The floor is at YoffSet beginning at (0,0,0).
     * @param {Integer} width - The width of the box. 
     * @param {Integer} height - The height of the box.
     * @param {Integer} YoffSet - The Y offset of the box.
     * @param {String} floor - The path to the texture image file for the floor. By default, it is a wood floor. 
     * @param {String} wall - The path to the texture image file for the walls. By default, it is a brick wall.
     * @param {String} ceiling - The path to the texture image file for the ceiling. By default, it is a wood ceiling. 
     */
    addSimpleSceneWithoutTable(width = 300, height = 250, YoffSet = -10, floor = "framework/textures/wood_floor.jpg",wall = "framework/textures/wall.jpg", ceiling = "framework/textures/roof.jpg"){
        const cs = new createScene();
        const scene = window.scene;
        let dimensions= {x : width, y: height};
        var textures = [floor, wall, ceiling];
        cs.createBox(scene, textures, this, dimensions, YoffSet);
    }

// ---------------------- Navbar functions ----------------------

    /**
     * Add a button to the navbar with the specified text and onclick function.
     * 
     * @param {string} textButton - The text to display on the button.
     * @param {Function} onclickFunction - The function to execute when the button is clicked.
     * @param {boolean} [hover=true] - A boolean to enable or disable hover effects on the button. Defaults to true.
     * @param {Array<string>} [classesOfTheButton=["a"]] - An array of classes to apply to the button element.
     * @returns {HTMLElement} - The created button element.
     */
    addButtonToNavbar(textButton = "click me", onclickFunction = () => alert("click"),hover = true, classesOfTheButton = ["a"]){
        const Banner = this.CTABannerParameter.Banner;
        const navbar = this.CTABannerParameter.navbar;
        const container = this.CTABannerParameter.container;
        Banner.create_button(navbar, { text: textButton, onClick: onclickFunction, classes: classesOfTheButton });
        Banner.style_any();
        if (hover == true) {
            Banner.style_hover(textButton);
        }
        
        Banner.style_navbar_children(navbar);
        var buttonToChange = document.getElementById("navbar0").children[document.getElementById("navbar0").children.length - 1];
        return buttonToChange;
    }

    /**
     * Add a dropdown menu to the navbar with the specified text and list of dropdown items.
     * Each dropdown item is an object with a 'text' property and an 'onClick' function.
     * 
     * @param {string} textButton - The text to display on the dropdown button.
     * @param {Array<{text: string, onClick: Function}>} dropdownList - An array of dropdown items.
     * @returns {HTMLElement} - The created dropdown button element.
     */
    addDropdownToNavbar(textButton = "DropDown", dropdownList = [{ text: "Parameters", onClick: () => alert("Hello!") }]){
        const Banner = this.CTABannerParameter.Banner;
        const navbar = this.CTABannerParameter.navbar;
        const container = this.CTABannerParameter.container;

        Banner.create_dropdown({ parentId: "navbar0", buttonText: textButton, menuId: textButton });
        Banner.create_dropdown_list(textButton, dropdownList);

        Banner.style_any();
        Banner.style_hover(textButton);
        Banner.style_navbar_children(navbar);
        Banner.style_dropdown(textButton);
        Banner.style_dropbtn(textButton);
        Banner.style_dropdown_content();
        Banner.style_dropdown_content_a();
        Banner.style_dropdown_content_parameters();  

        var buttonToChange = document.getElementById("navbar0").children[document.getElementById("navbar0").children.length - 1];
        return buttonToChange;
    }

    /**
     * Change the text which is displayed on the button at the specified index in the navbar.
     * @param {Integer} buttonNumber The button which text will be changed. Value between 1 and +infinity
     * @param {String} newText The text which will replace the current text of the button
     */
    changeTextOfButton(buttonNumber, newText){
        var buttonToChange = document.getElementById("navbar0").children[buttonNumber];
        buttonToChange.textContent = newText;
    }

    /**
     * Change the text which is displayed on the dropdown button at the specified index in the navbar.
     * @param {Integer} dropdownNumber The dropdown which text will be changed. Value between 1 and +infinity
     * @param {Integer} dropBoxToChange The dropbox which text will be changed. Value between 0 and the number of button in the drop down.
     * @param {String} newText The text which will replace the current text of the dropdown
     */
    changeTextOfDropdown(dropdownNumber,dropBoxToChange, newText){
        var dropDown = document.getElementById("navbar0").children[dropdownNumber];
        if(dropDown.children[1].length <= dropBoxToChange){
            console.log("The button is out of range");
            return;
        }
        else{
            if(dropBoxToChange == 0) {
                var dropBox = dropDown.children[dropBoxToChange];
                dropBox.textContent = newText;
            }
            else{
                var dropBox = dropDown.children[1].children[dropBoxToChange-1];
                dropBox.textContent = newText;
            }
        }


        
    }

    /**
     * Get the width of the browser window.
     * @returns {number} - The width of the browser window in pixels.
     */
    getWindowWidth(){return window.innerWidth;}

    /**
     * Get the height of the browser window.
     * @returns {number} - The height of the browser window in pixels.
     */
    getWindowHeight(){return window.innerHeight - document.getElementById("navbar0").offsetHeight;}

// ---------------------- Private functions ----------------------

    /**
     * Private function to initialize the scene, camera and renderer.
     * @returns {Object} - Returns an object containing the scene, camera and renderer.
     */
    #init(){
        console.log('init');
        const scene = new THREE.Scene();
        window.scene = scene;
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(this.getWindowWidth(), this.getWindowHeight());
        document.body.appendChild(renderer.domElement);

        camera.position.z = 60;
        camera.position.y = 50;
        const cameraOrbital = new OrbitControls(camera, renderer.domElement);
        cameraOrbital.update();

        return {"scene": scene, "camera": camera, "renderer": renderer};

    }

    /**
     * Private function to resize the renderer and camera when the browser window is resized.
     * @param {*} renderer the renderer responsible for rendering the scene.
     * @param {*} window the browser window containing the Three.js canvas.
     * @param {*} camera the camera used to view the scene, typically a PerspectiveCamera.
     */
    #resize(renderer, window, camera){
        console.log('resize');
        renderer.setSize(window.innerWidth, window.innerHeight - document.getElementById("navbar0").offsetHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        let navbar = document.getElementById('navbar0');
        navbar = navbar.style.width = window.innerWidth + 'px';
        camera.updateProjectionMatrix();
    }

    /**
     * Private function to check if an object is fully occluded by other objects in the scene.
     * @param {*} object  The object to check for occlusion.
     * @param {*} camera  The camera position, from which the raycasting will start.
     * @param {*} cameraDistanceThreshold  The maximum distance at which to check for occlusion.
     * @param {*} raycaster  The raycaster used for detecting intersections between objects.
     * @param {*} direction  A reusable vector to specify the direction of the raycasting.
     * @returns {boolean} - Returns true if the object is fully occluded, false otherwise.
     */
    #isObjectFullyOccluded(object, camera, cameraDistanceThreshold, raycaster, direction) {
        const scene = window.scene;
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

}

export default Framework;
