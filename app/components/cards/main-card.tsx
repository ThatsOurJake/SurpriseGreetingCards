'use client';

import { useCallback, useState, type ReactNode } from "react";
import classNames from "classnames";
import type { Theme } from "../../shared-types";

interface CardProps {
  frontContent?: ReactNode;
  insideCoverText?: string;
  insideContent?: ReactNode;
  theme?: Theme;
  signedByCats?: boolean;
}

const defaultTheme: Theme = {
  frontPage: 'slate',
  insideCover: 'gray',
  insidePage: 'gray',
};

const MainCard = ({ frontContent, insideContent, insideCoverText, theme: _theme, signedByCats }: CardProps) => {
  const theme = { ...defaultTheme, ..._theme };
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const pageOneClasses = classNames(['page-1', 'rounded-md', `bg-${theme.frontPage}-400`]);
  const insideCoverClasses = classNames(['after:drop-shadow-md', 'after:p-2', 'after:content-[attr(content)]', `after:bg-${theme.insideCover}-400`, 'text-xs', '@sm:text-lg']);
  const pageTwoClasses = classNames(['page-2', 'border-l-black', 'border-l-2', `bg-${theme.insidePage}-400`, 'rounded-md', 'p-2', 'text-xs', '@sm:text-lg']);

  return (
    <div className="relative w-1/2 md:w-1/4 aspect-square drop-shadow-md @container">
      <div className="page w-full h-full cursor-pointer" onClick={() => toggle()} data-open={isOpen}>
        <div className={pageOneClasses} data-open={isOpen}>
          <div content={insideCoverText || ''} className={insideCoverClasses} />
          {frontContent}
        </div>
        <div className={pageTwoClasses}>
          {insideContent}
          {
            signedByCats && (<img className="absolute right-0 bottom-0 w-1/5 @sm:w-1/3 m-2" alt="cat paws" src="/paws.png" />)
          }
        </div>
      </div>
    </div>
  )
};

export default MainCard;
