import React from 'react';
import { motion } from 'motion/react';
import { homePageConfig } from '../config/homePageConfig';

export default function AnimatedHeadline() {
  const { headlineLines } = homePageConfig.hero;
  const { wordDelay, duration, ease, blurFrom, yFrom } = homePageConfig.motion.textReveal;

  // Flatten both lines into a structure where words can be individual spans, keeping track of lines
  let wordCounter = 0;

  return (
    <h1 
      className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-black tracking-tight text-brand-cream leading-[0.92] text-center lg:text-left uppercase"
      style={{ letterSpacing: "-0.04em" }}
    >
      {headlineLines.map((line, lineIndex) => {
        const words = line.split(' ');
        return (
          <div key={lineIndex} className="flex flex-wrap justify-center lg:justify-start overflow-hidden pb-2 last:pb-0">
            {words.map((word, wordIndex) => {
              wordCounter++;
              const isHighlighted = homePageConfig.hero.highlightedWords.includes(
                word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
              );

              return (
                <motion.span
                  key={wordIndex}
                  className={`inline-block mr-3 sm:mr-4 last:mr-0 transform-gpu ${
                    isHighlighted
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-brand-purple to-brand-wax font-extrabold italic normal-case'
                      : 'text-brand-cream font-medium'
                  }`}
                  initial={{ 
                    opacity: 0, 
                    y: yFrom, 
                    filter: `blur(${blurFrom}px)`,
                    rotateX: 8
                  }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    filter: "blur(0px)",
                    rotateX: 0
                  }}
                  transition={{
                    duration: duration,
                    delay: wordCounter * wordDelay,
                    ease: ease
                  }}
                >
                  {word}
                </motion.span>
              );
            })}
          </div>
        );
      })}
    </h1>
  );
}
