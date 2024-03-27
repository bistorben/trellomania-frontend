// reorder function for arrays
const reorderArray = (list, itemIndex, destinationIndex) => {
  const result = [...list];
  const [remove] = result.splice(itemIndex, 1);
  result.splice(destinationIndex, 0, remove);
  return result;
};

const reorderCardsArray = (list, itemIndex, destinationIndex) => {
  const result = [...list];
  const [remove] = result.splice(itemIndex, 1);

  result.splice(destinationIndex, 0, remove);
  return result;
};

export { reorderArray };
