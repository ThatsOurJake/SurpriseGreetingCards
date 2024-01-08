import { Metadata } from "next";

import Form from "../components/form";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Surprise Greeting Cards - Create Card',
  description: 'Create a card',
}

const CreateCard = async () => {
  return (
    <div className="container mx-auto py-2">
      <p className="text-2xl text-center font-bold">Surprise Greeting Cards - Create Card</p>
      <Form />
      <div className="text-center py-2">
        <a href="/hub" className="text-blue-600 hover:underline">
          Goto Dashboard
        </a>
      </div>
    </div>
  );
};

export default CreateCard;
