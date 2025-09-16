import { useEffect, useState } from 'react';
import { useRouter } from "next/router";

// Three.js imports removed - will be lazy loaded when needed

// Store scene instance outside component to persist between re-renders
let globalScene: any = null;
let globalLoadedModel: any = null;

const Model = (props: { game: any, onSceneInit?: (scene: any) => void }) => {
    // const mountRef = useRef(null);

    // Track initialization to prevent double mount in StrictMode
    const [isInitialized, setIsInitialized] = useState(false);
    const [potionScale, setPotionScale] = useState(1);
    const [forceUseSVG, setForceUseSVG] = useState(true); // Default to SVG
    const [isBubbling, setIsBubbling] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [showFlashText, setShowFlashText] = useState(false);
    const [flashMessage, setFlashMessage] = useState('');
    const [potionGlow, setPotionGlow] = useState(false);

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
      // Only initialize three.js if user explicitly wants WebGL (not SVG)
      if (forceUseSVG) {
        // Clean up three.js if it exists
        if (globalScene) {
          console.log('[Model] Cleaning up Three.js scene');
          try {
            if (globalScene.renderer) {
              globalScene.renderer.dispose();
              const canvas = document.getElementById('canvasId');
              if (canvas) canvas.remove();
            }
            if (globalLoadedModel) {
              globalScene.scene.remove(globalLoadedModel.scene);
              globalLoadedModel = null;
            }
            globalScene = null;
          } catch (err) {
            console.log('[Model] Error cleaning up scene:', err);
          }
        }
        setIsInitialized(false);
        return;
      }

      // If already initialized with a working scene, just reuse it
      if (globalScene && globalScene.renderer) {
        console.log('[Model] Reusing existing scene');
        if (props.onSceneInit) {
          props.onSceneInit(globalScene);
        }
        setIsInitialized(true);
        return;
      }

      // Lazy load Three.js only when needed
      const initThreeJS = async () => {
        console.log('[Model] Lazy loading Three.js scene');
        const SceneInitModule = await import('../lib/threeSceneInit');
        const SceneInit = SceneInitModule.default;
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');

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
      };

      // Wait a tick to ensure DOM is ready before initializing
      const timeoutId = setTimeout(() => {
        initThreeJS();
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }, [forceUseSVG]
  );
  
  // Check if potion can change state
  const canPotionChangeState = () => {
    if (!props.game || !props.game.Player) return false;
    const currentRoom = props.game.Player?.currentRoom;
    const hasSmallPotion = props.game.Player?.inventory?.items?.includes("drunkSmallPotion");
    const hasBigPotion = props.game.Player?.inventory?.items?.includes("drunkBigPotion");

    // Can drink in DungeonAdventureRoom always
    if (currentRoom === 'DungeonAdventureRoom') return true;
    // Can drink in WelcomeRoom if not already small
    if ((currentRoom === 'WelcomeRoom' || currentRoom === 'WelcomeRoom2') && !hasSmallPotion) return true;

    return false;
  };

  const handleToggle = () => {
    const newSVGState = !forceUseSVG;
    setForceUseSVG(newSVGState);

    // Flash text near potion
    const flashMsg = newSVGState ? '✨ 2D Magic ✨' : '🌟 3D Power 🌟';
    setFlashMessage(flashMsg);
    setShowFlashText(true);

    // Glow effect on potion
    setPotionGlow(true);

    setTimeout(() => {
      setShowFlashText(false);
      setPotionGlow(false);
    }, 2000);

    // Toast notification
    const message = newSVGState ? '🎨 SVG animated potion toggled' : '🎮 WebGL / three.js potion toggled';
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
    {/* Toast Notification */}
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: `translateX(-50%) translateY(${showToast ? '0' : '-100px'})`,
      background: 'linear-gradient(135deg, rgba(var(--bg-primary-rgb), 0.95), rgba(var(--accent-primary-rgb), 0.1))',
      border: '1px solid var(--accent-primary)',
      borderRadius: '8px',
      padding: '10px 20px',
      color: 'var(--accent-primary)',
      fontFamily: 'Crimson Text, serif',
      fontSize: '14px',
      fontStyle: 'italic',
      zIndex: 1000,
      transition: 'transform 0.3s ease',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 12px rgba(var(--accent-primary-rgb), 0.2)'
    }}>
      {toastMessage}
    </div>

    <div id="scene-container" style={{
      width: '100%',
      maxWidth: '400px',
      height: '400px',
      margin: '0 auto',
      marginTop: '150px',
      position: 'relative',
      pointerEvents: 'auto'
    }}>

      {/* Flash text that appears on toggle */}
      {showFlashText && (
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'var(--accent-primary)',
          fontSize: '1.4rem',
          fontFamily: 'Crimson Text, serif',
          fontStyle: 'italic',
          fontWeight: 'bold',
          textShadow: `0 0 20px var(--accent-primary), 0 0 40px var(--accent-secondary)`,
          animation: 'fadeInOut 2s ease-in-out',
          pointerEvents: 'none',
          zIndex: 100,
          letterSpacing: '0.1em'
        }}>
          {flashMessage}
        </div>
      )}

      {(forceUseSVG || (!forceUseSVG && !isInitialized)) && (
        <div style={{
          cursor: 'pointer',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${potionScale})`,
          filter: potionGlow ? 'drop-shadow(0 0 30px var(--accent-primary)) drop-shadow(0 0 60px var(--accent-secondary))' : 'none'
        }}
        onClick={() => {
          if (props.game && canPotionChangeState()) {
            const currentRoom = props.game.Player?.currentRoom;
            const hasSmallPotion = props.game.Player?.inventory?.items?.includes("drunkSmallPotion");
            const hasBigPotion = props.game.Player?.inventory?.items?.includes("drunkBigPotion");
            const previousInventory = [...(props.game.Player?.inventory?.items || [])];

            // Trigger bubbling animation
            setIsBubbling(true);
            setTimeout(() => setIsBubbling(false), 2000);

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
              const currentInventory = props.game.Player?.inventory?.items || [];
              // Check if inventory changed (potion had an effect)
              const inventoryChanged = previousInventory.length !== currentInventory.length ||
                                      !previousInventory.every(item => currentInventory.includes(item));

              // Don't auto-scroll - let user control their view

              const event = new CustomEvent('gameStateUpdate', {
                detail: {
                  currentRoom: props.game.Player?.currentRoom,
                  inventory: props.game.Player?.inventory?.items
                }
              });
              window.dispatchEvent(event);
            }, 300);
          } else if (props.game && !canPotionChangeState()) {
            // Just wiggle the potion if it can't change state
            const potionElement = document.querySelector('#potion-svg');
            if (potionElement) {
              potionElement.style.animation = 'wiggle 0.5s ease-in-out';
              setTimeout(() => {
                potionElement.style.animation = '';
              }, 500);
            }
          }
        }}>
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
              @keyframes wiggle {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(-5deg); }
                75% { transform: rotate(5deg); }
              }
              @keyframes intenseBubble {
                0% { transform: translateY(0) scale(1); opacity: 0.8; }
                50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
                100% { transform: translateY(-40px) scale(0.8); opacity: 0; }
              }
              @keyframes colorShift {
                0% { stop-color: rgb(138, 43, 226); }
                33% { stop-color: rgb(255, 20, 147); }
                66% { stop-color: rgb(0, 191, 255); }
                100% { stop-color: rgb(138, 43, 226); }
              }
              @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -30%) scale(0.8); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -70%) scale(0.8); }
              }
              @keyframes potionPulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
              }
            `}
          </style>
          <svg id="potion-svg" width="200" height="300" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: canPotionChangeState() ? 'drop-shadow(0 0 20px rgba(138, 43, 226, 0.6))' : 'none',
              transition: 'filter 0.3s ease'
            }}>
            <defs>
              <linearGradient id="potionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{
                  stopColor: isBubbling ? 'rgb(255, 20, 147)' : 'rgb(138, 43, 226)',
                  stopOpacity: 0.8,
                  transition: 'stop-color 0.5s ease'
                }}>
                  {isBubbling && <animate attributeName="stop-color" values="rgb(138,43,226);rgb(255,20,147);rgb(0,191,255);rgb(138,43,226)" dur="2s" />}
                </stop>
                <stop offset="50%" style={{
                  stopColor: isBubbling ? 'rgb(0, 191, 255)' : 'rgb(218, 165, 32)',
                  stopOpacity: 0.6
                }}>
                  {isBubbling && <animate attributeName="stop-color" values="rgb(218,165,32);rgb(0,191,255);rgb(255,20,147);rgb(218,165,32)" dur="2s" />}
                </stop>
                <stop offset="100%" style={{
                  stopColor: isBubbling ? 'rgb(255, 20, 147)' : 'rgb(138, 43, 226)',
                  stopOpacity: 0.8
                }}>
                  {isBubbling && <animate attributeName="stop-color" values="rgb(138,43,226);rgb(0,191,255);rgb(255,20,147);rgb(138,43,226)" dur="2s" />}
                </stop>
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <pattern id="bubbles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r={isBubbling ? "3" : "2"} fill="rgba(255,255,255,0.3)">
                  <animate attributeName="cy" from="40" to="-5" dur={isBubbling ? "1.5s" : "3s"} repeatCount="indefinite"/>
                  {isBubbling && <animate attributeName="r" values="2;4;2" dur="1s" repeatCount="indefinite"/>}
                </circle>
                <circle cx="15" cy="20" r={isBubbling ? "2.5" : "1.5"} fill="rgba(255,255,255,0.2)">
                  <animate attributeName="cy" from="40" to="-5" dur={isBubbling ? "1.2s" : "2.5s"} repeatCount="indefinite"/>
                  {isBubbling && <animate attributeName="r" values="1.5;3;1.5" dur="1.2s" repeatCount="indefinite"/>}
                </circle>
                <circle cx="30" cy="30" r={isBubbling ? "2" : "1"} fill="rgba(255,255,255,0.25)">
                  <animate attributeName="cy" from="40" to="-5" dur={isBubbling ? "2s" : "4s"} repeatCount="indefinite"/>
                  {isBubbling && <animate attributeName="r" values="1;2.5;1" dur="1.5s" repeatCount="indefinite"/>}
                </circle>
                {isBubbling && (
                  <>
                    <circle cx="25" cy="10" r="2.5" fill="rgba(255,255,255,0.4)">
                      <animate attributeName="cy" from="40" to="-5" dur="1s" repeatCount="indefinite"/>
                      <animate attributeName="r" values="2;3.5;2" dur="0.8s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="35" cy="25" r="1.8" fill="rgba(255,255,255,0.35)">
                      <animate attributeName="cy" from="40" to="-5" dur="1.3s" repeatCount="indefinite"/>
                      <animate attributeName="r" values="1.5;2.8;1.5" dur="1s" repeatCount="indefinite"/>
                    </circle>
                  </>
                )}
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
              <animate attributeName="ry" values={isBubbling ? "45;52;45" : "45;48;45"} dur={isBubbling ? "1s" : "2s"} repeatCount="indefinite"/>
              {canPotionChangeState() && <animate attributeName="opacity" values="0.9;1;0.9" dur="1.5s" repeatCount="indefinite"/>}
            </ellipse>
            <rect x="77" y="120" width="46" height="90" fill="url(#potionGradient)" opacity="0.9">
              <animate attributeName="height" values={isBubbling ? "90;100;90" : "90;95;90"} dur={isBubbling ? "1s" : "2s"} repeatCount="indefinite"/>
              {canPotionChangeState() && <animate attributeName="opacity" values="0.9;1;0.9" dur="1.5s" repeatCount="indefinite"/>}
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

            {/* Sparkles - more active when potion can change state */}
            <circle cx="120" cy="100" r={canPotionChangeState() ? "2" : "1"} fill="white" opacity="0">
              <animate attributeName="opacity" values="0;1;0" dur={canPotionChangeState() ? "1s" : "2s"} repeatCount="indefinite"/>
            </circle>
            <circle cx="80" cy="150" r={canPotionChangeState() ? "2" : "1"} fill="white" opacity="0">
              <animate attributeName="opacity" values="0;1;0" dur={canPotionChangeState() ? "1s" : "2s"} begin="0.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="110" cy="200" r={canPotionChangeState() ? "2" : "1"} fill="white" opacity="0">
              <animate attributeName="opacity" values="0;1;0" dur={canPotionChangeState() ? "1s" : "2s"} begin="1s" repeatCount="indefinite"/>
            </circle>
            {canPotionChangeState() && (
              <>
                <circle cx="90" cy="120" r="1.5" fill="gold" opacity="0">
                  <animate attributeName="opacity" values="0;0.8;0" dur="0.8s" begin="0.2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="130" cy="180" r="1.5" fill="cyan" opacity="0">
                  <animate attributeName="opacity" values="0;0.8;0" dur="0.8s" begin="0.7s" repeatCount="indefinite"/>
                </circle>
              </>
            )}
          </svg>

          {/* Toggle Button positioned below potion */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
              // Add pulse animation to potion on toggle
              const potionSvg = document.querySelector('#potion-svg');
              if (potionSvg) {
                potionSvg.style.animation = 'potionPulse 0.5s ease-in-out';
                setTimeout(() => {
                  potionSvg.style.animation = '';
                }, 500);
              }
            }}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid rgba(var(--accent-primary-rgb), 0.3)',
              background: 'rgba(var(--bg-primary-rgb), 0.9)',
              backdropFilter: 'blur(10px)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              marginTop: '15px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = 'rgba(var(--accent-primary-rgb), 0.3)';
            }}
            title={forceUseSVG ? 'Switch to WebGL/3D' : 'Switch to SVG/2D'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {forceUseSVG ? (
                // WebGL/3D icon (cube with perspective)
                <>
                  <path d="M12 2L4 6V14L12 18L20 14V6L12 2Z" stroke="var(--accent-primary)" strokeWidth="1.5" fill="rgba(var(--accent-primary-rgb), 0.1)"/>
                  <path d="M12 18V10" stroke="var(--accent-primary)" strokeWidth="1.5"/>
                  <path d="M4 6L12 10L20 6" stroke="var(--accent-primary)" strokeWidth="1.5"/>
                  <circle cx="12" cy="10" r="2" fill="var(--accent-primary)"/>
                </>
              ) : (
                // SVG/2D icon (artistic palette)
                <>
                  <circle cx="12" cy="12" r="8" stroke="var(--accent-primary)" strokeWidth="1.5" fill="rgba(var(--accent-primary-rgb), 0.1)"/>
                  <circle cx="9" cy="9" r="1.5" fill="var(--accent-primary)"/>
                  <circle cx="15" cy="9" r="1.5" fill="var(--accent-secondary)"/>
                  <circle cx="9" cy="15" r="1.5" fill="var(--accent-secondary)"/>
                  <circle cx="15" cy="15" r="1.5" fill="var(--accent-primary)"/>
                </>
              )}
            </svg>
          </button>

        </div>
      )}
    </div>
    </>
  );
};

export default Model;
