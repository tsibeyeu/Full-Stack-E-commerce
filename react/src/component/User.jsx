import { useEffect, useState } from "react"
import axiosClient from "../axios-client";

const User = () => {
  const[user,setUser]=useState();
  const[loading,setLoading]=useState(false);
  useEffect(()=>{
    setLoading(true);
    axiosClient.get('users').then(({data})=>{
      // setUser(data);
      console.log(data)
      setLoading(false);
    }).catch(()=>{
      setLoading(false);
    })
  },[]);
  return (
    <div>User</div>
  )
}

export default User