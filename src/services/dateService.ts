import moment from "moment";

export function getDayName(str: string) {
  return moment(str).format("dddd");
}

export function getTime(str: string) {
  return moment(str).format("hh:mm A");
}
