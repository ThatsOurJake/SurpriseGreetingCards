export type CardType = 'image' | 'text';

interface Theme {
  frontPage?: string;
  insideCover?: string;
  insidePage?: string;
}

type BaseData = {
  insideText?: string;
  insideCoverText?: string;
  signedByCats?: boolean;
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
  id?: string;
}

interface CreateCardDB extends CreateCardDIO {
  shortId: string;
  createdAt: number;
}

interface CreateCardDTO extends CreateCardDB {
  id: string;
}
