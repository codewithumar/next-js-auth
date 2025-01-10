"use client";
import { signIn,signOut,useSession } from 'next-auth/react';
import React from 'react'

const DashBoard = () => {
  const { data : session } = useSession();
  return (
    <>
    {
        session ? (
            <div>
                    <div>
                    {/* <img src={session?.user?.image ?? ""} alt="User Image" /> */}
                    <p>Welcome {session?.user?.email ?? ""}</p>
                    <button onClick={()=>signOut()}>Sign out</button>
                    </div>
            </div>
        ) : (
            <div>
                <h1>Not Signed In</h1>
                <br/>
                <button onClick={()=>signIn("github")}>Sign In with Github</button>
                <br/>
                <button onClick={()=>signIn("google")}>Sign In with Google</button>
                <br/>
                <button onClick={()=>
                signIn("credentials", {
                  "email":'jsmith',
                  "password":"securepassword123",
                })
                }>Sign In with Creds</button>
            </div>
        )
    }
    </>
   
  )
}

export default DashBoard
