export const Course = {
  teacher: async (parent, arg, context) => {
    return context.db.user.findMany({
      where: { id: parent.teacherId },
    });
  },
  lessons: async (parent, arg, context) => {
    return context.db.lesson.findMany({
      where: { courseId: parent.id },
    });
  },
  enrollments: async (parent, arg, context) => {
    return context.db.enrollment.findMany({
      where: { courseId: parent.id },
    });
  },
};
