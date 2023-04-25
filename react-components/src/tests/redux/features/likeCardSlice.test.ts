import reducer, { setLike, likeCardState } from '../../../redux/features/likeCardSlice';

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual({ likes: [] });
});

const mockLike = [{ id: 1, isLike: true }];

test('should adding a like card', () => {
  const previousState: likeCardState = {
    likes: [],
  };

  expect(reducer(previousState, setLike(mockLike))).toEqual({ likes: mockLike });
});
