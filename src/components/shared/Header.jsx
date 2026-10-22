import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import useCart from '../../context/useCart'
import './Header.css'

export default function Header() {
  const { itemCount } = useCart()

  return (
    <header className="site-header">
      <div className="site-header__content">
        <Link className="site-header__logo" to="/" aria-label="GT Store - início">
          GT <span>Store</span>
        </Link>

        <nav className="site-header__nav" aria-label="Ações da conta">
          <Link
            className="site-header__link"
            to="/carrinho"
            aria-label="Carrinho de compras"
          >
            <FontAwesomeIcon icon={faCartShopping} aria-hidden="true" />
            <span>Carrinho</span>
            {itemCount > 0 && <b>{itemCount}</b>}
          </Link>
        </nav>
      </div>
    </header>
  )
}