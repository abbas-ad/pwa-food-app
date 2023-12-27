import axios from "../../foodAxios";
import * as actionTypes from "./actionTypes";

export const showErrorSuccess = (error) => {
  return {
    type: actionTypes.SHOW_ERROR_SUCCESS,
    error,
  };
}; 

const addFavoriteItemStart = () => {
  return {
    type: actionTypes.ADD_FAVORITE_ITEM_START,
  };
};
const addFavoriteItemSuccess = (itemId,status,message) => {
  return {
    type: actionTypes.ADD_FAVORITE_ITEM_SUCCESS,
    itemId,status,message
  };
};
const addFavoriteItemFail = () => {
  return {
    type: actionTypes.ADD_FAVORITE_ITEM_FAIL,
  };
};


const addFavoriteRestaurantStart = () => {
    return {
      type: actionTypes.ADD_FAVORITE_RESTAURANT_START,
    };
  };
  const addFavoriteRestaurantSuccess = (slug,status,message) => {
    return {
      type: actionTypes.ADD_FAVORITE_RESTAURANT_SUCCESS,
      slug,status,message
    };
  };
  const addFavoriteRestaurantFail = () => {
    return {
      type: actionTypes.ADD_FAVORITE_RESTAURANT_FAIL,
    };
  };

  const favoriteFecthStart = () => {
    return {
      type: actionTypes.FETCH_FAVORITE_START,
    };
  };
  const favoriteFecthSuccess = (items,restaurants) => {
    return {
      type: actionTypes.FETCH_FAVORITE_SUCCESS,
      items,
      restaurants
    };
  };
  const favoriteFecthFail = () => {
    return {
      type: actionTypes.FETCH_FAVORITE_FAIL,
    };
  };


  const updateRestaurantFavoriteSuccess = (slugs) => {
    return {
      type: actionTypes.UPDATE_RESTAURANT_FAVORITE_STATUS_SUCCESS,
      slugs
    };
  };


  

  const updateItemFavoriteSuccess = (itemIds) => {
    return {
      type: actionTypes.UPDATE_ITEM_FAVORITE_STATUS_SUCCESS,
      itemIds
    };
  };

  //------------------------------------
  
export const addItemFavorite = (token,itemIds) => {
    return (dispatch) => {
      dispatch(addFavoriteItemStart())
      dispatch(updateItemFavoriteSuccess(itemIds));
      const requests = itemIds.map(id=>axios.post("/user/saveFavoriteItem",{item_id: id}, {
        headers: { authorization: "Bearer " + token },
      }));
        Promise.all([...requests])
        .then((response) => {
            const res = response.filter(r => r.data.status !== 'success');
            if(res.length === 0){
              dispatch(addFavoriteItemSuccess(itemIds[itemIds.length - 1],
                response[response.length - 1].data.status,response[response.length - 1].data.message));
            }else{
              dispatch(addFavoriteItemFail());
              dispatch(showErrorSuccess(response.data.message));
            } 
        })
        .catch((err) => {
          dispatch(addFavoriteItemFail());
        });
    }
};

export const addRestaurantToFavorite = (token,restaurantSlugs) => {
    return (dispatch) => {
      dispatch(addFavoriteRestaurantStart())
      dispatch(updateRestaurantFavoriteSuccess(restaurantSlugs));
      const requests = restaurantSlugs.map(slug=>axios.post("/user/saveFavoriteRestaurant",{restaurant_slug: slug}, {
        headers: { authorization: "Bearer " + token },
      }));

      Promise.all([...requests])
        .then((response) => {
          const res = response.filter(r => r.data.status !== 'success');
          if(res.length === 0){
            dispatch(addFavoriteRestaurantSuccess(restaurantSlugs[restaurantSlugs.length - 1],
              response[response.length - 1].data.status,response[response.length - 1].data.message))
          }else{
              dispatch(addFavoriteRestaurantFail());
              dispatch(showErrorSuccess(response[0].data.message));
            }  
        })
        .catch((err) => {
          dispatch(addFavoriteRestaurantFail());
        });
    }
};


export const fetchFavorites = (token) => {
    return (dispatch) => {
        axios
        .get("/user/getFavorites",{
          headers: { authorization: "Bearer " + token },
        })
        .then((response) => {
            if(response.data.status === 'success'){
              dispatch(favoriteFecthSuccess(response.data.favorite_items,response.data.favorite_restaurants))
            }else{
              dispatch(favoriteFecthFail());
              dispatch(showErrorSuccess(response.data.message));
            }   
        })
        .catch((err) => {
          dispatch(favoriteFecthFail());
          
        });
    }
};


export const resetFavorite = () => {
    return (dispatch) => {
        dispatch(addFavoriteItemSuccess('','',''))
        dispatch(addFavoriteRestaurantSuccess('','',''))
    }
};