import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoggedInUserOrdersAsync, selectUserOrders } from '../userSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';


export  function UserOrders() {
 
  const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser)


    const orders = useSelector(selectUserOrders)
    console.log(orders);
    useEffect(()=>{

        dispatch(fetchLoggedInUserOrdersAsync(user.id))

    },[])

  return (
    <div>
      <div className=''>
      
      </div>
    </div>
  );
}
