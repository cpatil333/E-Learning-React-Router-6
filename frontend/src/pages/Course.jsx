import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

export const Course = () => {
  const navigate = useNavigate();
  const courseList = useLoaderData();
  console.log(courseList);

  return (
    <div className="container">
      <h2>Courses List</h2>
      <div>
        <button className="btn" onClick={() => navigate("/create-course")}>
          Add Course
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courseList.courses.map((course) => (
            <tr key={course.id}>
              <td>{course.title}</td>
              <td>{course.description}</td>
              <td>
                <button
                  className="editbtn"
                  onClick={() => navigate(`/update-course/` + course.id)}
                >
                  Edit
                </button>
                <button className="deletebtn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
