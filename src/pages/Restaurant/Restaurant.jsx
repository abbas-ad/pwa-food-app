import React, {useState, useEffect, useRef,createRef } from 'react';
import { NavLink } from 'react-router-dom';
import AccordionItem from '../../components/Ui/Accordion/Accordion';
import ButtonPrimary from '../../components/Ui/Button/ButtonPrimary';
import MenuItem from '../../components/Menu/Menu';
import SnackBar from '../../components/Ui/SnackBar/SnackBar';
import {ReactComponent as PlusIcon} from '../../assets/svgs/plusIcon.svg'

import {ReactComponent as BackIcon} from '../../assets/svgs/backIcon.svg';
import {ReactComponent as FilterIcon} from '../../assets/svgs/filterIcon.svg';
import {ReactComponent as FavoriteIcon} from '../../assets/svgs/heartBorderBlack.svg';
import {ReactComponent as FavoriteFillIcon} from '../../assets/svgs/heartBlackIcon.svg';
import {ReactComponent as StartBlackIcon} from '../../assets/svgs/starBlackIcon.svg';
import {ReactComponent as LocationIcon} from '../../assets/svgs/locationIcon.svg';
import {ReactComponent as CommentIcon} from '../../assets/svgs/commentIcon.svg';
import {ReactComponent as SearchIcon} from '../../assets/svgs/searchIcon.svg';
import {ReactComponent as LoginIcon} from '../../assets/svgs/message/login.svg'
import {ReactComponent as WarningIcon} from '../../assets/svgs/message/warningIcon.svg'
import { addCommas } from '../../shared/utility';
import Scrollspy from 'react-scrollspy'

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import _ from 'lodash';
import ItemShimmer from '../../components/ShimmerLoading/Item/ItemShimmer'
import Loading from '../../components/Loading/Loading';
import classNames from 'classnames';

const Restaurant = (props) => {
    const [urlQueries,setUrlQueries] = useState(new URLSearchParams(props.location.search));
    const menuRef = useRef(null);
    const [menuTopPosition,setMenuTopPosition] = useState(0);
    const [showToolbar,setShowToolbar] = useState(false);
    const [cartSnackBarOpen,setCartSnackBarOpen] = useState(false);
    const [loginSnackBarOpen,setLoginSnackBarOpen] = useState(false);
    const [warningSnackBarOpen,setWarningSnackBarOpen] = useState(false);
    const [activeMenu,setActiveMenu] = useState(0);    
    const [menuRefs,setMenuRefs] = useState({});    

   

    useEffect(()=>{
        document.addEventListener('scroll',handleWindowScroll);

        return () => {
            document.removeEventListener('scroll', handleWindowScroll);
        }
    });

    useEffect(()=>{
        props.onFetchCart(props.token);

        props.onFetchRestaurant(props.match.params.slug)
        props.onFetchRestaurantMenuItems(props.match.params.slug,props.filterPage === 'restaurant' ? props.filterQuery : '');
    },[])

    const handleWindowScroll = ()=>{
        if(menuRef.current){
            if(menuRef.current.getBoundingClientRect().top < 9){
                if(!showToolbar)
                setShowToolbar(prev=>!prev);
            }else{
                if(showToolbar)
                setShowToolbar(prev=>!prev);
            }

        }

    }


    const handleLookCartClick = ()=>{
        setCartSnackBarOpen(prev=>!prev);
    }

    const handleGotoCartClick = ()=>{
        props.history.push('/cart');
    }

    const handleSnackBarBackDropClick = ()=>{
        setCartSnackBarOpen(false);
        setLoginSnackBarOpen(false);
        setWarningSnackBarOpen(false);
    }

    const handleBackIconClick = ()=>{
        props.history.goBack();
    }

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


    const handleFavoriteClick = (itemId)=>{
        if(props.isAuthenticated){
            props.onAddItemToFavorite(props.token,[itemId]);
        }else{
            props.history.push('/auth')
        }
    }

    // useEffect(()=>{
    //     if(props.cart.length > 0){
    //         setCartSnackBarOpen(true);
    //     }
    // },[props.cart])

    useEffect(()=>{
        if(props.favoriteItemStatus === 'success'){
            props.onFetchFavorites(props.token);
            props.onResetFavoriteStatus();
        }
    },[props.favoriteItemStatus]);

    const handleFavoriteRestaurantClick = (slug)=>{
        if(props.isAuthenticated){
            props.onAddRestaurantToFavorite(props.token,[slug]);
        }else{
            props.history.push('/auth')
        }
    }

    useEffect(()=>{
        if(props.favoriteRestaurantStatus === 'success'){
            props.onFetchFavorites(props.token);
            props.onResetFavoriteStatus();
        }
    },[props.favoriteRestaurantStatus]);

    useEffect(()=>{
        if(props.restaurantMenuItems.length > 0){
            if(props.restaurant && +urlQueries.get('menu') > 0 && props.restaurantMenuItems.length > 0){
                const refs = props.restaurantMenuItems.reduce((acc, value) => {
                    acc[value.id] = React.createRef();
                    return acc;
                  }, {});
                  setMenuRefs(refs);
            }
        }
    },[props.restaurantMenuItems]);

    useEffect(()=>{
        console.log(props.restaurant.warning);
        if(+props.restaurant.warning === 1) setWarningSnackBarOpen(true);
    },[props.restaurant])

    useEffect(()=>{
        if(menuRefs && +urlQueries.get('menu') > 0){
            if(menuRefs[+urlQueries.get('menu')]){
                const y = menuRefs[+urlQueries.get('menu')]?.current?.getBoundingClientRect().top - 150;
                window.scrollTo({top: y, behavior: 'smooth'});

                // menuRefs[+urlQueries.get('menu')].current.scrollIntoView({top: y,
                //     behavior: 'smooth',
                //     block: 'start',
                //   });
            }
        }
    },[menuRefs])

    return (
        <section className='relative' >
            <div className={classNames('fixed px-6 top-0 right-0 left-0 bg-white pt-6 transform transition-all duration-500 z-50',showToolbar ? 'translate-y-0' : '-translate-y-full')}>
                <div className='flex items-center'>
                    <BackIcon onClick={handleBackIconClick} />
                    <h6 className='flex-1 text-4xl font-semibold mr-5'>{props.restaurant.name}</h6>
                    <NavLink to='/filter?page=restaurant' className='relative'>
                        <FilterIcon />
                            {props.filterPage === 'restaurant' 
                            ? <span className='absolute bg-green-primary w-3 h-3 z-50 rounded-full -top-1 -left-1 border border-white'></span>
                            : null}

                        </NavLink>
                </div>
                <div className='flex items-center pt-10'>
                    <NavLink to={`/restaurants/${props.match.params.slug}/search`} className='pb-6' ><SearchIcon /></NavLink>
                    <Scrollspy  items={ [...props.restaurantMenu.map(menu=> `menu${menu.id}`)] } currentClassName="border-active-py"
                        className='flex items-center h-16 overflow-y-hidden overflow-x-scroll hidescrollbar pb-2'>
                        {props.restaurantMenu.map((menu,i)=>(
                        <li className={'py-2 z-50 border-b-4 border-border-gray'} key={'menu-title-'+i}><a href={`#accordion${menu.id}`} className='text-3xl whitespace-nowrap px-7 py-4' >
                            {menu.title}
                            </a></li>                 
                        ))}
                    </Scrollspy>
                </div>
            </div>
            <div className='flex flex-row items-center bg-center bg-cover bg-no-repeat h-60 px-6 pb-10' style={{backgroundImage: `url(${props.restaurant.image})`}}>
                <div className='flex-1'>
                    <span className='flex items-center justify-center bg-white w-14 h-14 rounded-full' onClick={handleBackIconClick}><BackIcon /></span>
                </div>
               <span className='flex items-center justify-center bg-white w-14 h-14 rounded-full'
                onClick={()=>handleFavoriteRestaurantClick(props.restaurant.slug)}>
               {props.favoriteRestaurants.find(f=> f.restaurant_slug === props.restaurant.slug) ?  <FavoriteFillIcon /> : <FavoriteIcon /> }
                </span>
               <NavLink to='/filter?page=restaurant' className='flex items-center justify-center bg-white w-14 h-14 rounded-full mr-2 relative'>
                   <FilterIcon />
                   {props.filterPage === 'restaurant' 
                        ? <span className='absolute bg-green-primary w-3 h-3 z-50 rounded-full top-2 left-2 border border-white'></span>
                        :null }
                   </NavLink>
            </div>

            <div className='bg-white p-6 rounded-t-3xl -mt-12'>

                {props.restaurantLoading ? <div className='w-2/3 h-5 rounded shimmer-loading my-5'></div>  : <h1 className='mb-5 text-5xl font-semibold'>{props.restaurant.name}</h1>}
                
                <p className='flex flex-row items-center text-xl mb-3 w-full'>
                    <StartBlackIcon  className='flex-10 text-right'/>
                    {props.restaurantLoading  
                    ? <div className='w-2/3 h-5 rounded shimmer-loading my-5'></div>
                    : <>
                    {props.restaurant.rating}
                    <span className='mr-2 text-gray-primary'>({props.commentCount}+)</span>
                    </>}
                    
                </p>

                 <p className='flex flex-row items-center text-xl text-secondary mb-3 w-full'>
                    <span className='flex-10'></span>
                    {props.restaurantLoading
                     ? <div className='w-2/3 h-5 rounded shimmer-loading my-5'></div>
                     : _.truncate(props.restaurant.description,{length: 40}) }
                    </p>

                <div className='text-xl flex flex-row items-center mb-3 w-full'>
                    <span className='flex-10 flex items-center justify-center'><LocationIcon/></span>
                    {props.restaurantLoading  
                    ? <div className='w-2/3 h-5 rounded shimmer-loading my-5'></div>
                    :<p className='flex-1'>{props.restaurant.address}</p>}
                </div>

                <NavLink to={`/restaurants/${props.match.params.slug}/comments`} className='flex flex-row text-xl items-center justify-center h-20 mt-14 font-semibold rounded-full bg-gray-secondary'>
                    <CommentIcon className='ml-2'/>
                    نظرات
                    <span className='mr-2 font-normal text-gray-primary'>({props.commentCount}+)</span>
                </NavLink>

                <div className='flex flex-row items-center mt-10'>
                    <p className='flex-1 text-3xl text-secondary'>منو</p>
                    <NavLink to={`/restaurants/${props.match.params.slug}/search`}><SearchIcon /></NavLink>
                </div>
            </div>

            <div className='bg-white pb-36 pt-4' ref={menuRef}>
            {props.restaurantMenuItemsLoading 
            ? <AccordionItem title={''} className='mb-5' open>
                <ItemShimmer />
                <ItemShimmer />
                <ItemShimmer />
                <ItemShimmer />
                <ItemShimmer />
            </AccordionItem>
            : menuRefs && props.restaurantMenu.map((menu,i)=>(
                <AccordionItem title={menu.title} index={i} className='mb-5' id={'accordion'+menu.id} open>
                    {props.restaurantMenuItems.filter(item=>menu.id === +item.menu_id).map(item=>(
                        <MenuItem menuInfo={item} menu={item} refMenu={menuRefs[item.id]}
                        cart={props.cart} onFavoriteClick={handleFavoriteClick} favorites={props.favorites}
                        isAuthenticated={props.isAuthenticated} handleAddToCartBtnClick={handleAddtoCart} handleRemoveFromCartBtnClick={handleRemoveFromCart}/>
                    ))}
            </AccordionItem>
            ))}
            </div>

            {/* {+props.cartOrder.count > 0
            ?<div className='fixed bottom-0 right-0 left-0 shadow-accordion flex items-center justify-center px-6 py-7 bg-white w-full'>
                <ButtonPrimary onClick={handleLookCartClick}>مشاهده سبد خرید ({props.cartOrder.count})</ButtonPrimary>
            </div>
            : null}
            
            

            <SnackBar open={cartSnackBarOpen} onBackDropClick={handleSnackBarBackDropClick} className=''>
                <div className='h-full'>

                <h6 className='text-center text-4xl font-semibold'>{props.restaurant.name}</h6>
                <p className='text-lg text-center text-secondary mt-3 pb-7 border-b border-border-gray'>{props.restaurant.address}</p>
                <ul className='flex-1 mt-5 h-48 overflow-y-auto pb-5'>
                    {props.cart.map(cart=>(
                        <li className='flex flex-row justify-between items-start border-b border-border-gray py-3'>
                        <div>
                            <p className='text-xl font-medium'> {cart.item.name}</p>
                            <p className='text-4xl font-semibold mt-2'>
                                {addCommas(cart.is_off === '1' ? +cart.off_sell_price * +cart.count : +cart.sell_price * +cart.count)}
                                <span className='text-sm font-medium mr-2'>تومان</span>
                            </p>
                        </div>
                        <p className='text-3xl font-semibold bg-gray-secondary px-4 '>{cart.count}</p>
                    </li>
                    ))}
                    </ul>

                    <button type='button' className='flex flex-row items-center justify-start text-xl p-7 bg-gray-secondary w-full my-5'>
                <PlusIcon className='text-primary stroke-current fill-current ml-5'/>
                    افزودن یادداشت
            </button>

                <ButtonPrimary onClick={handleGotoCartClick} className=''>تسویه حساب</ButtonPrimary>
  
                </div>

            </SnackBar> */}

            <SnackBar open={loginSnackBarOpen} onBackDropClick={handleSnackBarBackDropClick} className='overflow-y-auto'>
                <LoginIcon className='mx-auto mb-5'/>
                <p className='text-xl font-medium text-center mb-10'>.برای ثبت سفارش ابتدا باید وارد حساب کاربری خود شوید</p>
                <NavLink to='/auth'><ButtonPrimary className='ml-5'>ورود</ButtonPrimary></NavLink>
            </SnackBar>

            <SnackBar open={warningSnackBarOpen} onBackDropClick={handleSnackBarBackDropClick} className='overflow-y-auto'>
                <WarningIcon className='mx-auto mb-5'/>
                <p className='text-xl font-medium text-center mb-10'>
                    مشتری عزیز
                    <br/>
                    سفارش شما ممکن است در این ساعت در دسترس نباشد. آیا از تایید سفارش خود مطمئن هستید؟
                </p>
                <ButtonPrimary className='ml-5' onClick={()=>setWarningSnackBarOpen(prev=>!prev)}>باشه</ButtonPrimary>
            </SnackBar>

        </section>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token,
        cart: state.cart.cart,
        cartOrder: state.cart.order,
        restaurant: state.restaurant.restaurant,
        restaurantMenu: state.restaurant.restaurantMenu,
        commentCount: state.restaurant.restaurantCommentCount,
        restaurantLoading: state.restaurant.restaurantLoading,
        restaurantMenuItems: state.restaurant.restaurantMenuItems,
        restaurantMenuItemsLoading: state.restaurant.restaurantMenuItemsLoading,
        favorites: state.favorite.favoriteItems,
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
        onFetchRestaurant: (slug) => dispatch(actions.fetchRestaurant(slug)),
        onFetchRestaurantMenuItems: (slug,query) => dispatch(actions.fetchRestaurantMenuItems(slug,query)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
        onAddToCart: (token,restaurantSlug,itemId) => dispatch(actions.addCartItem(token,restaurantSlug,itemId)),
        onRemoveCartItem: (token,orderId,itemId) => dispatch(actions.removeCartItem(token,orderId,itemId)),
        onFetchCart: (token) => dispatch(actions.fetchCart(token)),
        onAddItemToFavorite: (token,itemIds) => dispatch(actions.addItemFavorite(token,itemIds)),
        onResetFavoriteStatus: () => dispatch(actions.resetFavorite()),
        onFetchFavorites: (token) => dispatch(actions.fetchFavorites(token)),
        onAddRestaurantToFavorite: (token,restaurantSlugs) => dispatch(actions.addRestaurantToFavorite(token,restaurantSlugs)),
    }
  }


export default connect( mapStateToProps, mapDispatchToProps )(Restaurant);