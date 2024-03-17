import db from "../models/index.js";

export const getAllSubjects = async () => {
  const subjects = await db.Subject.find();

  return {
    status: true,
    subjects,
  };
};

export const getSubject = async (subjectId) => {
  const subject = await db.Subject.findById(subjectId);

  return {
    status: true,
    subject,
  };
};

export const searchSubject = async (subjectPartialOrFullName) => {
  const subjects = await db.Subject.find({
    name: {
      $regex: new RegExp(subjectPartialOrFullName, "i"),
    },
  });

  return {
    status: true,
    subjects,
  };
};
