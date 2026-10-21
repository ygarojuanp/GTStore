import Header from "./components/shared/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/shared/Footer";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<p>Product</p>} />
          <Route path="/login" element={<p>login</p>} />
          <Route path="/carrinho" element={<p>Carrinho</p>} />
        </Routes>
        <Footer />
      </main>
    </BrowserRouter>
  );
}

export default App;