import { getDate, getMonth, getYear, format } from "date-fns";

export const formatDate = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const dateFormated = `${day < 10 ? "0" + day : day}/${
    month < 10 ? "0" + month : month
  }/${year} ${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;

  return dateFormated;
};

export const getDateString = (date: Date): string => {
  const dateFormated = format(date, "DD/MM/yyyy");

  return dateFormated;
};

export const getTimeString = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const dateFormated = `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;

  return dateFormated;
};

export const setTime = (date: string, time: string): Date => {
  const dateFormated = date + " " + time;
  const dateTime = new Date(dateFormated);

  return dateTime;
};
