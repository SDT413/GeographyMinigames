"use client";
import './globals.scss'
import { Inter } from 'next/font/google'
import ReduxAndChakraProviders from "@/components/ReduxAndChakraProviders";
import {ReactNode} from "react";
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({children,}: {
    children: ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ReduxAndChakraProviders >
            {children}
        </ReduxAndChakraProviders>
        </body>
        </html>

    )
}
