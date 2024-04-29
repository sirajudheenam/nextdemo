"use client";
// import type { Metadata } from "next";
import "@/styles/globals.css";
import Nav from "@/components/Nav";
import NextAuthSessionProvider from "@/components/NextAuthSessionProvider";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
// import { CounterStoreProvider } from '@/providers/counter-store-provider';
// import { CountStoreDemo } from "@/components/CountStoreDemo";
import { GlobalStoreProvider } from '@/providers/global-store-provider';

// export const metadata = {
//   title: "Next.js Demo by TechnoTipsToday",
//   description: "Demo of the Next.js Concepts by Sam",
// };

const RootLayout = ({ children }) => {
  const router = useRouter();
  const [dark, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!dark);
  };

  // const { darkMode, activateDarkMode } = useGlobalStore(
  //   (state) => state,
  // );

  useEffect(() => {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDarkMode);
    // activateDarkMode(isDarkMode);
  }, []);

  return (
    <html lang='en' suppressHydrationWarning={true}>
      <title>Next.js Demo by TechnoTipsToday</title>
      <body>
        <NextAuthSessionProvider>
          <GlobalStoreProvider>
            {/* <CounterStoreProvider> */}
            {/* <CountStoreDemo /> */}
            <div className={`${dark} ? 'dark' : 'light'`}>
              {/* <Nav dark={dark} toggleDarkMode={toggleDarkMode} /> */}
              <div className='main'>
                <div className='gradient' />
              </div>
              <Nav dark={dark} toggleDarkMode={toggleDarkMode} />
              <main className='app container mx-auto py-6'>
                {children}
              </main>
            </div>
            {/* </CounterStoreProvider> */}
          </GlobalStoreProvider>
        </NextAuthSessionProvider>
        {/* Footer Section */}
        {/* <footer className="bg-gray-800 text-white py-4 text-center"> */}
        {/* Footer content */}
        {/* <div>@ Copyrights reserved by TechnoTipsToday</div> */}
        {/* </footer> */}
        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4 sticky bottom-0 z-10">
          <div className="container mx-auto text-center">
            {/* Footer content */}
            © 2024 Copyrights reserved by TechnoTipsToday.
          </div>
        </footer>
        {/* Global styles for dark/light mode */}
        <style jsx global>{`
        body {
          background-color: ${dark ? '#333333' : '#FFFFFF'};
          color: ${dark ? '#FFFFFF' : '#333333'};
          transition: background-color 0.3s ease, color 0.3s ease;
          {/* margin-top: 56px; /* Adjust this value to accommodate the height of the sticky header */ */}
          {/* padding-bottom: 56px; /* Adjust this value to accommodate the height of the sticky footer */ */}
        }
      `}</style>
      </body>
    </html >
  );
};
export default RootLayout;