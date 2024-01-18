import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiz Bot",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col max-h-screen h-screen">
        <header className="bg-gray-900 flex justify-between items-center h-16 p-4 px-10">
          <Link className="flex gap-2" href="/">
            <h1>SSW.QuizBot</h1>
            <h3>(PoC)</h3>
          </Link>

          <nav className="flex gap-10">
            <Link href="/quiz/angular">Angular</Link>
            <Link href="/quiz/css">Css</Link>
            <Link href="/quiz/scrum">Scrum</Link>
          </nav>
        </header>
        <main className="bg-gray-800 grow h-full p-24">{children}</main>
        <footer className="flex h-16 items-center p-4 px-10">
          Made as a Proof of Concept for SSW.Rewards
        </footer>
      </body>
    </html>
  );
}
