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
    this.isProcessingClick = false;
  }

  initialize() {
    const canvasEL = document.getElementById(this.canvasEl);
    console.log('[SceneInit] Looking for canvas container with ID:', this.canvasEl);
    console.log('[SceneInit] Canvas container element found:', !!canvasEL);

    if (canvasEL) {
      console.log('[SceneInit] Container dimensions:', canvasEL.offsetWidth, 'x', canvasEL.offsetHeight);
    }

    if (!canvasEL) {
      console.error('[SceneInit] Canvas container not found:', this.canvasEl);
      return;
    }

    this.scene = new THREE.Scene();
    console.log('[SceneInit] Scene created:', !!this.scene);

    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      canvasEL.offsetWidth / canvasEL.offsetHeight,
      1,
      1000
    );
    this.camera.position.z = 48;
    console.log('[SceneInit] Camera created:', !!this.camera);


    // Check if canvas already exists and reuse it
    let canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;

    if (!canvas) {
      // Only create new canvas if it doesn't exist
      console.log('[SceneInit] Creating new canvas');
      canvas = document.createElement('canvas');
      canvas.id = this.canvasId;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.display = 'block';
      canvas.style.touchAction = 'none';
      canvas.style.cursor = 'grab';

      // Set canvas size explicitly
      canvas.width = canvasEL.offsetWidth;
      canvas.height = canvasEL.offsetHeight;

      canvasEL.appendChild(canvas);
      console.log('[SceneInit] Created canvas with dimensions:', canvas.width, 'x', canvas.height);
    } else {
      console.log('[SceneInit] Reusing existing canvas');
      // Update canvas dimensions if needed
      canvas.width = canvasEL.offsetWidth;
      canvas.height = canvasEL.offsetHeight;
    }

    // NOTE: Specify a canvas which is already created in the HTML.
    try {
      this.renderer = new THREE.WebGLRenderer({
        canvas,
        // NOTE: Anti-aliasing smooths out the edges.
        antialias: true,
        alpha: true
      });
      console.log('[SceneInit] WebGL renderer created successfully');
    } catch (err) {
      this.renderer = undefined;
      console.error('[SceneInit] Failed to initialize WebGL renderer:', err);

      // Try without antialiasing as fallback
      try {
        this.renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: false,
          alpha: true,
          powerPreference: "default",
          failIfMajorPerformanceCaveat: false
        });
        console.log('[SceneInit] WebGL renderer created successfully (fallback mode)');
      } catch (err2) {
        console.error('[SceneInit] Failed to create fallback renderer:', err2);
      }
    }

    // Add event listeners for canvas only AFTER renderer is created
    if (this.camera && this.renderer) {
      // Add event listeners for canvas only
      canvas?.addEventListener('click', (e) => this.onPointerDown(this.camera, e));
      canvas?.addEventListener('pointermove', (e) => this.onPointerMove(this.camera, e));
      canvas?.addEventListener('touchend', (e) => this.onTouchEnd(this.camera, e));
    }
   
    if (this.renderer) {
      this.renderer.setClearColor(0x000000, 0); // the default
      // this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setSize(canvasEL.offsetWidth, canvasEL.offsetHeight);
      // document.body.appendChild(this.renderer.domElement);
  
      this.clock = new THREE.Clock();
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableRotate = true;
      this.controls.enableZoom = true;
      this.controls.enablePan = false;
      this.controls.enabled = true; // Ensure controls are enabled
  
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
    if (!this.renderer || !this.renderer.domElement) {
      return;
    }

    const rect = this.renderer.domElement.getBoundingClientRect();
    const mouse_x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const mouse_y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
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

    // Prevent multiple clicks from being processed simultaneously
    if (this.isProcessingClick) {
      return;
    }

    if (!this.renderer || !this.renderer.domElement) {
      return;
    }

    const rect = this.renderer.domElement.getBoundingClientRect();
    const mouse_x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const mouse_y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const mouse3D = new THREE.Vector3(mouse_x, mouse_y, 0.5)

    // Raycasting to determine if user clicked on potion
    const raycaster = new THREE.Raycaster()

    if (camera) {
      raycaster.setFromCamera(mouse3D, camera)
      // Detect a collision for the potion / scene object
      const intersects = raycaster.intersectObjects(
        this.scene.children, true);
      
      console.log('Click detected, intersects:', intersects.length);
      
      if(intersects.length > 0){
          // Now prevent default since we're interacting with the model
          event.preventDefault();
          event.stopPropagation();
          this.isProcessingClick = true;
          
          // Change potion color on click
          for (let i = 0; i < intersects.length; i++) {
            if (intersects[i].object.material) {
              intersects[i].object.material.color.setHex(
                 Math.random() * 0xffffff )
            }
          }
          
          const currentRoom = this.game.Player.currentRoom;
          const hasSmallPotion = this.game.Player.inventory.items.includes("drunkSmallPotion");
          const hasBigPotion = this.game.Player.inventory.items.includes("drunkBigPotion");
          
          console.log('Potion clicked in room:', currentRoom, 'hasSmall:', hasSmallPotion, 'hasBig:', hasBigPotion);
          
          // DungeonAdventureRoom logic - can drink potion when small to become big again
          if (currentRoom === 'DungeonAdventureRoom') {
            // In DungeonAdventureRoom, always allow drinking
            const previousSmallState = hasSmallPotion;
            const previousBigState = hasBigPotion;
            this.game.userSend("drink potion");

            setTimeout(() => {
              // Check state after drinking
              const nowHasBigPotion = this.game.Player.inventory.items.includes('drunkBigPotion');
              const nowHasSmallPotion = this.game.Player.inventory.items.includes('drunkSmallPotion');

              // Check if potion state actually changed
              const stateChanged = (previousSmallState !== nowHasSmallPotion) || (previousBigState !== nowHasBigPotion);

              for (let i = 0; i < this.scene.children.length; i++) {
                if (this.scene.children[i].name === 'Sketchfab_Scene') {
                  if (nowHasBigPotion && !nowHasSmallPotion) {
                    // Player is now big, make potion normal size
                    this.scene.children[i].scale.set(0.15, 0.15, 0.15);
                  } else if (nowHasSmallPotion && !nowHasBigPotion) {
                    // Player is still small, keep potion small
                    this.scene.children[i].scale.set(0.075, 0.075, 0.075);
                  }
                }
              }

              // Don't auto-scroll - let user control their view

              this.updateGameState();
              this.isProcessingClick = false;
            }, 300);
          } else if (currentRoom === 'WelcomeRoom' || currentRoom === 'WelcomeRoom2') {
            // In welcome rooms, drink potion to become small if not already
            if (!hasSmallPotion) {
              const previousSmallState = hasSmallPotion;
              this.game.userSend("drink potion");

              setTimeout(() => {
                // After drinking, check if we're now small
                const nowHasSmallPotion = this.game.Player.inventory.items.includes('drunkSmallPotion');
                if (nowHasSmallPotion) {
                  for (let i = 0; i < this.scene.children.length; i++) {
                    if (this.scene.children[i].name === 'Sketchfab_Scene') {
                      // Make potion smaller since player is now small
                      this.scene.children[i].scale.set(0.075, 0.075, 0.075);
                    }
                  }
                  // Don't auto-scroll - let user control their view
                }
                this.updateGameState();
                this.isProcessingClick = false;
              }, 300);
            } else {
              // Already small, just change color
              this.isProcessingClick = false;
            }
          } else {
            // In other rooms, try to drink if there's a potion available
            const previousInventory = [...this.game.Player.inventory.items];
            this.game.userSend("drink potion");
            setTimeout(() => {
              const currentInventory = this.game.Player.inventory.items;
              // Check if inventory changed (potion had an effect)
              const inventoryChanged = previousInventory.length !== currentInventory.length ||
                                      !previousInventory.every(item => currentInventory.includes(item));

              // Don't auto-scroll - let user control their view

              this.updateGameState();
              this.isProcessingClick = false;
            }, 300);
          }
      } else {
        this.isProcessingClick = false;
      }
    }
  }

  
  onTouchEnd(camera, event){
    // Detect taps after let go in the canvas object / three.js model
    // Don't prevent default to allow proper scrolling
    // event.preventDefault();

    // Prevent multiple clicks from being processed simultaneously
    if (this.isProcessingClick) {
      return;
    }

    if (!this.renderer || !this.renderer.domElement) {
      return;
    }

    // Handle case where touches might be empty after touchend
    const touch = event.changedTouches?.[0] || event.touches?.[0];
    if (!touch) return;

    const rect = this.renderer.domElement.getBoundingClientRect();
    const mouse_x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    const mouse_y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;

    const mouse3D = new THREE.Vector3(mouse_x, mouse_y, 0.5)

    // Raycasting to determine if user clicked on potion
    const raycaster = new THREE.Raycaster()

    if (camera) {
      raycaster.setFromCamera(mouse3D, camera)
      // Detect a collision for the potion / scene object
      const intersects = raycaster.intersectObjects(
        this.scene.children, true);
      if(intersects.length > 0){
          // Now prevent default since we're interacting with the model
          event.preventDefault();
          this.isProcessingClick = true;
          
          // Change potion color on click
          for (let i = 0; i < intersects.length; i++) {
            if (intersects[i].object.material) {
              intersects[i].object.material.color.setHex(
                 Math.random() * 0xffffff )
            }
          }
          
          const currentRoom = this.game.Player.currentRoom;
          const hasSmallPotion = this.game.Player.inventory.items.includes("drunkSmallPotion");
          const hasBigPotion = this.game.Player.inventory.items.includes("drunkBigPotion");
          
          console.log('Potion tapped in room:', currentRoom, 'hasSmall:', hasSmallPotion, 'hasBig:', hasBigPotion);
          
          // DungeonAdventureRoom logic - can drink potion when small to become big again
          if (currentRoom === 'DungeonAdventureRoom') {
            // In DungeonAdventureRoom, always allow drinking
            const previousSmallState = hasSmallPotion;
            const previousBigState = hasBigPotion;
            this.game.userSend("drink potion");

            setTimeout(() => {
              // Check state after drinking
              const nowHasBigPotion = this.game.Player.inventory.items.includes('drunkBigPotion');
              const nowHasSmallPotion = this.game.Player.inventory.items.includes('drunkSmallPotion');

              // Check if potion state actually changed
              const stateChanged = (previousSmallState !== nowHasSmallPotion) || (previousBigState !== nowHasBigPotion);

              for (let i = 0; i < this.scene.children.length; i++) {
                if (this.scene.children[i].name === 'Sketchfab_Scene') {
                  if (nowHasBigPotion && !nowHasSmallPotion) {
                    // Player is now big, make potion normal size
                    this.scene.children[i].scale.set(0.15, 0.15, 0.15);
                  } else if (nowHasSmallPotion && !nowHasBigPotion) {
                    // Player is still small, keep potion small
                    this.scene.children[i].scale.set(0.075, 0.075, 0.075);
                  }
                }
              }

              // Don't auto-scroll - let user control their view

              this.updateGameState();
              this.isProcessingClick = false;
            }, 300);
          } else if (currentRoom === 'WelcomeRoom' || currentRoom === 'WelcomeRoom2') {
            // In welcome rooms, drink potion to become small if not already
            if (!hasSmallPotion) {
              const previousSmallState = hasSmallPotion;
              this.game.userSend("drink potion");

              setTimeout(() => {
                // After drinking, check if we're now small
                const nowHasSmallPotion = this.game.Player.inventory.items.includes('drunkSmallPotion');
                if (nowHasSmallPotion) {
                  for (let i = 0; i < this.scene.children.length; i++) {
                    if (this.scene.children[i].name === 'Sketchfab_Scene') {
                      // Make potion smaller since player is now small
                      this.scene.children[i].scale.set(0.075, 0.075, 0.075);
                    }
                  }
                  // Don't auto-scroll - let user control their view
                }
                this.updateGameState();
                this.isProcessingClick = false;
              }, 300);
            } else {
              // Already small, just change color
              this.isProcessingClick = false;
            }
          } else {
            // In other rooms, try to drink if there's a potion available
            const previousInventory = [...this.game.Player.inventory.items];
            this.game.userSend("drink potion");
            setTimeout(() => {
              const currentInventory = this.game.Player.inventory.items;
              // Check if inventory changed (potion had an effect)
              const inventoryChanged = previousInventory.length !== currentInventory.length ||
                                      !previousInventory.every(item => currentInventory.includes(item));

              // Don't auto-scroll - let user control their view

              this.updateGameState();
              this.isProcessingClick = false;
            }, 300);
          }
      } else {
        this.isProcessingClick = false;
      }
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
  }

  render() {
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  onWindowResize() {
    if (!this.renderer) {
      return;
    }
    const canvasEL = document.getElementById(this.canvasEl);
    if (!canvasEL) {
      return;
    }
    this.camera.aspect = canvasEL.offsetWidth / canvasEL.offsetHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(canvasEL.offsetWidth, canvasEL.offsetHeight);
  }
  
  updateGameState() {
    // Update localStorage and emit event for footer to update
    const gameState = {
      currentRoom: this.game.Player.currentRoom,
      inventory: this.game.Player.inventory.items
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
    
    // Emit custom event
    const event = new CustomEvent('gameStateUpdate', { detail: gameState });
    window.dispatchEvent(event);
    
    // Update potion size based on current state
    this.updatePotionSize();
  }
  
  updatePotionSize() {
    const hasSmallPotion = this.game.Player.inventory.items.includes('drunkSmallPotion');
    const hasBigPotion = this.game.Player.inventory.items.includes('drunkBigPotion');
    
    for (let i = 0; i < this.scene.children.length; i++) {
      if (this.scene.children[i].name === 'Sketchfab_Scene') {
        if (hasSmallPotion && !hasBigPotion) {
          // Player is small, make potion small
          this.scene.children[i].scale.set(0.075, 0.075, 0.075);
        } else {
          // Player is big or default, make potion normal size
          this.scene.children[i].scale.set(0.15, 0.15, 0.15);
        }
      }
    }
  }
}