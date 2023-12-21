import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Surprise Greeting Cards - Dashboard',
  description: 'View the dashboard',
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(date);
}

export const dynamic = 'force-dynamic';

const DashboardPage = async () => {
  const { default: firestore } = await import("@/services/firestore");

  const cards = await firestore.getAllCards();

  return (
    <div className="container mx-auto py-2">
      <p className="text-2xl text-center font-bold">Surprise Greeting Cards - Dashboard</p>
      <section className="my-2">
        <p><b>Current Cards:</b></p>
        <ul>
          {
            cards.map((card) => (
              <li key={card.shortId}>
                <div className="my-2 w-full border border-black rounded-md bg-gray-50 p-2">
                  <p className="text-lg font-bold">{card.comment}</p>
                  <div className="flex gap-x-2">
                    <p><b>Card ID: </b>{card.shortId}</p>
                    <p>|</p>
                    <p><b>Created at: </b>{formatDate(new Date(card.createdAt))}</p>
                    <p>|</p>
                    <p><b>Card Type: </b>{card.type}</p>
                    <p>|</p>
                    <Link href={`/card/${card.shortId}`} className="text-blue-600 hover:underline">
                      View Card
                    </Link>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
        {
          cards.length === 0 && (
            <p>You have not created any cards yet!</p>
          )
        }
      </section>
      <Link href="/dashboard/create" className="text-blue-600 hover:underline">
        Create a new card
      </Link>
    </div>
  );
};

export default DashboardPage;
