export type CoinGLTFResult = GLTF & {
  nodes: {
    Coin: THREE.Mesh;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
  };
  animations: THREE.AnimationClip[];
};