import reducer, { setInputValue, SearchState } from '../../../redux/features/searchSlice';

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    inputValue: '',
  });
});

test('should setting a input value', () => {
  const previousState: SearchState = {
    inputValue: '',
  };

  expect(reducer(previousState, setInputValue('mockPerson'))).toEqual({ inputValue: 'mockPerson' });
});
