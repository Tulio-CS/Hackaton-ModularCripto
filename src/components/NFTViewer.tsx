import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface NFTViewerProps {
  tokenId: string;
  eventName: string;
}

const NFTViewer: React.FC<NFTViewerProps> = ({ tokenId, eventName }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create a simple box
    const geometry = new THREE.BoxGeometry(3, 2, 0.1);
    const material = new THREE.MeshPhongMaterial({ color: 0x6D28D9 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Position camera
    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-[500px] bg-gray-900 rounded-lg overflow-hidden relative"
    >
      <div ref={containerRef} className="w-full h-full" />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-white text-lg font-semibold">{eventName}</h3>
        <p className="text-gray-300">Token ID: {tokenId}</p>
      </div>
    </motion.div>
  );
};

export default NFTViewer; 