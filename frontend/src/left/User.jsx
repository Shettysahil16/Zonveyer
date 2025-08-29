import React, { useState } from "react";
import Users from "./Users";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useConversation from "../state_manage/useConversation";
import circleLoading from "../assets/Processing Circle.gif";
import { useUserSearch } from "../context/UserSearchContext";

function User() {
  const [loading, setLoading] = useState(false);
  //const [allUsersData, setAllUsersData] = useState([]);
  const { searchedUserDetails, hasValue } = useUserSearch();
  const { setConversations, sortedUsersData, setSortedUsersData } =
    useConversation();

  useEffect(() => {
    const fetchAllUserDetails = async () => {
      try {
        setLoading(true);
        const dataResponse = await fetch(
          "http://localhost:5002/api/get-allUsers",
          {
            method: "get",
            credentials: "include",
            headers: {
              "content-type": "application/json",
            },
          }
        );

        const userData = await dataResponse.json();
        //console.log(userData.data);

        const convResponse = await fetch(
          "http://localhost:5002/api/message/get-conversations",
          {
            method: "get",
            credentials: "include",
            headers: {
              "content-type": "application/json",
            },
          }
        );

        const convData = await convResponse.json();
        //console.log(convData);
        setLoading(false);

        if (userData.success) {
          const allUsers = userData.data || [];
          const allConversations = Array.isArray(convData.data)
            ? convData.data
            : [];
          //console.log("all conv", allConversations);

          // merge conversations into users
          const mergedList = allUsers.map((user) => {
            const conv = allConversations.find((c) =>
              c.participants.some((p) => p._id === user._id)
            );
            return conv ? { ...conv, ...user } : user;
          });

          // sort by last message date
          const sortedList = mergedList.sort((a, b) => {
            const aDate = a.lastMessage?.createdAt
              ? new Date(a.lastMessage.createdAt)
              : 0;
            const bDate = b.lastMessage?.createdAt
              ? new Date(b.lastMessage.createdAt)
              : 0;
            return bDate - aDate;
          });
          console.log("sortedList", sortedList);
          //setAllUsersData(sortedList);  // ✅ final merged + sorted users
          setSortedUsersData(sortedList);
          setConversations(allConversations); // ✅ keep raw conversations if needed elsewhere
        } else if (userData.error) {
          toast.error(userData.message);
        }
      } catch (error) {
        //setLoading(false);
        toast.error("An error occurred while fetching all users data." + error);
      }
    };
    fetchAllUserDetails();
  }, [setConversations, setSortedUsersData]);

  return (
    <div className="flex flex-col gap-1 my-2 h-[calc(100vh-150px)] overflow-y-auto">
      {loading && (
        <div className="flex justify-center my-20">
          <img src={circleLoading} alt="loading..." className="h-24" />
        </div>
      )}

      {!loading && sortedUsersData === null && !hasValue && <p>No users</p>}

      {!loading &&
        sortedUsersData !== 0 &&
        !hasValue &&
        sortedUsersData.map((users, index) => {
          return (
            <div key={index}>
              <Users allUsersData={users} loading={loading} />
            </div>
          );
        })}
      {!loading &&
        hasValue &&
        searchedUserDetails.map((users, index) => {
          return (
            <div key={index}>
              <Users allUsersData={users} loading={loading} />
            </div>
          );
        })}
    </div>
  );
}

export default User;
