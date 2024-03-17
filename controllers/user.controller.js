import db from "../models/index.js";

export const getUserDetails = async (userId) => {
  const user = await db.User.findById(userId, {
    id: 1,
    firstName: 1,
    lastName: 1,
    mobileNumber: 1,
    email: 1,
    strongSubjectId: 1,
    university: 1,
    rating: 1,
    course: 1,
    branch: 1,
    cgpa: 1,
  });

  return {
    status: true,
    user,
  };
};
