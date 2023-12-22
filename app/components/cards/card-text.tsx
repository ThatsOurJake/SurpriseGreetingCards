import React from "react";
import Markdown from "react-markdown";

interface CardTextProps {
  isPreview?: boolean;
  text?: string;
}

const CardText = ({ text, isPreview = false }: CardTextProps) => (
  <div className='inside-text--small lg:inside-text--large flex flex-col justify-center items-center h-full text-center' data-preview={isPreview.valueOf()}><Markdown>{text}</Markdown></div>
);

export default CardText;
