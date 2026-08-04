import { PointerLockControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

const keys = {
  KeyW: false,
  KeyA: false,
  KeyS: false,
  KeyD: false,
}

export function CameraController() {
  const controls = useRef<any>(null)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code in keys) {
        keys[e.code as keyof typeof keys] = true
      }
    }

    const up = (e: KeyboardEvent) => {
      if (e.code in keys) {
        keys[e.code as keyof typeof keys] = false
      }
    }

    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)

    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  useFrame(({ camera }, delta) => {
    const speed = 5 * delta

    const direction = new THREE.Vector3()
    const right = new THREE.Vector3()

    camera.getWorldDirection(direction)
    direction.y = 0
    direction.normalize()

    right.crossVectors(direction, camera.up).normalize()

    if (keys.KeyW) camera.position.addScaledVector(direction, speed)
    if (keys.KeyS) camera.position.addScaledVector(direction, -speed)
    if (keys.KeyA) camera.position.addScaledVector(right, -speed)
    if (keys.KeyD) camera.position.addScaledVector(right, speed)
  })

  return <PointerLockControls ref={controls} />
}