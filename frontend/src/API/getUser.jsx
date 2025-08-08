import { useQuery } from "@apollo/client";
import { GET_USER } from "../apollo/Query";

export const getUser = async ({ params }) => {
  const userId = params.id;
  const { data, loading, error } = await useQuery(GET_USER, {
    variables: {
      userById: userId,
    },
  });
  if (loading) return <p>Loading....</p>;
  if (error) {
    console.log("Error, ", error.message);
  }
  try {
    const userData = data;
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    throw error;
  }
};
