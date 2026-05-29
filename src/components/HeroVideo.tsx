import React, { useRef, useState, useEffect } from 'react';
import { homePageConfig } from '../config/homePageConfig';

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoOpacity, setVideoOpacity] = useState(0);

  useEffect(() => {
    // If reduced motion is requested, don't auto-fade, just show immediately
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setVideoOpacity(1);
      setIsVideoLoaded(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsVideoLoaded(true);
      // Fade in video
      let startTime = performance.now();
      const fadeInDuration = homePageConfig.motion.heroVideoFade.fadeInMs;

      const animateFadeIn = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / fadeInDuration, 1);
        setVideoOpacity(progress);

        if (progress < 1) {
          requestAnimationFrame(animateFadeIn);
        }
      };
      requestAnimationFrame(animateFadeIn);
    };

    video.addEventListener('canplay', handleCanPlay);

    // Fade out beautifully before looping if threshold is approached
    const handleTimeUpdate = () => {
      if (!homePageConfig.motion.heroVideoFade.enabled) return;
      const duration = video.duration;
      const currentTime = video.currentTime;
      const threshold = homePageConfig.motion.heroVideoFade.endFadeThreshold;

      if (duration && (duration - currentTime <= threshold)) {
        // Near end: fade out
        const remaining = duration - currentTime;
        const opacity = Math.max(remaining / threshold, 0);
        setVideoOpacity(opacity);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full object-cover overflow-hidden bg-brand-bg select-none pointer-events-none z-0">
      {/* Background fallback image first */}
      <img
        src={homePageConfig.media.heroPoster}
        alt="Atelier cire douce fallback background"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 z-0 ${
          isVideoLoaded ? 'opacity-20' : 'opacity-60'
        }`}
        referrerPolicy="no-referrer"
      />

      {/* Actual video */}
      <video
        ref={videoRef}
        src={homePageConfig.media.heroVideoUrl}
        poster={homePageConfig.media.heroPoster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-10 transition-opacity"
        style={{ opacity: videoOpacity }}
      />

      {/* Layered cinematic premium atmospheric overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/30 via-brand-bg/15 to-brand-bg z-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,rgba(43,13,29,0.42)_68%,rgba(43,13,29,0.86)_100%)] z-20" />

      {/* Gentle center wax glow behind display heading */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-15 rounded-full filter blur-[100px]"
        style={{
          width: 'min(980px, 90vw)',
          height: 'min(520px, 50vh)',
          background: 'rgba(255, 211, 172, 0.08)',
        }}
      />
    </div>
  );
}
