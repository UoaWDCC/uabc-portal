/**
 * @author Moeka Nakane <mnak534@aucklanduni.ac.nz>
 */

import { SessionCardStatus } from "./SessionCardStatusEnum";

export const getClassNames = (status: SessionCardStatus) => {
  let cardClassName = "relative px-8 py-5 ";
  let dayOfWeekClassName = "font-medium text-2xl ";
  let locationClassName = "font-normal text-lg ";
  let timeClassName = "font-normal text-lg pt-2 ";

  // Adjust the colors as needed
  switch (status) {
    case SessionCardStatus.SELECTED:
      cardClassName += "bg-blue-600 ";
      dayOfWeekClassName += "text-white ";
      locationClassName += "text-indigo-200 ";
      timeClassName += "text-indigo-200 ";
      break;
    case SessionCardStatus.DISABLED:
      cardClassName += "bg-gray-100 ";
      dayOfWeekClassName += "text-gray-300 ";
      locationClassName += "text-gray-300 ";
      timeClassName += "text-gray-300 ";
      break;
    case SessionCardStatus.UNAVAILABLE:
      cardClassName += "bg-orange-700 ";
      dayOfWeekClassName += "text-white ";
      locationClassName += "text-rose-200 ";
      timeClassName += "text-rose-200 ";
      break;
    default:
      cardClassName += "bg-gray-200 ";
      locationClassName += "text-gray-500 ";
      timeClassName += "text-gray-500 ";
      break;
  }

  return {
    cardClassName,
    dayOfWeekClassName,
    locationClassName,
    timeClassName,
  };
};