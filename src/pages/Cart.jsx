import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import useCart from '../context/useCart'
import './Cart.css'

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart()
  //   const { isAuthenticated } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [purchaseCompleted, setPurchaseCompleted] = useState(false)

  // useEffect(() => {
  //   if (isAuthenticated && location.state?.completePurchase && items.length > 0) {
  //     setPurchaseCompleted(true)
  //     navigate('/carrinho', { replace: true })
  //   }
  // }, [isAuthenticated, items.length, location.state, navigate])

  // if (purchaseCompleted) {
  //   return (
  //     <section className="cart cart--success">
  //       <h1>Compra realizada com sucesso!</h1>
  //       <p>Obrigado pela sua compra. Em breve você receberá os detalhes do pedido.</p>
  //       <Link className="cart__continue" to="/produtos">Continuar comprando</Link>
  //     </section>
  //   )
  // }

  // if (items.length === 0) {
  //   return (
  //     <section className="cart cart--empty">
  //       <h1>Seu carrinho está vazio</h1>
  //       <p>Adicione seus produtos favoritos para vê-los aqui.</p>
  //       <Link className="cart__continue" to="/produtos">Explorar produtos</Link>
  //     </section>
  //   )
  // }

  return (
    <section className="cart">
      <div className="cart__header">
        <span className="cart__eyebrow">GT Store</span>
        <h1>Meu carrinho</h1>
      </div>

      <div className="cart__layout">
        <div className="cart__items">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-item__info">
                <span>{item.category}</span>
                <h2>{item.name}</h2>
                <strong>{currency.format(item.price)}</strong>
              </div>
              <div className="cart-item__actions">
                <label htmlFor={`quantity-${item.id}`}>Quantidade</label>
                <input
                  id={`quantity-${item.id}`}
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
                />
                <button type="button" onClick={() => removeItem(item.id)}>
                  <FontAwesomeIcon icon={faTrash} aria-hidden="true" />
                  Remover
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Resumo do pedido</h2>
          <div>
            <span>Subtotal</span>
            <strong>{currency.format(total)}</strong>
          </div>
          <div>
            <span>Frete</span>
            <strong>Grátis</strong>
          </div>
          <hr />
          <div className="cart-summary__total">
            <span>Total</span>
            <strong>{currency.format(total)}</strong>
          </div>
          <button
            className="cart-summary__checkout"
            type="button"
            onClick={() => {
              if (items.length === 0) {
                navigate('/produtos')
                return
              }

              setPurchaseCompleted(true)
            }}
          >
            Finalizar compra
          </button>
        </aside>
      </div>
    </section>
  )
}
