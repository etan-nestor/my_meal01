/** @type {import('tailwindcss').Config} */
export const content = [
  "./App.{js,jsx,ts,tsx}",
  "./src/screens/**/*.{js,jsx,ts,tsx}",
  "./src/components/**/*.{js,jsx,ts,tsx}",
];
export const presets = [require("nativewind/preset")];
export const theme = {
  extend: {},
};
export const plugins = [];
