export const User = {
  courses: async (parent, arg, context) => {
    return context.db.user.findMany({
      where: { userId: parent.id },
    });
  },
  enrollments: async (parent, arg, context) => {
    return context.db.enrollment.findMany({
      where: { userId: parent.id },
    });
  },
};
