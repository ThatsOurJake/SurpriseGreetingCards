export type CardType = 'image' | 'text';

interface Theme {
  frontPage?: string;
  insideCover?: string;
  insidePage?: string;
}

type BaseData = {
  insideText?: string;
  insideCoverText?: string;
}

type ImageCardData = BaseData & {
  frontImage?: string;
};

type TextCardData = BaseData & {
  frontText?: string;
};

type CardData = ImageCardData | TextCardData;

interface CreateCardDIO {
  type: CardType;
  theme: Theme;
  comment: string;
  data: CardData;
}

interface CreateCardDTO extends CreateCardDIO {
  shortId: string;
  createdAt: number;
  id: string;
}
