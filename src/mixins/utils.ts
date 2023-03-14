export const findIndexById = (object: any[], id: number): number => {
  return object.findIndex((element) => element.id === id);
};
