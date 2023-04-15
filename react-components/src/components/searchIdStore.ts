export function searchIdStore(arr: { id: number; isLike: boolean }[], id: number): boolean {
  const index = arr.findIndex((elem) => elem.id === id);
  return index !== -1 ? arr[index].isLike : false;
}
