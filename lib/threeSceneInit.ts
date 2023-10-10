// @ts-nocheck
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default class SceneInit {
  constructor(canvasId, canvasEl, game) {
    // NOTE: Core components to initialize Three.js app.
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;

    // NOTE: Camera params;
    this.fov = 45;
    this.nearPlane = 1;
    this.farPlane = 1000;
    this.canvasId = canvasId;
    this.canvasEl = canvasEl;

    // NOTE: Additional components.
    this.clock = undefined;
    this.controls = undefined;

    // NOTE: Lighting is basically required.
    this.ambientLight = undefined;
    this.directionalLight = undefined;

    this.raycaster = undefined;
    this.game = game;

    this.drankPotion = false;
  }

  initialize() {
    const canvasEL = document.getElementById(this.canvasEl);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      canvasEL.offsetWidth / canvasEL.offsetHeight,
      1,
      1000
    );
    this.camera.position.z = 48;
    const canvas = document.getElementById(this.canvasId);

    if (this.camera) {
      // Add mousedown event listener for canvas only
      canvas?.addEventListener('pointerdown', (e) => this.onPointerDown(this.camera, e));
      canvas?.addEventListener('pointermove', (e) => this.onPointerMove(this.camera, e));
    }

    // NOTE: Specify a canvas which is already created in the HTML.
    try {
      this.renderer = new THREE.WebGLRenderer({
        canvas,
        // NOTE: Anti-aliasing smooths out the edges.
        // antialias: true,
        // alpha: true,
      });
    } catch (err) {
      this.renderer = undefined;
    }
   
    if (this.renderer) {
      this.renderer.setClearColor(0x000000, 0); // the default
      // this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setSize(canvasEL.offsetWidth, canvasEL.offsetHeight);
      // document.body.appendChild(this.renderer.domElement);
  
      this.clock = new THREE.Clock();
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  
      // ambient light which is for the whole scene
      this.ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
      this.ambientLight.castShadow = true;
      this.scene.add(this.ambientLight);
  
      this.directionalLight = new THREE.DirectionalLight(0xffffff, .5);
      this.directionalLight.position.set(0, 0, 64);
      this.scene.add(this.directionalLight);
      const myArray = window.location.href.split(" ");
      if (myArray.at(-1) === "/") {
        // if window resizes
        window.addEventListener("resize", () => this.onWindowResize(), false);
      }
    }
  }

  onPointerMove(camera, event) {

    const mouse_x = (( event.clientX - this.renderer.domElement.offsetLeft) / 
      this.renderer.domElement.clientWidth ) * 2 - 1;
    const mouse_y = - (( event.clientY - this.renderer.domElement.offsetTop) / 
      this.renderer.domElement.clientHeight ) * 2 + 1;
    const mouse3D = new THREE.Vector3(mouse_x, mouse_y, 0.5)

    const raycaster = new THREE.Raycaster()

    if (camera) {
      raycaster.setFromCamera(mouse3D, camera)
      // Detect a collision for the potion / scene object
      const intersects = raycaster.intersectObjects(
        this.scene.children, true);
      if(intersects.length > 0){
        document.body.style.cursor = "pointer";
      } else {
        document.body.style.cursor = "default";
      }
    }
  }

  onPointerDown(camera, event){
    // Detect mouse clicks on the canvas object / three.js model 
    event.preventDefault();

    const mouse_x = (( event.clientX - this.renderer.domElement.offsetLeft) / 
      this.renderer.domElement.clientWidth ) * 2 - 1;
    const mouse_y = - (( event.clientY - this.renderer.domElement.offsetTop) / 
      this.renderer.domElement.clientHeight ) * 2 + 1;

    const mouse3D = new THREE.Vector3(mouse_x, mouse_y, 0.5)

    // Raycasting to determine if user clicked on potion
    // This doesn't work properly in mobile due to our site layout;
    // we will not worry about fixing it since they can drink the potion
    // through a text command and are hinted to do that in the game.

    const raycaster = new THREE.Raycaster()

    if (camera) {
      raycaster.setFromCamera(mouse3D, camera)
      // Detect a collision for the potion / scene object
      const intersects = raycaster.intersectObjects(
        this.scene.children, true);
      if(intersects.length > 0){
          for (let i = 0; i < intersects.length; i++) {
            intersects[i].object.material.color.setHex(
               Math.random() * 0xffffff )
          }
          // Drink the potion and send the command to the game, 
          // if it hasn't been done already

          // The logic below is pretty complicated, because we're mapping
          // a custom web interaction that the text-rpg-engine library doesn't
          // support out-the-box.
          if (this.game.Player.inventory.items.includes("drunkSmallPotion")) {
            if (this.game.Player.currentRoom === 'DungeonAdventureRoom') {
              // Add the big potion to the inventory
              this.game.Player.inventory.addItems(['drunkBigPotion']);
              this.game.Player.inventory.dropItems(['drunkSmallPotion']);
              // Drunk the second big potion, make it bigger
              for (let i = 0; i < this.scene.children.length; i++) {
                console.log(this.scene.children[i].name)
                if (this.scene.children[i].name === 'Sketchfab_Scene') {
                  this.scene.children[i].scale.set(0.15, 0.15, 0.15);
                }
              }
              this.game.refreshDisplay();
            }
          } else {
            this.game.userSend("drink potion");
            // Drunk the first small potion, make it smaller
            if (this.game.Player.inventory.items.includes('drunkBigPotion')) {
              if (this.game.Player.currentRoom === 'WelcomeRoom' || this.game.Player.currentRoom === 'WelcomeRoom2') {
                this.game.Player.inventory.dropItems(['drunkBigPotion']);
              }
            } else {
              if (this.game.Player.inventory.items.includes('drunkSmallPotion')) {
                this.game.Player.inventory.dropItems(['drunkBigPotion']);
                for (let i = 0; i < this.scene.children.length; i++) {
                  if (this.scene.children[i].name === 'Sketchfab_Scene') {
                    this.scene.children[i].scale.set(0.075, 0.075, 0.075);
                  }
                }
              }
            }
          }
      }
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
  }

  render() {
    if (this.renderer) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  onWindowResize() {
    const canvasEL = document.getElementById(this.canvasEl);
    this.camera.aspect = canvasEL.offsetWidth / canvasEL.offsetHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(canvasEL.offsetWidth, canvasEL.offsetHeight);
  }
}
