import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Form from "./form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Surprise Greeting Cards - Create Card',
  description: 'Create a card',
}

const CreateCard = async () => {
  return (
    <div className="container mx-auto py-2">
      <p className="text-2xl text-center font-bold">Surprise Greeting Cards - Create Card</p>
      <Form />
    </div>
  );
};

export default withPageAuthRequired(CreateCard, {
  returnTo: "/dashboard/create",
});
