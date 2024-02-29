import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class ThreeBasicScene {
  viewer: HTMLElement;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  cube: THREE.Mesh;

  constructor(viewer: HTMLElement) {
    this.viewer = viewer;
    this.scene = new THREE.Scene();
    const aspect = this.viewer.clientWidth / this.viewer.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    this.camera.position.set(2, 3, 3);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });

    this.init();
    this.addControls();
    this.addCube();
  }

  init() {
    this.renderer.setSize(this.viewer.clientWidth, this.viewer.clientHeight);
    this.viewer!.appendChild(this.renderer.domElement);
    this.animate();
    window.addEventListener(
      "resize",
      () => {
        this.onWindowResize();
      },
      false
    );
  }

  animate(): void {
    requestAnimationFrame(() => {
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      this.cube.rotation.x += 0.01;
      this.cube.rotation.z += 0.01;
      this.animate();
    });
  }

  onWindowResize() {
    this.camera.aspect = this.viewer.clientWidth / this.viewer.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.viewer.clientWidth, this.viewer.clientHeight);
  }

  addControls(): void {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // controls.target = new THREE.Vector3(3, 3, 3);
    this.controls.enableDamping = true;
    // this.controls.dumpingFactor = 0.001;
  }

  addCube(): void {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshNormalMaterial();
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
  }
}
