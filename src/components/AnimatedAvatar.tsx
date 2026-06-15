"use client";

import { useEffect, useState, useRef, ReactNode } from "react";

function ToolIcon({ name, color, x, y, delay, size = 40 }: { name: string; color: string; x: number; y: number; delay: number; size?: number }) {
  const icons: Record<string, ReactNode> = {
    spotify: (
      <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
    figma: (
      <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 8.941h-4.588c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM3.649 7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V7.51H3.649zm4.588 14.509H3.649c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.491 4.49-4.491h4.588v8.981zm-1.471-7.51c-1.665 0-3.019-1.355-3.019-3.019s1.355-3.02 3.019-3.02h3.117v6.039H6.766zm4.084-10.009h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491h-4.588V2.001zm1.471 7.509h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.02-3.019-3.02h-3.117v6.039zm4.588 6.971h-4.588v-3.02h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 2.014-4.49 2.014zm-3.117-1.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117v6.039z"/>
      </svg>
    ),
    ai: (
      <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    code: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className="w-full h-full">
        <polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/>
      </svg>
    ),
    git: (
      <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
        <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.66 2.66c.645-.222 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.72.719-1.886.719-2.604 0-.538-.536-.67-1.321-.4-1.978l-2.478-2.478v6.53c.175.087.339.203.48.349.72.72.72 1.884 0 2.604-.72.72-1.884.72-2.604 0-.72-.72-.72-1.884 0-2.604.18-.18.387-.294.605-.369v-6.639c-.217-.083-.424-.198-.6-.376-.543-.54-.676-1.334-.396-1.992L7.576 3.751.45 10.871c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
      </svg>
    ),
    vercel: (
      <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
        <path d="M12 2L2 22h20L12 2z"/>
      </svg>
    ),
    react: (
      <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
        <circle cx="12" cy="12" r="2.5" fill={color}/>
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke={color} strokeWidth="1"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke={color} strokeWidth="1" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke={color} strokeWidth="1" transform="rotate(120 12 12)"/>
      </svg>
    ),
    ts: (
      <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
        <rect x="2" y="2" width="20" height="20" rx="3"/>
        <text x="12" y="17" textAnchor="middle" fill="#000" fontSize="12" fontWeight="bold" fontFamily="monospace">TS</text>
      </svg>
    ),
  };

  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        animation: `float ${3 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <div className="w-full h-full rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all duration-300 cursor-pointer group">
        <div className="w-6 h-6 group-hover:scale-110 transition-transform">
          {icons[name]}
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-black/80 text-white text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {name}
        </div>
      </div>
    </div>
  );
}

export default function AnimatedAvatar({ size = 500 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    let animFrame: number;
    let t = 0;
    const animate = () => {
      t += 0.025;
      setFrame(Math.floor(t * 60));
      animFrame = requestAnimationFrame(animate);
    };
    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = 500;
    const h = 500;
    canvas.width = w;
    canvas.height = h;

    ctx.clearRect(0, 0, w, h);

    const t = frame / 60;
    const breath = Math.sin(t * 2) * 2;
    const headBob = Math.sin(t * 1.5) * 1.5;
    const handMove = Math.sin(t * 4) * 4;
    const eyeX = Math.sin(t * 0.5) * 1.5;
    const eyeY = Math.cos(t * 0.7) * 1;

    const cx = w / 2;
    const cy = h / 2;

    ctx.save();

    const grad = ctx.createRadialGradient(cx, cy + 50, 50, cx, cy + 50, 250);
    grad.addColorStop(0, "rgba(99, 102, 241, 0.08)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    const deskY = 340;
    ctx.fillStyle = "#1a1a2e";
    ctx.beginPath();
    ctx.roundRect(100, deskY, 300, 12, 3);
    ctx.fill();
    ctx.fillStyle = "#16213e";
    ctx.beginPath();
    ctx.roundRect(95, deskY + 10, 310, 10, 2);
    ctx.fill();
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(130, deskY + 20, 8, 70);
    ctx.fillRect(362, deskY + 20, 8, 70);

    ctx.fillStyle = "#0a0a0f";
    ctx.beginPath();
    ctx.roundRect(150, deskY - 130, 200, 100, 8);
    ctx.fill();
    ctx.fillStyle = "#111827";
    ctx.beginPath();
    ctx.roundRect(155, deskY - 125, 190, 90, 4);
    ctx.fill();

    const screenPulse = 0.5 + Math.sin(t * 2) * 0.3;
    ctx.fillStyle = `rgba(99, 102, 241, ${screenPulse * 0.15})`;
    ctx.beginPath();
    ctx.roundRect(158, deskY - 122, 184, 84, 3);
    ctx.fill();

    const codeColors = ["#818cf8", "#c084fc", "#f472b6", "#22d3ee", "#34d399", "#fbbf24"];
    for (let i = 0; i < 10; i++) {
      const offset = Math.sin(t + i * 0.3) * 5;
      ctx.fillStyle = codeColors[i % codeColors.length];
      ctx.globalAlpha = 0.5 + Math.sin(t + i) * 0.2;
      ctx.beginPath();
      ctx.roundRect(165 + offset, deskY - 118 + i * 8, 20 + Math.sin(t + i) * 30, 3, 1);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    ctx.strokeStyle = "rgba(168, 85, 247, 0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(300, deskY - 85, 12 + Math.sin(t * 3) * 3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(296, deskY - 89);
    ctx.lineTo(296, deskY - 81);
    ctx.lineTo(304, deskY - 85);
    ctx.closePath();
    ctx.fillStyle = "rgba(168, 85, 247, 0.5)";
    ctx.fill();

    ctx.fillStyle = "#1a1a2e";
    ctx.beginPath();
    ctx.roundRect(180, deskY - 35, 140, 15, 2);
    ctx.fill();
    for (let i = 0; i < 10; i++) {
      ctx.fillStyle = "#2a2a3e";
      ctx.beginPath();
      ctx.roundRect(186 + i * 13, deskY - 33, 8, 3, 1);
      ctx.fill();
    }

    ctx.fillStyle = "#0a0a0f";
    ctx.beginPath();
    ctx.roundRect(200, deskY - 22, 100, 12, 2);
    ctx.fill();

    ctx.fillStyle = "#1a1a2e";
    ctx.beginPath();
    ctx.ellipse(cx, deskY + 40, 55, 65, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#16213e";
    ctx.beginPath();
    ctx.roundRect(198, deskY - 5, 104, 50, 5);
    ctx.fill();
    ctx.fillStyle = "#0a0a0f";
    ctx.beginPath();
    ctx.roundRect(210, deskY + 45, 80, 18, 4);
    ctx.fill();
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(246, deskY + 63, 8, 25);
    ctx.beginPath();
    ctx.ellipse(cx, deskY + 90, 40, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    const skinColor = "#5d4037";
    const skinLight = "#795548";
    const skinDark = "#4e342e";

    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.roundRect(195, deskY - 65 + breath, 110, 80, 8);
    ctx.fill();

    ctx.fillStyle = "#1a1a2e";
    ctx.beginPath();
    ctx.roundRect(215, deskY - 62 + breath, 70, 10, 5);
    ctx.fill();

    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.moveTo(190, deskY - 45 + breath);
    ctx.quadraticCurveTo(170, deskY - 35 + breath, 165, deskY - 15 + breath);
    ctx.lineTo(185, deskY - 10 + breath);
    ctx.lineTo(190, deskY - 45 + breath);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(310, deskY - 45 + breath);
    ctx.quadraticCurveTo(330, deskY - 35 + breath, 335, deskY - 15 + breath);
    ctx.lineTo(315, deskY - 10 + breath);
    ctx.lineTo(310, deskY - 45 + breath);
    ctx.fill();

    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.ellipse(165, deskY - 10 + breath + handMove, 11, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(335, deskY - 10 + breath - handMove, 11, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#111827";
    ctx.beginPath();
    ctx.roundRect(195, deskY - 65 + breath, 110, 30, 5);
    ctx.fill();

    ctx.fillStyle = "#0f0f1a";
    ctx.beginPath();
    ctx.moveTo(195, deskY - 65 + breath);
    ctx.lineTo(185, deskY + 5 + breath);
    ctx.lineTo(245, deskY + 5 + breath);
    ctx.lineTo(245, deskY - 65 + breath);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(255, deskY - 65 + breath);
    ctx.lineTo(255, deskY + 5 + breath);
    ctx.lineTo(315, deskY + 5 + breath);
    ctx.lineTo(305, deskY - 65 + breath);
    ctx.fill();

    ctx.fillStyle = "#1a1a2e";
    ctx.beginPath();
    ctx.ellipse(215, deskY + 8, 22, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(285, deskY + 8, 22, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#e5e7eb";
    ctx.fillRect(198, deskY + 2, 34, 6);
    ctx.fillRect(268, deskY + 2, 34, 6);

    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.arc(cx, 165 + headBob, 58, 0, Math.PI * 2);
    ctx.fill();

    const faceGrad = ctx.createRadialGradient(cx - 10, 160 + headBob, 10, cx, 165 + headBob, 55);
    faceGrad.addColorStop(0, skinLight);
    faceGrad.addColorStop(1, skinColor);
    ctx.fillStyle = faceGrad;
    ctx.beginPath();
    ctx.arc(cx, 165 + headBob, 52, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#0f0f1a";
    ctx.beginPath();
    ctx.moveTo(150, 150 + headBob);
    ctx.quadraticCurveTo(152, 95, cx, 85);
    ctx.quadraticCurveTo(348, 95, 350, 150);
    ctx.quadraticCurveTo(348, 120, 315, 108);
    ctx.quadraticCurveTo(290, 100, cx, 112);
    ctx.quadraticCurveTo(210, 100, 185, 108);
    ctx.quadraticCurveTo(152, 120, 150, 150);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(150, 150 + headBob);
    ctx.quadraticCurveTo(145, 170, 148, 195);
    ctx.quadraticCurveTo(146, 168, 152, 147 + headBob);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(350, 150 + headBob);
    ctx.quadraticCurveTo(355, 170, 352, 195);
    ctx.quadraticCurveTo(354, 168, 348, 147 + headBob);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.ellipse(222, 170 + headBob, 18, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(278, 170 + headBob, 18, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#0f0f1a";
    ctx.beginPath();
    ctx.ellipse(224 + eyeX, 169 + headBob + eyeY, 11, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(276 + eyeX, 169 + headBob + eyeY, 11, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.ellipse(228 + eyeX, 165 + headBob + eyeY, 4, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(280 + eyeX, 165 + headBob + eyeY, 4, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.globalAlpha = 0.4;
    ctx.beginPath();
    ctx.ellipse(220 + eyeX, 173 + headBob + eyeY, 2, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(272 + eyeX, 173 + headBob + eyeY, 2, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.strokeStyle = skinDark;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(205, 148 + headBob);
    ctx.quadraticCurveTo(215, 142, 226, 148 + headBob);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(274, 148 + headBob);
    ctx.quadraticCurveTo(285, 142, 295, 148 + headBob);
    ctx.stroke();

    ctx.fillStyle = "rgba(239, 68, 68, 0.15)";
    ctx.beginPath();
    ctx.ellipse(200, 185 + headBob, 16, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(300, 185 + headBob, 16, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    const mouthOpen = Math.sin(t * 2) * 2;
    ctx.strokeStyle = skinDark;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(237, 200 + headBob);
    ctx.quadraticCurveTo(cx, 210 + headBob + mouthOpen, 263, 200 + headBob);
    ctx.stroke();

    ctx.fillStyle = skinDark;
    ctx.beginPath();
    ctx.ellipse(cx, 193 + headBob, 4, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    const glowGrad = ctx.createRadialGradient(cx, cy, 100, cx, cy, 280);
    glowGrad.addColorStop(0, "rgba(99, 102, 241, 0.06)");
    glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, w, h);

  }, [frame]);

  const tools = [
    { name: "spotify", color: "#1DB954", x: 5, y: 15, delay: 0, size: 42 },
    { name: "figma", color: "#F24E1E", x: 85, y: 10, delay: 0.5, size: 42 },
    { name: "ai", color: "#a855f7", x: 2, y: 55, delay: 1, size: 38 },
    { name: "code", color: "#22d3ee", x: 88, y: 50, delay: 1.5, size: 38 },
    { name: "git", color: "#F05032", x: 10, y: 80, delay: 2, size: 36 },
    { name: "vercel", color: "#ffffff", x: 82, y: 78, delay: 2.5, size: 36 },
    { name: "react", color: "#61DAFB", x: 48, y: 2, delay: 3, size: 36 },
    { name: "ts", color: "#3178C6", x: 48, y: 88, delay: 3.5, size: 36 },
  ];

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {tools.map((tool) => (
        <ToolIcon key={tool.name} {...tool} />
      ))}

      <div className="absolute inset-0 flex items-center justify-center" style={{ left: "10%", top: "8%", width: "80%", height: "84%" }}>
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ filter: "drop-shadow(0 20px 40px rgba(99, 102, 241, 0.15))" }}
        />
      </div>

      <div className="absolute -top-1 -right-1 w-11 h-11 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg z-10 animate-bounce-in">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
  );
}
