import { useEffect, useState } from 'react';
import { useRouter } from "next/router";

import SceneInit from "../lib/threeSceneInit";

// import SceneInit from "../public/SceneInit.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Store scene instance outside component to persist between re-renders
let globalScene: any = null;
let globalLoadedModel: any = null;

const Model = (props: { game: any, onSceneInit?: (scene: any) => void }) => {
    // const mountRef = useRef(null);

    // Track initialization to prevent double mount in StrictMode
    const [isInitialized, setIsInitialized] = useState(false);
    const [potionScale, setPotionScale] = useState(1);

    const router = useRouter();

    const handleRouteChange = () => {
      // Remove the three.js model object on any other page for optimization.
      // Since the sketch lives on the homepage, any time the route
      // changes is navigation to another page.
      try {
        if (globalScene && globalLoadedModel) {
          globalScene.scene.remove(globalLoadedModel.scene);
        }
      } catch (err) {
      }
    }

    // Listen for game state updates to adjust potion size
    useEffect(() => {
      const handleGameStateUpdate = (event: CustomEvent) => {
        if (props.game && props.game.Player) {
          const hasSmallPotion = props.game.Player.inventory?.items?.includes("drunkSmallPotion");
          const hasBigPotion = props.game.Player.inventory?.items?.includes("drunkBigPotion");

          if (hasSmallPotion && !hasBigPotion) {
            setPotionScale(0.5); // Make potion small
          } else {
            setPotionScale(1); // Normal size
          }
        }
      };

      window.addEventListener('gameStateUpdate', handleGameStateUpdate as EventListener);

      return () => {
        window.removeEventListener('gameStateUpdate', handleGameStateUpdate as EventListener);
      };
    }, [props.game]);

    useEffect(() => {
      // Don't clean up contexts - that's causing the problem!

      // If already initialized with a working scene, just reuse it
      if (globalScene && globalScene.renderer) {
        console.log('[Model] Reusing existing scene');
        if (props.onSceneInit) {
          props.onSceneInit(globalScene);
        }
        setIsInitialized(true);
        return;
      }

      // Wait a tick to ensure DOM is ready
      const timeoutId = setTimeout(() => {
        console.log('[Model] Initializing Three.js scene');
        globalScene = new SceneInit("canvasId", "scene-container", props.game);
        globalScene.initialize();

        // Only start animation if initialization was successful
        if (globalScene.renderer && globalScene.scene && globalScene.camera) {
          globalScene.animate();
          console.log('[Model] Scene initialized and animation started');
          setIsInitialized(true);

          // Only load model if scene is ready
          const glftLoader = new GLTFLoader();
          console.log('[Model] Starting to load 3D model from ./model/drinkme.glb');

          glftLoader.load(
            "./model/drinkme.glb",
            (gltfScene) => {
              console.log('[Model] Successfully loaded 3D model', gltfScene);
              globalLoadedModel = gltfScene;
              gltfScene.scene.rotation.y = -100;
              gltfScene.scene.position.y = -6;
              gltfScene.scene.rotation.x = 50;
              gltfScene.scene.scale.set(0.15, 0.15, 0.15);
              gltfScene.scene.name = 'Sketchfab_Scene'; // Set the name for the potion interaction
              globalScene.scene.add(gltfScene.scene);
              console.log('[Model] Added model to scene');
            },
            (progress) => {
              if (progress.total > 0) {
                console.log('[Model] Loading progress:', (progress.loaded / progress.total * 100) + '%');
              }
            },
            (error) => {
              console.error('[Model] Error loading 3D model:', error);
            }
          );
        } else {
          console.error('[Model] Scene initialization failed - renderer, scene, or camera is missing');
        }

        // Pass scene instance back to parent if callback provided
        if (props.onSceneInit) {
          props.onSceneInit(globalScene);
        }

        router.events.on('routeChangeComplete', handleRouteChange);
      }, 100); // Small delay to ensure DOM is ready

      return () => {
        clearTimeout(timeoutId);
        // Don't dispose on unmount to preserve for next mount
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }, []
  );
  
  return (
    <>
    <div id="scene-container" style={{
      width: '100%',
      maxWidth: '400px',
      height: 'clamp(300px, 50vh, 700px)',
      margin: '0 auto',
      position: 'relative',
      pointerEvents: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {!isInitialized && (
        <div style={{
          cursor: 'pointer',
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          transform: `scale(${potionScale})`
        }}
        onClick={() => {
          if (props.game) {
            const currentRoom = props.game.Player?.currentRoom;
            const hasSmallPotion = props.game.Player?.inventory?.items?.includes("drunkSmallPotion");

            // Check what room we're in to handle the potion correctly
            if (currentRoom === 'DungeonAdventureRoom' || (currentRoom === 'WelcomeRoom' && !hasSmallPotion)) {
              props.game.userSend("drink potion");

              // Add a nice animation effect
              const potionElement = document.querySelector('#potion-svg');
              if (potionElement) {
                potionElement.classList.add('drinking-animation');
                setTimeout(() => {
                  potionElement.classList.remove('drinking-animation');
                }, 600);
              }

              setTimeout(() => {
                const event = new CustomEvent('gameStateUpdate', {
                  detail: {
                    currentRoom: props.game.Player?.currentRoom,
                    inventory: props.game.Player?.inventory?.items
                  }
                });
                window.dispatchEvent(event);
              }, 100);
            }
          }
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = `scale(${potionScale * 1.05})`}
        onMouseLeave={(e) => e.currentTarget.style.transform = `scale(${potionScale})`}
        >
          <style>
            {`
              @keyframes drink {
                0% { transform: rotate(0deg); opacity: 1; }
                25% { transform: rotate(-45deg); opacity: 0.8; }
                50% { transform: rotate(-90deg); opacity: 0.6; }
                75% { transform: rotate(-45deg); opacity: 0.8; }
                100% { transform: rotate(0deg); opacity: 1; }
              }
              .drinking-animation {
                animation: drink 0.6s ease-in-out;
              }
            `}
          </style>
          <svg id="potion-svg" width="200" height="300" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="potionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: 'rgb(138, 43, 226)', stopOpacity: 0.8}} />
                <stop offset="50%" style={{stopColor: 'rgb(218, 165, 32)', stopOpacity: 0.6}} />
                <stop offset="100%" style={{stopColor: 'rgb(138, 43, 226)', stopOpacity: 0.8}} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <pattern id="bubbles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="2" fill="rgba(255,255,255,0.3)">
                  <animate attributeName="cy" from="40" to="-5" dur="3s" repeatCount="indefinite"/>
                </circle>
                <circle cx="15" cy="20" r="1.5" fill="rgba(255,255,255,0.2)">
                  <animate attributeName="cy" from="40" to="-5" dur="2.5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="30" cy="30" r="1" fill="rgba(255,255,255,0.25)">
                  <animate attributeName="cy" from="40" to="-5" dur="4s" repeatCount="indefinite"/>
                </circle>
              </pattern>
            </defs>

            {/* Cork/Stopper */}
            <rect x="85" y="20" width="30" height="25" fill="#8B4513" rx="2"/>
            <rect x="80" y="15" width="40" height="10" fill="#A0522D" rx="2"/>

            {/* Bottle neck */}
            <rect x="90" y="45" width="20" height="30" fill="rgba(200,200,200,0.3)" stroke="rgba(138, 43, 226, 0.5)" strokeWidth="2"/>

            {/* Main bottle body */}
            <ellipse cx="100" cy="75" rx="25" ry="5" fill="rgba(200,200,200,0.3)"/>
            <rect x="75" y="75" width="50" height="140" fill="rgba(200,200,200,0.3)" stroke="rgba(138, 43, 226, 0.5)" strokeWidth="2"/>
            <ellipse cx="100" cy="215" rx="30" ry="50" fill="rgba(200,200,200,0.3)" stroke="rgba(138, 43, 226, 0.5)" strokeWidth="2"/>

            {/* Liquid inside with animation */}
            <ellipse cx="100" cy="210" rx="26" ry="45" fill="url(#potionGradient)" opacity="0.9">
              <animate attributeName="ry" values="45;48;45" dur="2s" repeatCount="indefinite"/>
            </ellipse>
            <rect x="77" y="120" width="46" height="90" fill="url(#potionGradient)" opacity="0.9">
              <animate attributeName="height" values="90;95;90" dur="2s" repeatCount="indefinite"/>
            </rect>

            {/* Bubbles overlay */}
            <rect x="77" y="120" width="46" height="90" fill="url(#bubbles)" opacity="0.6"/>
            <ellipse cx="100" cy="210" rx="26" ry="45" fill="url(#bubbles)" opacity="0.6"/>

            {/* Label */}
            <rect x="70" y="140" width="60" height="40" fill="rgba(255,255,255,0.8)" stroke="gold" strokeWidth="1" rx="3"/>
            <text x="100" y="160" fontFamily="Crimson Text, serif" fontSize="14" fontStyle="italic" fill="rgb(138, 43, 226)" textAnchor="middle">
              Drink
            </text>
            <text x="100" y="175" fontFamily="Crimson Text, serif" fontSize="14" fontStyle="italic" fill="rgb(138, 43, 226)" textAnchor="middle">
              Me
            </text>

            {/* Glow effect */}
            <ellipse cx="100" cy="180" rx="70" ry="100" fill="none" stroke="url(#potionGradient)" strokeWidth="1" opacity="0.3" filter="url(#glow)">
              <animate attributeName="rx" values="70;75;70" dur="3s" repeatCount="indefinite"/>
              <animate attributeName="ry" values="100;105;100" dur="3s" repeatCount="indefinite"/>
            </ellipse>

            {/* Sparkles */}
            <circle cx="120" cy="100" r="1" fill="white" opacity="0">
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="80" cy="150" r="1" fill="white" opacity="0">
              <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="110" cy="200" r="1" fill="white" opacity="0">
              <animate attributeName="opacity" values="0;1;0" dur="2s" begin="1s" repeatCount="indefinite"/>
            </circle>
          </svg>

          <div style={{
            color: 'var(--accent-secondary)',
            fontSize: potionScale === 0.5 ? '10px' : '12px',
            textAlign: 'center',
            fontFamily: 'Crimson Text, serif',
            fontStyle: 'italic',
            opacity: 0.7,
            marginTop: '10px',
            transition: 'font-size 0.5s ease'
          }}>
            {potionScale === 0.5
              ? "🔬 You feel smaller... The potion shrunk too! 🔬"
              : "✨ WebGL disabled - Click the 2D potion to drink ✨"
            }
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Model;
