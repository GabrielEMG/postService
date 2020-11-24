const getDaysArray = (start, end) => {
  for (
    var arr = [], dt = new Date(start);
    dt <= end;
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt));
  }
  return arr;
};

const sameDay = (d1, d2) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month].join("-");
};

const devEstHelper = (arr) => {
  let sum = 0;
  arr.forEach((val) => (sum += Math.pow(val - avrgHelper(arr), 2)));
  return Math.sqrt(sum / arr.length);
};

const avrgHelper = (arr) => {
  return arr.length > 0 ? arr.reduce((acc, val) => acc + val) / arr.length : 0;
};

export { sameDay, getDaysArray, formatDate, devEstHelper, avrgHelper };
