import { useGLTF } from "@react-three/drei";
import type { SlotMachineGLTFResult, CoinGLTFResult } from "@/types/GLTFResult";

export function useNodes(model: string) {
  const gltf = useGLTF(`/models/${model}.glb`);

  const nodesType = {
    "slot-machine": gltf.nodes as SlotMachineGLTFResult["nodes"],
    coin: gltf.nodes as CoinGLTFResult["nodes"],
  };

  const materialsType = {
    "slot-machine": gltf.materials as SlotMachineGLTFResult["nodes"],
    coin: gltf.materials as CoinGLTFResult["nodes"],
  };

  const nodes = nodesType[model];
  const materials = materialsType[model];
  return { nodes, materials };
}
