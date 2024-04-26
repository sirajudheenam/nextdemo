"use client";
// import type { Metadata } from "next";
import "@/styles/globals.css";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

// export const metadata = {
//   title: "Next.js Demo by TechnoTipsToday",
//   description: "Demo of the Next.js Concepts by Sam",
// };

const RootLayout = ({ children }) => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDarkMode);
  }, []);

  return (
    <html lang='en' suppressHydrationWarning={true}>
      <title>Next.js Demo by TechnoTipsToday</title>
      <body>

        <Provider>
          <div className={darkMode ? 'dark' : 'light'}>
            <div className='main'>
              <div className='gradient' />
            </div>

            <main className='app container mx-auto py-6'>
              <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              {children}
            </main>
          </div>
        </Provider>
        {/* Footer Section */}
        {/* <footer className="bg-gray-800 text-white py-4 text-center"> */}
        {/* Footer content */}
        {/* <div>@ Copyrights reserved by TechnoTipsToday</div> */}
        {/* </footer> */}
        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4 sticky bottom-0 z-10">
          <div className="container mx-auto text-center">
            {/* Footer content */}
            © 2024 Copyrights reserved by TechnoTipsToday
          </div>
        </footer>

      </body>
    </html>
  );
};
export default RootLayout;