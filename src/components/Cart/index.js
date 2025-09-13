import './index.css'

import CartContext from '../../context/CartContext'

import EmptyCartView from '../EmptyCart'

import Header from '../Header'

import CartListView from '../CartListView'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const removeAllItems = () => {
        removeAllCartItems()
      }
      return (
        <div className="cart-container">
          <Header />
          <hr className="h-line" />
          <div className="content-cart">
            {cartList.length < 1 ? (
              <EmptyCartView />
            ) : (
              <div className="cart-elements">
                <h1 className="my-cart">My Cart</h1>
                <button
                  type="button"
                  onClick={removeAllItems}
                  className="remove-btn"
                >
                  Remove All
                </button>
                <CartListView />
              </div>
            )}
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Cart