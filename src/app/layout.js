import Head from "next/head";
import "@/styles/style.scss";
import { Providers } from "./provider";
export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}) {
  return (
    <html lang="en">
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Providers >
      <body>{children}</body>
      </Providers>
     
    </html>
  )
}