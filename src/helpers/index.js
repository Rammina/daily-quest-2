import _ from "lodash";
import React from "react";
import { format, endOfYesterday, isBefore } from "date-fns";
// Helper functions

export const getCurrentDate = () => {
  return format(new Date(), "yyyy-MM-dd");
};

export const getCurrentTime = () => {
  return format(new Date(), "hh:mmA");
};

export const toMilitaryTime = datetime => {
  return format(datetime, "HH:mm");
};

export const standardToMilitary = function standardToMilitary(time) {
  var PM = time.match("PM") ? true : false;
  var hour;
  var minute;

  time = time.split(":");

  if (PM) {
    hour = 12 + parseInt(time[0], 10);
    minute = time[1].replace("PM", "");
  } else {
    hour = time[0];
    minute = time[1].replace("AM", "");
  }

  return `${hour}:${minute}`;
};

export const autoGrow = function(element) {
  element.style.height = "5px";
  element.style.height = element.scrollHeight + 3.7813 + "px";
};

// This function didn't work
// export const dismissModalHandler = (modalsOpened, setStateCallback) => {
//   modalsOpened = _.mapValues(modalsOpened, () => false);

//   setStateCallback({
//     ...modalsOpened
//   });
// };
