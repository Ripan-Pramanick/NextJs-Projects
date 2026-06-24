// hooks/useCursor.js
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for managing cursor state and interactions
 * Handles mouse tracking, hover states, and device detection
 */
export const useCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const cursorRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Check if device is mobile/touch
  useEffect(() => {
    const checkDevice = () => {
      const isTouchDevice = 
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;
      
      setIsMobile(isTouchDevice);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Check for reduced motion preference
  const prefersReducedMotion = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Smooth mouse tracking with requestAnimationFrame
  useEffect(() => {
    if (isMobile || prefersReducedMotion()) return;

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      if (!isVisible) setIsVisible(true);
    };

    const animate = () => {
      if (!cursorRef.current) return;

      // Smooth easing animation
      const ease = 0.12;
      const dx = mouseRef.current.x - cursorPosition.x;
      const dy = mouseRef.current.y - cursorPosition.y;

      setCursorPosition(prev => ({
        x: prev.x + dx * ease,
        y: prev.y + dy * ease
      }));

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isMobile, isVisible, cursorPosition.x, cursorPosition.y]);

  // Handle hover states for interactive elements
  useEffect(() => {
    if (isMobile) return;

    const handleMouseEnter = (e) => {
      const target = e.target;
      
      const interactiveSelectors = [
        'a', 'button', 'input', 'textarea', 'select',
        '[role="button"]', '[data-cursor-hover]',
        '.card', '.project-card', '.interactive'
      ];
      
      const isInteractive = interactiveSelectors.some(selector => 
        target.matches(selector) || target.closest(selector)
      );

      if (isInteractive) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e) => {
      const target = e.target;
      
      const interactiveSelectors = [
        'a', 'button', 'input', 'textarea', 'select',
        '[role="button"]', '[data-cursor-hover]',
        '.card', '.project-card', '.interactive'
      ];
      
      const isInteractive = interactiveSelectors.some(selector => 
        target.matches(selector) || target.closest(selector)
      );

      if (isInteractive) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [isMobile]);

  // Handle click animations
  useEffect(() => {
    if (isMobile) return;

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMobile]);

  // Hide default cursor
  useEffect(() => {
    if (isMobile || prefersReducedMotion()) return;

    document.body.style.cursor = 'none';
    
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.style.cursor = 'auto';
      document.head.removeChild(style);
    };
  }, [isMobile]);

  return {
    cursorPosition,
    isHovering,
    isClicking,
    isVisible,
    isMobile,
    cursorRef,
    prefersReducedMotion: prefersReducedMotion()
  };
};