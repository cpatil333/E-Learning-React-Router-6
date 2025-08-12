import { gql } from "apollo-server";

export const typeDefs = gql`
  scalar DateTime
  type User {
    id: String!
    fullName: String!
    email: String!
    password: String!
    role: String!
    courses: [Course!]!
    enrollments: [Enrollment!]!
  }

  type Course {
    id: String!
    title: String!
    description: String!
    teacher: User!
    teacherId: String!
    lessons: [Lesson!]!
    enrollments: [Enrollment!]!
    Quiz: [Quiz!]!
  }

  type Lesson {
    id: String!
    title: String!
    content: String!
    course: Course!
    courseId: String!
  }

  type Enrollment {
    id: String!
    user: User!
    userId: String!
    course: Course!
    courseId: String!
    enrolledAt: DateTime!
  }

  type Quiz {
    id: String!
    title: String!
    course: Course!
    courseId: String!
    questions: [Question!]
  }

  type Question {
    id: String!
    text: String!
    quiz: Quiz!
    quizId: String!
  }

  input UserInput {
    fullName: String!
    email: String!
    password: String!
    role: String!
  }

  input UserUpdateInput {
    id: ID!
    fullName: String!
    email: String!
    password: String!
    role: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Token {
    user: User
    token: String!
  }

  input CourseInput {
    title: String!
    description: String!
    teacherId: String!
  }

  input CourseUpdateInput {
    id: ID!
    title: String!
    description: String!
    teacherId: String!
  }

  input EnrollmentInput {
    userId: String!
    courseId: String!
  }

  input LessonInput {
    title: String!
    content: String!
    courseId: String!
  }

  input FilterInput {
    search: String!
  }

  input SelectInput {
    fullName: String
    email: String
    role: String
  }

  input PaginateInput {
    page: Int!
    limit: Int!
  }

  type UserPaginationResponse {
    items: [User!]!
    totalItems: Int!
    totalPages: Int!
    currentPage: Int!
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  type CoursePaginationResponse {
    items: [Course!]!
    totalItems: Int!
    totalPages: Int!
    currentPage: Int!
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  type Query {
    users: [User!]!
    userById(id: ID!): User!
    userSearch(filter: FilterInput!): [User!]!
    userFilter(filter: SelectInput!): [User!]!
    userPagination(options: PaginateInput!): UserPaginationResponse!
    coursePagination(options: PaginateInput!): CoursePaginationResponse!
    courses: [Course!]!
    courseById(id: ID!): Course!
    getTeachers: [User!]!
    enrollments: [Enrollment!]!
    lessons: [Lesson!]!
    enrollmentById(id: ID!): Enrollment!
    enrollmentsByUser(userId: ID!): Course!
    enrollmentsByCourse(courseId: ID!): [Enrollment!]!
  }

  type Mutation {
    signup(register: UserInput!): User!
    signin(login: LoginInput!): Token!
    udpateUser(update: UserUpdateInput!): User!
    userDelete(id: ID!): User!
    createCourse(newCourse: CourseInput!): Course!
    udpateCourse(update: CourseUpdateInput!): Course!
    createEnrollment(newEnrollment: EnrollmentInput!): Enrollment!
    createLesson(newLesson: LessonInput!): Lesson!
  }
`;
