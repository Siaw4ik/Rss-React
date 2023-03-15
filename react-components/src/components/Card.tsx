import React, { Component } from 'react';
import { changedateProducts } from 'date/date';
import { Product } from 'date/types_date';
/* import likeImage from '../assets/heart-svgrepo-com.svg'; */

interface ProductProps {
  product: Product;
}

interface ShowState {
  isActive: boolean;
}

interface IdProps {
  id: number;
}
interface LikeState {
  isLike: boolean;
}

class Card extends Component<ProductProps, ShowState> {
  constructor(props: ProductProps) {
    super(props);
    this.state = { isActive: false };
    this.handleClickShow = this.handleClickShow.bind(this);
  }

  handleClickShow() {
    this.setState({ isActive: !this.state.isActive });
  }

  render() {
    const product = this.props.product;
    const isActive = this.state.isActive;
    const toggleClass = isActive ? ' active' : '';
    return (
      <div className="card">
        <div className="card-description">
          <img className="image-product" src={product.image} alt="image product" />
          <p className="price-product">$ {product.price}</p>
          <div className="total-description-product">
            <h4 className="title-product">{product.title}</h4>
            <div className="rating-product">
              <p className={`rate-product${toggleClass}`}>Rating: {product.rating.rate}</p>
              <p className={`count-product${toggleClass}`}>Count: {product.rating.count}</p>
            </div>
          </div>
        </div>
        <div className="wrapper-like">
          <div className="show-details" onClick={this.handleClickShow}>
            {isActive ? 'Hide details' : 'Show details'}
          </div>
          <ImageLike id={product.id} />
        </div>
      </div>
    );
  }
}

function searchIdLocalStorage(id: number) {
  const likes: Array<{ id: number; isLike: boolean }> = JSON.parse(
    localStorage.getItem('likes') || '[]'
  );
  const index = likes.findIndex((elem) => elem.id === id);

  return index !== -1 ? likes[index].isLike : false;
}

class ImageLike extends Component<IdProps, LikeState> {
  constructor(props: IdProps) {
    super(props);
    /* const likes: Array<{ id: number; isLike: boolean }> = JSON.parse(
      localStorage.getItem('likes') || '[]'
    );
    const index = likes.findIndex((elem) => elem.id === props.id);
    this.state = {
      isLike: index !== -1 ? likes[index].isLike : false,
    }; */

    this.state = {
      isLike: searchIdLocalStorage(this.props.id),
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const isLike = !this.state.isLike;
    this.setState({ isLike }, () => {
      const id = this.props.id;
      const likes: Array<{ id: number; isLike: boolean }> = JSON.parse(
        localStorage.getItem('likes') || '[]'
      );
      const index = likes.findIndex((elem) => elem.id === id);
      if (index !== -1) {
        likes[index].isLike = isLike;
      } else {
        likes.push({ id: id, isLike: isLike });
      }
      localStorage.setItem('likes', JSON.stringify(likes));
    });
  }

  render() {
    const toggleClass = this.state.isLike ? ' active' : '';
    return (
      <div className="like-image">
        <svg
          fill="#73818c"
          width="32px"
          height="32px"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          className={`likeHeart${toggleClass}`}
          onClick={this.handleClick}
        >
          <path d="M26.996 12.898c-.064-2.207-1.084-4.021-2.527-5.13-1.856-1.428-4.415-1.69-6.542-.132-.702.516-1.359 1.23-1.927 2.168-.568-.938-1.224-1.652-1.927-2.167-2.127-1.559-4.685-1.297-6.542.132-1.444 1.109-2.463 2.923-2.527 5.13-.035 1.172.145 2.48.788 3.803 1.01 2.077 5.755 6.695 10.171 10.683l.035.038.002-.002.002.002.036-.038c4.415-3.987 9.159-8.605 10.17-10.683.644-1.323.822-2.632.788-3.804z" />
        </svg>
      </div>
    );
  }
}

export class CardList extends Component {
  render() {
    return (
      <div className="container_cards">
        {changedateProducts.map((dateproduct) => (
          <Card product={dateproduct} key={dateproduct.id} />
        ))}
      </div>
    );
  }
}
