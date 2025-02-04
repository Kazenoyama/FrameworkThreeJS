## [v1.1.0]
### Added
- ```create_copy(name, scale, counter, timer)``` :  Add the counter attribut which is an ``Integer``. If not included, by default it will be 0 and each time the function is call for the same model, it will create a copy with incrementing index. If counter is provided at the call, it will use the integer provided to add to the name of the copy and check if it already exist. If not it will add the new copy to the scene, else it will return and do nothing.

### Changed
- Directory tree included a folder with the framework and a folder where new project are implemented called ``` src ```.
### Removed
- Remove `cameraOrbital` of the `mainParameters` of the framework.

### Deprecated

### Fixed

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