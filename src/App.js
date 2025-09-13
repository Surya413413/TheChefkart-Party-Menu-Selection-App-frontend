import {BrowserRouter, Routes, Route} from 'react-router-dom'

import {Component} from 'react'

import './App.css'

import Home from './components/Home'
import Cart from './components/Cart'



import CartContext from './context/CartContext'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filtredData = cartList.filter(each => each.id !== id)
    this.setState({cartList: filtredData})
  }

  addCartItem = item => {
    // console.log(item)
    this.setState(prev => ({cartList: [...prev.cartList, item]}))
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(each => {
      if (each.id === id) {
        const newQty = each.quantity + 1
        return {...each, quantity: newQty}
      }
      return each
    })
    this.setState({cartList: updatedCartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(each => {
      if (each.id === id) {
        const newQty = each.quantity - 1
        return {...each, quantity: newQty}
      }
      return each
    })
    this.setState({cartList: updatedCartList})
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeAllCartItems: this.removeAllCartItems,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/cart" element={<Cart/>} />
          </Routes>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App