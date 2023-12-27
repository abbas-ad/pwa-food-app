import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import {ReactComponent as CakeIcon} from '../../../assets/svgs/cakeIcon.svg'
import {ReactComponent as PizzaIcon} from '../../../assets/svgs/pizaaIcon.svg'
import {ReactComponent as ChickenIcon} from '../../../assets/svgs/chickenIcon.svg'
import {ReactComponent as ArrowUpIcon} from '../../../assets/svgs/arrowUp.svg'
import Banner1 from '../../../assets/img/banner1.png'
import Banner2 from '../../../assets/img/banner2.png'
import VerticalProduct from '../../../components/Product/Vertical/Vertical';
import HorizentalProduct from '../../../components/Product/Horizental/Horizental';
import { NavLink } from 'react-router-dom';
import ButtonPrimary from '../../../components/Ui/Button/ButtonPrimary';
import SnackBar from '../../../components/Ui/SnackBar/SnackBar';
import {ReactComponent as LoginIcon} from '../../../assets/svgs/message/login.svg'
import ItemShimmer from '../../../components/ShimmerLoading/Item/ItemShimmer';
import CategoryShimmer from '../../../components/ShimmerLoading/Category/Category';
import ProductVerticalShimmer from '../../../components/ShimmerLoading/Item/ProductVerticalShimmer';

const Market = (props) => {
    const [loginSnackBarOpen,setLoginSnackBarOpen] = useState(false);

    useEffect(()=>{
        props.onFetchCart(props.token);
        props.onFetchBanners();
        props.onFetchCategories();
        props.onFetchProducts(props.filterPage === 'markethome' ? props.filterQuery : '','');
      },[]);


      const handleSnackBarBackDropClick = ()=>{
        setLoginSnackBarOpen(false);
    }

      const handleFavoriteClick = (itemId)=>{
        if(props.isAuthenticated){
            props.onAddItemToFavorite(props.token,[itemId]);
        }else{
            props.history.push('/auth')
        }
    }

    useEffect(()=>{
        if(props.favoriteItemStatus === 'success'){
            props.onFetchFavorites(props.token);
            props.onResetFavoriteStatus();
        }
    },[props.favoriteItemStatus]);


    const handleAddtoCart = (resaurantSlug,itemId)=>{
        if(props.isAuthenticated){
            props.onAddToCart(props.token,resaurantSlug,itemId);
        }else{
            setLoginSnackBarOpen(prev=>!prev);
        }
    }

    const handleRemoveFromCart = (itemId)=>{
        if(props.isAuthenticated){
            props.onRemoveCartItem(props.token,props.cartOrder.id,itemId);
        }else{
            setLoginSnackBarOpen(prev=>!prev);
        }
    }

    return (
        <div className='w-full mb-32'>
             <ul className='flex flex-row items-center mt-10 overflow-x-auto w-full pb-5'>
             {props.categoriesLoading 
                ? <>
                        <li className='mx-2 '><CategoryShimmer /></li>
                        <li className='mx-2'><CategoryShimmer /></li>
                        <li className='mx-2'><CategoryShimmer /></li>
                        <li className='mx-2'><CategoryShimmer /></li>
                        <li className='mx-2'><CategoryShimmer /></li>
                        <li className='mx-2'><CategoryShimmer /></li>
                        <li className='mx-2'><CategoryShimmer /></li>
                    </> 
                    :props.categories.map(category=>(
                      <li className='flex-1 text-center text-md font-bold mx-7' key={'category'+category.id}>
                      <NavLink to={`/category/market?name=${category.title}&id=${category.id}`}>
                         <img src={category.image} className='w-20 h-20 mb-2 mx-auto rounded-full' alt="" />
                          {category.title}
                      </NavLink>
                  </li>
                 ))}
                </ul>

                <div className='flex flex-row justify-between items-center mt-12'>
                    <h6 className='text-4xl font-bold'>پرطرفدار ها</h6>
                    <NavLink to='/products?filter=popular' className='flex flex-row text-3xl text-green-primary items-center'>
                        بیشتر
                        <span className='transform -rotate-90 mr-2'><ArrowUpIcon className='fill-current'/></span>
                    </NavLink>
                </div>

                
                <ul className='flex items-center overflow-x-scroll flex-nowrap mt-2 py-5 px-2'>
                    {props.productsLoading
                    ?<>
                     <li className='flex-1 ml-4'><ProductVerticalShimmer /></li>
                     <li className='flex-1 ml-4'><ProductVerticalShimmer /></li>
                     <li className='flex-1 ml-4'><ProductVerticalShimmer /></li>
                     <li className='flex-1 ml-4'><ProductVerticalShimmer /></li>
                     <li className='flex-1 ml-4'><ProductVerticalShimmer /></li>
                    </>
                    :props.products.filter(product=>product.is_popular === '1').map(product=>(
                        <li className='flex-1 ml-4' key={`popular-product${product.id}`}><VerticalProduct 
                        product={product} history={props.history}
                        cart={props.cart} onFavoriteClick={handleFavoriteClick} favorites={props.favorites}
                            isAuthenticated={props.isAuthenticated} handleAddToCartBtnClick={handleAddtoCart} handleRemoveFromCartBtnClick={handleRemoveFromCart}
                         /></li>
                    ))}
                </ul>


                <div className='flex flex-row justify-between items-center mt-12'>
                    <h6 className='text-4xl font-bold'>برترین ها</h6>
                    <NavLink to='/products?filter=tops' className='flex flex-row text-3xl text-green-primary items-center'>
                        بیشتر
                        <span className='transform -rotate-90 mr-2'><ArrowUpIcon className='fill-current'/></span>
                    </NavLink>
                </div>

                <ul className='mt-2 py-5'>
                {props.productsLoading
                    ?<>
                     <li><ItemShimmer /></li>
                    <li><ItemShimmer /></li>
                    <li><ItemShimmer /></li>
                    <li><ItemShimmer /></li>
                    </>
                    :props.products.filter(product=>product.rating > 3).map(product=>(
                        <li key={`tops-product${product.id}`}><HorizentalProduct 
                        product={product} history={props.history}
                        cart={props.cart} onFavoriteClick={handleFavoriteClick} favorites={props.favorites}
                            isAuthenticated={props.isAuthenticated} handleAddToCartBtnClick={handleAddtoCart} handleRemoveFromCartBtnClick={handleRemoveFromCart}
                         /></li>
                    ))}
                </ul>

                <div className='flex flex-row items-center my-10'>
                    <figure className='w-full h-auto ml-2'><img src={Banner1} alt="" /></figure>
                    <figure className='w-full h-auto'><img src={Banner2} alt="" /></figure>
                </div>



                <div className='flex flex-row justify-between items-center mt-12'>
                    <h6 className='text-4xl font-bold'>دارای تخفیف</h6>
                    <NavLink to='/products?filter=off' className='flex flex-row text-3xl text-green-primary items-center'>
                        بیشتر
                        <span className='transform -rotate-90 mr-2'><ArrowUpIcon className='fill-current'/></span>
                    </NavLink>
                </div>

                <ul className='flex items-center overflow-x-scroll flex-nowrap mt-2 py-5 px-2'>
                {props.productsLoading
                    ?<>
                        <li className='flex-1 ml-4'><ProductVerticalShimmer /></li>
                        <li className='flex-1 ml-4'><ProductVerticalShimmer /></li>
                        <li className='flex-1 ml-4'><ProductVerticalShimmer /></li>
                        <li className='flex-1 ml-4'><ProductVerticalShimmer /></li>
                        <li className='flex-1 ml-4'><ProductVerticalShimmer /></li>
                    </>
                    :props.products.filter(product=>product.is_off === '1').map(product=>(
                        <li className='flex-1 ml-4' key={`off-product${product.id}`}><VerticalProduct 
                        product={product} history={props.history}
                        cart={props.cart} onFavoriteClick={handleFavoriteClick} favorites={props.favorites}
                            isAuthenticated={props.isAuthenticated} handleAddToCartBtnClick={handleAddtoCart} handleRemoveFromCartBtnClick={handleRemoveFromCart}
                         /></li>
                    ))}
                </ul>


            <SnackBar open={loginSnackBarOpen} onBackDropClick={handleSnackBarBackDropClick} className='overflow-y-auto'>
                <LoginIcon className='mx-auto mb-5'/>
                <p className='text-xl font-medium text-center mb-10'>.برای ثبت سفارش ابتدا باید وارد حساب کاربری خود شوید</p>
                <NavLink to='/auth'><ButtonPrimary className='ml-5'>ورود</ButtonPrimary></NavLink>
            </SnackBar>

        </div>
    );
};




const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null,
        banners: state.market.banners,
        bannerLoading: state.market.bannerLoading,
        categories: state.market.categories,
        categoriesLoading: state.market.categoriesLoading,
        products: state.market.products,
        productsLoading: state.market.productsLoading,
        favorites: state.favorite.favoriteItems,
        cart: state.cart.cart,
        cartOrder: state.cart.order,
        lastChangedItem: state.favorite.lastChangedItem,
        favoriteItemStatus: state.favorite.favoriteItemStatus,
        favoriteItemStatusMessage: state.favorite.favoriteItemStatusMessage,
        favoriteRestaurants: state.favorite.favoriteRestaurants,
        favoriteRestaurantStatus: state.favorite.favoriteRestaurantStatus,
        filterPage: state.search.page,
        filterQuery: state.search.query,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onFetchBanners: () => dispatch(actions.fetchBanners()),
        onFetchCategories: () => dispatch(actions.fetchMarketCategories()),
        onFetchProducts: (query,menuId) => dispatch(actions.fetchProducts(query,menuId)),
        onAddToCart: (token,restaurantSlug,itemId) => dispatch(actions.addCartItem(token,restaurantSlug,itemId)),
        onRemoveCartItem: (token,orderId,itemId) => dispatch(actions.removeCartItem(token,orderId,itemId)),
        onFetchCart: (token) => dispatch(actions.fetchCart(token)),
        onAddItemToFavorite: (token,itemIds) => dispatch(actions.addItemFavorite(token,itemIds)),
        onResetFavoriteStatus: () => dispatch(actions.resetFavorite()),
        onFetchFavorites: (token) => dispatch(actions.fetchFavorites(token)),
        onAddRestaurantToFavorite: (token,restaurantSlugs) => dispatch(actions.addRestaurantToFavorite(token,restaurantSlugs)),
    }
  }

export default connect( mapStateToProps, mapDispatchToProps )(Market);