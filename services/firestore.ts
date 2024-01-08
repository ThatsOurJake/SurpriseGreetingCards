import { getFirestore } from 'firebase-admin/firestore';
import ShortUniqueId from 'short-unique-id';

import './firebase';
import type { CreateCardDB, CreateCardDIO, CreateCardDTO } from '../app/shared-types';

const cardCollection = 'cards';

const db = getFirestore();
const shortId = new ShortUniqueId({ length: 10 });

const createCard = async (card: CreateCardDIO): Promise<CreateCardDTO> => {
  console.log('Creating Card');

  const obj: CreateCardDB = {
    type: card.type,
    theme: {
      frontPage: card.theme.frontPage,
      insideCover: card.theme.insideCover,
      insidePage: card.theme.insidePage,
    },
    data: card.data,
    comment: card.comment,
    shortId: shortId.rnd(),
    createdAt: Date.now(),
  };

  const res = await db.collection(cardCollection).add(obj);

  return {
    ...obj,
    id: res.id,
  }
};

const getCard = async (id: string): Promise<CreateCardDTO | null> => {
  const res = await db.collection(cardCollection).doc(id).get();

  if (!res.exists) {
    return null;
  }

  return {
    ...res.data(),
    id: res.id,
  } as CreateCardDTO;
};

const updateCard = async (card: CreateCardDIO): Promise<CreateCardDTO> => {
  console.log('Updating Card');

  const obj = {
    type: card.type,
    theme: {
      frontPage: card.theme.frontPage,
      insideCover: card.theme.insideCover,
      insidePage: card.theme.insidePage,
    },
    data: card.data,
    comment: card.comment,
  };

  await db.collection(cardCollection).doc(card.id!).update(obj);

  const doc = await getCard(card.id!);
  return doc!;
};

const processCard = async (card: CreateCardDIO): Promise<CreateCardDTO> => {
  if (card.id) {
    return updateCard(card);
  }

  return createCard(card);
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
};

const deleteCard = async (id: string): Promise<void> => {
  const card = await getCard(id);

  console.log(card);

  if (!card) {
    throw new Error('Card not found');
  }

  await db.collection(cardCollection).doc(id).delete();
};

const firestore = {
  processCard,
  findCard,
  getAllCards,
  deleteCard,
};

export default firestore;
