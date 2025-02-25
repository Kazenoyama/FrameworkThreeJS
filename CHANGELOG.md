## [v1.2.5]
### Added
- BannerStyle.css

### Changed
- link BannerStyle.css to the index.html.
- package.json has new function to create a way to have either a framework with only the css or the framework with the possibility to have a 3D environnement.

### Removed

### Deprecated

### Fixed

# --------------------------------------------------------------------

## [v1.2.0]
### Added
- Add default parameters to every compatible function.
- `loadModel(...)` registered the size of the object to give it to it's copy if not specified.

### Changed
- `onResize({renderer, window, camera, enabled} = {})` : `renderer`, `window` and `camera` have been made optional.
- `attachLight(object, {color , intensity, name} = {})` : `color`, `intensity` and `name` have been made optional.
- `async loadModel(path, name, {size, timeToWait, visible} = {})` : `size`, `timeToWait` and `visible` have been made optional.
- `loadTexture(path, {repeatHorizontal, repeatVertical, repeat} = {})` : `repeatHorizontal`, `repeatVertical` and `repeat` have been made optional.
- `addSimpleSceneWithTable({width, depth, YoffSet, widthSpace, heightSpace, floor, wall, ceiling} = {})` : every parameters have been made optional.
- `addSimpleSceneWithoutTable({width, height, YoffSet, floor, wall, ceiling} = {})` : every parameters have been made optional.
- `addButtonToNavbar({textButton = "click me", onclickFunction = () => alert("click"),hover = true, classesOfTheButton = ["a"]} = {})` : `textButton`, `onclickFunction` and `classesOfTheButton` have been made optional.
- `addDropdownToNavbar({textButton , dropdownList} = {})` : `textButton` and `dropdownList` have been made optional.

### Removed
- For method like `loadModel`, `create_copy`, `delete_model`, the restriction of putting `await` before the call is removed

### Deprecated

### Fixed

# --------------------------------------------------------------------

## [v1.1.0]
### Added
- ``` changeTextOfButton(buttonNumber, newText)``` : Function to change the text content of a button in the navbar

- ``` changeTextOfDropdown(dropdownNumber,dropBoxToChange, newText) ``` : Function to change the text content of a dropdown in the navbar and its children

- ```npm run updateDoc``` : Call in the terminal to update the `DOCUMENTATION.md` file with last change in the framework.js

- ```startLoadingScreen``` : Function to call the loading screen of the framework.

- ```removeLoadingScreen``` : Function to remove the loading screen from the page

- ```addSceneFromJson ``` : Function to load an existing Json file containing a scene and use it.

- `npm run deploy` : Script to move eveything in a folder call framework and oly leave the index.html and package.json at the root folder.

### Changed
- ```create_copy(name, scale, counter, timer)``` :  Add the counter attribut which is an ``Integer``. If not included, by default it will be 0 and each time the function is call for the same model, it will create a copy with incrementing index. If counter is provided at the call, it will use the integer provided to add to the name of the copy and check if it already exist. If not it will add the new copy to the scene, else it will return and do nothing.

- Directory tree included a folder with the framework and a folder where new project are implemented called ``` src ```.

- ```addScene(width, depth, floor = "framework/textures/wood_floor.jpg",wall = "framework/textures/wall.jpg", ceiling = "framework/textures/roof.jpg")``` : Remove the list of textures to a more forced way of doing it. Now you need to give three textures separatly and if you want you can use the textures from the frameworks if you don't specifies new textures.

- `addScene()` -- > `addSimpleSceneWithTable(width, depth, YoffSet = -10,widthSpace = 250 , heightSpace = 250 ,  floor = "path",wall = "path", ceiling = "path")` and `addSimpleSceneWithoutTable(width = 300, height = 250, YoffSet = -10, floor = "path",wall = "path", ceiling = "path")` : Divide the the addScene into two seperate function. One with a table and one whitout it. Add the Yoffset to the function to be able to move the room created vertically.

### Removed
- Remove `cameraOrbital` of the `mainParameters` of the framework.

### Deprecated

### Fixed
- When the window resize and we use the function `onResize`, we have the correct aspect of object.

# --------------------------------------------------------------------

## [v1.0.0]
### Added
- Added framework.js, CTABanner.js, createScene.js, table.js
- List of function available in the framework :
    - Function to resize the window each time it is moved or its size changes
    - Function to make THREE.js geometry object disappear if it is behind another THREE.js geometry object
    - Function to facilitate the loading of 3D model
    - Function to create a copy of a 3D model already loaded
    - Function to attach a light above on object
    - Function to load a texture and repeat it a number of times
    - Function to add a precreated scene which is a box with a table at its center
    - Function to add a button on the navigation bar
    - Function to add a dropdown on the navigation bar
    - Function to delete a particuliar copy of a model
    - Function to delete a particuliar model

### Changed

### Removed

### Deprecated

### Fixed