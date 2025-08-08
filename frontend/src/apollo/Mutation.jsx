import { gql } from "@apollo/client";

export const USER_REGISTER = gql`
  mutation ($register: UserInput!) {
    signup(register: $register) {
      id
      fullName
      email
      role
    }
  }
`;
export const USER_LOGIN = gql`
  mutation ($login: LoginInput!) {
    signin(login: $login) {
      token
      user {
        id
        fullName
        role
      }
    }
  }
`;

export const USER_UPDATE = gql`
  mutation ($update: UserUpdateInput!) {
    udpateUser(update: $update) {
      id
      fullName
      email
      role
    }
  }
`;

export const USER_DELETE = gql`
  mutation ($userDeleteId: ID!) {
    userDelete(id: $userDeleteId) {
      id
      fullName
    }
  }
`;

export const CREATE_COURSE = gql`
  mutation ($newCourse: CourseInput!) {
    createCourse(newCourse: $newCourse) {
      id
      title
      description
      teacherId
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation ($update: CourseUpdateInput!) {
    udpateCourse(update: $update) {
      id
      title
      description
      teacherId
    }
  }
`;
