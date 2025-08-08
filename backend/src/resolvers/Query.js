import isAuth from "../middleware/isAuth.js";
export const Query = {
  users: async (parent, args, context) => {
    return await context.db.user.findMany();
  },
  enrollments: async (parent, args, context) => {
    return await context.db.enrollment.findMany();
  },
  courses: async (parent, args, context) => {
    return await context.db.course.findMany();
  },
  lessons: async (parent, args, context) => {
    return await context.db.lesson.findMany();
  },

  enrollmentById: async (parent, { id }, context) => {
    const { db, user } = context;
    const enrollmentId = id;
    //console.log(enrollmentId);
    isAuth(user);
    const data = await db.enrollment.findUnique({
      where: { id: enrollmentId },
    });
    return data;
  },

  enrollmentsByUser: async (parent, { userId }, context) => {
    const { db, user } = context;
    const enrollmentUserId = userId;
    //console.log(enrollmentId);
    isAuth(user);
    const data = await db.enrollment.findMany({
      where: { userId: enrollmentUserId },
    });
    return data;
  },

  enrollmentsByCourse: async (parent, { courseId }, context) => {
    const { db, user } = context;
    const enrollmentCourseId = courseId;
    isAuth(user);
    const data = await db.enrollment.findMany({
      where: { courseId: enrollmentCourseId },
    });
    return data;
  },

  userById: async (parent, { id }, context) => {
    const { db, user } = context;
    const userId = id;
    isAuth(user);
    const data = await db.user.findUnique({
      where: { id: userId },
    });
    return data;
  },

  getTeachers: async (parent, arg, context) => {
    const { db, user } = context;
    isAuth(user);
    return await db.user.findMany({
      where: { role: "teacher" },
    });
  },

  courseById: async (parent, { id }, context) => {
    const { db, user } = context;
    const courseId = id;
    isAuth(user);
    const data = await db.course.findUnique({
      where: { id: courseId },
    });
    return data;
  },
};
