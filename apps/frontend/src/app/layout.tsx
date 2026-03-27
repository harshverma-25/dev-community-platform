// app/layout.tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/src/providers/query-provider";
import { Toaster } from "react-hot-toast";
import Navbar from "@/src/components/Navbar";
import Sidebar from "@/src/components/Sidebar";

// Primary font for body text - clean and modern
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Monospace font for code - perfect for developers
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

// Display font for headings - geometric and tech-focused
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dev Circle | Developer Community Hub",
  description: "Connect, collaborate, and grow with fellow developers. Your all-in-one platform for developer tools, resources, and community.",
  keywords: "developers, coding, programming, community, tools, collaboration",
  authors: [{ name: "Dev Circle" }],
  openGraph: {
    title: "Dev Circle - Developer Community Hub",
    description: "Join the ultimate platform for developers to connect, share knowledge, and build amazing projects together.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`
        ${inter.variable} 
        ${jetbrainsMono.variable} 
        ${spaceGrotesk.variable}
        font-sans
        min-h-screen
        antialiased
      `}>
        <QueryProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 text-slate-100">
            {/* Animated background elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
              <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl animate-pulse-slow" />
              <div className="absolute bottom-[-180px] right-[-180px] h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-3xl animate-pulse-slow animation-delay-2000" />
              <div className="absolute top-[20%] left-[-180px] h-[420px] w-[420px] rounded-full bg-fuchsia-500/10 blur-3xl animate-pulse-slow animation-delay-4000" />
              
              {/* Grid pattern overlay for tech feel */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
            </div>

            <div className="flex h-screen w-full overflow-hidden p-3 sm:p-4 gap-3 sm:gap-4 relative z-10">
              {/* Sidebar Container */}
              <div className="hidden lg:block w-[280px] h-full flex-shrink-0">
                <Sidebar />
              </div>

              {/* Main Content Area */}
              <div className="flex flex-col flex-1 min-w-0 h-full gap-3 sm:gap-4">
                <Navbar />
                
                <main className="flex-1 overflow-y-auto bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl relative">
                  <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-6 md:py-8 h-full">
                    {children}
                  </div>
                </main>
              </div>
            </div>
          </div>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#f1f5f9',
                border: '1px solid #334155',
                borderRadius: '0.75rem',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#f1f5f9',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#f1f5f9',
                },
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}