import { PrismaClient } from '@prisma/client';

import { SessionData, UpdateSessionData } from 'types';

const prisma = new PrismaClient();

async function saveSession(data: SessionData) {
  await prisma.session.create({ data });
}

async function updateSession(sessionId: string, data: UpdateSessionData) {
  await prisma.session.update({ where: { sessionId }, data });
}

async function getSessionData(sessionId: string) {
  const sessionData = await prisma.session.findUnique({ where: { sessionId } });

  return sessionData;
}

async function deleteSession(sessionId: string) {
  await prisma.session.delete({ where: { sessionId } });
}

export { saveSession, updateSession, getSessionData, deleteSession };
