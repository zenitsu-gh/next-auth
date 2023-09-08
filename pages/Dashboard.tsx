"use client"

import React from "react";
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

const Dashboard = () => {
  const { data } = useSession()

  return (
    <div className="grid place-content-center h-screen">
      <div className="p-5 shadow-lg rounded-md border-t-[5px] border-[#24FF00] w-[350px]">
        <h3 className="font-bold text-xl">INFO</h3>
        <div className="flex flex-col gap-3 mt-3">
          <h6 className="font-medium text-[14px]">
            Name: <span className="text-[15px] font-semibold">{data?.user?.name}</span>
          </h6>
          <h6 className="font-medium text-[14px]">
            Email:{" "}
            <span className="text-[15px] font-semibold">{data?.user?.email}</span>
          </h6>
        </div>
        <div className="flex justify-end mt-5">
          <button className="px-6 py-2 text-white rounded bg-[#FA2828] text-[12px]" onClick={() => signOut()}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
