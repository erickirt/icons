'use client';

import * as React from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { useHotkeys } from 'react-hotkeys-hook';

type Theme = 'light' | 'dark' | 'system';

const KEYS = ['ctrl+u', 'meta+u'];

export function ModeToggle() {
  const { setTheme, theme: currentTheme } = useTheme();

  const handleChangeTheme = (theme: Theme) => {
    if (theme === currentTheme) return;

    if (!document.startViewTransition) return setTheme(theme);
    document.startViewTransition(() => setTheme(theme));
  };

  useHotkeys(
    KEYS,
    () => {
      handleChangeTheme(currentTheme === 'light' ? 'dark' : 'light');
    },
    { preventDefault: true }
  );

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() =>
        handleChangeTheme(currentTheme === 'light' ? 'dark' : 'light')
      }
      className="cursor-pointer"
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
