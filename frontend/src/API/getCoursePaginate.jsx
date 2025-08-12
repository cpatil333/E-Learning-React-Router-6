import { useQuery } from "@apollo/client";
import { GET_COURSE_PAGINATION } from "../apollo/Query";

export const getCoursePaginate = (pageOptions) => {
  try {
    const { data, loading, error } = useQuery(GET_COURSE_PAGINATION, {
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
