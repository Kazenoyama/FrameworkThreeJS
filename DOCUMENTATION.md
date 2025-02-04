# Framework Documentation

This document describes the `Framework` class, which provides tools and methods for building 3D applications using Three.js, GLTFLoader, and custom components.

---

## **Class: Framework**
### Description
The `Framework` class initializes a CTA (Call to Action) banner, manages the rendering process, and provides utilities for handling 3D scenes, models, textures, and user interactions.

### **Constructor**
```javascript
constructor()
```
Initializes the Framework class, creating and styling the CTA banner and setting up necessary parameters.
Parameters are `mainParameter` containing the `scene`, `camera`, `renderer`.

### Example: 
```javascript
const fw = new Framework()
const scene = fw.mainParameters["scene"];
const camera = fw.mainParameters["camera"];
const renderer = fw.mainParameters["renderer"];
```

---

## **Methods**

### **onResize**
```javascript
onResize(renderer, window, camera, enabled = true)
```
Enables or disables automatic resizing of the Three.js renderer and camera when the window is resized.

#### Parameters:
- **renderer**: `THREE.WebGLRenderer` - The renderer for the scene.
- **window**: `Window` - The browser window containing the canvas.
- **camera**: `THREE.PerspectiveCamera` - The camera used in the scene.
- **enabled**: `boolean` (default: `true`) - Whether resizing is enabled.

#### Example:
```javascript
framework.onResize(renderer, window, camera);
```

---

### **updateOcclusionVisibility**
```javascript
updateOcclusionVisibility(camera, cameraDistanceThreshold, raycaster, direction)
```
Optimizes performance by hiding objects in the scene that are far or occluded.

#### Parameters:
- **camera**: `THREE.Camera` - The camera observing the scene.
- **cameraDistanceThreshold**: `number` - Maximum distance for visibility.
- **raycaster**: `THREE.Raycaster` - Raycasting utility.
- **direction**: `THREE.Vector3` - Direction vector for raycasting.

---

### **attachLight**
```javascript
attachLight(color, intensity, object)
```
Attaches a light to an object.

#### Parameters:
- **color**: `string` - Color of the light.
- **intensity**: `number` - Light intensity.
- **object**: `THREE.Object3D` - The object to attach the light to.

---

### **loadTexture**
```javascript
loadTexture(path, repeat = 1)
```
Loads a texture and applies repeat settings.

#### Parameters:
- **path**: `string` - Path to the texture file.
- **repeat**: `number` (default: `1`) - Number of repetitions.

#### Returns:
- `THREE.Texture` - The loaded texture.

---

### **addScene**
```javascript
addScene(textures, fw, {width, depth})
```
Creates a simple scene with box geometry and textures.
Add a table in the middle

#### Parameters:
- **textures**: `Array<THREE.Texture>` - Textures for the box faces.
- **fw**: `Framework` - Framework instance.
- **{width, depth}**: `Object` - Dimensions of the table

---

## 3D model

### **loadModel**
```javascript
async loadModel(path, name, size, timeToWait = 500)
```
Loads a 3D model and adds it to the scene.

#### Parameters:
- **path**: `string` - Path to the GLTF model file.
- **name**: `string` - Name for the loaded model.
- **size**: `number` - Scale factor for the model.
- **timeToWait**: `number` (default: `500`) - Delay after loading.

#### Example:
```javascript
await framework.loadModel('scene.glb', 'MyModel', 1);
```

---

### **create_copy**
```javascript
create_copy(name, size = 1, counter = 0, timeToWait = 100)
```
Creates a copy of an existing model in the scene with incrementing name : name_copy0, name_copy1, name_copy2,(...) .
If counter is provided, it will add the integer given and replace the index by this integer. It will check if the name already exist and if it is, it will do nothing, else it will create the copy with the name associated.

#### Parameters:
- **name**: `string` - Name of the model to copy.
- **size**: `float` (default: `1`) - Scale factor for the copy.
- **counter**: `integer` (default: `0`) - Integer to add to the name of the copy.
- **TimeToWait**: `integer` (default: `100`) - Time to wait for the model to be loaded if it is not an async model.

---

### **delete_copy**
```javascript
delete_copy(name)
```
Delete the copy with the given name from the scene

### Parameters:
- **name**: `string` - Name of the copy to delete.

---

### **delete_model**
```javascript
delete_model(name)
```
Delete the model with all its copies from the scene

### Parameters:
- **name**: `string` - Name of the model to delete.

---

### **loadTexture**
```javascript
loadTexture(path, repeat)
```
Load a texture and repeat the pattern `x` time

### Parameters:
- **path**: `string` - The path to get to the textures
- **repeat**: `int` - The number of repetition of the textures, by default it is 1

---

### **addScene**
```javascript
addScene(textures, fw, {width, depth})
```
Add to the scene a a box object to create a space where the project can be placed. It also add a table at the center

### Parameters:
- **textures**: `String[3]` - Contains three path to different or same textures
- **fw**: `Framework` - the frameworks use
- **{width, depth}**: `int` - The dimensions of the table

## Navigation bar

### **addButtonToNavbar**
```javascript
addButtonToNavbar(textButton, onclickFunction, hover = true, classesOfTheButton = ["a"])
```
Adds a button to the navbar.

#### Parameters:
- **textButton**: `string` - Button text.
- **onclickFunction**: `Function` - Function executed on click.
- **hover**: `boolean` (default: `true`) - Enable hover effect.
- **classesOfTheButton**: `Array<string>` (default: `["a"]`) - Button classes.

---

### **addDropdownToNavbar**
```javascript
addDropdownToNavbar(textButton, dropdownList)
```
Adds a dropdown menu to the navbar.

#### Parameters:
- **textButton**: `string` - Dropdown button text.
- **dropdownList**: `Array<{text: string, onClick: Function}>` - Dropdown items.

---

### changeTextOfButton
```javascript
changeTextOfButton(buttonNumber, newText)
```

Change the text content of designated button in the order of left to right on the navigation bar. 1 is the left-most button and +infinity the right-most button.

---

### changeTextOfDropdown
```javascript
changeTextOfDropdown(dropdownNumber,dropBoxToChange, newText)
```

Change the text content of designated dropdown and sub button in the order of left to right on the navigation bar. 1 is the left-most button and +infinity the right-most button. For the sub button, it is between 0 and +infinity with 0 being the name of the dropDown and everything else are the order of up to down in the dropdown

---

### **getWindowWidth**
```javascript
getWindowWidth()
```
Returns the window width.

#### Returns:
- `number` - Width of the window.

---

### **getWindowHeight**
```javascript
getWindowHeight()
```
Returns the window height excluding the navbar.

#### Returns:
- `number` - Height of the window minus the navbar height.

---

## Private function

### **init : Private function**
```javascript
#init()
```
Initializes the 3D scene, sets up the camera, renderer, and other essential components.

---

### **resize : Private function**
```javascript
#resize(renderer, window, camera)
```
Handles resizing of the canvas and camera.

#### Parameters:
- **renderer**: `THREE.WebGLRenderer` - The renderer for the scene.
- **window**: `Window` - The browser window.
- **camera**: `THREE.PerspectiveCamera` - The camera for the scene.

---

### **isObjectFullyOccluded : Private Function**
```javascript
#isObjectFullyOccluded(object, camera, cameraDistanceThreshold, raycaster, direction)
```
Checks if an object is fully occluded by other objects.

#### Parameters:
- **object**: `THREE.Object3D` - The object to check.
- **camera**: `THREE.Camera` - The camera observing the scene.
- **cameraDistanceThreshold**: `number` - Distance threshold for occlusion.
- **raycaster**: `THREE.Raycaster` - Raycasting utility.
- **direction**: `THREE.Vector3` - Direction vector.

#### Returns:
- `boolean` - `true` if fully occluded; otherwise, `false`.

---

This documentation provides a detailed explanation of the `Framework` class and its methods. Feel free to extend it as your implementation grows.

