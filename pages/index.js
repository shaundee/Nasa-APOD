import Head from "next/head";
import NasaInfo from "../Components/NasaInfo";

export default function home() {
  // use rocket img

  return (
    <div className=" bg-violet-900  select-text ">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" ">
        <NasaInfo />
      </main>
    </div>
  );
}
