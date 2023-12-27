import React, { useEffect, useState } from 'react';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import {ReactComponent as SearchIcon} from '../../assets/svgs/searchIcon.svg'
import {ReactComponent as FilterIcon} from '../../assets/svgs/filterIcon.svg'
import {ReactComponent as ArrowDownIcon} from '../../assets/svgs/arrowDownIcon.svg'
import {ReactComponent as RemoveIcon} from '../../assets/svgs/removeEditIcon.svg'
import Menu from '../../components/Menu/Menu';
import HorizentalProduct from '../../components/Product/Horizental/Horizental';
import Loading from '../../components/Loading/Loading';
import { useForm } from "react-hook-form";
import { NavLink } from 'react-router-dom';
import ButtonPrimary from '../../components/Ui/Button/ButtonPrimary';
import SnackBar from '../../components/Ui/SnackBar/SnackBar';
import {ReactComponent as LoginIcon} from '../../assets/svgs/message/login.svg'
import PriceFilterSnackbar from '../../components/PriceFilterSnackbar/PriceFilterSnackbar';
import SortFilterSnackBar from '../../components/SortFilterSnackBar/SortFilterSnackBar';
import ItemShimmer from '../../components/ShimmerLoading/Item/ItemShimmer';

const Search = (props) => {
    const [isSearch,setIsSearch] = useState(false)
    const [searchKey,setSearchKey] = useState('')
    const [loginSnackBarOpen,setLoginSnackBarOpen] = useState(false);
    const [priceFilterOpen,setPriceFilterOpen] = useState(false);
    const [sortFilterOpen,setSortFilterOpen] = useState(false);

    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors }
      } = useForm();

    useEffect(()=>{
        props.onFetchTopCategories();
    },[])
    const handleSubmitSearch = (data)=>{
        if(isSearch){
            setValue('search','');
            setIsSearch(prev=>! prev);
        }else{
        props.onSetFilter('search',data.search,props.sort,props.min_price,props.max_price);
        props.onFetchFilteredItems(data.search,props.sort,'','');
        setIsSearch(true);
        setSearchKey(data.search)
        }

    }

    const handleCategoryClick = (search)=>{
        props.onSetFilter('search',search,props.sort,props.min_price,props.max_price);
        props.onFetchFilteredItems(search,props.sort,props.min_price,props.max_price);
        setValue('search',search)
        setIsSearch(true);
        setSearchKey(search)
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


    const handleSnackBarBackDropClick = ()=>{
        setLoginSnackBarOpen(false);
        setPriceFilterOpen(false);
        setSortFilterOpen(false);        
    }


    const handleSetPriceFilterBtnClick = ([fromPrice,toPrice])=>{
        props.onSetFilter('search',props.search,props.sort,fromPrice,toPrice);
        props.onFetchFilteredItems(props.search,props.sort,fromPrice,toPrice);
        setPriceFilterOpen(false);
    }

    const handleSetSortFilterBtnClick = (data)=>{
        props.onSetFilter('search',props.search,data,props.min_price,props.max_price);
        props.onFetchFilteredItems(props.search,data,props.min_price,props.max_price);
        setSortFilterOpen(false);
    };

    const handleChangeSearchKey = (v)=>{
        console.log('.sdad')
        if(!v.target.value) setIsSearch(false);
    };

    return (
        <section className='bg-wite min-h-screen pb-32 bg-white'>
            <div className='px-6 pt-6'>
                <form className='bg-gray-secondary flex flex-row w-full px-4 items-center h-20' onSubmit={handleSubmit(handleSubmitSearch)}>
                    <input type="text" {...register('search',{required: true,onChange: (e)=>handleChangeSearchKey(e)})}
                     className='flex-1 bg-gray-secondary text-xl outline-none h-full' 
                    autoFocus placeholder='جستجوی رستوران ها و غذاها' />
                    <button type='submit'>{isSearch ? <RemoveIcon /> : <SearchIcon />}</button>
                </form>
                {isSearch
                ?<ul className='pt-8 px-2 flex flex-row items-center overflow-auto flex-nowrap pb-5'>
                    {/* <li className='bg-gray-secondary px-6 py-2 rounded-full'>
                        <FilterIcon/>
                    </li> */}
                    <li className='bg-gray-secondary px-6 py-2 rounded-full flex flex-row items-center text-lg font-semibold mx-2 flex-nowrap whitespace-nowrap'
                    onClick={()=>setSortFilterOpen(true)}>
                        <ArrowDownIcon className='ml-2'/>
                        مرتب سازی
                    </li>

                    <li className='bg-gray-secondary px-6 py-2 rounded-full flex flex-row items-center text-lg font-semibold mx-2 flex-nowrap whitespace-nowrap'
                    onClick={()=>setPriceFilterOpen(true)}>
                        <ArrowDownIcon className='ml-2'/>
                        حدود قیمت
                    </li>
                    
                </ul> : null}

                {isSearch ? <h6 className='text-3xl font-semibold my-7'>{props.items.length} نتیجه برای " {searchKey} "</h6> : null }
                {!isSearch ? <h6 className='text-3xl font-semibold my-7 text-gray-primary'>دسته های برتر</h6> : null }

            </div>

            {isSearch ? <ul className='pb-2'>
                {props.searchLoading 
                ? <>
                    <li><ItemShimmer /></li>
                    <li><ItemShimmer /></li>
                    <li><ItemShimmer /></li>
                    <li><ItemShimmer /></li>
                </>
                : props.items.filter(item => props.isMarket ? item.restaurant_slug === '0' : item.restaurant_slug !== '0').map(item=>(
                    item.restaurant_slug === '0'
                    ? <li key={item.id}><HorizentalProduct 
                    product={item} history={props.history}
                    cart={props.cart} onFavoriteClick={handleFavoriteClick} favorites={props.favorites}
                        isAuthenticated={props.isAuthenticated} handleAddToCartBtnClick={handleAddtoCart}
                         handleRemoveFromCartBtnClick={handleRemoveFromCart}
                     /></li>
                     :<li key={item.id}>
                        <Menu menuInfo={item} key={item.id} menu={item}  restaurantInfo
                        cart={props.cart} onFavoriteClick={handleFavoriteClick} favorites={props.favorites}
                        isAuthenticated={props.isAuthenticated} handleAddToCartBtnClick={handleAddtoCart}
                         handleRemoveFromCartBtnClick={handleRemoveFromCart}/>
                    </li>
                ))}
            </ul>: null }

            {!isSearch ?<ul className='grid grid-cols-2 px-4'>
                
                {props.isMarket
                ? props.topMarketCategories.map(category=>(
                    <li className='m-2' key={category.id} onClick={()=>handleCategoryClick(category.title)}>
                <figure className='w-full relative rounded-md overflow-hidden'>
                        <p className='absolute flex items-center justify-center text-4xl 
                    bg-primary w-full h-full bg-opacity-30 text-white'>{category.title}</p>

                <img className='w-full h-60 ' src={category.image_url} alt='restaurant logo' />

            </figure>
                </li>
                ))
            :props.topFoodCategories.map(category=>(
                <li className='m-2' key={category.id} onClick={()=>handleCategoryClick(category.title)}>
            <figure className='w-full relative rounded-md overflow-hidden'>
                    <p className='absolute flex items-center justify-center text-4xl 
                bg-primary w-full h-full bg-opacity-30 text-white'>{category.title}</p>

            <img className='w-full h-60 ' src={category.image_url} alt='restaurant logo' />

        </figure>
            </li>
            ))}
                
            </ul> : null }

            <PriceFilterSnackbar open={priceFilterOpen} onBackDropClick={handleSnackBarBackDropClick} onSetBtnClick={handleSetPriceFilterBtnClick}/>
            <SortFilterSnackBar open={sortFilterOpen} onBackDropClick={handleSnackBarBackDropClick} onSetBtnClick={handleSetSortFilterBtnClick}/>


            <SnackBar open={loginSnackBarOpen} onBackDropClick={handleSnackBarBackDropClick} className='overflow-y-auto'>
                <LoginIcon className='mx-auto mb-5'/>
                <p className='text-xl font-medium text-center mb-10'>.برای ثبت سفارش ابتدا باید وارد حساب کاربری خود شوید</p>
                <NavLink to='/auth'><ButtonPrimary className='ml-5'>ورود</ButtonPrimary></NavLink>
            </SnackBar>
        </section>
    );
};



const mapStateToProps = state => {
    return {
        isMarket: state.user.isMarket ,
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null,
        
        favorites: state.favorite.favoriteItems,
        cart: state.cart.cart,
        cartOrder: state.cart.order,

        page: state.search.page,
        search: state.search.search,
        sort: state.search.sort,
        max_price: state.search.max_price,
        min_price: state.search.min_price,
        items: state.search.items,
        searchLoading: state.search.loading,
        topFoodCategories: state.search.topFoodCategories,
        topMarketCategories: state.search.topMarketCategories,
        favoriteItemStatus: state.favorite.favoriteItemStatus,

    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onFetchTopCategories: () => dispatch(actions.fetchTopCategories()),
        onFetchFilteredItems: (search,sort,minPrice,maxPrice) => dispatch(actions.fetchFilteredItems(search,sort,minPrice,maxPrice)),
        onSetFilter: (page,search,sort,minPrice,maxPrice) => dispatch(actions.setFilter(page,search,sort,minPrice,maxPrice)),
        onAddToCart: (token,restaurantSlug,itemId) => dispatch(actions.addCartItem(token,restaurantSlug,itemId)),
        onRemoveCartItem: (token,orderId,itemId) => dispatch(actions.removeCartItem(token,orderId,itemId)),
    }
  }


export default connect( mapStateToProps, mapDispatchToProps )(Search);