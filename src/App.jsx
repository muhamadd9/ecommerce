import './App.css';
import { useContext, useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Categories from './Components/Categories/Categories'
import Layout from './Components/Layout/Layout'
import NotFound from './Components/NotFound/NotFound';
import { TokenContext } from './Context/Token';
import TokenContextProvider from './Context/Token';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from "react-query/devtools"
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartProvider from './Context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckOut from './Components/CheckOut/CheckOut';
import AllOrders from './Components/AllOrders/AllOrders';
import SubCategories from './Components/SubCategories/SubCategories';

function App() {
  let {token,setToken} = useContext(TokenContext)
  let routes = createBrowserRouter([
    { path: '/', element: <Layout />, children: [
      {index:true , element:<ProtectedRoutes> <Home/> </ProtectedRoutes>},
      {path:'Products' , element:   <ProtectedRoutes> <Products/>  </ProtectedRoutes> },
      {path:'/checkout' , element:   <ProtectedRoutes> <CheckOut/> </ProtectedRoutes> },
      {path:'/allorders' , element:   <ProtectedRoutes> <AllOrders/> </ProtectedRoutes> },
      {path:'Cart' , element:   <ProtectedRoutes> <Cart />  </ProtectedRoutes> },
      {path:'Categories' , element:   <ProtectedRoutes> <Categories/>  </ProtectedRoutes> },
      {path:'subcategories' , element:   <ProtectedRoutes> <SubCategories/>  </ProtectedRoutes> },
      {path:'Brands' , element:   <ProtectedRoutes> <Brands/>  </ProtectedRoutes> },
      {path:'Cart' , element:   <ProtectedRoutes> <Cart/>  </ProtectedRoutes> },
      {path:'product-details/:id' , element:   <ProtectedRoutes> <ProductDetails/>  </ProtectedRoutes> },
      {path:'Login' , element:   <Login/> },
      {path:'Register' , element:   <Register/> },
      {path:'*' , element:  <NotFound/> },
    ] }
  ])

  useEffect(()=>{
    if(localStorage.getItem("userToken")!== null){
      setToken(localStorage.getItem("userToken"))
    }
  },[setToken])

    const query =new QueryClient();
  return (
    <CartProvider>
      <QueryClientProvider client={query}>
      <RouterProvider router={routes}></RouterProvider>
      <ToastContainer />
    </QueryClientProvider>
    </CartProvider>
  )
}

export default App;
