import type { Metadata } from "next"
import localFont from "next/font/local"
import "./css/reset.css"
import "./css/variables.css"
import "./css/globals.css"

const rubik = localFont({
  src: [
    { path: "./fonts/Rubik-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Rubik-Medium.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Rubik-Italic.woff2", weight: "400", style: "italic" }
  ]
})

export const metadata: Metadata = {
  title: "Frontend Mentor | Frontend quiz app",
  description: "A project downloaded from Frontend Mentor web page"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik.className} body grid h-screen grid-cols-[1fr] grid-rows-[min-content_1fr] overflow-hidden bg-[var(--clr-grey-300)] antialiased transition duration-1000 ease-in-out lg:px-[70px] lg:pt-[100px] xl:px-[140px] dark:bg-[var(--clr-grey-700)]`}
      >
        {children}
      </body>
    </html>
  )
}
