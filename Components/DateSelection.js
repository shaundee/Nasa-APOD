import { CalendarIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import { useRef } from "react";
import DatePicker from "react-datepicker";
import { useRecoilState } from "recoil";
import { selectedDateState } from "../atoms/dateAtom";

export const buttonVariants = {
  init: {
    opacity: 0,
    x: "-100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      mass: 0.4,
      damping: 8,
      stiffness: 70,
    },
  },
};
const DateSelection = () => {
  const datepickerRef = useRef(null);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);

  const handleDateIcon = () => {
    const datepickerElement = datepickerRef.current;
    datepickerElement.setFocus(true);
  };

  return (
    <div className="select-none  ">
      <DatePicker
        className={` h-0`}
        onChange={(date) => setSelectedDate(date)}
        maxDate={new Date()}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        todayButton="today"
        withPortal
        portalId="root-portal"
        minDate={new Date("1995 / 06 / 16")}
        ref={datepickerRef}
      />
      <motion.button
        className={`flex flex-row font-mono items-center text-white justify-center w-48 text-center 
          rounded-3xl border-2 p-1 mb-5 text-xl `}
        onClick={handleDateIcon}
        variants={buttonVariants}
        initial="init"
        animate="visible"
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 0px 4px rgb(255,255,255",
          textShadow: "0px 0px 4px rgb(255,255,255",
        }}
      >
        Calendar
        <CalendarIcon className="h-8 w-8  ml- text-white p-1.5 " />
      </motion.button>
    </div>
  );
};

export default DateSelection;
