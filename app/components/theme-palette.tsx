import React, { useCallback, useState } from 'react';
import classNames from 'classnames';

import type { Theme } from '../shared-types';

const tabs = ['Front Page', 'Inside Cover', 'Inside Page'];

const tailwindColors = [
  'gray',
  'red',
  'yellow',
  'green',
  'blue',
  'indigo',
  'purple',
  'pink',
  'lime',
  'slate',
];

const getTabToKey = (currentIndex: number) => {
  if (currentIndex === 1) {
    return 'insideCover';
  }

  if (currentIndex === 2) {
    return 'insidePage';
  }

  return 'frontPage';
};

interface ThemePaletteProps {
  theme: Theme;
  onSwatchClick: (color: string, key: string) => void;
};

const ThemePalette = ({ theme, onSwatchClick }: ThemePaletteProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <div className='w-full flex flex-col'>
      <p className='font-bold'>Theme Palette</p>
      <div className='flex flex-row justify-center items-center'>
        {
          tabs.map((tab, index) => (
            <div key={index} className={`flex flex-row justify-center items-center w-1/3 py-4 border-b-2 cursor-pointer hover:underline ${currentIndex === index ? 'border-purple-600' : 'border-transparent'}`} onClick={() => setCurrentIndex(index)}>
              <p className='text-sm font-bold'>{tab}</p>
            </div>
          ))
        }
      </div>
      <div className='flex flex-wrap gap-x-2 justify-between gap-y-4 py-4'>
        {
          tailwindColors.map((color, index) => {
            const currentKey = getTabToKey(currentIndex);
            const currentColour = theme[currentKey];
            const isCurrentColour = currentColour === color;
            const classes = classNames([
              "w-1/6",
              "rounded-md",
              "aspect-video",
              `bg-${color}-400`,
              "cursor-pointer",
              "border-4",
              "capitalize",
              "flex",
              "justify-center",
              "items-center",
              {
                "border-purple-600": isCurrentColour,
                "border-transparent": !isCurrentColour,
              },
              {
                "font-bold": isCurrentColour,
                "font-normal": !isCurrentColour,
              }
            ]);

            return (
              <div className={classes} key={index} onClick={() => onSwatchClick(color, currentKey)}>
                {color}
              </div>
            )
          })
        }
      </div>
    </div>
  )
};

export default ThemePalette;
