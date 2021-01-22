export const dateFormat: Function = (date: Date): string => {
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;
  const day: number = date.getDate();
  const hour: number = date.getHours();
  const minutes: number = date.getMinutes();
  return `${hour}:${minutes < 10 ? 0 : ""}${minutes} - ${day}/${
    month < 10 ? 0 : ""
  }${month}/${year}`;
};
