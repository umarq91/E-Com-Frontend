import { useState } from "react";
import Cart from "../features/Cart/Cart";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emptyCartAsync, removefromCartAsync, selectItems, updateCartAsync } from "../features/Cart/cartSlice";
import {selectLoggedInUser, updateUserAsync} from "../features/auth/AuthSlice"
import {useForm} from "react-hook-form"
import { createOrderAsync, selectCurrentOrder } from "../features/order/orderSlice";







function CheckOutPage() {

  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const totalAmount = items.reduce((amount, item) => item.price * item.quantity + amount,0);
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  const user = useSelector(selectLoggedInUser);
  const {register,handleSubmit,reset,formState: { errors },} = useForm();

  const currentOrder = useSelector(selectCurrentOrder)


  const handleQuantity = (e, product) => {
    dispatch(updateCartAsync({ ...product, quantity: +e.target.value }));
  };
   
     const handleRemove = (productId) => {
       dispatch(removefromCartAsync(productId));
     };

     const handleAddress = (index) => {
       // Since e can't pass object in html
       setSelectedAddress(user.addresses[index]);
     };

     const handlePaymentMethod = (e) => {
       setPaymentMethod(e.target.value);
     };

     const handleOrder = () => {
       const order = {
         items,
         user,
         totalAmount,
         totalItems,
         paymentMethod,
         selectedAddress,
         status:'pending' // others can be dispatched , received 
       };
       // Todo : after order redirect to order success , remove items from cart  , on server change the number of stocs too..
       dispatch(createOrderAsync(order));
   
      };


    return (
      <>
       {!items.length && <Navigate to={'/'} replace={true} />}
       {currentOrder && <Navigate to={'/order-success/'+currentOrder.id} replace={true} />}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8  gap-y-10 lg:grid-cols-5 ">
          {/* Left Side */}
          <div className="lg:col-span-3">
            <form className="bg-white px-5 py-5 mt-12 " noValidate onSubmit={handleSubmit((data)=>{
           
          dispatch(
        updateUserAsync({...user,addresses:[...user.addresses,data]})
            );
            reset()
            })}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl  font-bold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
       

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                       Full name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('name',{required:'name is required'})}
                          id="name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>



                    <div className="sm:col-span-2">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                       Phone Number
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('phone',{required:'phone Number is required'})}
                          id="phone"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>


                    <div className="sm:col-span-5">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register('email',{required:'email is required'})}
                          type="email"
                          autoComplete="email"
                        placeholder="Email (Please Enter for confirmation & Shipping Updates)"

                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <select
                          id="country"
                          name="country"
                          {...register('country')}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>Pakistan</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full  address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('address',{required:'address is required'})}
                          
                          id="address"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-5">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Apartment / House no 
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('apartment')}
                          id="apartment"
                          placeholder="Apartment , street , suite etc (optional)"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>



                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('city',{required:'city is required'})}
                          id="city"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                 
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('zipCode',{required:'postal code is required'})}
                          id="postal-code"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

            {/* Save address Option */}
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
               Reset
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Address
                </button>
              </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Existing Addresses
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Select an Existing address
                  </p>

                  <ul role="list" >
      { user.addresses.map((address,index) => (
        <li key={index} className="flex justify-between p-4 gap-x-6 py-5 border-solid border-2 border-gray-200">
          <div className="flex min-w-0 gap-x-4 ">
        
          <input
                         value={selectedAddress}
                         onChange={()=>handleAddress(index)} // Since we can't pass object in html 
                            name="address"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
           
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.address}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">Phone: {address.phone}</p>
      
              <p className="mt-1 text-xs leading-5 text-gray-500">
                {address.city}
              </p>
              <p className="text-sm leading-6 text-gray-900"> {address.email}</p>
            
          </div>
        </li>
      ))}
    </ul>

                        {/* CheckBoxes */}
                  <div className="mt-10 space-y-10">
        
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                       Payment Methods
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Choose Option
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="cash"
                            name="payments"
                            type="radio"
                            value="cash"
                            checked={paymentMethod === 'cash'}
                            onChange={handlePaymentMethod}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                           Cash on Devliery
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="card"
                            name="payments"
                            type="radio"
                            checked={paymentMethod === 'card'}
                            value="card"
                            onChange={handlePaymentMethod}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="card"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                           Card Payment
                          </label>
                        </div>

                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>

      
            </form>
          </div>
          <div className="lg:col-span-2">
           

           
          {/* Right,  Cart Side */}
          <div className="mx-auto max-w-7xl mt-12  bg-white  px-2">

<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
<h1 className='text-4xl font-bold tracking-tight  text-gray-900'> Cart</h1>

                  <div className="flow-root">
                    <ul role="list" className="my-6 divide-y divide-gray-200">
                      {items?.map((product) => (
                        <li key={product.id} className="flex py-2">
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
                                  <Link to={product.href}>{product.title}</Link>
                                </h3>
                                <p className="ml-4">{product.price} PKR</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                             <div className='text-gray-500'>

                            <label htmlFor='quantity' className='inline mr-5 text-sm font-medium leading-6 text-gray-900'>
                          QTY
                            </label>
                            <select onChange={(e)=>handleQuantity(e,product)}>
                              <option value="1"> 1 </option>
                              <option value="2"> 2 </option>
                              <option value="3"> 3 </option>
                              <option value="4"> 4 </option>
                              <option value="5"> 5 </option>
                              
              

                            </select>
                             </div>

                              <div className="flex">
                                <button
                                onClick={(e)=>handleRemove(product.id)}
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
          

              <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>{totalAmount} PKR </p>
                </div>
                

                <div className="flex justify-between  text-base font-medium text-gray-900">
                  <p>total Items</p>
                  <p>{totalItems} Items</p>
                </div>

                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6">
                  <div
                   onClick={handleOrder}
                    className="flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Order Now
                  </div>
                </div>
                <div className="mt-6  flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <Link to='/'>
                    <button
                      type="button"
                      className="font-medium m-2 text-indigo-600 hover:text-indigo-500"
                     
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                      </Link>
                  </p>
                </div>
              </div>
                        
              </div>
          </div>
        </div>
      </div>
      </>
    );
}

export default CheckOutPage ;