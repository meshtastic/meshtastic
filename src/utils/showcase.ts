export const sortBy = <T>(array: T[], getter: (item: T) => unknown): T[] => {
  const sortedArray = [...array];
  sortedArray.sort((a, b) =>
    getter(a) > getter(b) ? 1 : getter(b) > getter(a) ? -1 : 0
  );
  return sortedArray;
};

export const difference = <T>(...arrays: T[][]): T[] => {
  return arrays.reduce((a, b) => a.filter((c) => !b.includes(c)));
};

export const toggleListItem = <T>(list: T[], item: T): T[] => {
  const itemIndex = list.indexOf(item);
  if (itemIndex === -1) {
    return list.concat(item);
  } else {
    const newList = [...list];
    newList.splice(itemIndex, 1);
    return newList;
  }
};
