'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

interface ModelViewerProps {
  modelUrl: string
}

/** Frees the GPU memory held by every mesh's geometry and materials. */
function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry.dispose()
      const materials = Array.isArray(child.material) ? child.material : [child.material]
      materials.forEach((material) => material.dispose())
    }
  })
}

export function ModelViewer({ modelUrl }: ModelViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Keep our own reference: by cleanup time React may have cleared mountRef.
    const mount = mountRef.current
    if (!mount) return

    // Becomes true when this effect is cleaned up, so a model that finishes
    // loading after the viewer is gone is not added to a dead scene.
    let disposed = false
    let frameId = 0

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })

    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    const loader = new GLTFLoader()
    loader.load(
      modelUrl,
      (gltf) => {
        if (disposed) {
          disposeObject(gltf.scene)
          return
        }

        scene.add(gltf.scene)

        // Center the model
        const box = new THREE.Box3().setFromObject(gltf.scene)
        const center = box.getCenter(new THREE.Vector3())
        gltf.scene.position.sub(center)

        // Adjust camera position
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        camera.position.set(maxDim * 2, maxDim * 2, maxDim * 2)
        camera.lookAt(0, 0, 0)

        controls.update()
      },
      undefined,
      (error) => {
        console.error('An error occurred loading the model:', error)
      }
    )

    // Add some light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(0, 1, 0)
    scene.add(directionalLight)

    camera.position.z = 5

    const animate = () => {
      // Save the id so cleanup can stop the loop.
      frameId = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      disposed = true
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
      controls.dispose()
      disposeObject(scene)
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [modelUrl])

  return <div ref={mountRef} className="w-full h-[400px]" />
}
