import { searchIdStore } from '../../components/searchIdStore';

const arrMock = [
  { id: 1, isLike: true },
  { id: 2, isLike: false },
  { id: 3, isLike: true },
];

describe('searchIdStore', () => {
  it('should return false if likes array does not contain the given id', () => {
    const result = searchIdStore(arrMock, 4);
    expect(result).toBe(false);
  });

  it('should return true if likes array contains the given id and isLike is true', () => {
    const result = searchIdStore(arrMock, 1);
    expect(result).toBe(true);
  });

  it('should return false if likes array contains the given id and isLike is false', () => {
    const result = searchIdStore(arrMock, 2);
    expect(result).toBe(false);
  });
});
