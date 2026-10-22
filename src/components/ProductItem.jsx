import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import useCart from '../context/useCart'
import './ProductItem.css'

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export default function ProductItem({ product }) {
  const { addItem } = useCart()

  return (
    <article className="product-card">
      <img className="product-card__image" src={product.image} alt={product.name} />
      <div className="product-card__content">
        <span className="product-card__category">{product.category}</span>
        <h2>{product.name}</h2>
        <div className="product-card__footer">
          <strong>{currency.format(product.price)}</strong>
          <button
            type="button"
            aria-label={`Adicionar ${product.name} ao carrinho`}
            onClick={() => addItem(product)}
          >
            <FontAwesomeIcon icon={faCartPlus} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  )
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
}
