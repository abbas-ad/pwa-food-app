import React, {useState, useEffect, useRef,useMemo } from 'react';
import {ReactComponent as BackIcon} from '../../assets/svgs/backIcon.svg';
import PizzaIcon from '../../assets/svgs/pizaaIcon.svg';
import {ReactComponent as FilterIcon} from '../../assets/svgs/filterIcon.svg';
import {ReactComponent as ArrowDownIcon} from '../../assets/svgs/arrowDownIcon.svg';
import Toolbar from '../../components/Ui/Toolbar/Toolbar';
import HorizentalRestaurant from '../../components/Restaurant/Horizental/HorizentalRestaurant';
import classNames from 'classnames';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Loading from '../../components/Loading/Loading';
import PriceFilterSnackbar from '../../components/PriceFilterSnackbar/PriceFilterSnackbar';
import SortFilterSnackBar from '../../components/SortFilterSnackBar/SortFilterSnackBar';

const RestaurantsByCategory = React.memo((props) => {
    const [urlQueries,setUrlQueries] = useState(new URLSearchParams(props.location.search));
    const [priceFilterOpen,setPriceFilterOpen] = useState(false);
    const [sortFilterOpen,setSortFilterOpen] = useState(false);
    const restaurantsRef = useRef(null);
    useEffect(()=>{
        props.onFetchRestaurantByCategory(urlQueries.get('id'));
    },[]);

    const handleBackClick = ()=>{
        props.history.goBack();
    }

    
    const handleSnackBarBackDropClick = ()=>{
        setPriceFilterOpen(false);
        setSortFilterOpen(false);
    }

    const handleSetPriceFilterBtnClick = ([fromPrice,toPrice])=>{
        console.log(fromPrice,toPrice);
    }

    const handleSetSortFilterBtnClick = (data)=>{
        console.log(data);
    }

    return (
        <section className='bg-white min-h-screen pb-10'>
            <div className='h-52 bg-category-header p-6'>
                <span className='pt-5'><BackIcon onClick={handleBackClick} /></span>
                <div className='flex flex-row items-center text-4xl font-semibold mt-10'>
                    <img src={PizzaIcon} alt="pizaa" />
                <p className='mr-5'>{urlQueries.get('name')}</p>
                </div>
            </div>

            {props.loading
            ? <Loading className='mt-10' />
            :<>
                <h6 className='text-3xl font-semibold my-7 px-6'>{props.restaurants.length} نتیجه برای " {urlQueries.get('name')} "</h6>

                <ul ref={restaurantsRef}>
                 {props.restaurants.filter(res=> +res.status !== 2).map(restaurant=>(
                    <li key={restaurant.slug}><HorizentalRestaurant restaurant={restaurant} favorites={props.favorites} favorite
                    onChangSelect={checked=>{}}
                        history={props.history}/></li>
                 ))}
                </ul>
            </>}
            

            <PriceFilterSnackbar open={priceFilterOpen} onBackDropClick={handleSnackBarBackDropClick} onSetBtnClick={handleSetPriceFilterBtnClick}/>
            <SortFilterSnackBar open={sortFilterOpen} onBackDropClick={handleSnackBarBackDropClick} onSetBtnClick={handleSetSortFilterBtnClick}/>

        </section>
    );
});



const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token,
        restaurants: state.restaurant.restaurants,
        loading: state.restaurant.restaurantsLoading,
        
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
        onFetchRestaurantByCategory: (categoryId) => dispatch(actions.fetchRestaurantByCategory(categoryId)),
    }
  }


export default connect( mapStateToProps, mapDispatchToProps )(RestaurantsByCategory);