'use client';

import { useCallback, useState, type ReactNode } from "react";
import classNames from "classnames";
import type { Theme } from "../../shared-types";

interface CardProps {
  frontContent?: ReactNode;
  insideCoverText?: string;
  insideContent?: ReactNode;
  theme?: Theme;
}

const defaultTheme: Theme = {
  frontPage: 'slate',
  insideCover: 'gray',
  insidePage: 'gray',
};

const MainCard = ({ frontContent, insideContent, insideCoverText, theme: _theme }: CardProps) => {
  const theme = { ...defaultTheme, ..._theme };
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const pageOneClasses = classNames(['page-1', 'rounded-md', `bg-${theme.frontPage}-400`]);
  const insideCoverClasses = classNames(['after:drop-shadow-md', 'after:p-2', 'after:content-[attr(content)]', `after:bg-${theme.insideCover}-400`]);
  const pageTwoClasses = classNames(['page-2', 'border-l-black', 'border-l-2', `bg-${theme.insidePage}-400`, 'rounded-md', 'p-2']);

  return (
    <div className="relative w-1/2 md:w-1/4 aspect-square drop-shadow-md">
      <div className="page w-full h-full cursor-pointer" onClick={() => toggle()} data-open={isOpen}>
        <div className={pageOneClasses} data-open={isOpen}>
          <div content={insideCoverText || ''} className={insideCoverClasses} />
          {frontContent}
        </div>
        <div className={pageTwoClasses}>
          {insideContent}
        </div>
      </div>
    </div>
  )
};

export default MainCard;
