import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import {BrowserRouter as Router,Route,Routes,} from 'react-router-dom';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  },[dispatch, user])
  return (

    <Router><Routes>
    <Route exact path= '/' element={ <Home/>} />
    <Route exact path= '/login' element={ <LoginPage/> } />
    <Route exact path= '/signup' element={ <SignupPage/>} />
    <Route exact path= '/cart' element={<> <Protected> <CartPage/> </Protected> </>} />
    <Route exact path= '/checkout' element={<><Protected> <Checkout/> </Protected> </>} />
    <Route exact path= '/product-detail/:id' element={<> <Protected> <ProductDetailPage/> </Protected> </>} />
    <Route exact path= '/order-success/:id' element={<> <Protected> <OrderSuccessPage/> </Protected>  </>} />
    <Route exact path= '/orders' element={<> <Protected>  <UserOrdersPage/></Protected> </>} />
    <Route exact path= '/profile' element={<> <Protected> <UserProfilePage/> </Protected>  </>} />
    <Route exact path= '*' element={<> <PageNotFound/></>} />
    </Routes></Router>
  );
}

export default App;