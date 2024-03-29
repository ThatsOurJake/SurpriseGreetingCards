import type { CreateCardDIO, ImageCardData, TextCardData } from "@/app/shared-types";

const post = async (req: Request) => {
  const { default: firestore } = await import("@/services/firestore");

  const body = await req.json() as CreateCardDIO;
  const { data, theme, type, comment } = body;

  if (!type || !theme || !data || !comment) {
    return new Response('Missing required fields', { status: 400 });
  }

  if (type === 'text') {
    const { frontText } = data as TextCardData;

    if (!frontText) {
      return new Response('Missing required field: frontText', { status: 400 });
    }
  }

  if (type === 'image') {
    const { frontImage } = data as ImageCardData;

    if (!frontImage) {
      return new Response('Missing required field: frontImage', { status: 400 });
    }
  }

  const card = await firestore.processCard(body);

  return new Response(JSON.stringify(card), { status: 200, headers: { 'Content-Type': 'application/json' } });
};

export const POST = post;
