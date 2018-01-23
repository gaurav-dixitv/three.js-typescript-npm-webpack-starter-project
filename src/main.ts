
import { Scene } from './core/scene'
const scene = new Scene();

function init() {
    scene.init();
    scene.update();
}

//Entry point.
window.onload = () => {
    //Browser check go here.    
    init();
}

//Handle resize.
window.addEventListener('resize', function () {
    scene.renderer.setSize(window.innerWidth, window.innerHeight)
    scene.camera.aspect = window.innerWidth / window.innerHeight
    scene.camera.updateProjectionMatrix()
}, false)

