import { useQuery } from "@apollo/client";
import { GET_TEACHERS } from "../apollo/Query";

export const getTeacherCourses = () => {
  const { data, loading, error } = useQuery(GET_TEACHERS);
  if (loading) return <p>Loading....</p>;
  if (error) {
    console.log("Error, ", error.message);
  }
  try {
    const teacherList = data;
    return teacherList;
  } catch (error) {
    console.log("Error ", error.message);
    console.error("Errot Fething teachers data");
  }
};
