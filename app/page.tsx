import { redirect } from "next/navigation";

export default async function Home() {
  const viewCard = async (formData: FormData) => {
    'use server';
    const id = formData.get('id');
    redirect(`/card/${id}`);
  };

  return (
    <main className="min-h-screen min-w-full bg-grad flex flex-col justify-center items-center gap-y-8">
      <p className="font-bold text-7xl">Surprise Greeting Cards</p>
      <form className="w-full md:w-1/3 flex flex-col gap-y-3" action={viewCard}>
        <p className="text-center italic">Enter the ID of the card you want to view.</p>
        <input name="id" className="rounded-md p-2" placeholder="Card ID" required />
        <button className="rounded-md p-2 bg-purple-600 hover:underline text-white" type="submit">View Card</button>
      </form>
      <a className="absolute bottom-0 w-full text-center py-2 hover:underline" href="/hub">Admin Zone ✨</a>
    </main>
  );
}
