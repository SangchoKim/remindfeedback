import React from "react";
import Head from "next/head";
import Helmet from "react-helmet";
const Header = () => {
  return (
    <Helmet
      title="RemindFeedBack"
      htmlAttributes={{ lang: "ko" }}
      meta={[
        {
          charset: "UTF-8",
        },
        {
          name: "viewport",
          content:
            "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover",
        },
        {
          "http-equiv": "X-UA-Compatible",
          content: "IE=edge",
        },
        {
          name: "description",
          content: "리마인드 피드백입니다.",
        },
        {
          name: "og:title",
          content: "리마인드 피드백",
        },
        {
          name: "og:description",
          content: "리마인드 피드백",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          // property: 'og:image', content: 'https://remindfeedback.com/favicon.ico',
        },
      ]}
      link={[
        {
          rel: "shortcut icon",
          href: "/favicon.ico",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css",
        },
        {
          rel: "stylesheet",
          href:
            "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css",
        },
        {
          rel: "stylesheet",
          href:
            "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Do+Hyeon:400",
        },
        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css?family=Nanum+Gothic+Coding:400",
        },
        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css?family=Caladea:400&display=swap",
        },
      ]}
    />
  );
};

export default Header;
