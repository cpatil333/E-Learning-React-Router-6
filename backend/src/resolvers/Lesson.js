export const Lesson = {
  course: async (parent, arg, context) => {
    return context.db.course.findMany({
      where: { id: parent.courseId },
    });
  },
};
