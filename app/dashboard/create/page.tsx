import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Form from "./form";

const CreateCard = async () => {
  return (
    <div className="container mx-auto py-2">
      <p className="text-2xl text-center font-bold">Virtual Card - Create Card</p>
      <Form />
    </div>
  );
};

export default withPageAuthRequired(CreateCard, {
  returnTo: "/dashboard/create",
});
