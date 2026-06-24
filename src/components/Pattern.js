// src/components/Pattern.js

"use client";

import React from 'react';
import styled from 'styled-components';

const Pattern = () => {
    return (
        <StyledWrapper>
            <div className="grid-wrapper">
                <div className="grid-background" />
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  /* Ensures component covers viewport and is above body gradient (z-index 0) */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; 

  .grid-wrapper {
    min-height: 100%;
    width: 100%;
    position: relative;
    background-color: transparent; 
  }

  .grid-background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    
    /* CRITICAL DEBUG CHANGE: Use a visible gray (#94a3b8) for testing */
    background-image: linear-gradient(to right, #94a3b8 1px, transparent 1px),
      linear-gradient(to bottom, #94a3b8 1px, transparent 1px);
    background-size: 20px 30px;
    
    /* CRITICAL DEBUG CHANGE: Comment out the mask for testing! */
    /*
    -webkit-mask-image: radial-gradient(
      ellipse 70% 60% at 50% 0%,
      #000 60%,
      transparent 100%
    );
    mask-image: radial-gradient(
      ellipse 70% 60% at 50% 0%,
      #000 60%,
      transparent 100%
    );
    */
  }`;

export default Pattern;