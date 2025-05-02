import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import SplashScreen from './componets/LoadingScreen';

export const metadata = {
  title: 'Code Lab',
  description: 'App negocio tecnico',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/loadingg.png" type="image/png" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <SplashScreen>{children}</SplashScreen>
      </body>
    </html>
  );
}
