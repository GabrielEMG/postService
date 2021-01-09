export const getDaysArray: Function = (start: Date, end: Date): Date[] => {
  for (
    var arr:Date[]  = [], dt: Date = new Date(start);
    dt <= end;
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt));
  }
  return arr;
};

export const sameDay: Function = (d1: Date, d2: Date): boolean => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export const formatDate: Function = (date: Date): string => {
  var d: Date = new Date(date),
    month: string = "" + (d.getMonth() + 1),
    day: string = "" + d.getDate()

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month].join("-");
};

export const devEstHelper: Function = (arr: number[]): number => {
  let sum: number = 0;
  arr.forEach((val: number): number => (sum += Math.pow(val - avrgHelper(arr), 2)));
  return arr.length > 0 ? Math.sqrt(sum / arr.length) : 0;
};

export const avrgHelper: Function = (arr: number[]): number => {
  return arr.length > 0 ? arr.reduce((acc, val) => acc + val) / arr.length : 0;
};

