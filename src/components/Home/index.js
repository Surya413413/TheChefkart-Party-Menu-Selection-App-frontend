import { ClipLoader } from "react-spinners";
import { Component } from "react";
import { FaSearch } from 'react-icons/fa';
import Header from "../Header";
import DishCategoryTab from "../DishCategoryTab";
import DishItem from "../DishItem";
import { dishes } from "../../data/mockDishes"; // mock dishes
import "./index.css";

const diffStates = {
  inProgress: "LOADING",
  success: "SUCCESS",
  fail: "FAILURE",
};

class Home extends Component {
  state = {
    status: diffStates.success, // using mock data
    activeTabId:"🥗 STARTER",
    data: dishes,
    count: 0,
    searchText: "", //  search text
  };

  onChangeActiveTab = (id) => {
    this.setState({ activeTabId: id });
  };

  onSearchChange = (event) => {
    this.setState({ searchText: event.target.value });
  };

  renderLoader = () => (
    <div className="loader-container">
      <ClipLoader color="blue" size={50} />
    </div>
  );

  onIncrease = () => {
    this.setState((prev) => ({ count: prev.count + 1 }));
  };

  onDecrease = () => {
    const { count } = this.state;
    if (count === 0) {
      this.setState({ count: 0 });
    } else {
      this.setState((prev) => ({ count: prev.count - 1 }));
    }
  };

  renderSuccessView = () => {
    const { data, activeTabId, count, searchText } = this.state;
   
    // Get unique categories for tabs
    const categories = [...new Set(data.map((dish) => dish.mealType))];
    
    //  Global Search:
    let filteredDishes = [];
    if (searchText.trim() === "") {
      // show dishes by active tab only
      filteredDishes = data.filter((dish) => dish.mealType === activeTabId);
      
    } else {
      // show dishes across all categories
        
      filteredDishes = data.filter((dish) =>
        dish.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return (
      <>
        <Header count={count} />

       <div className="Party-Menu-Selection">
          <h1>🎉 Party Menu Selection</h1>
<p className="para-choose">Choose delicious dishes for your perfect party</p>
         </div>
        <div className="search-bar-container">
  <div className="search-input-wrapper">
    <FaSearch className="search-icon" />
    <input
      type="text"
      className="search-input"
      placeholder="Search dishes..."
      value={searchText}
      onChange={this.onSearchChange}
    />
  </div>
</div>

      
        {searchText.trim() === "" && (
          <div className="dish-item-category-div">
            <ul className="tabs-container">
              {categories.map((category) => (
                <DishCategoryTab
                  key={category}
                  isActiveTab={category === activeTabId}
                  menuData={{
                    menuCategoryId: category,
                    menuCategory: category,
                  }}
                  onChangeTabId={this.onChangeActiveTab}
                />
              ))}
            </ul>
          </div>
        )}

        {/* Dish Items */}
        <ul className="dish-items-containers">
          {filteredDishes.length > 0 ? (
            filteredDishes.map((dish) => (
              <DishItem
                count={count}
                dish={dish}
                key={dish.id}
                onIncreaseCount={this.onIncrease}
                onDecreaseCount={this.onDecrease}
              />
            ))
          ) : (
            <p className="no-results">No dishes found...</p>
          )}
        </ul>
      </>
    );
  };

  renderDiffViews = () => {
    const { status } = this.state;
    switch (status) {
      case diffStates.inProgress:
        return this.renderLoader();
      case diffStates.success:
        return this.renderSuccessView();
      case diffStates.fail:
        return <h1 className="failure-mesg">Failed To Load...</h1>;
      default:
        return null;
    }
  };

  render() {
    return(
      <>
      
          <div className="home-main-container">
   
      {this.renderDiffViews()}
      </div>
    </>
    )
  }
}

export default Home;




