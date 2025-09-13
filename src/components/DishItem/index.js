import "./index.css";
import { Component } from "react";
import CartContext from "../../context/CartContext";


class DishItem extends Component {
  state = { quantity: 0 ,showPopup: false,};

   togglePopup = () => {
    this.setState((prevState) => ({
      showPopup: !prevState.showPopup,
    }));
  };

  onClickIncrease = () => {
    this.setState((prev) => ({ quantity: prev.quantity + 1 }));
  };


  onClickDecrease = () => {
    this.setState((prev) => ({
      quantity: prev.quantity > 0 ? prev.quantity - 1 : 0,
    }));
  };

  renderDisItems = () => (
    <CartContext.Consumer>
      {(value) => {
        const { quantity,showPopup} = this.state;
        const { dish } = this.props;

        const {
          id,
          name,
          image,
          description,
          price,
          calories,
          availability,
          process
        
          
        } = dish;

        const { cartList, addCartItem, incrementCartItemQuantity } = value;
        const checkItemPresences = cartList.find((arr) => arr.id === id);

        const onAddNewItemToCart = () => {
          if (checkItemPresences !== undefined) {
            incrementCartItemQuantity(id);
          } else {
            addCartItem({ ...dish, quantity });
          }
        };

        return (
          <li className="dish-item-card">
            <div className="circle-content-card">
              <div className="content-div">
                <h1 className="name">{name}</h1>
                <p className="money"> ${price}</p>
                <p className="description">{description}</p>
             
               

      <div>
        {/* Button */}
        <button className="ingredients-btn" onClick={this.togglePopup}>
          View Ingredients
        </button>

        {/* Popup */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-box">
              <h3>Ingredients for {dish.name}</h3>
              {/* <h4>{process}</h4> */}
              <ul>
                {dish.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.name} - {ingredient.quantity}
                  </li>
                ))}
              </ul>
              <h4>Cooking process :- {process}</h4>
              <button className="close-btn" onClick={this.togglePopup}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>

                {availability ? (
                  <div className="qunatity-control-card">
                    <button
                      type="button"
                      className="control"
                      onClick={this.onClickDecrease}
                    >
                      -
                    </button>
                    <p className="qunatity">{quantity}</p>
                    <button
                      type="button"
                      className="control"
                      onClick={this.onClickIncrease}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <p className="not-availble">Not available</p>
                )}

                {availability && quantity >= 1 && (
                  <button
                    type="button"
                    onClick={onAddNewItemToCart}
                    className="add-to-cart"
                  >
                    ADD TO CART
                  </button>
                )}
              </div>
            </div>
            <p className="calories-num calories-num-sm">
              {calories} Calories
            </p>
            <div className="cal-img-card">
              <p className="calories-num calories-num-lg">
                {calories} Calories
              </p>
              <img className="dish-img" alt={name} src={image} />
              

               
            </div>
           
          </li>
        );
      }}
    </CartContext.Consumer>
  );

  render() {
    return this.renderDisItems();
  }
}

export default DishItem;






// import './index.css'

// import {Component} from 'react'

// import CartContext from '../../context/CartContext'

// class DishItem extends Component {
//   state = {quantity: 0}

//   onClickIncrease = () => {
//     this.setState(prev => ({quantity: prev.quantity + 1}))
//   }

//   onClickDecrease = () => {
//     const {quantity} = this.state
//     if (quantity > 1) {
//       this.setState(prev => ({quantity: prev.quantity - 1}))
//     } else {
//       this.setState({quantity: 0})
//     }
//   }

//   renderDisItems = () => (
//     <CartContext.Consumer>
//       {value => {
//         const {quantity} = this.state

//         const {dish} = this.props
//         // console.log(dish)
//         const {
//           dishId,
//           dishName,
//           dishImage,
//           dishCalories,
//           dishAvailability,
//           dishCurrency,
//           dishDescription,
//           dishPrice,
//           addonCat,
//         } = dish
//         const {cartList, addCartItem, incrementCartItemQuantity} = value
//         const checkItemPresences = cartList.find(arr => arr.dishId === dishId)
//         const onAddNewItemToCart = () => {
//           if (checkItemPresences !== undefined) {
//             incrementCartItemQuantity(dishId)
//           } else {
//             addCartItem({...dish, quantity})
//           }
//         }
//         return (
//           <li className="dish-item-card">
//             <div className="circle-content-card">
//               <div
//                 className={`box  ${dishPrice > 10 ? 'high-rate-props' : ''}`}
//               >
//                 <p
//                   className={`circle ${
//                     dishPrice > 10 ? 'high-rate-circle' : ''
//                   }`}
//                 />
//               </div>
//               <div className="content-div">
//                 <h1 className="name">{dishName}</h1>
//                 <p className="money">{`${dishCurrency} ${dishPrice}`}</p>
//                 <p className="description">{dishDescription}</p>
//                 {dishAvailability ? (
//                   <div className="qunatity-control-card">
//                     <button
//                       type="button"
//                       className="control"
//                       onClick={this.onClickDecrease}
//                     >
//                       -
//                     </button>
//                     <p className="qunatity">{quantity}</p>
//                     <button
//                       type="button"
//                       className="control"
//                       onClick={this.onClickIncrease}
//                     >
//                       +
//                     </button>
//                   </div>
//                 ) : (
//                   <p className="not-availble">Not available</p>
//                 )}

//                 {addonCat.length ? (
//                   <p className="customization-text">Customizations available</p>
//                 ) : (
//                   ''
//                 )}
//                   {dishAvailability && quantity >= 1 && (
//                   <button
//                     type="button"
//                     onClick={onAddNewItemToCart}
//                     className="add-to-cart"
//                   >
//                     ADD TO CART
//                   </button>
//                 )}
//               </div>
//             </div>
//             <p className="calories-num calories-num-sm">{`${dishCalories} Calories`}</p>
//             <div className="cal-img-card">
//               <p className="calories-num calories-num-lg">{`${dishCalories} Calories`}</p>
//               <img className="dish-img" alt={dishName} src={dishImage} />
//             </div>
//           </li>
//         )
//       }}
//     </CartContext.Consumer>
//   )

//   render() {
//     return this.renderDisItems()
//   }
// }

// export default DishItem