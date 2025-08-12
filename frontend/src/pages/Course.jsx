import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getCoursePaginate } from "../API/getCoursePaginate";

export const Course = () => {
  const navigate = useNavigate();
  const courseList = useLoaderData();
  //console.log(courseList);
  // calling pagination user data
  const [page, setPage] = useState(1);
  const limit = 4; // how many rows per page

  //calling pagination user data
  const { data: paginateData } = getCoursePaginate({
    page,
    limit,
  });

  // build a source list fallback (filtered if present else loader)
  const sourceList = courseList?.courses;

  // totalPages fallback: prefer server-provided, otherwise compute from local source
  const totalPages =
    paginateData?.coursePagination?.totalPages ??
    Math.max(1, Math.ceil((sourceList.length || 0) / limit));

  // clamp page if totalPages changed (prevents page > totalPages)
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
    if (page < 1) setPage(1);
  }, [totalPages, page]);

  const displayCourse =
    paginateData?.coursePagination.items || courseList.courses;

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
          {displayCourse.map((course) => (
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
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>

        {Array.from(
          { length: paginateData?.coursePagination?.totalPages || 1 },
          (_, i) => (
            <button
              key={i}
              className={page === i + 1 ? "active" : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          )
        )}

        <button
          disabled={page === paginateData?.coursePagination?.totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
