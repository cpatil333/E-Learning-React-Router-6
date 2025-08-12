import { useQuery } from "@apollo/client";
import { GET_USERS_PAGINATION } from "../apollo/Query";

export const getUserPagination = (pageOptions) => {
  try {
    const { data, loading, error } = useQuery(GET_USERS_PAGINATION, {
      variables: {
        options: {
          page: pageOptions.page,
          limit: pageOptions.limit,
        },
      },
    });
    return { data, loading, error };
  } catch (error) {
    console.log(error);
  }
};
