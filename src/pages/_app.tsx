import "@/styles/globals.css";
import "animate.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { CookiesProvider } from "react-cookie";

import ReduxStore from "@/layouts/ReduxStore";
import { FullName, MySummary } from "@/util";

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props;
  return (
    <ReduxStore>
      <CookiesProvider>
        <Head>
          <title>{FullName}</title>
          <meta name="description" content={MySummary} />

          <meta property="og:url" content="https://julianblair.me/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={FullName} />
          <meta property="og:description" content={MySummary} />
          <meta property="og:image" content="/img/me.jpg" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="julianblair.me" />
          <meta property="twitter:url" content="https://julianblair.me/" />
          <meta name="twitter:title" content={FullName} />
          <meta name="twitter:description" content={MySummary} />
          <meta name="twitter:image" content="/img/me.jpg" />
        </Head>
        <Component {...pageProps} />
      </CookiesProvider>
    </ReduxStore>
  );
};

export default MyApp;
