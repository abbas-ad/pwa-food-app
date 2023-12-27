import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    page: '',
    query: '',
    search: '',
    sort: 'favorite',
    max_price: 200000,
    min_price: 0,
    items: [],
    topFoodCategories: [],
    topMarketCategories: [],
    loading: false
};



const updateFilterSuccess = (state, action) => {
      const query = `?search=${action.search}&sort=${action.sort}&min_price=${action.minPrice}&max_price=${action.maxPrice}`;
    return updateObject(state, {
        page: action.page,
        query: query,
        search: action.search,
        sort: action.sort,
        max_price: action.maxPrice,
        min_price: action.minPrice,
        loading: false,
    });
  };


  
const fetchTopCategoriesStart = (state, action) => {
    return updateObject(state, { loading: true });
  };
  
  const fetchTopCategoriesSuccess = (state, action) => {
    return updateObject(state, {
      loading: false,
      topFoodCategories: action.foodCategories,
      topMarketCategories: action.marketCategories,
    });
  };
  const fetchTopCategoriesFail = (state, action) => {
    return updateObject(state, { loading: false });
  };

    
const fetchFilteredItemsStart = (state, action) => {
    return updateObject(state, { loading: true });
  };
  
  const fetchFilteredItemsSuccess = (state, action) => {
    return updateObject(state, {
      loading: false,
      items: action.items,
    });
  };
  const fetchFilteredItemsFail = (state, action) => {
    return updateObject(state, { loading: false });
  };


const reducer = (state = initialState, action) => {
    switch (action.type) {

      case actionTypes.UPDATE_FILTER_SUCCESS:
        return updateFilterSuccess(state, action);
    
        case actionTypes.FETCH_TOP_CATEGORIES_START:
            return fetchTopCategoriesStart(state, action);
            case actionTypes.FETCH_TOP_CATEGORIES_SUCCESS:
                return fetchTopCategoriesSuccess(state, action);
                case actionTypes.FETCH_TOP_CATEGORIES_FAIL:
                    return fetchTopCategoriesFail(state, action);

        case actionTypes.FETCH_FILTERED_ITEMS_START:
            return fetchFilteredItemsStart(state, action);
        case actionTypes.FETCH_FILTERED_ITEMS_SUCCESS:
            return fetchFilteredItemsSuccess(state, action);
        case actionTypes.FETCH_FILTERED_ITEMS_FAIL:
            return fetchFilteredItemsFail(state, action);     

      default:
        return state;
    }
  };
  
  export default reducer;
  