import * as actionTypes from "../actions/actionTypes";
import { updateObject, showAlert } from "../../shared/utility";

const initialState = {
    lastChangedItem: '',
    favoriteItemStatus: '',
    favoriteItemStatusMessage: '',
    lastChangedSlug: '',
    favoriteRestaurantStatus: '',
    favoriteRestaurantStatusMessage: '',
    favoriteItems: [],
    favoriteRestaurants: [],
    fetchLoading: false,
    changeLoading: false
};


const addFavoriteItemStart = (state, action) => {
    return updateObject(state, { changeLoading: true });
  };
  
  const addFavoriteItemSuccess = (state, action) => {
    return updateObject(state, {
        lastChangedItem: action.itemId,
        favoriteItemStatus: action.status,
        favoriteItemStatusMessage: action.message,
        changeLoading: false
    });
  };
  
  const addFavoriteItemFail = (state, action) => {
    return updateObject(state, {
      changeLoading: false,
    });
  };

  
const addFavoriteRestaurantStart = (state, action) => {
    return updateObject(state, { changeLoading: true });
  };
  
  const addFavoriteRestaurantSuccess = (state, action) => {
    return updateObject(state, {
        lastChangedSlug: action.slug,
        favoriteRestaurantStatus: action.status,
        favoriteRestaurantStatusMessage: action.message,
      changeLoading: false,

    });
  };
  
  const addFavoriteRestaurantFail = (state, action) => {
    return updateObject(state, {
      changeLoading: false,
    });
  };


    
const fetchFavoriteStart = (state, action) => {
    return updateObject(state, { fetchLoading: true });
  };
  
  const fetchFavoriteSuccess = (state, action) => {
    return updateObject(state, {
        favoriteItems: action.items,
        favoriteRestaurants: action.restaurants,
        fetchLoading: false
    });
  };
  
  const fetchFavoriteFail = (state, action) => {
    return updateObject(state, {
        fetchLoading: false

    });
  };

  const updateItemFavoriteStatusSuccess = (state, action) => {
    let items = [...state.favoriteItems];
    action.itemIds.map(itemId=>{
      if(items.find(item=> +item.item_id === +itemId)){
        items = [...items.filter(item=> +item.item_id !== +itemId)]
      }else{
        items = [...items,{id: items.length+1,item_id: itemId}]
      }
    })
    return updateObject(state, {
      favoriteItems: [...items]
    });
  };



  const updateRestaurantFavoriteStatusSuccess = (state, action) => {
    let restaurants = [...state.favoriteRestaurants];
    action.slugs.map(s=>{
      if(restaurants.find(r=> r.restaurant_slug === s)){
        restaurants = [...restaurants.filter(r=> r.restaurant_slug !== s)]
      }else{
        restaurants = [...restaurants,{id: restaurants.length+1,restaurant_slug: s}]
      }
    })
    return updateObject(state, {
      favoriteRestaurants: [...restaurants]
    });
  };

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.ADD_FAVORITE_ITEM_START:
          return addFavoriteItemStart(state, action);
      case actionTypes.ADD_FAVORITE_ITEM_SUCCESS:
        return addFavoriteItemSuccess(state, action);
        case actionTypes.ADD_FAVORITE_ITEM_FAIL:
          return addFavoriteItemFail(state, action);

          case actionTypes.ADD_FAVORITE_RESTAURANT_START:
            return addFavoriteRestaurantStart(state, action);
        case actionTypes.ADD_FAVORITE_RESTAURANT_SUCCESS:
          return addFavoriteRestaurantSuccess(state, action);
          case actionTypes.ADD_FAVORITE_RESTAURANT_FAIL:
            return addFavoriteRestaurantFail(state, action);


            
          case actionTypes.FETCH_FAVORITE_START:
            return fetchFavoriteStart(state, action);
        case actionTypes.FETCH_FAVORITE_SUCCESS:
          return fetchFavoriteSuccess(state, action);
          case actionTypes.FETCH_FAVORITE_FAIL:
            return fetchFavoriteFail(state, action);

            case actionTypes.UPDATE_RESTAURANT_FAVORITE_STATUS_SUCCESS:
              return updateRestaurantFavoriteStatusSuccess(state, action);

              
            case actionTypes.UPDATE_ITEM_FAVORITE_STATUS_SUCCESS:
              return updateItemFavoriteStatusSuccess(state, action);
      default:
        return state;
    }
  };
  
  export default reducer;