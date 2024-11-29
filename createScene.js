import * as THREE from 'three';
import framework from './framework';


class createScene {

    createScene(){

    }

    createPlane(width, height, texture){
        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(width, height, 1, 1),
            new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })
        );
        return plane;
    }

    createBox(scene, textures, fw){
        const floor_texture = fw.loadTexture(textures[0],10);
        const ground = this.createPlane(100, 100, floor_texture);
        ground.rotation.x = Math.PI / 2;
        ground.position.y = -10;
        scene.add(ground);

        const wall_texture = fw.loadTexture(textures[1], 2);
        const wall1 = this.createPlane(100,50, wall_texture);
        wall1.position.z = ground.position.z - ground.geometry.parameters.width / 2;
        wall1.position.y = ground.position.y + wall1.geometry.parameters.height / 2;
        scene.add(wall1);

        const wall2 = this.createPlane(100,50, wall_texture);
        wall2.position.z = ground.position.z + ground.geometry.parameters.width / 2;
        wall2.position.y = ground.position.y + wall2.geometry.parameters.height / 2;
        scene.add(wall2);

        const wall3 = this.createPlane(100,50, wall_texture);
        wall3.position.x = ground.position.x - ground.geometry.parameters.width / 2;
        wall3.position.y = ground.position.y + wall3.geometry.parameters.height / 2;
        wall3.rotation.y = Math.PI / 2;
        scene.add(wall3);

        const wall4 = this.createPlane(100,50, wall_texture);
        wall4.position.x = ground.position.x + ground.geometry.parameters.width / 2;
        wall4.position.y = ground.position.y + wall4.geometry.parameters.height / 2;
        wall4.rotation.y = Math.PI / 2;
        scene.add(wall4);

        const ceiling_texture = fw.loadTexture(textures[2], 6);
        const ceiling = this.createPlane(100, 100, ceiling_texture);
        ceiling.rotation.x = Math.PI / 2;
        ceiling.position.y = ground.position.y + wall1.geometry.parameters.height;
        scene.add(ceiling);
    }









}

export default createScene;