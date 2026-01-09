import React, { useEffect, useRef, useState } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onLoadingComplete }) => {
  const canvasRef = useRef(null);
  const [isExiting, setIsExiting] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [showText, setShowText] = useState(false);
  const requestRef = useRef();
  const starsRef = useRef([]);
  const speedRef = useRef(0.5); // Start very slow

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const centerX = width / 2;
    const centerY = height / 2;

    canvas.width = width;
    canvas.height = height;

    // Initialize stars - Adjust count based on screen size
    const isMobile = width < 768;
    const numStars = isMobile ? 1500 : 4000;
    
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width - centerX,
        y: Math.random() * height - centerY,
        z: Math.random() * width,
        o: Math.random(), // opacity
        isStreak: Math.random() > 0.7 // Only 30% of stars become streaks
      });
    }
    starsRef.current = stars;

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = '#030412';
      ctx.fillRect(0, 0, width, height);

      const speed = speedRef.current;

      starsRef.current.forEach(star => {
        star.z -= speed;

        // Reset star if it passes the screen
        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width - centerX;
          star.y = Math.random() * height - centerY;
        }

        // Project star to 2D
        const x = (star.x / star.z) * width + centerX;
        const y = (star.y / star.z) * height + centerY;

        // Calculate size based on depth
        const size = (1 - star.z / width) * (speed > 2 ? 2 : 3);

        // Draw star or streak
        ctx.beginPath();
        
        // Yellow/Gold colors
        const opacity = Math.min(1, (1 - star.z / width) + 0.2);
        // Randomize between a few shades of yellow/gold
        const r = 255;
        const g = Math.floor(200 + Math.random() * 55); // 200-255
        const b = Math.floor(Math.random() * 100); // 0-100 (low blue for yellow)
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        
        // Only draw streaks if speed is high AND this star is marked as a streak
        if (speed > 2 && star.isStreak) {
           // Streak effect
           const streakLength = speed * 1.5;
           const px = (star.x / (star.z + streakLength)) * width + centerX;
           const py = (star.y / (star.z + streakLength)) * height + centerY;
           
           ctx.strokeStyle = ctx.fillStyle;
           ctx.lineWidth = size;
           ctx.moveTo(x, y);
           ctx.lineTo(px, py);
           ctx.stroke();
        } else {
           // Normal star
           ctx.arc(x, y, size, 0, Math.PI * 2);
           ctx.fill();
        }
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    // Sequence logic
    setTimeout(() => setShowText(true), 500); // Show text early

    // Simulate loading sequence
    const loadingTimeout = setTimeout(() => {
      // Accelerate to warp speed
      const accelerate = setInterval(() => {
        speedRef.current *= 1.1; // Exponential acceleration
        
        // Fade out text as we accelerate
        if (speedRef.current > 10) {
            setShowText(false);
        }

        if (speedRef.current > 80) {
          clearInterval(accelerate);
          setShowFlash(true); // Trigger flash
          
          setTimeout(() => {
            setIsExiting(true);
            onLoadingComplete();
          }, 200); // Wait for flash to peak
        }
      }, 50);
    }, 2500); // Start acceleration after 2.5s

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', handleResize);
      clearTimeout(loadingTimeout);
    };
  }, [onLoadingComplete]);

  return (
    <div className={`loading-screen ${isExiting ? 'exit' : ''}`}>
      <canvas ref={canvasRef} className="star-canvas" />
      
      <div className={`welcome-overlay ${showText ? 'visible' : ''}`}>
        <h1 className="welcome-title">Welcome to</h1>
        <h2 className="welcome-subtitle">Nishan's Universe</h2>
      </div>

      <div className={`flash-overlay ${showFlash ? 'active' : ''}`} />
    </div>
  );
};

export default LoadingScreen;
