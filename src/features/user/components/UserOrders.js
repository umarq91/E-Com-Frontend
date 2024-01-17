import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserOrders } from '../userSlice';

import { Navigate } from 'react-router-dom';


export  function UserOrders() {
 
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user?.id));
  }, [user?.id]);
// Todo  : I can add more info like address , Shipping things etc
  return (
    <div>
        {!user && <Navigate to={"/"} replace={true}/>}
      <div className='font-poppins'>
    {orders.map((order,index)=>(
        <div className="mx-auto max-w-7xl mt-6  bg-white px-4 sm:px-6 lg:px-8">
           

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <h1 className='text-xl font-semibold font-poppins tracking-tight  text-gray-900'>  Order ID #{order.id} </h1>
        <p className='text-green-600'> Order Status : {order.status} </p>
        <h1 className='text-4xl font-bold tracking-tight  text-gray-900'>   Items In This Order </h1>

  
                          <div className="flow-root">
                            <ul role="list" className="-my-4 divide-y divide-gray-200">
                              {order.items?.map((product) => (
                                <li key={product.id} className="flex pt-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.thumbnail}
                                      alt={product.title}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>
  
                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <h1 to={product.href}>{product.title}</h1>
                                        </h3>
                                        <p className="ml-4">{product.price} PKR</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                     <div className='text-gray-500'>
  
                                    <label htmlFor='quantity' className='inline mr-5 text-sm font-medium leading-6 text-gray-900'>
                                  QTY {product.quantity}
                                    </label>
    
                                     </div>
  
  
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                  
  
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p className='font-bold text-lg underline'> {order.totalAmount} PKR </p>
                        </div>
                        
  
                        <div className="flex justify-between py-2 text-base font-medium text-gray-900">
                          <p>total Items</p>
                          <p>{order.totalItems} Items</p>
                        </div>
  
                        <hr className='h-1 bg-gray-400'/>
                          
                      </div>
                                
                      </div>
    ))}
      </div>
    </div>
  );
}
