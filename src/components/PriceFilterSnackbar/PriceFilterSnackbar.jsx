import React,{useState} from 'react';
import { addCommas } from '../../shared/utility';
import ButtonPrimary from '../Ui/Button/ButtonPrimary';
import SnackBar from '../Ui/SnackBar/SnackBar';
import Slider from 'rc-slider';
const { Range } = Slider;

const PriceFilterSnackbar = (props) => {
    const [priceRange,setPriceRange] = useState([0,200000]);


    const handleChangePriceRange = (value)=>{
        setPriceRange(value);
    }

    const handleSetBtnClick = ()=>{
        props.onSetBtnClick(priceRange);
    }
    return (
        <SnackBar open={props.open} onBackDropClick={props.onBackDropClick}>
            <h6 className='text-primary text-3xl font-semibold my-10'>محدوده قیمت</h6>

            <div className='flex flex-row items-center justify-between text-3xl'>
                <div className='flex-1 flex flex-row items-center justify-between border border-border-gray p-3 ml-4'>
                    <p>از</p>
                    <p>{addCommas(priceRange[0])}</p>
                </div>
                <div className='flex-1 flex flex-row items-center justify-between border border-border-gray p-3'>
                    <p>تا</p>
                    <p>{addCommas(priceRange[1])}</p>
                </div>
            </div>

            <Range className='my-16'
            handleStyle={[{backgroundColor: 'white',borderColor: 'black',borderWidth: '.3rem',outlineColor: 'black',boxShadow: 'none'},
            {backgroundColor: 'white',borderColor: 'black',borderWidth: '.3rem',boxShadow: 'none'}]}
            trackStyle={[{backgroundColor: 'black',height: '.5rem'}]} reverse
             min={0} max={200000} onChange={handleChangePriceRange} defaultValue={[0, 200000]} tipFormatter={value => `${value}%`}   />

             <ButtonPrimary type='button' onClick={handleSetBtnClick}>اعمال</ButtonPrimary>
        </SnackBar>
    );
};

export default PriceFilterSnackbar;