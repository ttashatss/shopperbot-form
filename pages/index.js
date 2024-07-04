import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import liff from "@line/liff";

const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

export default function Home() {
  useEffect(async () => {
    const liff = (await import("@line/liff")).default;
    try {
      await liff.init({liffId});
    } catch (error) {
      console.error("liff init error", error.message);
    }

    if (liff.isLoggedIn()) {
      const {userId, displayName} = await liff.getProfile();
      
      const url = 
        "https://docs.google.com/forms/d/e/1FAIpQLSfcS-o54-Odj7VwsLaQINfkJrVYF7uDtZmGVvS4ZVMggTIvGw/viewform?usp=pp_url&entry.257896725="
        + userId //currently says undefied on GG form
        + "&entry.100609219="
        + displayName //currently says undefied on GG form
      window.location.replace(url);
    } else {
      liff.login();
    }

  }, [])


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main></main>

      <footer>
        <a>By ShopperBot</a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
