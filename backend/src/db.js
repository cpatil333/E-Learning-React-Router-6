import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const db = {
  user: prisma.user,
  course: prisma.course,
  lesson: prisma.lesson,
  enrollment: prisma.enrollment,
  quiz: prisma.quiz,
  question: prisma.question,
};
