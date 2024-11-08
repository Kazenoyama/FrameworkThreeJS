import * as THREE from 'three';

class Framework {

    constructor(){
        console.log('Framework constructor');
        this.boundResize = this.resize.bind(this); // Create a bound resize function
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
     * 
     * @param {THREE.Scene} scene - The scene containing all objects to check for occlusion.
     * @param {THREE.Camera} camera - The camera position, from which the raycasting will start.
     * @param {number} cameraDistanceThreshold - The maximum distance at which to check for occlusion.
     *     Objects farther than this threshold will be hidden automatically.
     * @param {THREE.Raycaster} raycaster - The raycaster used for detecting intersections between objects.
     * @param {THREE.Vector3} direction - A reusable vector to specify the direction of the raycasting.
     */
    updateOcclusionVisibility(scene, camera, cameraDistanceThreshold, raycaster, direction) {
        console.log("Hello")
        
        scene.children.forEach((object) => {
            
            if (object.isMesh) {
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


}

export default Framework;
