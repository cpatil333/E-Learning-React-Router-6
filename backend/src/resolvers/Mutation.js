import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import isAuth from "../middleware/isAuth.js";

export const Mutation = {
  signup: async (parent, { register }, context) => {
    // console.log(register);
    const existEmail = await context.db.user.findFirst({
      where: { email: register.email },
    });

    if (existEmail) {
      throw new Error("This email already exist!");
    }
    const hassedPassword = await bcrypt.hash(register.password, 10);

    const savedUser = await context.db.user.create({
      data: {
        fullName: register.fullName,
        email: register.email,
        password: hassedPassword,
        role: register.role,
      },
    });
    return savedUser;
  },

  signin: async (parent, { login }, context) => {
    // console.log(login);
    const user = await context.db.user.findFirst({
      where: { email: login.email },
    });

    if (!user) {
      throw new Error("This email does not exist!");
    }

    const matchedPassword = await bcrypt.compare(login.password, user.password);

    if (!matchedPassword) {
      throw new Error("Email and Password does not matched!");
    }

    const token = jwt.sign(
      {
        id: user.id,
        fullName: user.fullName,
        role: user.role,
      },
      process.env.SECRET_KEY
    );
    return { user, token };
  },

  createCourse: async (parent, { newCourse }, context) => {
    //console.log(newCourse);
    const { db, user } = context;
    isAuth(user);
    const existCourse = await db.course.findFirst({
      where: { title: newCourse.title },
    });

    if (existCourse) {
      throw new Error("This course already exist.!");
    }

    const savedCourse = await db.course.create({
      data: {
        ...newCourse,
      },
    });
    return savedCourse;
  },

  createEnrollment: async (parent, { newEnrollment }, context) => {
    //console.log(newEnrollment);
    const { user, db } = context; // <- destructure here
    isAuth(user);
    const savedEnrollment = await db.enrollment.create({
      data: {
        userId: newEnrollment.userId,
        courseId: newEnrollment.courseId,
      },
    });

    return savedEnrollment;
  },

  createLesson: async (parent, { newLesson }, context) => {
    //console.log(newCourse);
    const { user, db } = context;
    isAuth(user);
    const existLesson = await db.lesson.findFirst({
      where: { title: newLesson.title },
    });

    if (existLesson) {
      throw new Error("This Lesson already exist.!");
    }

    const savedLesson = await db.lesson.create({
      data: {
        ...newLesson,
      },
    });
    return savedLesson;
  },

  udpateUser: async (parent, { update }, context) => {
    const { user, db } = context;
    isAuth(user);

    const existUser = db.user.findUnique({
      where: { id: update.id },
    });

    if (!existUser) {
      throw new Error("User does not exist!");
    }

    const hassedPassword = await bcrypt.hash(update.password, 10);

    const udpateData = await db.user.update({
      where: { id: update.id },
      data: {
        fullName: update.fullName,
        email: update.email,
        password: hassedPassword,
        role: update.role,
      },
    });
    return udpateData;
  },

  userDelete: async (parent, { id }, context) => {
    const { db, user } = context;
    const userId = id;
    isAuth(user);
    const existUser = db.user.findUnique({
      where: { id: userId },
    });

    if (!existUser) {
      throw new Error("User does not exist!");
    }
    const deleteUser = await db.user.delete({
      where: { id: userId },
    });
    return deleteUser;
  },

  udpateCourse: async (parent, { update }, context) => {
    const { user, db } = context;
    isAuth(user);

    const existCourse = db.course.findUnique({
      where: { id: update.id },
    });

    if (!existCourse) {
      throw new Error("Course does not exist!");
    }

    const udpateData = await db.course.update({
      where: { id: update.id },
      data: {
        title: update.title,
        description: update.description,
        teacherId: update.teacherId,
      },
    });
    return udpateData;
  },
};
