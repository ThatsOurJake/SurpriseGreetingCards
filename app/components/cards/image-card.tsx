import React from 'react';
import Markdown from 'react-markdown'

import MainCard from './main-card';
import type { Theme } from '../../shared-types';
import CardText from './card-text';

interface ImageCardProps {
  theme?: Theme;
  frontImage?: string;
  insideCoverText?: string;
  insideText?: string;
  isPreview?: boolean;
  signedByCats?: boolean;
};

const ImageCard = ({ theme, frontImage, insideCoverText, insideText, isPreview, signedByCats }: ImageCardProps) => {
  const fontContent = <div className='h-full w-full'><img alt='front cover image' src={frontImage} className='w-full h-full' /></div>;
  const insideContent = <CardText text={insideText} isPreview={isPreview} />;

  return (
    <MainCard theme={theme} frontContent={fontContent} insideContent={insideContent} insideCoverText={insideCoverText} signedByCats={signedByCats} />
  )
}

export default ImageCard;
