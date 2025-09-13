import './index.css'

import {Link} from 'react-router-dom'


import {IoCartOutline} from 'react-icons/io5'
import CartContext from '../../context/CartContext'

const Header = () => {

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        const count = cartList.length
        console.log(count)
        return (
          <div className="header-container">
            <Link to="/" className="link">
              <h1 className="logo-heading">ChefKart Party Planner</h1>
            </Link>
            <div className="nav-items">
              <p className="my-order-txt">My Orders</p>
              <Link to="/cart" className="link">
                <div className="cart-card">
                  <button data-testid="cart" className='cart'>
                    <IoCartOutline className="cart-icon" />
                  </button>

                  <span className="cart-count">{count}</span>
                </div>
              </Link>
              
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Header