import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Task Manager | Scalable Monorepo Architecture',
  description: 'Task management application built with Next.js and Zod shared schemas.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#090d16] text-slate-100 font-sans min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
