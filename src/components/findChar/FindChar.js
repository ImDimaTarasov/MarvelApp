import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import {Link} from 'react-router-dom';

import './findChar.scss';


const FindChar = () => {
    const [char, setChar] = useState(null);

    const {loading, getCharacterByName, clearError, error} = useMarvelService();
    
     const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = (name) => {
        clearError();
        getCharacterByName(name)
            .then(onCharLoaded);
    }
    
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !char ? null :  char.length > 0 ? 
        <div className='find__char-form_wrapper'>
            <div className='find__char-message'>There is! Visit {char[0].name+"'s"} page?</div>
            <Link to={`/characters/${char[0].id}`}  className="button button__secondary">
                <div className="inner">GO</div>
            </Link>
        </div> :
        <div>
            <div className="find__char-message find__char-message-error">The character was not found. Check the name and try again</div>
        </div>
    return (
        <div className='find__char-form'>
            <Formik
                initialValues={{
                    charName: ''
                }}
                validationSchema={Yup.object({
                    charName: Yup.string()
                                .required('This field is required')
                })}
                onSubmit = {({charName}) => {
                    updateChar(charName);
                }}
                >
                <Form >
                    <label htmlFor="charName">Or find a character by name:</label>
                        <Field 
                            id="charName"
                            type="text" 
                            name="charName"
                            placeholder="Enter name"
                            
                        />
                        <button type ="submit" className="button button__main" disabled={loading} >
                            <div className="inner">FIND</div>
                        </button>
                    <FormikErrorMessage className=' find__char-message find__char-message-error' name='charName' component="div"/>
                </Form>
            </Formik>
            {errorMessage}
            {content}
        </div>
    )
}

export default FindChar;