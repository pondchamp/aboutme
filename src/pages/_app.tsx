import "@/styles/globals.css";
import "animate.css";

import type { AppProps } from "next/app";
import React from "react";
import { CookiesProvider } from "react-cookie";

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props;
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  );
};

export default MyApp;
