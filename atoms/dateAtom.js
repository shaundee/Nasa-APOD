import { atom } from "recoil";

// export const selectedDateState = atom({
//     key:"selectedDateState",
//     default:new Date(),
// });
export const photoDataState = atom({
  key: "photoData",
  default: null,
});

export const selectedDateState = atom({
  key: "selectedDate",
  default: new Date(),
});
export const colorState = atom({
  key: "color",
  default: null,
});
