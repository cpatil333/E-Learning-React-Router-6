import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getTeacherCourses } from "../API/getTeacherCourses";
import { useMutation } from "@apollo/client";
import { UPDATE_COURSE } from "../apollo/Mutation";

export const EditCourse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    teacherId: "select", // initial value//
  });
  const courseData = useLoaderData();
  const teacherList = getTeacherCourses();
  //console.log(courseData);
  const [udpateCourse] = useMutation(UPDATE_COURSE, {
    onCompleted() {
      navigate("/course-list");
    },
  });

  useEffect(() => {
    if (courseData?.courseById) {
      setFormData({
        title: courseData?.courseById.title,
        description: courseData?.courseById.description,
        teacherId: courseData?.courseById.teacherId,
      });
    }
  }, [courseData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.teacherId === "select") {
        alert("Please select a Teacher for course assign");
        return;
      }
      console.log(formData);
      const { data } = udpateCourse({
        variables: {
          update: {
            id: courseData.courseById.id,
            ...formData,
          },
        },
        awaitRefetchQueries: true,
      });
      if (data?.udpateCourse) {
        alert("Course updated successfully!");
        navigate("/course-list");
      }
    } catch (error) {
      console.error("Error ", error.message);
      throw error;
    }
  };
  return (
    <div className="container">
      <h2>Edit Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Enter Title"
            onChange={handleChange}
          />
        </div>
        <div>
          <textarea
            type="email"
            name="description"
            value={formData.description}
            placeholder="Description"
            rows={5}
            cols={35}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <select
            name="teacherId"
            value={formData.teacherId}
            onChange={handleChange}
          >
            <option value="select">Select</option>
            {teacherList?.getTeachers?.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.fullName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
