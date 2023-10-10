import { useEffect } from 'react';
import { useRouter } from "next/router";

import SceneInit from "../lib/threeSceneInit";

// import SceneInit from "../public/SceneInit.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const Model = (props) => {
    // const mountRef = useRef(null);

    let loadedModel;

    let scene;

    const router = useRouter();

    const handleRouteChange = () => {
      // Remove the three.js model object on any other page for optimization.
      // Since the sketch lives on the homepage, any time the route
      // changes is navigation to another page.
      try {
        scene.scene.remove(loadedModel.scene);
      } catch (err) {
      }
    }

    useEffect(() => {
      scene = new SceneInit("canvasId", "scene-container", props.game);
      scene.initialize();
      scene.animate();
 
      // render, or 'create a still image', of the scene
      const glftLoader = new GLTFLoader();
      glftLoader.load("./model/drinkme.glb", (gltfScene) => {
        loadedModel = gltfScene;
        gltfScene.scene.rotation.y = -100;
        gltfScene.scene.position.y = -6;
        gltfScene.scene.rotation.x = 50;
        gltfScene.scene.scale.set(0.15, 0.15, 0.15);
        scene.scene.add(gltfScene.scene);
      });

      router.events.on('routeChangeComplete', handleRouteChange)
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
      };
    }, []
  );
  
  return (
    <>
    <div id="scene-container" style={{width: '400px', height: '700px'}} >
        <canvas id="canvasId"></canvas>
      </div>
    </>
  );
};

export default Model;
