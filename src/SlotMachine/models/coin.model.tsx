import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import type { RefObject } from "react";
import { useCoin } from "../hooks/useCoin";
import type { CoinGLTFResult } from "@/SlotMachine/types/Coin";

type CoinMachineModelProps = ThreeElements["group"] & {
  coinDropping: RefObject<boolean>;
  coinRef: RefObject<THREE.Group>;
  actualCoins: RefObject<number>;
};

export function CoinModel({
  coinDropping,
  coinRef,
  actualCoins,
  ...props
}: CoinMachineModelProps) {
  const gltf = useGLTF(`/models/coin.glb`);
  const nodes = gltf.nodes as CoinGLTFResult["nodes"];
  const materials = gltf.materials as CoinGLTFResult["nodes"];

  useCoin(coinDropping, coinRef);
  return (
    <group {...props} dispose={null} ref={coinRef}>
      <mesh
        geometry={nodes.Coin.geometry}
        material={materials.Material}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        scale={[0.092, 0.015, 0.092]}
      />
    </group>
  );
}

useGLTF.preload("/coin.glb");
