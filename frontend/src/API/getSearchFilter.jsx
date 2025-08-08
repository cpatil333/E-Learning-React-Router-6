import React from "react";
import { useQuery } from "@apollo/client";
import { GET_FILTER_SEARCH } from "../apollo/Query";

export const getSearchFilter = (filter) => {
  try {
    const filterData = useQuery(GET_FILTER_SEARCH, {
      variables: { filter: { search: filter } }, // adjust to your FilterInput shape
      skip: !filter,
    });
    console.log(filterData);
    return filterData;
  } catch (error) {
    console.log(error.message);
  }
};
