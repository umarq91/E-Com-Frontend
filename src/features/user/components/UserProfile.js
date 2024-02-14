import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import {useForm} from "react-hook-form";

export function   UserProfile() {
  const user = useSelector(selectUserInfo);
  const disptch = useDispatch();
  const {register,handleSubmit,reset,formState: { errors },} = useForm();

  let [selectedAddress,setSelectedaddress] = useState(-1);

  
  const handleEdit=(data,index)=>{ // data is updated form
    const updatedUser = {...user , addresses:[...user.addresses]} // for shallow copy issues
    updatedUser.addresses.splice(index,1,data)
    console.log(updatedUser);
      disptch(updateUserAsync(updatedUser))
    
  }


  const handleRemove=(e,index)=>{
    const updatedUser = {...user , addresses:[...user.addresses]}
    updatedUser.addresses.splice(index,1)
    console.log(updatedUser);
      disptch(updateUserAsync(updatedUser))
  }



  return (
    <div>
  
        <div className="mx-auto max-w-7xl mt-6  bg-white px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl font-bold  tracking-tight  text-gray-900">
              {" "}
              Name : {user.name ? user?.name : " Guest User "}{" "}
            </h1>

            <h1 className="text-xl font-semibold tracking-tight  text-gray-900">
              {" "}
              Email : {user.email}{" "}
            </h1>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <p className="font-seibold text-lg"> Your Addresses : </p>

            {user.addresses.map((address, index) => (
              <>
          { selectedAddress === index && (
      <form
      className="bg-white px-5 py-5 mt-12 " noValidate
      onSubmit={handleSubmit((data) => {
        handleEdit(data, index);
        reset();
      })}
   >
     <div className="space-y-12 ">
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
                 {...register("name", {
                   required: "name is required",
                 })}
                 id="name"
                 value={address.name}
              
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
                 {...register("phone", {
                   required: "phone Number is required",
                 })}
                 id="phone"
                 value={address.phone}
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
                 {...register("email", {
                   required: "email is required",
                 })}
                 type="email"
                 value={address.email}
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
                 {...register("country")}
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
               Full address
             </label>
             <div className="mt-2">
               <input
                 type="text"
                 {...register("address", {
                   required: "address is required",
                 })}
                 value={address.address}
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
                 {...register("apartment")}
                 id="apartment"
                 value={address.apartment}
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
                 {...register("city", {
                   required: "city is required",
                 })}
                 id="city"
                 value={address.city}
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
                 {...register("zipCode", {
                   required: "postal code is required",
                 })}
                 value={address.zipCode}
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
           onClick={()=>setSelectedaddress(-1)}
         >
           Close
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

         <ul role="list"></ul>
       </div>
     </div>
     </form>
              )  }
           

                <div
                  key={index}
                  className="flex justify-between p-4 my-2 gap-x-6 py-5 border-solid border-2 border-gray-400"
                >
                  <div className="flex min-w-0 gap-x-4 ">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-bold  text-black">
                        {address.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.address}
                      </p>
                    </div>
                  </div>
                  <div className="hidden  sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm font-bold leading-6 text-gray-900">
                      Phone: {address.phone}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      {address.city}
                    </p>
                  </div>
                  <div className="hidden  sm:flex sm:flex-col sm:items-end">
                    <button
                      onClick={(e) => setSelectedaddress(index)}
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleRemove(e, index)}
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
  
    </div>
  );
}
