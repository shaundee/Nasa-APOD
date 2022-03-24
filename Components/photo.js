import React from "react";
import { useRecoilState } from "recoil";
import { photoDataState } from "../atoms/dateAtom";
import { motion } from "framer-motion";
import { buttonVariants } from "./DateSelection";

const PhotoInfo = () => {
  const [photoData] = useRecoilState(photoDataState);

  return (
    <motion.div variants={buttonVariants} initial="init" animate="visible">
      {photoData.media_type === "image" ? (
        <a
          className="flex mb-5  mx-4 rounded-lg "
          href={photoData.hdurl}
          target="blank "
        >
          <motion.img
            className="max-h-[60vh] min-w-[240px] cursor-pointer rounded-lg select-none border-4 border-opacity-60 border-white  "
            src={photoData.url}
            alt={photoData.title}
            onClick={() => <a href={photoData.hdurl}></a>}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 0px 8px rgb(255,255,255",
              textShadow: "0px 0px 8px rgb(255,255,255",
            }}
          />
        </a>
      ) : (
        <iframe
          className="h-[50vh] w-[90vw] md:max-w-3xl rounded-lg  mb-4 select-none border-4 border-opacity-60 border-white "
          src={photoData.url}
          title={photoData.title}
          frameBorder="0"
          allow="encrypted-media"
          allowFullScreen
        />
      )}
    </motion.div>
  );
};

export default PhotoInfo;
