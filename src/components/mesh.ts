
import * as THREE from 'three';

/**
 * A componenet that can update its values with the Scene
 * 
 * @export
 * @class MeshComponent
 * @extends {THREE.Mesh}
 */
export class MeshComponent extends THREE.Mesh {

    constructor(geometry?: THREE.Geometry | THREE.BufferGeometry, material?: THREE.Material | THREE.Material[]) {
        super(geometry, material);
        this.rotationX = this.rotationY = this.rotationZ = 0;
    }

    /**
     * Scene::update() will call this method. 
     * 
     * 
     * @memberof MeshComponent
     */
    public update() {
        this.rotation.x += this.rotationX;
        this.rotation.y += this.rotationY;
        this.rotation.z += this.rotationZ;
    }

    public rotationX;
    public rotationY;
    public rotationZ;
}