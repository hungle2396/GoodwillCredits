import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ReactComponent as CloseIcon } from '../../UI/img/close.svg';

import { useFetchUserQuery } from '../../redux/store';
import { useCreateUserMutation } from '../../redux/store';
import { useEditUserMutation } from '../../redux/store';
import { states } from '../utils/ArrayItems';

const PeopleForm = ({ mode, personData, onClose, onCloseSetting }: any) => {
    const [firstName, setFirstName] = useState<string>(
        mode === 'edit' ? personData.firstName : ''
    );
    const [lastName, setLastName] = useState<string>(
        mode === 'edit' ? personData.lastName : ''
    );
    const [birthday, setBirthday] = useState<string>(
        mode === 'edit' ? personData.birthday : ''
    );
    const [phone, setPhone] = useState<string>(
        mode === 'edit' ? personData.phone : ''
    );
    const [email, setEmail] = useState<string>(
        mode === 'edit' ? personData.email : ''
    );
    const [password, setPassword] = useState<string>(
        mode === 'edit' ? personData.password : ''
    );
    const [address, setAddress] = useState<string>(
        mode === 'edit' ? personData.address : ''
    );
    const [city, setCity] = useState<string>(
        mode === 'edit' ? personData.city : ''
    );
    const [state, setState] = useState<string>(
        mode === 'edit' ? personData.state : ''
    );
    const [zipCode, setZipCode] = useState<string>(
        mode === 'edit' ? personData.zipCode : ''
    );
    const [role, setRole] = useState<string>(
        mode === 'edit' ? personData.role : 'User'
    );

    const { data: userData, isFetching } = useFetchUserQuery();
    const [createUser] = useCreateUserMutation();
    const [editUser] = useEditUserMutation();

    // console.log('eventId: ', eventData.id);

    const renderedStates = states.map((state: string, index: number) => {
        return <option key={index} value={state}>{state}</option>
    });

    console.log('personData: ', personData);

    console.log('role: ', role);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log('in the handleSubmit function in EventForm');
        event.preventDefault();

        const newData = {
            userId: userData.id,
            firstName: firstName,
            lastName: lastName,
            birthday: birthday,
            phone: phone,
            email: email,
            password: password,
            address: address,
            city: city,
            state: state,
            role: role
        }

        console.log('newData: ', newData);
        try {
            if (mode === 'create') {
                
                const response = await createUser(newData);

                console.log('response: ', response);

                // Check if the response come back successfully or not
            }
    
            if (mode === 'edit') {
                
                console.log('newPerson: ', newData);
                const response = await editUser({
                    accountId: personData.id,
                    newData
                });

                console.log('edited response: ', response)

                // Check if the response come back successfully or not
            }
    
            // Close the Event Form
            onClose();
            onCloseSetting();
        } catch (error) {
            console.error('Error during API call: ', error);
        }
        
    };

    return ReactDOM.createPortal (
        <div className='w-full'>
            <div className='absolute inset-0 bg-black-transparent'></div>
            <div className='absolute inset-0 flex flex-col items-center mt-28'>
                <div className='w-[40rem] bg-white p-10 rounded-md relative'>
                    <CloseIcon className='w-8 h-8 absolute top-3 right-3 hover:cursor-pointer' onClick={onClose} />
                    
                    <h1 className='event_title text-4xl font-semibold'>{mode === 'create' ? 'Create New Person' : `Edit ${personData.firstName} ${personData.lastName}`}</h1>

                    <form className='people_form flex flex-col gap-5 mt-10' onSubmit={handleSubmit}>
                        <div className='flex justify-between'>
                            <div className='field-group flex flex-col w-60'>
                                <label className='label' htmlFor='first_name'>First Name</label>
                                <input 
                                    className='input'
                                    type='text'
                                    placeholder='First Name'
                                    value={firstName}
                                    onChange={((e) => setFirstName(e.target.value))}
                                    required 
                                />
                            </div>

                            <div className='field-group flex flex-col w-60'>
                                <label className='label' htmlFor='last_name'>Last Name</label>
                                <input 
                                    className='input'
                                    type='text'
                                    placeholder='Last Name'
                                    value={lastName}
                                    onChange={((e) => setLastName(e.target.value))}
                                    required 
                                />
                            </div>
                        </div>
                        

                        <div className='flex justify-between'>
                            <div className='field-group flex flex-col w-60'>
                                <label className='label' htmlFor='birthday'>Birthday</label>
                                <input 
                                    className='input'
                                    type='date'
                                    value={birthday}
                                    onChange={((e) => setBirthday(e.target.value))}
                                />
                            </div>

                            <div className='field-group flex flex-col w-60'>
                                <label className='label' htmlFor='role'>Role</label>
                                <select
                                    name='role'
                                    className='input resize-none'
                                    id="select"
                                    value={role}
                                    onChange={((e) => setRole(e.target.value))}
                                    required
                                >
                                    <option value='User'>User</option>
                                    <option value='Admin'>Administrator</option>
                                </select>
                            </div>
                        </div>

                        <div className='field group'>
                            <div className='field-group flex flex-col'>
                                <label className='label' htmlFor='Address'>Address</label>
                                <input 
                                    className='input'
                                    type='text'
                                    placeholder='Address'
                                    value={address}
                                    onChange={((e) => setAddress(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <div className='field-group flex flex-col w-60'>
                                <label className='label' htmlFor='city'>City</label>
                                <input 
                                    className='input'
                                    type='text'
                                    placeholder='City'
                                    value={city}
                                    onChange={((e) => setCity(e.target.value))}
                                />
                            </div>

                            <div className='flex w-60 gap-4'>
                                <div className='field-group flex flex-col w-28'>
                                    <label className='label' htmlFor='states'>State</label>
                                    <select
                                        name='states'
                                        className='input resize-none'
                                        id="select"
                                        value={state}
                                        onChange={((e) => setState(e.target.value))}
                                        required
                                    >
                                        {renderedStates}
                                    </select>
                                </div>
                                
                                <div className='field-group flex flex-col w-28'>
                                    <label className='label' htmlFor='zipCode'>Zip Code</label>
                                    <input 
                                        className='input'
                                        type='text'
                                        placeholder='Zip code'
                                        value={zipCode}
                                        maxLength={5}
                                        minLength={5}
                                        onChange={((e) => setZipCode(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className='flex justify-between'>
                            <div className='field-group flex flex-col w-60'>
                                <label className='label' htmlFor='email'>Email</label>
                                <input 
                                    className='input'
                                    type='email'
                                    placeholder='Email'
                                    value={email}
                                    onChange={((e) => setEmail(e.target.value))}
                                    required 
                                />
                            </div>

                            <div className='field-group flex flex-col w-60'>
                                <label className='label' htmlFor='phone'>Phone</label>
                                <input 
                                    className='input'
                                    id='phone'
                                    type='tel'
                                    pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                                    placeholder='510-931-3387'
                                    value={phone}
                                    onChange={((e) => setPhone(e.target.value))}
                                />
                            </div>
                        </div>
                        
                        { (userData.registrationType === 'email' || mode === 'create') && 
                            <div className='field group'>
                                <div className='field-group flex flex-col'>
                                    <label className='label' htmlFor='password'>Password</label>
                                    <input 
                                        className='input'
                                        type='password'
                                        placeholder='password'
                                        value={password} 
                                        onChange={((e) => setPassword(e.target.value))}
                                        required
                                    />
                                </div>
                            </div>
                        }
                        
                        
                        <button className='cancel_btn flex flex-shrink ml-auto btn-primary mt-5'>{mode === 'create' ? <>Create</> : <>Submit</>}</button>
                    </form>
                </div>
            </div>
        </div>, document.querySelector('.modal-container') as Element
    )
};

export default PeopleForm;