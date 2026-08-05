export type SlotMachineGLTFResult = GLTF & {
  nodes: {
    Body: THREE.Mesh;
    Reel1: THREE.Mesh;
    Reel2: THREE.Mesh;
    Reel3: THREE.Mesh;
    Cylinder002: THREE.Mesh;
    Cylinder002_1: THREE.Mesh;
  };
  materials: {
    Body: THREE.MeshStandardMaterial;
    Reel: THREE.MeshStandardMaterial;
    Lever: THREE.MeshStandardMaterial;
    Handle: THREE.MeshStandardMaterial;
  };
  animations: THREE.AnimationClip[];
};


