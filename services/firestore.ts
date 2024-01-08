import { getFirestore } from 'firebase-admin/firestore';
import ShortUniqueId from 'short-unique-id';

import './firebase';
import { CreateCardDIO, CreateCardDTO } from '../app/shared-types';

const cardCollection = 'cards';

const db = getFirestore();
const shortId = new ShortUniqueId({ length: 10 });

const createCard = async (card: CreateCardDIO): Promise<CreateCardDTO> => {
  const obj = {
    ...card,
    shortId: shortId.rnd(),
    createdAt: Date.now(),
  };

  const res = await db.collection(cardCollection).add(obj);

  return {
    ...obj,
    id: res.id,
  }
};

const findCard = async (id: string): Promise<CreateCardDTO | null> => {
  const res = await db.collection(cardCollection).where('shortId', '==', id).get();

  if (res.empty) {
    return null;
  }

  const [card] = res.docs;

  return {
    ...card.data(),
    id: card.id,
  } as CreateCardDTO;
};

const getAllCards = async (): Promise<CreateCardDTO[]> => {
  const res = await db.collection(cardCollection).get();

  if (res.empty) {
    return [];
  }

  return res.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }) as CreateCardDTO).sort((a, b) => b.createdAt - a.createdAt);
}

const firestore = {
  createCard,
  findCard,
  getAllCards,
};

export default firestore;
