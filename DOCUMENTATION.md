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
updateOcclusionVisibility(scene, camera, cameraDistanceThreshold, raycaster, direction)
```
Optimizes performance by hiding objects in the scene that are far or occluded.

#### Parameters:
- **scene**: `THREE.Scene` - The scene containing objects.
- **camera**: `THREE.Camera` - The camera observing the scene.
- **cameraDistanceThreshold**: `number` - Maximum distance for visibility.
- **raycaster**: `THREE.Raycaster` - Raycasting utility.
- **direction**: `THREE.Vector3` - Direction vector for raycasting.

---

### **resize**
```javascript
resize(renderer, window, camera)
```
Handles resizing of the canvas and camera.

#### Parameters:
- **renderer**: `THREE.WebGLRenderer` - The renderer for the scene.
- **window**: `Window` - The browser window.
- **camera**: `THREE.PerspectiveCamera` - The camera for the scene.

---

### **isObjectFullyOccluded**
```javascript
isObjectFullyOccluded(object, scene, camera, cameraDistanceThreshold, raycaster, direction)
```
Checks if an object is fully occluded by other objects.

#### Parameters:
- **object**: `THREE.Object3D` - The object to check.
- **scene**: `THREE.Scene` - The scene containing the object.
- **camera**: `THREE.Camera` - The camera observing the scene.
- **cameraDistanceThreshold**: `number` - Distance threshold for occlusion.
- **raycaster**: `THREE.Raycaster` - Raycasting utility.
- **direction**: `THREE.Vector3` - Direction vector.

#### Returns:
- `boolean` - `true` if fully occluded; otherwise, `false`.

---

### **loadModel**
```javascript
async loadModel(scene, path, name, size, timeToWait = 500)
```
Loads a 3D model and adds it to the scene.

#### Parameters:
- **scene**: `THREE.Scene` - The target scene.
- **path**: `string` - Path to the GLTF model file.
- **name**: `string` - Name for the loaded model.
- **size**: `number` - Scale factor for the model.
- **timeToWait**: `number` (default: `500`) - Delay after loading.

#### Example:
```javascript
await framework.loadModel(scene, 'model.glb', 'MyModel', 1.5);
```

---

### **create_copy**
```javascript
create_copy(scene, name, size = 1)
```
Creates a copy of an existing model in the scene.

#### Parameters:
- **scene**: `THREE.Scene` - The scene containing the model.
- **name**: `string` - Name of the model to copy.
- **size**: `number` (default: `1`) - Scale factor for the copy.

---

### **attachLight**
```javascript
attachLight(scene, color, intensity, object)
```
Attaches a light to an object.

#### Parameters:
- **scene**: `THREE.Scene` - The target scene.
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
addScene(scene, textures, fw)
```
Creates a simple scene with box geometry and textures.

#### Parameters:
- **scene**: `THREE.Scene` - The target scene.
- **textures**: `Array<THREE.Texture>` - Textures for the box faces.
- **fw**: `Framework` - Framework instance.

---

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

## **Usage**
To use the `Framework` class, import and instantiate it:

```javascript
import Framework from './Framework';

const framework = new Framework();
framework.onResize(renderer, window, camera);
await framework.loadModel(scene, 'model.glb', 'MyModel', 1.5);
```

---

This documentation provides a detailed explanation of the `Framework` class and its methods. Feel free to extend it as your implementation grows.

