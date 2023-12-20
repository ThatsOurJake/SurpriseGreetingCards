import firestore from "@/services/firestore";
import { headers } from 'next/headers'

import { redirect } from "next/navigation";
import CardWrapper from "../../components/cards/card-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Surprise Greeting Cards - Card',
  description: 'You have been sent you a card!',
}

const CardPage = async () => {
  const _headers = headers();
  const xUrl = _headers.get('x-url');

  if (!xUrl) {
    return redirect('/404');
  }

  const cardId = xUrl.split('/').pop();
  const card = await firestore.findCard(cardId!)

  if (!card) {
    return redirect('/404');
  }

  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center bg-slate-200">
      <CardWrapper cardType={card.type} data={card.data} theme={card.theme} />
      <div className="absolute bottom-0 right-0 p-4 text-slate-600 text-sm">✨ Click to open your card ✨</div>
    </div>
  )
};

export default CardPage;
