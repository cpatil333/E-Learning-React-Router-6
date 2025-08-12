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
export const GET_FILTER_SEARCH = gql`
  query ($filter: FilterInput!) {
    userSearch(filter: $filter) {
      id
      fullName
      email
      role
    }
  }
`;

export const GET_USERS_FILTER = gql`
  query ($filter: SelectInput!) {
    userFilter(filter: $filter) {
      id
      fullName
      email
      role
    }
  }
`;

export const GET_USERS_PAGINATION = gql`
  query ($options: PaginateInput!) {
    userPagination(options: $options) {
      items {
        id
        fullName
        email
        role
      }
      currentPage
      totalItems
      totalPages
      hasNextPage
      hasPreviousPage
    }
  }
`;

export const GET_COURSE_PAGINATION = gql`
  query ($options: PaginateInput!) {
    coursePagination(options: $options) {
      items {
        id
        title
        description
        teacherId
      }
      currentPage
      totalItems
      totalPages
      hasNextPage
      hasPreviousPage
    }
  }
`;
