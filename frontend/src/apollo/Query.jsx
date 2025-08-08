import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query {
    users {
      id
      fullName
      email
      role
    }
  }
`;
export const GET_USER = gql`
  query ($userById: ID!) {
    userById(id: $userById) {
      id
      fullName
      email
      role
    }
  }
`;

export const GET_COURSES = gql`
  query {
    courses {
      id
      title
      description
    }
  }
`;
export const GET_TEACHERS = gql`
  query {
    getTeachers {
      id
      fullName
      role
    }
  }
`;

export const GET_COURSE = gql`
  query ($courseById: ID!) {
    courseById(id: $courseById) {
      id
      title
      description
      teacherId
    }
  }
`;
