export function getInitialTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme as 'light' | 'dark';

  const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
  if (userMedia.matches) return 'dark';

  return 'light';
}

export function applyTheme(theme: 'light' | 'dark') {
  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  localStorage.setItem('theme', theme);
}