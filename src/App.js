
import { Counter } from './features/counter/Counter';

import HomePage from './pages/Home';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import CartPage from './pages/CartPage';
import CheckOutPage from './pages/CheckOutPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Navbar from './features/navbar/Navbar';



function App() {
  return (
    <div className="App">
   

 <BrowserRouter>
 <Navbar>

 <Routes>
    <Route path='/' element={<HomePage/>}/> 
    <Route path='/login' element={<LoginPage/>}/> 
    <Route path='/signup' element={<SignUpPage/>}/> 
    <Route path='/cart' element={<CartPage/>}/> 
    <Route path='/checkout' element={<CheckOutPage/>}/> 
    <Route path='/product-detail/:id' element={<ProductDetailPage/>}/> 
 

 



 </Routes>

 </Navbar>
 </BrowserRouter>

    </div>
  );
}

export default App;
