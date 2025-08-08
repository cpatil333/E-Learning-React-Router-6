export const Enrollment = {
  course: async (parent, arg, context) => {
    return context.db.course.findUnique({
      where: { id: parent.courseId },
    });
  },
  user: async (parent, arg, context) => {
    return context.db.user.findUnique({
      where: { id: parent.userId },
    });
  },
};
