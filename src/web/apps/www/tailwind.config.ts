import type { Config } from "tailwindcss";
import { config } from '@signalco/ui-themes-minimal/config';

const tailwindConfig: Config = {
  presets: [config],
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@signalco/ui-primitives/**/*.{js,ts,jsx,tsx,mdx}",
  ]
};
export default tailwindConfig;
