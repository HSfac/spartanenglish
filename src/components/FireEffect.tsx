'use client';

import { useEffect, useRef } from 'react';

export default function FireEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Particle[] = [];
    const particleCount = 100;
    const colors = [
      "rgba(255, 0, 0, 0.8)",
      "rgba(255, 50, 0, 0.8)",
      "rgba(255, 100, 0, 0.8)",
      "rgba(255, 150, 0, 0.8)",
      "rgba(255, 200, 0, 0.5)"
    ];

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      color: string;
      life: number;
      maxLife: number;
    }

    // 파티클 생성
    for (let i = 0; i < particleCount; i++) {
      createParticle();
    }

    function createParticle() {
      const particle: Particle = {
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 20,
        size: Math.random() * 10 + 5,
        speedY: Math.random() * -1 - 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: Math.random() * 100 + 50
      };
      particles.push(particle);
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // 파티클 이동 및 생명주기 업데이트
        p.y += p.speedY;
        p.life++;
        
        // 투명도 조절 (라이프 사이클에 따라)
        const opacity = 1 - (p.life / p.maxLife);
        
        // 파티클 그리기
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace('0.8', opacity.toString());
        ctx.fill();
        
        // 파티클 소멸 시 새로운 파티클 생성
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          createParticle();
          i--;
        }
      }
      
      requestAnimationFrame(animate);
    }

    animate();

    // 창 크기 변경 시 캔버스 크기 조정
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 opacity-70"
    />
  );
} 