import React,{useEffect, useState} from 'react';
import Toolbar from '../../components/Ui/Toolbar/Toolbar';
import {ReactComponent as BackIcon} from '../../assets/svgs/backIcon.svg'
import {ReactComponent as EditIcon} from '../../assets/svgs/accountEditIcon.svg'
import {ReactComponent as RemoveEditIcon} from '../../assets/svgs/removeEditIcon.svg'
import {ReactComponent as NoFovaritesIcon} from '../../assets/svgs/message/noFavoritesIcon.svg'

import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
import ButtonPrimary from '../../components/Ui/Button/ButtonPrimary';
import HorizentalRestaurant from '../../components/Restaurant/Horizental/HorizentalRestaurant';
import HorizentalProduct from '../../components/Product/Horizental/Horizental';
import Loading from '../../components/Loading/Loading';
import MenuItem from '../../components/Menu/Menu';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import _ from 'lodash';
import classNames from 'classnames';

const Favorites = (props) => {
    const [favoritesStatus,setFavoritesStatus] = useState('food');
    const [foodStatus,setFoodStatus] = useState(false);
    const [editedActive,setEditedActive] = useState(false);
    const [selectedIds,setSelectedIds] = useState([]);


    const handleToggleChange = (status)=>{
        setFoodStatus(status);
        setSelectedIds([]);
        setEditedActive(false)
    }

    useEffect(()=>{
        props.onFetchFavorites(props.token);
    },[])

    const handleEditClick = ()=>{
        setSelectedIds([]);
        setEditedActive(prev=>!prev);
    }

    const handleSelectItemChange = (checked,itemId)=>{
        if(checked){
            setSelectedIds(prev=>[...prev,itemId]);
        }else{
            setSelectedIds(prev=>[...prev.filter(id=>id !== itemId)]);
        }
    }

    const handleDeleteBtnClick = ()=>{
        if(favoritesStatus === 'food'){
            if(!foodStatus){
                props.onAddItemToFavorite(props.token,selectedIds);
            }else{
                props.onAddRestaurantToFavorite(props.token,selectedIds);
            }
        }else{
            props.onAddItemToFavorite(props.token,selectedIds);
        }
    }

    
    useEffect(()=>{
        if(props.favoriteItemStatus === 'success' || props.favoriteRestaurantStatus === 'success' ){
            props.onFetchFavorites(props.token);
            props.onResetFavoriteStatus();
            setSelectedIds([]);
            setEditedActive(false)
        }
    },[props.favoriteItemStatus,props.favoriteRestaurantStatus]);

    
    const handleBackClick = ()=>{
        props.history.goBack();
    }
    return (
        <section className='pb-32 relative bg-white min-h-screen'>
            <Toolbar startIcon={<BackIcon onClick={handleBackClick} />} endIcon={editedActive ? <RemoveEditIcon /> :<EditIcon />} endIconClick={handleEditClick}>محبوب ها</Toolbar>
            {props.loading
            ?<Loading />
            : <>
            <div className='bg-white pt-5 shadow-sm'>
                <div className='flex flex-row pt-3 text-xl px-10 items-center justify-around text-gray-primary '>
                    <button className={favoritesStatus === 'food' ? 'px-3 border-b-2 border-primary text-primary ml-10 pb-5' : 'pb-5 px-3'} type='button' onClick={()=>setFavoritesStatus('food')}>ما فود</button>
                    <button className={favoritesStatus === 'market' ? 'px-3 border-b-2 border-primary text-primary mr-10 pb-5' : 'pb-5 px-3'} type='button' onClick={()=>setFavoritesStatus('market')}>ما مارکت</button>
                </div>
            </div>

            {favoritesStatus === 'food' && !foodStatus && props.favoriteItems.filter(item => item.item.restaurant_slug !== '0').length < 1
            ?<div className='absolute top-1/3 right-1/2 transform translate-x-1/2'>
            <NoFovaritesIcon className='mx-auto'/>
            <p className='text-xl text-center mt-7 whitespace-nowrap'> لیست علاقه مندی های شما خالی است !</p>
            </div>
            : null}

            {favoritesStatus === 'food' && foodStatus && props.favoriteRestaurants.length < 1
                ?<div className='absolute top-1/3 right-1/2 transform translate-x-1/2'>
                <NoFovaritesIcon className='mx-auto'/>
                <p className='text-xl text-center mt-7 whitespace-nowrap'> لیست علاقه مندی های شما خالی است !</p>
                </div>
            : null}

            {favoritesStatus !== 'food' && props.favoriteItems.filter(item => item.item.restaurant_slug === '0').length < 1
                ?<div className='absolute top-1/3 right-1/2 transform translate-x-1/2'>
                <NoFovaritesIcon className='mx-auto'/>
                <p className='text-xl text-center mt-7 whitespace-nowrap'> لیست علاقه مندی های شما خالی است !</p>
                </div>
            : null}

            {favoritesStatus === 'food'
            ?<>
            <div className='flex flex-row justify-center bg-white mt-1 py-5 '>
                <ToggleSwitch onChange={handleToggleChange} firstStatusLabel='غذا' secondStatusLabel='رستوران'/>
            </div>

            {!foodStatus
            ? <ul>
                {props.favoriteItems.filter(item => item.item.restaurant_slug !== '0').map(item=>(
                            <MenuItem key={item.id} menu={item.item} favorite select={editedActive} onChangSelect={checked=>handleSelectItemChange(checked,item.item_id)}
                            cart={props.cart} onFavoriteClick={()=>{}} favorites={props.favorites}
                            isAuthenticated={props.isAuthenticated} handleAddToCartBtnClick={()=>{}} handleRemoveFromCartBtnClick={()=>{}}/>
                ))}
            </ul>
            :<ul>
                {props.favoriteRestaurants.map(restaurant=>(
                    <li><HorizentalRestaurant restaurant={restaurant.restaurant} favorites={props.favorites} favorite
                    onChangSelect={checked=>handleSelectItemChange(checked,restaurant.restaurant_slug)}
                        history={props.history} select={editedActive}/></li>
                ))}
            </ul> }
            </>
            :<> 
            <ul>
                {props.favoriteItems.filter(item => item.item.restaurant_slug === '0').map(product=>(
                        <li key={`product${product.id}`}><HorizentalProduct 
                        product={product.item} history={props.history} favorite select={editedActive} 
                        onChangSelect={checked=>handleSelectItemChange(checked,product.item_id)}
                        cart={props.cart} onFavoriteClick={()=>{}} favorites={props.favorites}
                            isAuthenticated={props.isAuthenticated} handleAddToCartBtnClick={()=>{}} handleRemoveFromCartBtnClick={()=>{}}
                         /></li>
                    ))}
            </ul>
            </> }

            {editedActive 
            ?<div className='fixed bottom-0 left-0 right-0 p-6 bg-white'>
                {props.changeLoading
                ?<Loading />
                :<ButtonPrimary type='button' className={classNames('',selectedIds.length > 0 ? 'bg-red' : 'bg-red opacity-50')} onClick={handleDeleteBtnClick}>حذف از محبوب ها</ButtonPrimary>}
            </div> : null }
            </>}
        </section>
    );
};



const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token,
        favoriteItems: state.favorite.favoriteItems,
        favoriteRestaurants: state.favorite.favoriteRestaurants,
        loading: state.favorite.fetchLoading,
        changeLoading: state.favorite.changeLoading,
        favoriteRestaurantStatus: state.favorite.favoriteRestaurantStatus,
        favoriteItemStatus: state.favorite.favoriteItemStatus,
        favoriteItemStatusMessage: state.favorite.favoriteItemStatusMessage,
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
        onFetchFavorites: (token) => dispatch(actions.fetchFavorites(token)),
        onAddItemToFavorite: (token,itemIds) => dispatch(actions.addItemFavorite(token,itemIds)),
        onResetFavoriteStatus: () => dispatch(actions.resetFavorite()),
        onAddRestaurantToFavorite: (token,restaurantSlugs) => dispatch(actions.addRestaurantToFavorite(token,restaurantSlugs)),

    }
  }

export default connect( mapStateToProps, mapDispatchToProps )(Favorites);