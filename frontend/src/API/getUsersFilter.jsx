import { useQuery } from "@apollo/client";
import React from "react";
import { GET_USERS_FILTER } from "../apollo/Query";

export const getUsersFilter = (search) => {
  try {
    const usersFilters = useQuery(GET_USERS_FILTER, {
      variables: {
        filter: {
          fullName: search.fullName || null,
          email: search.email || null,
          role: search.role || null,
        },
      },
      skip: !search.fullName && !search.email && !search.role, // skip if no filter
    });
    console.log(usersFilters);
    return usersFilters;
  } catch (error) {
    console.log("Error ", error.message);
  }
};
