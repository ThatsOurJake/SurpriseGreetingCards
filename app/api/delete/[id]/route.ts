const del = async (req: Request) => {
  const { default: firestore } = await import("@/services/firestore");
  const id = req.url.split('/')[5];

  if (!id) {
    return new Response('Missing required field: id', { status: 400 });
  }

  try {
    await firestore.deleteCard(id);

    return new Response(JSON.stringify({
      result: "Card Deleted"
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({
      result: "Card Not Found"
    }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  }
};

export const POST = del;
