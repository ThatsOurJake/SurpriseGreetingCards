import React from 'react';

import ImageCard from './image-card';
import TextCard from './text-card';
import type { CardData, CardType, Theme } from '../../shared-types';

interface CardWrapperProps {
  cardType: CardType;
  data: CardData;
  theme?: Theme;
  isPreview?: boolean;
};

const CardMap = {
  image: ImageCard,
  text: TextCard,
}

const CardWrapper = ({ data, cardType, isPreview, theme }: CardWrapperProps) => {
  const Card = CardMap[cardType];

  if (!Card) {
    return null;
  }

  return (
    <Card {...data} isPreview={isPreview} theme={theme}/>
  )
};

export default CardWrapper;
