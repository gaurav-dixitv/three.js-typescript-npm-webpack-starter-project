
import * as THREE from 'three';

/**
 * A component that can update its values with the Scene
 * 
 * @export
 * @class LineComponent
 * @extends {THREE.Line}
 */
export class LineComponent extends THREE.Line {

    constructor(geometry?: THREE.Geometry | THREE.BufferGeometry, material?: THREE.LineDashedMaterial | THREE.LineBasicMaterial | THREE.ShaderMaterial) {
        super(geometry, material);
        this.rotationX = this.rotationY = this.rotationZ = 0;
    }

    /**
     * Scene::update() will call this method. 
     * 
     * 
     * @memberof LineComponent
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