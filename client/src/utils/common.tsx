export const dateToString = (date: number) => {
  return new Date(date).toLocaleDateString();
};

export const numTasksToString = (num: number) => {
  if (num > 10 && num < 20)
    return `${num} задач`;

  const lastNum = num > 10 ? num % 10 : num;

  switch (lastNum) {
    case 1:
      return `${num} задача`;
    case 2:
    case 3:
    case 4:
      return `${num} задачи`;
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      return `${num} задач`;
    default:
      return `${num} задач`;
  }
};
