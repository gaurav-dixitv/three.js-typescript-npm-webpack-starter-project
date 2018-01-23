import * as THREE from 'three';

//components
import { MeshComponent } from '../components/mesh'
import { LineComponent } from '../components/line'

//utilities
const OrbitControls = require('three-orbit-controls')(THREE)
import * as OrbitControlsDef from "three/three-orbitcontrols";
import Stats = require('stats.js');
import dat from 'dat.gui';

import * as Utils from '../utils'


/**
 * Scene class for the simulation. Acts as the entry point and handles initlizaing, rendering, camera, updates. 
 * 
 * @export
 * @class Scene
 */
export class Scene {

    public constructor() { }


    /**
     * Adds a few custom components to the scene.
     * 
     * @private
     * 
     * @memberof Scene
     */
    private addComponents() {
        this.meshComponents = [];
        this.lineComponents = [];

        //A box wireframe
        let boxGeometry = new THREE.BoxGeometry(2, 2, 2)
        let boxMaterial = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x000000 })
        let wirebox = new MeshComponent(boxGeometry, boxMaterial);
        wirebox.rotationX = wirebox.rotationY = 0.02;
        this.scene.add(wirebox)
        this.meshComponents.push(wirebox);             //add to your meshcomponets for updates

        //smaller wireframes
        for (let i = 0; i < 9; ++i) {
            let geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3)
            let material = new THREE.MeshBasicMaterial({ wireframe: true, color: Utils.randColor() })
            let wirebox = new MeshComponent(geometry, material);
            wirebox.rotationX = wirebox.rotationY = -0.02 * (i + 1);

            let radius = 3;
            wirebox.position.x = radius * Math.cos((i * 40) * Math.PI / 180);
            wirebox.position.y = radius * Math.sin((i * 40) * Math.PI / 180);
            wirebox.position.z = i;
            this.scene.add(wirebox)
            this.meshComponents.push(wirebox);      //add to your meshcomponets for updates
        }

        //random lines
        for (let i = 0; i < 13; ++i) {
            let material = new THREE.LineBasicMaterial({ color: Utils.randColor() });
            material.transparent = true;
            material.opacity = 0.0;                 //enabled with dat.gui control
            let geometry = new THREE.Geometry();
            for (let j = 0; j < Utils.rand(3, 5); ++j) {
                geometry.vertices.push(new THREE.Vector3(i + j, Utils.rand(0, 3), 0));
            }
            geometry.vertices.push(new THREE.Vector3(2, 0, 0));
            let line = new LineComponent(geometry, material);
            this.scene.add(line);
            line.rotationX = 0.008;
            line.rotationY = 0.007 * (i + 1);
            line.rotationZ = 0.002;
            this.lineComponents.push(line);         //add to your linecomponets for updates
        }

        //add a torus
        let torusGeometry = new THREE.TorusKnotGeometry(0.4, 0.1, 20, 5);
        let torusMaterial = new THREE.MeshNormalMaterial();
        var mesh = new MeshComponent(torusGeometry, torusMaterial);
        mesh.rotationX = mesh.rotationY = 0.007;
        this.scene.add(mesh);
        this.meshComponents.push(mesh);
    }


    /**
     * Adds stats and dat.gui controls to the scene.
     * 
     * @private
     * 
     * @memberof Scene
     */
    private addUtilities() {
        //stats
        this.stats = new Stats();
        this.stats.showPanel(0);
        document.body.appendChild(this.stats.dom);

        //gui controls
        this.datGui = new dat.GUI();
        this.datGui.add(this, 'panCamera').onChange(this.onPanCamera.bind(this));
        this.datGui.add(this, 'renderLines');
    }


    /**
     * Event listener for the panCamera gui toggle.
     * 
     * @private
     * @param {any} pan 
     * 
     * @memberof Scene
     */
    private onPanCamera(pan) {
        this.controls.enabled = !pan;               //disable controls when camera is panning.
    }


    /**
     * Initialize the Scene, renderer, camera and add components.
     * 
     * 
     * @memberof Scene
     */
    public init() {
        //create a THREE.js Scene
        this.scene = new THREE.Scene();

        //create renderer
        //TODO test browser support.
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(new THREE.Color(0xEEEEEE));
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        //setup camera
        this.camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 1, -3)
        this.camera.lookAt(new THREE.Vector3());
        this.camera.position.z = this.camPan = -3;

        //setup controls
        this.controls = new OrbitControls(this.camera);

        this.addComponents();
        if (DEBUG) this.addUtilities();
    }

    /**
     * Updates the simulation.
     * 
     * @memberof Scene
     */
    public update() {
        requestAnimationFrame(this.update.bind(this));

        //update utilities
        if (DEBUG) this.stats.update();
        this.controls.update();

        //update components
        this.meshComponents.forEach(component => {
            component.update();
        });
        this.lineComponents.forEach(component => {
            component.update();
            if (this.renderLines) component.material.opacity = 0.3;
            else component.material.opacity = 0.0;
        });

        //update camera
        if (this.panCamera) {
            if (this.camera.position.z <= -5) this.camPan = 0.03;
            else if (this.camera.position.z >= 5) this.camPan = -0.03;
            this.camera.position.z += this.camPan;
            this.camera.rotation.z += 0.003;
        }

        //render!
        this.renderer.render(this.scene, this.camera);
    }


    //dat.gui properties
    public renderLines: boolean = false;
    public panCamera: boolean = false;

    //THREE setup
    public renderer: THREE.WebGLRenderer;
    public camera: THREE.PerspectiveCamera;
    public scene: THREE.Scene;

    //components
    private meshComponents: MeshComponent[] = [];
    private lineComponents: LineComponent[] = [];
    private camPan: number;

    //Utilities
    private stats: Stats;
    private datGui: any;
    private controls: OrbitControlsDef.OrbitControls;
}