import React, { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import {
  colorState,
  photoDataState,
  selectedDateState,
} from "../Atoms/dateAtom";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import { shuffle } from "lodash";
import { motion, useCycle } from "framer-motion";
import PhotoInfo from "./photo";
import DateSelection from "./DateSelection";
import { buttonVariants } from "./DateSelection";

const colors = [
  "from-blue-600",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-amber-700",
];
export default function nasaInfo() {
  const [photoData, setPhotoData] = useRecoilState(photoDataState);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  const [color, setColor] = useRecoilState(colorState);

  useEffect(() => {
    getPhoto();

    setColor(shuffle(colors).pop());

    async function getPhoto() {
      const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${
          selectedDate.toISOString().split("T")[0]
        }`
      );
      const data = await res.json();
      setPhotoData(data);
      console.log(data);
    }
    if (selectedDate > new Date()) {
      alert("Date is out of range!");
      location.reload();
    }
  }, [selectedDate, prev, next]);

  if (!photoData) return <> </>;

  return (
    <motion.div
      className="flex flex-col items-center justify-center select-text mt-0 "
      variants={buttonVariants}
      initial="init"
      animate="visible"
    >
      <section
        className={`flex min-h-[15vh] flex-col  w-[100%] justify-center bg-gradient-to-b ${color} `}
      >
        <p
          className={`text-center mx-auto lg:text-5xl  font-extrabold px-8 text-white select-none mb-5`}
        >
          Nasa Astronomy Picture Of The Day
        </p>
      </section>
      <p
        className={`text-center mx-auto text-3xl  font-mono px-8 text-amber-200 select-none`}
      >
        {photoData.title}
      </p>
      <DateSelection />
      <PhotoInfo />
      <div className="flex flex-row w-[66%] items-center justify-center space-x-4 select-none ">
        <motion.button
          className="h-10 w-28 text-white border-white border-2 rounded-3xl flex flex-row justify-center items-center gap-2 font-mono text-xl "
          onClick={() =>
            setPrev(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))
          }
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 4px rgb(255,255,255",
            textShadow: "0px 0px 4px rgb(255,255,255",
          }}
        >
          <ArrowLeftIcon className={`h-5 text-white  `} />
          Prev
        </motion.button>
        <motion.button
          className="h-10 w-28 text-white border-white border-2 rounded-3xl flex flex-row justify-center items-center  gap-2 font-mono text-xl"
          onClick={() =>
            setNext(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))
          }
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 4px rgb(255,255,255)",
            textShadow: "0px 0px 4px rgb(255,255,255)",
          }}
        >
          Next
          <ArrowRightIcon
            className={`h-5 text-white 
    `}
          />
        </motion.button>
      </div>
      <p className="font-serif font-bold pb-4 select-none text-white p-2">
        {photoData.date}
      </p>
      <p
        className=" flex font-sans justify-center text-lg lg:px-52 px-10 xl:text-2xl 
        p-4 text-gray-300"
      >
        {photoData.explanation}
      </p>
    </motion.div>
  );
}
