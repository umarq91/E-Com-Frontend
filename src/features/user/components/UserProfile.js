import React from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../auth/AuthSlice";

export function UserProfile() {
  const user = useSelector(selectLoggedInUser);
  console.log(user);
  return (
    <div>
      <div className="">
        <div className="mx-auto max-w-7xl mt-6  bg-white px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl font-bold  tracking-tight  text-gray-900">
              {" "}
              Name : {user.name ? user.name : " Guest User "}{" "}
            </h1>

            <h1 className="text-xl font-semibold tracking-tight  text-gray-900">
              {" "}
              Email : {user.email}{" "}
            </h1>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <p className="font-seibold text-lg"> Your Addresses : </p>

            {user.addresses.map((address, index) => (
              <div
                key={index}
                className="flex justify-between p-4 gap-x-6 py-5 border-solid border-2 border-gray-400"
              >
                <div className="flex min-w-0 gap-x-4 ">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-bold leading-6 text-black">
                      {address.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.address}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm font-bold leading-6 text-gray-900">
                    Phone: {address.phone}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {address.city}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
