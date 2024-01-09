import { primsa } from "./userController";

export const getSessionById = async (sessionId: string) => {
  const session = await primsa.session.findUnique({
    where: {
      id: sessionId,
    },
  });

  return session;
};

export const createSession = async (userId: string) => {
  const session = await primsa.session.create({
    data: {
      userId,
    },
  });
  return session;
};
