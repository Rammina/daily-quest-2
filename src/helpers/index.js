import warningImg from "../images/warning.png";

import _ from "lodash";
import React from "react";
import { format, endOfYesterday, isBefore } from "date-fns";

// Helper functions

// date-time functions
export const getCurrentDate = () => {
  return format(new Date(), "yyyy-MM-dd");
};

export const getCurrentTime = () => {
  return format(new Date(), "hh:mma");
};

export const convertToMDY = date => {
  return format(new Date(date), "MM/dd/yyyy");
};

export const toMilitaryTime = datetime => {
  return format(datetime, "HH:mm");
};

export const toStandardTime = time => {
  console.log(time);
  return format(new Date(`${getCurrentDate()}T${time}`), "hh:mma");
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

// styling functions
export const autoGrow = function(element) {
  element.style.height = "5px";
  element.style.height = element.scrollHeight + 3.7813 + "px";
};

export const autoGrowValue = function(element) {
  if (!element) {
    return "0px";
  }
  return element.offsetHeight + 3.7813 + "px";
};

// error display functions
export const renderError = (meta, sectionName) => {
  const { error, touched } = meta;
  // Creates an error message if there is an error in the input field is touched
  if (error && touched) {
    return (
      <div className={`${sectionName} error`}>
        <img className="error-image" src={warningImg} alt="warning sign"></img>
        {error}
      </div>
    );
  }
  return null;
};

export const getErrorClass = ({ error, touched }) => {
  return error && touched ? "error" : null;
};

// This is used for helping sort object based on property names' values
// key refers to The name of the property, order can either be asc or desc
export const compareValues = (key, order = "asc") => {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
};
// // usage: array is sorted by band, in ascending order by default:
// // //singers.sort(compareValues('band'));

// This function didn't work
// export const dismissModalHandler = (modalsOpened, setStateCallback) => {
//   modalsOpened = _.mapValues(modalsOpened, () => false);

//   setStateCallback({
//     ...modalsOpened
//   });
// };
