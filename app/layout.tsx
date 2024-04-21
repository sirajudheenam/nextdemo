import type { Metadata } from "next";
import "@/styles/globals.css";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";

export const metadata: Metadata = {
  title: "Next.js Demo by TechnoTipsToday",
  description: "Demo of the Next.js Concepts by Sam",
};

const RootLayout = ({ children }) => (
  <html lang='en' suppressHydrationWarning={true}>
    <body>
      <Provider>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;