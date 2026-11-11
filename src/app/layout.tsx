import "@/style/global.css";
import { Noto_Sans, Stack_Sans_Text } from "next/font/google";
import type { Metadata, Viewport } from "next";
import Providers from "@/providers/providers";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import IntroScreen from "@/layout/IntroScreen";

const siteUrl = "https://muhammed-mu.vercel.app";
const name ="Muhamad Sherif";
const title = `${name} | Full-Stack Web Developer (React, Next.js, Node.js)`;
const description =
    "Full-Stack Web Developer with 2 years of experience building fast, responsive websites and e-commerce platforms with React, Next.js, Node.js, and MongoDB. Available for freelance projects.";

const notoSans = Noto_Sans({
    subsets: ["latin"],
    variable: "--font-noto-sans",
    fallback: ["Arial", "sans-serif"],
});

const stackSans = Stack_Sans_Text({
    subsets: ["latin"],
    variable: "--font-stack-sans",
    fallback: ["Arial", "sans-serif"],
    adjustFontFallback: false,
});

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: title,
        template: `%s | ${name}`,
    },
    description,
    applicationName: `${name} Portfolio`,
    authors: [{ name, url: siteUrl }],
    creator: name,
    keywords: [
        "Muhamad Sherif",
        "Full-Stack Web Developer",
        "freelance web developer Egypt",
        "React developer",
        "Next.js developer",
        "Node.js developer",
        "MERN stack developer",
        "e-commerce website development",
        "web developer portfolio",
    ],
    alternates: { canonical: "/" },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
        type: "website",
        url: siteUrl,
        siteName: `${name} Portfolio`,
        title,
        description,
        locale: "en_US",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${name}, Full-Stack Web Developer` }],
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/og-image.png"],
    },

    icons: {
        icon: [
            { url: "/real-logo.png", type: "image/png" },
        ],
        apple: "/real-logo.png",
        shortcut: "/real-logo.png",
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#0B0E1D" },
    ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            className={`${notoSans.variable} ${stackSans.variable}`}
            suppressHydrationWarning
        >
            <body>
                <Providers>
                    <IntroScreen />
                    <Nav />
                    {children}
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}