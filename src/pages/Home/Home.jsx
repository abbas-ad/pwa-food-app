import React, {useState, useEffect, useRef } from 'react';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
import Market from './Market/Market'
import {ReactComponent as FilterIcon} from '../../assets/svgs/filterIcon.svg'
import {ReactComponent as ArrowDownIcon} from '../../assets/svgs/arrowDownIcon.svg'
import {ReactComponent as SearchIcon} from '../../assets/svgs/searchIcon.svg'
import Restaurant from '../../components/Restaurant/Restaurant';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import VerticalRestaurantShimmer from '../../components/ShimmerLoading/Restaurant/VerticalRestaurant';
import CategoryShimmer from '../../components/ShimmerLoading/Category/Category';
import classNames from 'classnames';
import ButtonPrimary from '../../components/Ui/Button/ButtonPrimary';
import SnackBar from '../../components/Ui/SnackBar/SnackBar';
import { addCommas } from '../../shared/utility';

//import Swiper from 'react-id-swiper';

const Home = (props) => {
    const toolbarRef = useRef(null);
    const [showToolbar,setShowToolbar] = useState(false);

    const [homeStatus,setHomeStatus] = useState(props.isMarket);


    useEffect(()=>{
        document.addEventListener('scroll',handleWindowScroll);

        return () => {
            document.removeEventListener('scroll', handleWindowScroll);
        }
    });

    const handleWindowScroll = ()=>{
        if(toolbarRef.current){
            
            if(toolbarRef.current.getBoundingClientRect().top < 6){
                if(!showToolbar)
                setShowToolbar(prev=>!prev);
            }else{
                if(showToolbar)
                setShowToolbar(prev=>!prev);
            }

        }

    }


    const onChangeToggleBtn = (status)=>{
        props.onSetIsMarket(status)
        setHomeStatus(status)
      }
    
    useEffect(()=>{
        
        props.onFetchUser();
        props.onFetchRestaurants();
        props.fetchRestaurantCategories();
        props.onFetchCart(props.token);
        props.onFetchAddresses(props.token,props.selectedAddress);
        props.onFetchFavorites(props.token);
      },[]);


      const handleFavoriteClick = (slug)=>{
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

      

    return (
        <section className='relative pb-32'>
            <div className='bg-white flex flex-col items-center py-5 px-6'>
                <ToggleSwitch onChange={onChangeToggleBtn} checked={homeStatus} firstStatusLabel='ما فود' secondStatusLabel='ما مارکت'/>
                <div className={classNames('flex flex-row mt-10 w-full items-center relative')} ref={toolbarRef}>
                    {homeStatus ? <NavLink to='/filter?page=markethome' className='flex items-center justify-center bg-white w-14 h-14 rounded-full mr-2 absolute right-0'>
                   <FilterIcon />
                   {props.filterPage === 'markethome' 
                        ? <span className='absolute bg-green-primary w-3 h-3 z-50 rounded-full top-2 left-2 border border-white'></span>
                        :null }
                   </NavLink> : null}
                    {props.restaurantsLoading ? <div className='shimmer-loading w-3/5 h-4 mx-auto rounded-md'></div> :<NavLink to={props.isAuthenticated ? '/addresses' : '/auth'} className='flex flex-row flex-1 items-center text-lg font-bold justify-center'>
                        <ArrowDownIcon className='ml-2' />
                        {props.selectedAddressTitle}
                    </NavLink>}
                </div>

                <div className={classNames('fixed top-0 left-0 right-0 bg-white z-40 px-6 transform transition-all duration-500 z-50',showToolbar ? 'translate-y-0' : '-translate-y-full')}>
                <div className='flex flex-row my-7 w-full items-center relative'>
                {homeStatus ? <NavLink to='/filter?page=markethome' className='flex items-center justify-center bg-white w-14 h-14 rounded-full mr-2 absolute right-0'>
                   <FilterIcon />
                   {props.filterPage === 'markethome' 
                        ? <span className='absolute bg-green-primary w-3 h-3 z-50 rounded-full top-2 left-2 border border-white'></span>
                        :null }
                   </NavLink> : null}
                    {props.restaurantsLoading ? <div className='shimmer-loading w-3/5 h-4 mx-auto rounded-md'></div> :<NavLink to={props.isAuthenticated ? '/addresses' : '/auth'} className='flex flex-row flex-1 items-center text-lg font-bold justify-center'>
                        <ArrowDownIcon className='ml-2' />
                        {props.selectedAddressTitle}
                    </NavLink>}
                </div>
                <NavLink to='/search' className='bg-gray-secondary flex flex-row w-full px-4 items-center my-5 h-20'>
                    <input type="text" className='flex-1 bg-gray-secondary text-xl' placeholder='جستجوی رستوران ها و غذاها' name="" id="" />
                    <button type='submit'><SearchIcon /></button>
                </NavLink>

                </div>
                

                {homeStatus
                ? <Market />
                :<>
                <NavLink to='/search' className='bg-gray-secondary flex flex-row w-full px-4 items-center mt-10 h-20'>
                    <input type="text" className='flex-1 bg-gray-secondary text-xl' placeholder='جستجوی رستوران ها و غذاها' name="" id="" />
                    <button type='submit'><SearchIcon /></button>
                </NavLink>

                <ul className='flex items-center mt-10 overflow-x-auto w-full pb-5'>
                    {props.categoriesLoading ? <>
                        <li className='mx-2'><CategoryShimmer /></li>
                        <li className='mx-2'><CategoryShimmer /></li>
                        <li className='mx-2'><CategoryShimmer /></li>
                        <li className='mx-2'><CategoryShimmer /></li>
                        <li className='mx-2'><CategoryShimmer /></li>
                        <li className='mx-2'><CategoryShimmer /></li>
                        <li className='mx-2'><CategoryShimmer /></li>
                        <li className='mx-2'><CategoryShimmer /></li>
                    </>: props.restaurantCategories.map(category=>(
                         <li className='min-w-max text-center text-md font-bold whitespace-nowrap mx-5' key={'category'+category.id}>
                         <NavLink to={`/category/restaurant?name=${category.name}&id=${category.id}`}>
                            <img src={category.image} className='w-20 h-20 mb-2 mx-auto rounded-circle' alt="" />
                             {/* <ChickenIcon className='mb-2' /> */}
                             {category.name}
                         </NavLink>
                     </li>
                    ))}
                </ul>
                </>}
            </div>

                {homeStatus
                ? null
                :<div className='mt-10 mb-32'>
                <ul>
                {props.restaurantsLoading ?<>
              <li><VerticalRestaurantShimmer /></li>
              <li><VerticalRestaurantShimmer /></li>
              <li><VerticalRestaurantShimmer /></li>
              <li><VerticalRestaurantShimmer /></li>
              <li><VerticalRestaurantShimmer /></li>
              </> :props.restaurants.filter(res=> res.slug !== '0' ).filter(res=> +res.status !== 2).map(restaurant=>(
                    <li key={restaurant.slug} className='mt-2'><Restaurant restaurant={restaurant} favorites={props.favorites}
                    history={props.history} onFavoriteClick={handleFavoriteClick} /></li>
                    ))}
                </ul>
            </div>}

           



        </section>
    );
};

const mapStateToProps = state => {
    return {
        isMarket: state.user.isMarket ,
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null,
        addresses: state.user.addresses,
        selectedAddress: state.user.selectedAddress,
        selectedAddressTitle: state.user.selectedAddressTitle,
        restaurants: state.restaurant.restaurants,
        restaurantsLoading: state.restaurant.restaurantsLoading,
        restaurantCategories: state.restaurant.categories,
        categoriesLoading: state.restaurant.categoriesLoading,
        favorites: state.favorite.favoriteRestaurants,
        lastChangedSlug: state.favorite.lastChangedSlug,
        favoriteRestaurantStatus: state.favorite.favoriteRestaurantStatus,
        favoriteRestaurantStatusMessage: state.favorite.favoriteRestaurantStatusMessage,
        filterPage: state.search.page,
        filterQuery: state.search.query,

    
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onFetchRestaurants: () => dispatch(actions.fetchRestaurants()),
        fetchRestaurantCategories: () => dispatch(actions.fetchRestaurantCategories()),
        onFetchAddresses: (token,selecetdAddress) => dispatch(actions.fetchAddresses(token,selecetdAddress)),
        onAddRestaurantToFavorite: (token,restaurantSlugs) => dispatch(actions.addRestaurantToFavorite(token,restaurantSlugs)),
        onResetFavoriteStatus: () => dispatch(actions.resetFavorite()),
        onFetchFavorites: (token) => dispatch(actions.fetchFavorites(token)),
        onFetchUser: () => dispatch(actions.fetchUser()),
        onSetIsMarket: (result) => dispatch(actions.setIsMarket(result)),
        onFetchCart: (token) => dispatch(actions.fetchCart(token)),

    }
  }

export default connect( mapStateToProps, mapDispatchToProps )(Home);