export function searchIdLocalStorage(id: number): boolean {
  const likes: Array<{ id: number; isLike: boolean }> = JSON.parse(
    localStorage.getItem('likes') || '[]'
  );
  const index = likes.findIndex((elem) => elem.id === id);

  return index !== -1 ? likes[index].isLike : false;
}

export function getInputValueFormLocalStorage() {
  const valueFromLocalStorage = localStorage.getItem('searchInput');
  if (valueFromLocalStorage) {
    return JSON.parse(valueFromLocalStorage);
  }
  return '';
}
