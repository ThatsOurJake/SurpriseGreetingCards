"use client";

import React, { ChangeEvent, useCallback, useState } from "react";

import CardWrapper from "../../components/cards/card-wrapper";
import ThemePalette from "../../components/theme-palette";
import type { CardType, CreateCardDIO, CreateCardDTO, Theme } from "@/app/shared-types";
import Link from "next/link";

const Form = () => {
  const [cardType, setCardType] = useState<string>("image");

  const [frontImage, setFrontImage] = useState<string>("https://placehold.co/600x600/orange/white?text=Front+Image");
  const [frontText, setFrontText] = useState<string>("Front Text");
  const [insideText, setInsideText] = useState<string>("");
  const [insideCoverText, setInsideCoverText] = useState<string>("");
  const [theme, setTheme] = useState<Theme>({ frontPage: "slate", insideCover: "gray", insidePage: "gray" });
  const [comment, setComment] = useState<string>("");

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [newCard, setNewCard] = useState<CreateCardDTO | null>(null);

  const onCardTypeChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setCardType(e.target.value);
  }, []);

  const onSwatchClick = useCallback((color: string, key: string) => {
    setTheme({ ...theme, [key]: color });
  }, [theme]);

  const onSubmit = useCallback(async () => {
    setSubmitting(true);
    setError(false);

    const payload: CreateCardDIO = {
      data: {
        frontImage,
        frontText,
        insideText,
        insideCoverText,
      },
      theme: {
        frontPage: theme.frontPage,
        insideCover: theme.insideCover,
        insidePage: theme.insidePage,
      },
      type: cardType as CardType,
      comment,
    };

    const res = await fetch("/api/create", {
      body: JSON.stringify(payload),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      setNewCard(data);
    } else {
      setError(true);
    };

    setSubmitting(false);
  }, [cardType, frontImage, frontText, insideCoverText, insideText, theme, comment]);

  return (
    <div className="py-2">
      <div className="w-1/2 md:w-3/5 mx-auto mb-4 flex flex-col items-center">
        <p className="text-sm italic">Preview!</p>
        <div className="w-full flex justify-center my-4">
          <CardWrapper cardType={cardType as CardType} data={{ frontImage, insideText, insideCoverText, frontText }} theme={theme} isPreview />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 w-1/2 mx-auto">
        <p className="font-bold">Card Type:</p>
        <select className="rounded-md p-2 border border-indigo-400 px-2" value={cardType} onChange={onCardTypeChange}>
          <option value="image">Image Card</option>
          <option value="text">Text Card</option>
        </select>
        {
          cardType === "image" && (
            <section>
              <p className="font-bold">Front Image</p>
              <input className="rounded-md border border-indigo-400 w-full p-2" value={frontImage} onChange={(e) => setFrontImage(e.target.value)} />
            </section>
          )
        }
        {
          cardType === "text" && (
            <section>
              <p className="font-bold">Front Text</p>
              <textarea className="rounded-md border border-indigo-400 w-full p-2" value={frontText} onChange={(e) => setFrontText(e.target.value)} />
            </section>
          )
        }
        <section>
          <p className="font-bold">Inside cover text</p>
          <input className="rounded-md border border-indigo-400 w-full p-2" value={insideCoverText} onChange={(e) => setInsideCoverText(e.target.value)} />
        </section>
        <section>
          <p className="font-bold">Inside Text</p>
          <textarea className="rounded-md border border-indigo-400 w-full p-2" value={insideText} onChange={(e) => setInsideText(e.target.value)} />
        </section>
        <ThemePalette theme={theme} onSwatchClick={onSwatchClick} />
        <section>
          <p className="font-bold">Comment</p>
          <input className="rounded-md border border-indigo-400 w-full p-2" value={comment} onChange={(e) => setComment(e.target.value)} />
        </section>
        {
          newCard && (
            <div className="py-2">
              <p>New card created - <Link className="text-blue-600 hover:underline" href={`/card/${newCard.shortId}`}>View here</Link></p>
            </div>
          )
        }
        {
          error && (
            <div className="py-2">
              <p className="text-red-600">Error creating card</p>
            </div>
          )
        }
        <button className="rounded-md p-2 bg-purple-600 hover:underline text-white disabled:bg-gray-600" disabled={submitting} onClick={onSubmit}>
          Create Card
        </button>
      </div>
    </div>
  );
};

export default Form;
