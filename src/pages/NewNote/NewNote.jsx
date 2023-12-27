import React from 'react';
import Toolbar from '../../components/Ui/Toolbar/Toolbar';
import {ReactComponent as RemoveEditIcon} from '../../assets/svgs/removeEditIcon.svg'
import ButtonPrimary from '../../components/Ui/Button/ButtonPrimary';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import { useForm } from "react-hook-form";

const NewNote = (props) => {

    const {
        handleSubmit,
        register,
        formState: { errors }
      } = useForm({defaultValues: {note: props.note,
    }});

    const handleFormSubmit = (data)=>{
        props.onAddNote(data.note);
        props.history.goBack();
    }

    return (
        <section className='h-screen bg-white relative'>
            <Toolbar startIcon={<RemoveEditIcon />}>یادداشت شما</Toolbar> 
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <textarea className='w-full p-6 pb-32 mt-2 text-xl font-medium outline-none text-justify'
                {...register('note',{ })}
                 rows='20' placeholder='یادداشت خود را اینجا بنویسید ...'></textarea>
                <div className='fixed bottom-0 left-0 right-0 p-6'>
                    <ButtonPrimary type='submit'>ذخیره</ButtonPrimary>
                </div>
            </form>
            
        </section>
    );
};


const mapStateToProps = state => {
    return {
        note: state.user.note
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onAddNote: (note) => dispatch(actions.addNote(note)),
    }
  }


export default connect( mapStateToProps, mapDispatchToProps )(NewNote);