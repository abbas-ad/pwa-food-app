import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Loading from '../../components/Loading/Loading';
import { useForm } from "react-hook-form";
import {ReactComponent as NoCommentIcon} from '../../assets/svgs/message/noCommentIcon.svg'
import {ReactComponent as WarningIcon} from '../../assets/svgs/message/warningIcon.svg'
import Toolbar from '../../components/Ui/Toolbar/Toolbar';
import ButtonPrimary from '../../components/Ui/Button/ButtonPrimary'
import {ReactComponent as BackIcon} from '../../assets/svgs/backIcon.svg'
import {ReactComponent as StarYellowIcon} from '../../assets/svgs/starIcon.svg'
import {ReactComponent as StarBlackBigIcon} from '../../assets/svgs/starBlackBigIcon.svg'
import {ReactComponent as StarStrokeIcon} from '../../assets/svgs/startStroke.svg'
import {ReactComponent as SuccessIcon} from '../../assets/svgs/message/successIcon.svg'
import SnackBar from '../../components/Ui/SnackBar/SnackBar';
import Comment from '../../components/Comment/Comment'
import classNames from 'classnames';

const Comments = (props) => {
    const [urlQueries,setUrlQueries] = useState(new URLSearchParams(props.location.search));
    const [successAddCommentSnackBar,setSuccessAddCommentSnackBar] = useState(false);
    const [rateErrorSnackBar,setRateErrorSnackBar] = useState(false);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const {
        handleSubmit,
        register,
        formState: { errors }
      } = useForm();

    useEffect(()=>{
        props.onFetchComments(props.match.params.slug);
        props.onCheckCanAddComment(props.token,urlQueries.get('order'))
    },[])


    const handleSnackBarBackDropClick = ()=>{
        setSuccessAddCommentSnackBar(false);
        props.onResetRestaurantResult();
    }

    const handleSubmitNewComment = (data)=>{
        if(rating > 0 && data.comment){
            props.onAddComment(props.token,props.match.params.slug,rating,data.comment,urlQueries.get('order'));
        }else setRateErrorSnackBar(true);
    }

    const calcPercentComentsRate = (rate,comments)=>{
        const percent = ( comments.filter(c=> c.rate === rate).length * 100 ) / comments.length;
        if(percent === 0){
            return 'w-0';
        }else if(percent <= 20 ){
            return 'w-1/5';
        }else if(percent <= 40 ){
            return 'w-2/5';
        }else if(percent <= 60 ){
            return 'w-3/5';
        }else if(percent <= 80 ){
            return 'w-4/5';
        }else if(percent <= 100 ){
            return 'w-full';
        }
    }
    const handleBackClick = ()=>{
        props.history.goBack();
    }

    useEffect(()=>{
        if(props.newCommentStatus === 'success'){
            setSuccessAddCommentSnackBar(prev=>!prev);
        }
    },[props.newCommentStatus])
    return (
        <section className='bg-white pb-10 min-h-screen relative'>
            <Toolbar startIcon={<BackIcon onClick={handleBackClick}/>}>نظرات</Toolbar>
            {props.loading && rating === 0 
            ? <Loading className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'/>
            :<>
            {props.comments.length > 0 
            ? <div className='flex flex-row items-center px-6 mt-10 bg-white'>
            <div className='flex-1'>
                <div className='flex flex-row items-center pl-2 mb-2'>
                    <StarYellowIcon />
                    <p className='text-lg flex-10 text-center text-secondary'>5</p>
                    <div className='flex-1 bg-gray-tertiary h-5 rounded-full'><p className={classNames(calcPercentComentsRate('5',props.comments),'h-full bg-green-secondary rounded-full')}></p></div>
                </div>

                <div className='flex flex-row items-center pl-2 mb-2'>
                    <StarYellowIcon />
                    <p className='text-lg flex-10 text-center text-secondary'>4</p>
                    <div className='flex-1 bg-gray-tertiary h-5 rounded-full'><p className={classNames(calcPercentComentsRate('4',props.comments),'h-full bg-green-secondary rounded-full')}></p></div>
                </div>

                <div className='flex flex-row items-center pl-2 mb-2'>
                    <StarYellowIcon />
                    <p className='text-lg flex-10 text-center text-secondary'>3</p>
                    <div className='flex-1 bg-gray-tertiary h-5 rounded-full'><p className={classNames(calcPercentComentsRate('3',props.comments),'h-full bg-green-secondary rounded-full')}></p></div>
                </div>


                <div className='flex flex-row items-center pl-2 mb-2'>
                    <StarYellowIcon />
                    <p className='text-lg flex-10 text-center text-secondary'>2</p>
                    <div className='flex-1 bg-gray-tertiary h-5 rounded-full'><p className={classNames(calcPercentComentsRate('2',props.comments),'h-full bg-green-secondary rounded-full')}></p></div>
                </div>

                <div className='flex flex-row items-center pl-2 mb-2'>
                    <StarYellowIcon />
                    <p className='text-lg flex-10 text-center text-secondary'>1</p>
                    <div className='flex-1 bg-gray-tertiary h-5 rounded-full'><p className={classNames(calcPercentComentsRate('1',props.comments),'h-full bg-green-secondary rounded-full')}></p></div>
                </div>
            </div>
            <div className='px-3 '>
                <p className='text-center text-5xl font-bold'>{props.avgRating}</p>
                <p className='text-center text-3xl '>{props.commentCount} نظر</p>
            </div>
        </div> : null}

        {urlQueries.get('order') > 0 && props.newCommentStatus === '' && props.canAddComment === 'can' ? <div className={classNames('px-6 my-8 pb-5')}>
                {/* <input type="checkbox" id='new-comment-checkbox' className={classNames('hidden',classes.NewComment__CheckBox)}/>
                 <label htmlFor="new-comment-checkbox" className='flex items-center justify-center bg-primary w-full text-white text-xl font-medium h-20'>افزودن نظر</label> */}
                  <form action="" className='overflow-hidden transition-all duration-700' onSubmit={handleSubmit(handleSubmitNewComment)}>
                <div className='text-5xl bg-gray-tertiary flex flex-row items-center justify-around rounded-2xl px-24 py-6'>
                {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                <button
                    type="button"
                    key={index}
                    className=''
                    onClick={() => setRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                    >
                        <span>
                        {index <= (hover || rating) 
                        ? <StarBlackBigIcon />
                        : <StarStrokeIcon />}
                        
                        </span>
                    </button>
                        );
                })}
                </div>

                    <textarea className='w-full my-5 text-xl py-4 px-5 border-2 border-gray-secondary focus:outline-none'
                      {...register('comment',{required: true })} cols="30" rows="5" placeholder='نظر خود را بیان کنید (اختیاری)'></textarea>
                    {props.loading && rating > 0 
                    ?<Loading />
                    :<ButtonPrimary type='submit'>ثبت نظر</ButtonPrimary>}
                </form> 
            </div>:null}

            {props.comments.length < 1 && !props.loading && !urlQueries.has('order')
           ?<div className='absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2'>
            <NoCommentIcon className='mx-auto'/>
            <p className='text-xl text-center mt-7 whitespace-nowrap'>نظری برای این رستوران ثبت نشده است !</p>
            </div>
            : null}



            <ul className='bg-white mt-12'>
            {props.comments.map(comment=>(
                 <li className='mb-10'>
                 <Comment orderQuantity={3} comment={comment} restaurantSlug={props.match.params.slug}/>
             </li>
            ))}
            </ul>
            </>}
            <SnackBar open={successAddCommentSnackBar} onBackDropClick={handleSnackBarBackDropClick} className='overflow-y-auto'>
                <SuccessIcon className='mx-auto mb-5'/>
                <p className='text-xl font-medium text-center mb-10'>نظر شما با موفقیت ثبت و بعد از تایید کارشناس منتشر خواهد شد.</p>
                <ButtonPrimary className='ml-5' onClick={handleSnackBarBackDropClick}>باشه</ButtonPrimary>
            </SnackBar>


            <SnackBar open={rateErrorSnackBar} className='overflow-y-auto'>
                <WarningIcon className='mx-auto mb-5'/>
                <p className='text-xl font-medium text-center mb-10'>
                    لطفا میزان رای خود را مشخص کنید
                </p>
                <ButtonPrimary className='ml-5' onClick={()=>setRateErrorSnackBar(false)}>فهمیدم</ButtonPrimary>
            </SnackBar>

        </section>
    );
};
const mapStateToProps = state => {
    return {
        token: state.auth.token,
        comments: state.restaurant.comments,
        avgRating: state.restaurant.commentAvgRating,
        commentCount: state.restaurant.restaurantCommentCount,
        loading: state.restaurant.commentsLoading,
        newCommentStatus: state.restaurant.newCommentStatus,
        canAddComment: state.restaurant.canAddCommentStatus

    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onFetchComments: (token,slug) => dispatch(actions.fetchComments(token,slug)),
        onAddComment: (token, slug, rate, comment,orderId) => dispatch(actions.addComment(token, slug, rate, comment,orderId)),
        onResetRestaurantResult: () => dispatch(actions.resetRestaurantStatus()),
        onCheckCanAddComment: (token,orderId) => dispatch(actions.checkCanAddComment(token,orderId)),

    }
  }
export default connect( mapStateToProps, mapDispatchToProps )(Comments);