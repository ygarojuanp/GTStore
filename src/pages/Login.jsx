import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Login.css'

const apiUrl = 'https://dummyjson.com/auth/login'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  // const { login, isAuthenticated } = useAuth()
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  // if (isAuthenticated) {
  //   return (
  //     <section className="login-page login-page--already-authenticated">
  //       <h1>Você já está conectado</h1>
  //       <p>Acesse seus produtos ou continue suas compras.</p>
  //       <Link className="login-page__button" to="/produtos">Ver produtos</Link>
  //     </section>
  //   )
  // }

  function handleChange(event) {
    const { name, value } = event.target
    setCredentials((currentCredentials) => ({
      ...currentCredentials,
      [name]: value,
    }))
    setError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: credentials.username.trim(),
          password: credentials.password,
          expiresInMins: 30,
        }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Usuário ou senha inválidos.')
      }

      // login({
      //   token: data.accessToken || data.token,
      //   user: data,
      // })
      navigate(location.state?.from || '/', {
        state: location.state?.checkout ? { completePurchase: true } : undefined,
      })
    } catch (requestError) {
      setError(requestError.message || 'Não foi possível realizar o login. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="login-page">
      <div className="login-card">
        <span className="login-card__eyebrow">GT Store</span>
        <h1>Entrar na sua conta</h1>
        <p>
          {location.state?.checkout
            ? 'Faça login para finalizar sua compra.'
            : 'Use seus dados para continuar comprando.'}
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Usuário</label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Senha</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
            required
          />

          {error && <p className="login-card__error" role="alert">{error}</p>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </section>
  )
}
