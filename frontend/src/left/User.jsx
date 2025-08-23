import React, { useState } from 'react';
import Users from './Users';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
//import useConversation from '../state_manage/useConversation';
import circleLoading from '../assets/Processing Circle.gif';
import { useUserSearch } from '../context/UserSearchContext';

function User() {
  const [loading, setLoading] = useState(false);
  const [allUsersData, setAllUsersData] = useState([]);
  const { searchedUserDetails, hasValue } = useUserSearch();
  //const {selectedConversation} = useConversation();

  useEffect(() => {
    const fetchAllUserDetails = async () => {
      try {
        setLoading(true);
        const dataResponse = await fetch('http://localhost:5002/api/get-allUsers', {
          method: "get",
          credentials: 'include',
          headers: {
            "content-type": "application/json",
          },
        });

        const userData = await dataResponse.json();
        setLoading(false);

        if (userData.success) {
          //console.log("userData", userData.data);

          setAllUsersData(userData.data);
          //console.log("alluserdata",allUsersData);

        } else if (userData.error) {
          toast.error(userData.message);
        }
      } catch (error) {
        //setLoading(false);
        toast.error("An error occurred while fetching all users data." + error);
      }
    };
    fetchAllUserDetails();
  }, [])
  return (
    <div className='flex flex-col gap-1 my-2 h-[calc(100vh-150px)] overflow-y-auto'>
      {
        loading && (
          <div className='flex justify-center my-20'>
          <img src={circleLoading} alt="loading..." className='h-24' />
          </div>
        )
      }

      {
        !loading && allUsersData  === null && !hasValue && (
          <p>No users</p>
        )
      }

      {
        !loading && allUsersData !== 0 && !hasValue && (
          allUsersData.map((users, index) => {
          return (
            <div key={index}>
              <Users allUsersData={users} loading={loading} />
            </div>
          )
        })
        )
      }
      {
        !loading && hasValue && (
          searchedUserDetails.map((users, index) => {
            return(
              <div key={index}>
              <Users allUsersData={users} loading={loading} />
            </div>
            )
          })
        )
      }

    </div>
  )
}

export default User
