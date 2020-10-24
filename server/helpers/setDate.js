module.exports = (date, days) => {
  const result = new Date(Number(date));
  result.setDate(date.getDate() - days);
  return result;
};
