import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head key="document">
        <link
          href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Caveat:wght@400;500;600;700&family=Courier+Prime:wght@400;700&family=Patua+One&family=Sacramento&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
