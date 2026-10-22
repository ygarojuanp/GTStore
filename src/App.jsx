import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/shared/Header"
import Footer from "./components/shared/Footer"
import CartProvider from "./context/CartProvider"
import Home from "./pages/Home"
import ProductList from "./pages/ProductList"
import Cart from "./pages/Cart"

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<ProductList />} />
            <Route path="/login" element={<p>login</p>} />
            <Route path="/carrinho" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
