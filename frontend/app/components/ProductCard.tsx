import AddToCart from './AddToCart';
import style from './ProductCard.module.css';
const ProductCard = () => {
  return (
    <div className={style.cardContainer}>
      <h1>Product Name</h1>
      <AddToCart />
    </div>
  );
};

export default ProductCard;
