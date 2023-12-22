import React from 'react';
import Markdown from 'react-markdown'

import MainCard from './main-card';
import type { Theme } from '../../shared-types';
import CardText from './card-text';

interface TextCardProps {
  theme?: Theme;
  frontText?: string;
  insideCoverText?: string;
  insideText?: string;
  isPreview?: boolean;
};

const TextCard = ({ theme, frontText, insideCoverText, insideText, isPreview }: TextCardProps) => {
  const fontContent = <CardText text={frontText} isPreview={isPreview} />;
  const insideContent = <CardText text={insideText} isPreview={isPreview} />;

  return (
    <MainCard theme={theme} frontContent={fontContent} insideContent={insideContent} insideCoverText={insideCoverText} />
  );
}

export default TextCard;
