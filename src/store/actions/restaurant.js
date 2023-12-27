import axios from "../../foodAxios";
import * as actionTypes from "./actionTypes";

export const showErrorSuccess = (error) => {
  return {
    type: actionTypes.SHOW_ERROR_SUCCESS,
    error,
  };
};

export const restaurantsFetchStart = () => {
  return {
    type: actionTypes.FETCH_RESTAURANTS_START,
  };
};

export const restaurantsFetchSuccess = (restaurants) => {
  return {
    type: actionTypes.FETCH_RESTAURANTS_SUCCESS,
    restaurants: [...restaurants],
  };
};

export const categoriesFetchStart = () => {
  return {
    type: actionTypes.FETCH_CATEGORIES_START,
  };
};

export const categoriesFetchSuccess = (categories) => {
  return {
    type: actionTypes.FETCH_CATEGORIES_SUCCESS,
    categories,
  };
};

export const restaurantFetchStart = () => {
  return {
    type: actionTypes.FETCH_RESTAURANT_START,
  };
};

export const restaurantFetchSuccess = (restaurant, commentCount, menu) => {
  return {
    type: actionTypes.FETCH_RESTAURANT_SUCCESS,
    restaurant,
    commentCount,
    menu,
  };
};

export const menuItemsFetchStart = () => {
  return {
    type: actionTypes.FETCH_RESTAURANT_MENU_ITEMS_START,
  };
};

export const menuItemsFetchSuccess = (items) => {
  return {
    type: actionTypes.FETCH_RESTAURANT_MENU_ITEMS_SUCCESS,
    items,
  };
};

export const commentsFetchStart = () => {
  return {
    type: actionTypes.FETCH_RESTAURANT_COMMENTS_START,
  };
};

export const commentsFetchSuccess = (rating, count, comments) => {
  return {
    type: actionTypes.FETCH_RESTAURANT_COMMENTS_SUCCESS,
    rating,
    count,
    comments,
  };
};
export const addCommentStart = () => {
  return {
    type: actionTypes.ADD_COMMENT_START,
  };
};

export const canAddCommentSuccess = (result) => {
  return {
    type: actionTypes.CAN_ADD_COMMENT_SUCCESS,
    result
  };
};

export const addCommentSuccess = (status) => {
  return {
    type: actionTypes.ADD_COMMENT_SUCCESS,
    status,
  };
};


export const checkLastOrderCommentSuccess = (result) => {
  return {
    type: actionTypes.LAST_ORDER_COMMENT_SUCCESS,
    result,
  };
};
//=------------------------------------------

export const fetchRestaurants = () => {
  return (dispatch) => {
    dispatch(restaurantsFetchStart());
    axios
      .post("/restaurant/getRestaurants", {})
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(restaurantsFetchSuccess(response.data.data));
        }else{
          dispatch(showErrorSuccess(response.data.message));
          }
      })
      .catch((err) => {
        //dispatch(orderFail());
      });
  };
};

export const fetchRestaurantByCategory = (categoryId) => {
  return (dispatch) => {
    dispatch(restaurantsFetchStart());
    axios
      .post("/restaurant/getRestaurantsByCategory",{category_id: categoryId}, {})
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(restaurantsFetchSuccess(response.data.data));
        }else{
          dispatch(showErrorSuccess(response.data.message));
          }
      })
      .catch((err) => {
        //dispatch(orderFail());
      });
  };
};


export const fetchRestaurant = (slug) => {
  return (dispatch) => {
    dispatch(restaurantFetchStart());
    axios
      .post("/restaurant/getRestaurantBySlug", { slug })
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(
            restaurantFetchSuccess(
              response.data.restaurant,
              response.data.comment_count,
              response.data.menu
            )
          );
        }else{
          dispatch(showErrorSuccess(response.data.message));
          }
      })
      .catch((err) => {
        //dispatch(orderFail());
      });
  };
};

export const fetchRestaurantCategories = () => {
  return (dispatch) => {
    dispatch(categoriesFetchStart());
    axios
      .get("/category/getCategories")
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(categoriesFetchSuccess(response.data.categories));
        }else{
          dispatch(showErrorSuccess(response.data.message));
          }
      })
      .catch((err) => {
        //dispatch(orderFail());
      });
  };
};

export const fetchRestaurantMenuItems = (slug,query) => {
  return (dispatch) => {
    dispatch(menuItemsFetchStart());
    axios
      .post("/item/getItems"+query, { restaurant_slug: slug })
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(menuItemsFetchSuccess(response.data.items));
        }else{
          dispatch(showErrorSuccess(response.data.message));
          }
      })
      .catch((err) => {
        //dispatch(orderFail());
      });
  };
};


export const fetchLastOrderComment = (token) => {
  return (dispatch) => {
    axios
      .get("/comment/lastOrderComment",{headers: { authorization: "Bearer " + token }})
      .then((response) => {
        if (response.data.status === "success") {
          if(localStorage.getItem('lastorder')){
            if(+localStorage.getItem('lastorder') !== +response.data.order_id){
              localStorage.setItem('lastorder',response.data.order_id);
              dispatch(checkLastOrderCommentSuccess({orderId: response.data.order_id,restaurantSlug: response.data.restaurant_slug}));
            }
          }else{
            localStorage.setItem('lastorder',response.data.order_id);
            dispatch(checkLastOrderCommentSuccess({orderId: response.data.order_id,restaurantSlug: response.data.restaurant_slug}));
          }
          
        }
      })
      .catch((err) => {
        //dispatch(orderFail());
      });
  };
};

export const fetchComments = (slug) => {
  return (dispatch) => {
    dispatch(commentsFetchStart());
    axios
      .post(
        "/comment/getCommentByRestaurantSlug",
        { slug }
      )
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(
            commentsFetchSuccess(
              response.data.restaurant_rating,
              response.data.comment_count,
              response.data.data
            )
          );
        }else{
          dispatch(showErrorSuccess(response.data.message));
          }
      })
      .catch((err) => {
        //dispatch(orderFail());
      });
  };
};

export const checkCanAddComment = (token,order_id) => {
  return (dispatch) => {
    axios
      .post(
        "/comment/canComment",
        { order_id },
        { headers: { authorization: "Bearer " + token } }
      )
      .then((response) => {
        if (response.data.status === "success" && response.data.message === 'شما اجازه نظر دادن دارید') {
          dispatch(canAddCommentSuccess('can'));
        }else{
          dispatch(canAddCommentSuccess('cant'));
          }
      })
      .catch((err) => {
        //dispatch(orderFail());
      });
  };
};

export const addComment = (token, slug, rate, comment,orderId) => {
  return (dispatch) => {
    dispatch(addCommentStart());
    const body = { comment: comment, rate: rate, restaurant_slug: slug, order_id: orderId };
    axios
      .post(
        "/comment/saveCommentAndRating",
        body,
        { headers: { authorization: "Bearer " + token } }
      )
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(addCommentSuccess("success"));
        }else{
          dispatch(showErrorSuccess(response.data.message));
          }
      })
      .catch((err) => {
        //dispatch(orderFail());
      });
  };
};


export const resetRestaurantStatus = () => {
  return (dispatch) => {
    dispatch(addCommentSuccess("new"));
  };
};

