import db from "../models/index.js";

export const askDoubt = async (userId, subjectId, question) => {
  const doubt = new db.Doubt({
    askerUserId: userId,
    subjectId,
    question,
  });

  const savedDoubt = await doubt.save();

  return {
    status: true,
    message: "Doubt asked successfully!",
    doubtId: savedDoubt.id,
  };
};

export const getDoubt = async (doubtId) => {
  const doubt = await db.Doubt.findById(doubtId);

  return {
    status: true,
    doubt,
  };
};

export const getAllDoubts = async (userId) => {
  const doubts = await db.Doubt.find({
    askerUserId: userId,
  });

  return {
    status: true,
    doubts,
  };
};

export const getSolversList = async (subjectId) => {
  const solvers = await db.User.find(
    {
      strongSubjectId: subjectId,
    },
    {
      id: 1,
      firstName: 1,
      lastName: 1,
      university: 1,
      rating: 1,
      course: 1,
      branch: 1,
      cgpa: 1,
    }
  );

  return {
    status: true,
    solvers,
  };
};

export const acceptDoubtRequest = async (userId, doubtId) => {
  const doubt = await db.Doubt.findById(doubtId);

  if (!doubt) {
    return {
      status: false,
      message: "Doubt not found!",
    };
  }

  if (doubt.askerUserId !== userId) {
    return {
      status: false,
      message: "You are not authorized to accept this doubt request!",
    };
  }

  if (doubt.isSolved) {
    return {
      status: false,
      message: "Doubt is already solved!",
    };
  }

  if (doubt.solverUserId) {
    return {
      status: false,
      message: "Doubt is already accepted by someone else!",
    };
  }

  doubt.solverUserId = userId;
  await doubt.save();

  return {
    status: true,
    message: "Doubt accepted successfully!",
  };
};
