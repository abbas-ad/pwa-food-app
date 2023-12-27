import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  restaurants: [],
  restaurant: {},
  restaurantCommentCount: 0,
  restaurantMenu: [{ id: 0 }],
  restaurantMenuItems: [],
  restaurantsLoading: false,
  restaurantLoading: false,
  categoriesLoading: false,
  restaurantMenuItemsLoading: false,
  categories: [],
  commentAvgRating: 0,
  comments: [],
  commentsLoading: false,
  newCommentStatus: "",
  canAddCommentStatus: "",
  lastOrderComment: {},
};

const restaurantsFetchStart = (state, action) => {
  return updateObject(state, { restaurantsLoading: true });
};

const restaurantsFetchSuccess = (state, action) => {
  return updateObject(state, {
    restaurants: [...action.restaurants],
    restaurantsLoading: false,
  });
};

const restaurantFetchStart = (state, action) => {
  return updateObject(state, { restaurantLoading: true });
};

const restaurantFetchSuccess = (state, action) => {
  return updateObject(state, {
    restaurant: action.restaurant,
    restaurantCommentCount: action.commentCount,
    restaurantMenu: action.menu,
    restaurantLoading: false,
  });
};

const categoriesFetchStart = (state, action) => {
  return updateObject(state, { categoriesLoading: true });
};

const categoriesFetchSuccess = (state, action) => {
  return updateObject(state, {
    categoriesLoading: false,
    categories: action.categories,
  });
};

const menuItemsFetchStart = (state, action) => {
  return updateObject(state, { restaurantMenuItemsLoading: true });
};

const menuItemsFetchSuccess = (state, action) => {
  return updateObject(state, {
    restaurantMenuItems: action.items,
    restaurantMenuItemsLoading: false,
  });
};

const commentsFetchStart = (state, action) => {
  return updateObject(state, { commentsLoading: true });
};

const commentsFetchSuccess = (state, action) => {
  return updateObject(state, {
    commentsLoading: false,
    restaurantCommentCount: action.count,
    commentAvgRating: action.rating,
    comments: action.comments,
  });
};

const addCommentStart = (state, action) => {
  return updateObject(state, { commentsLoading: true });
};

const addCommentSuccess = (state, action) => {
  return updateObject(state, {
    commentsLoading: false,
    newCommentStatus: action.status,
  });
};

const canAddCommentSuccess = (state, action) => {
  return updateObject(state, {
    canAddCommentStatus: action.result,
  });
};


const lastOrderCommentSuccess = (state, action) => {
  return updateObject(state, {
    lastOrderComment: action.result,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_RESTAURANTS_START:
      return restaurantsFetchStart(state, action);

    case actionTypes.FETCH_RESTAURANTS_SUCCESS:
      return restaurantsFetchSuccess(state, action);

    case actionTypes.FETCH_RESTAURANT_START:
      return restaurantFetchStart(state, action);

    case actionTypes.FETCH_RESTAURANT_SUCCESS:
      return restaurantFetchSuccess(state, action);

    case actionTypes.FETCH_CATEGORIES_START:
      return categoriesFetchStart(state, action);

    case actionTypes.FETCH_CATEGORIES_SUCCESS:
      return categoriesFetchSuccess(state, action);

    case actionTypes.FETCH_RESTAURANT_MENU_ITEMS_START:
      return menuItemsFetchStart(state, action);

    case actionTypes.FETCH_RESTAURANT_MENU_ITEMS_SUCCESS:
      return menuItemsFetchSuccess(state, action);

    case actionTypes.FETCH_RESTAURANT_COMMENTS_START:
      return commentsFetchStart(state, action);

    case actionTypes.FETCH_RESTAURANT_COMMENTS_SUCCESS:
      return commentsFetchSuccess(state, action);

    case actionTypes.ADD_COMMENT_START:
      return addCommentStart(state, action);
    case actionTypes.ADD_COMMENT_SUCCESS:
      return addCommentSuccess(state, action);


      case actionTypes.CAN_ADD_COMMENT_SUCCESS:
        return canAddCommentSuccess(state, action);

        case actionTypes.LAST_ORDER_COMMENT_SUCCESS:
          return lastOrderCommentSuccess(state, action);
      
    default:
      return state;
  }
};

export default reducer;
