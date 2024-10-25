class Framework {

    constructor(){
        console.log('Framework constructor');
        this.boundResize = this.resize.bind(this); // Create a bound resize function
    }

    /**
     * This function is designed to make the application resizable if the size of the window change. By default, we call it is set to be true
     * @param {The renderer used for rendering the scene : type renderer} renderer 
     * @param {The window of the web page used to host our renderer : type window} window
     * @param {The camera of the web page used to host our PerspectiveCamera } camera 
     * @param {The boolean to activate the resize of the window. By default it is true} enabled 
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
}

export default Framework;
