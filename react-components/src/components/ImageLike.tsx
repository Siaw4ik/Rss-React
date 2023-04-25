import React, { useEffect, useState } from 'react';
import { IdProps } from '../date/types_date';
import { searchIdStore } from './searchIdStore';
import { useDispatch, useSelector } from 'react-redux';
import { setLike } from '../redux/features/likeCardSlice';
import { RootState } from '../redux/store';

export function ImageLike(props: IdProps) {
  const dispatch = useDispatch();
  const likes = useSelector((state: RootState) => state.likes.likes);
  const [isLike, setIsLike] = useState(searchIdStore(likes, props.id));

  useEffect(() => {
    const id = props.id;
    const index = likes.findIndex((elem) => elem.id === id);
    let newLikes: { id: number; isLike: boolean }[] = [];
    if (index !== -1) {
      newLikes = [...likes.slice(0, index), { id: id, isLike: isLike }, ...likes.slice(index + 1)];
    } else {
      newLikes = [...likes, { id: id, isLike: isLike }];
    }
    if (isLike !== searchIdStore(likes, props.id)) {
      dispatch(setLike(newLikes));
    }
  }, [dispatch, isLike, likes, props.id]);

  const handleClick = () => {
    setIsLike(!isLike);
  };

  const toggleClass = isLike ? ' active' : '';
  return (
    <div className="like-image">
      <svg
        data-testid="like-image"
        fill="#73818c"
        width="32px"
        height="32px"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        className={`likeHeart${toggleClass}`}
        onClick={handleClick}
      >
        <path d="M26.996 12.898c-.064-2.207-1.084-4.021-2.527-5.13-1.856-1.428-4.415-1.69-6.542-.132-.702.516-1.359 1.23-1.927 2.168-.568-.938-1.224-1.652-1.927-2.167-2.127-1.559-4.685-1.297-6.542.132-1.444 1.109-2.463 2.923-2.527 5.13-.035 1.172.145 2.48.788 3.803 1.01 2.077 5.755 6.695 10.171 10.683l.035.038.002-.002.002.002.036-.038c4.415-3.987 9.159-8.605 10.17-10.683.644-1.323.822-2.632.788-3.804z" />
      </svg>
    </div>
  );
}
