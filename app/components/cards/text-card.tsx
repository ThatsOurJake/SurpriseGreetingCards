import React from 'react';
import Markdown from 'react-markdown'

import MainCard from './main-card';
import type { Theme } from '../../shared-types';

interface TextCardProps {
  theme?: Theme;
  frontText?: string;
  insideCoverText?: string;
  insideText?: string;
  isPreview?: boolean;
};

const TextCard = ({ theme, frontText, insideCoverText, insideText, isPreview }: TextCardProps) => {
  const fontContent = <div className='inside-text flex flex-col justify-center items-center h-full text-center' data-preview={isPreview?.valueOf()}><Markdown>{frontText}</Markdown></div>;
  const insideContent = <div className='inside-text flex flex-col justify-center items-center h-full text-center' data-preview={isPreview?.valueOf()}><Markdown>{insideText}</Markdown></div>;

  return (
    <MainCard theme={theme} frontContent={fontContent} insideContent={insideContent} insideCoverText={insideCoverText} />
  )
}

export default TextCard;
