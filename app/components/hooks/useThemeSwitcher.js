'use client';

import { useEffect, useState } from 'react';

export default function useThemeSwitcher() {
  const preferDarkQuery = '(prefer-color-scheme: dark)'; //operating system
  const [mode, setMode] = useState('');

  useEffect(function () {
    const mediaQuery = window.matchMedia(preferDarkQuery);
    const userPref = window.localStorage.getItem('theme');

    const handleChange = () => {
      if (userPref) {
        let check = userPref === 'dark' ? 'dark' : 'light';
        setMode(check);
        if (check === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } else {
        let check = mediaQuery.matches ? 'dark' : 'light';
        setMode(check);
        if (check === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };
    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(
    function () {
      if (mode === 'dark') {
        window.localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
      }
      if (mode === 'light') {
        window.localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
      }
    },
    [mode]
  );

  return [mode, setMode];
}
