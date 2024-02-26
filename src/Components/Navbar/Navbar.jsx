import React, { useContext, useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/freshcart-logo.svg'
import { TokenContext } from '../../Context/Token';
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {
  let {token,setToken}=useContext(TokenContext)
  let {numOfItems,getCart} =useContext(CartContext);
  console.log(token);
  let Navigate = useNavigate()

  async function setNumOfCarts(){
    await getCart();
  }
  useEffect(()=>{
    setNumOfCarts();
  })
  function logOut(){
    localStorage.removeItem("userToken");
    setToken(null);
    Navigate("/login")
  }


  const [scrolledDown, setScrolledDown] = useState(false);

  // Function to handle scrolling
  const handleScroll = () => {
    // Check if the page has scrolled down by at least one pixel
    if (window.scrollY > 0) {
      setScrolledDown(true);
    } else {
      setScrolledDown(false);
    }
  }

  // Add scroll event listener when the component mounts
  useEffect(() => {
    const handleScroll = () => {
      // Check if the page has scrolled down by at least one pixel
      if (window.scrollY > 0) {
        setScrolledDown(true);
      } else {
        setScrolledDown(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
  return <>
    <nav className={`navbar navbar-dark ${styles.navbarDark} text-white bg-black  navbar-expand-lg  fixed-top  ${scrolledDown ? styles.pad2: styles.pad3 }`}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="fresh cart logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon "></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {token? <ul className=" navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${styles.navLink}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className ={`nav-link ${styles.navLink}`} to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${styles.navLink}`} to="/categories">Categories</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${styles.navLink}`} to="/brands">Brands</Link>
            </li>
            <li className="nav-item  position-relative">
              <Link className={`nav-link ${styles.navLink}`} to="/Cart">Cart 
              <span className="position-absolute mx-1 top-25 start-100 translate-middle badge rounded-pill bg-danger">{numOfItems}<span className="visually-hidden">unread messages</span>
              </span> </Link>
            </li>

          </ul>:null}
          
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              <i className='fab mx-2 fa-facebook'></i>
              <i className='fab mx-2 fa-twitter'></i>
              <i className='fab mx-2 fa-instagram'></i>
              <i className='fab mx-2 fa-youtube'></i>
              <i className='fab mx-2 fa-tiktok'></i>
            </li>
            
            {token? <li className="nav-item">
              <button className={`nav-link ${styles.navLink}`} onClick={logOut} >Logout</button>
            </li>:
            <>
            <li className="nav-item">
              <Link className={`nav-link ${styles.navLink}`} to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${styles.navLink}`} to="/register">Register</Link>
            </li>
            </>
            }
            
         

          </ul>

        </div>
      </div>
    </nav>
  </>
}
