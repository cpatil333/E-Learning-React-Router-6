import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTeacherCourses } from "../API/getTeacherCourses";
import { useMutation } from "@apollo/client";
import { CREATE_COURSE } from "../apollo/Mutation";

export const courseData = async ({ request }) => {
  try {
    const res = await request.formData();
    const data = Object.fromEntries(res);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const CreateCourse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    teacherId: "select", // initial value//
  });
  const teacherList = getTeacherCourses();
  //console.log(teacherList);
  const [createCourse] = useMutation(CREATE_COURSE);

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
        alert("Please select a teacher from the dropdown list.");
        return;
      }
      console.log(formData);
      const { data } = await createCourse({
        variables: {
          newCourse: formData,
        },
      });
      if (data?.createCourse) {
        alert("Course added successfully!");
        navigate("/course-list");
      }
    } catch (error) {
      console.error("Error ", error.message);
      throw error;
    }
  };

  return (
    <div className="container">
      <h2>New Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Enter Title"
            onChange={handleChange}
          />
        </div>
        <div>
          <textarea
            type="email"
            name="description"
            placeholder="Description"
            rows={5}
            cols={35}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <select name="teacherId" onChange={handleChange}>
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
