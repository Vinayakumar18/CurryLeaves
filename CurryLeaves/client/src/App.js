import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignUp } from './screens/SignUp'
import { Login } from './screens/Login';
import { Home } from './screens/Home';
import { Cart } from './screens/Cart';
import { CartProvider } from './state_management/ContextReducer';
import { MyOrders } from './screens/MyOrders';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/' element={<Login />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/myorders' element={<MyOrders/>}/>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
