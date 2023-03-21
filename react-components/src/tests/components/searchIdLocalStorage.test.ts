import { searchIdLocalStorage } from '../../components/searchIdLocalStorage';

describe('searchIdLocalStorage', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('should return false if likes array is empty', () => {
    const result = searchIdLocalStorage(1);
    expect(result).toBe(false);
  });

  it('should return false if likes array does not contain the given id', () => {
    const likes = [{ id: 2, isLike: true }];
    localStorage.setItem('likes', JSON.stringify(likes));

    const result = searchIdLocalStorage(1);
    expect(result).toBe(false);
  });

  it('should return true if likes array contains the given id and isLike is true', () => {
    const likes = [{ id: 1, isLike: true }];
    localStorage.setItem('likes', JSON.stringify(likes));

    const result = searchIdLocalStorage(1);
    expect(result).toBe(true);
  });

  it('should return false if likes array contains the given id and isLike is false', () => {
    const likes = [{ id: 1, isLike: false }];
    localStorage.setItem('likes', JSON.stringify(likes));

    const result = searchIdLocalStorage(1);
    expect(result).toBe(false);
  });
});
