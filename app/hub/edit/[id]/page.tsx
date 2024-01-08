import { Metadata } from "next";

import Form from "../../components/form";
import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: 'Surprise Greeting Cards - Edit Card',
  description: 'Edit a card',
}

const EditCard = async () => {
  const { default: firestore } = await import("@/services/firestore");

  const _headers = headers();
  const xUrl = _headers.get('x-url');

  if (!xUrl) {
    return redirect('/hub');
  }

  const cardId = xUrl.split('/').pop();
  const card = await firestore.findCard(cardId!)

  if (!card) {
    return redirect('/hub');
  }

  return (
    <div className="container mx-auto py-2">
      <p className="text-2xl text-center font-bold">Surprise Greeting Cards - Edit a card</p>
      <Form card={card} />
      <div className="text-center py-2">
        <a href="/hub" className="text-blue-600 hover:underline">
          Goto Dashboard
        </a>
      </div>
    </div>
  );
};

export default EditCard;
