import { PrismaClient } from '@prisma/client';

import { SessionData } from 'types';

const prisma = new PrismaClient();

async function saveSession(data: SessionData) {
  await prisma.session.create({ data });
}

async function updateSession(data: SessionData) {
  await prisma.session.update({ where: { sessionId: data.sessionId }, data });
}

async function getSessionData(encryptedSessionId: string) {
  const sessionData = await prisma.session.findUnique({ where: { sessionId: encryptedSessionId } });

  return sessionData;
}

async function deleteSession(encryptedSessionId: string) {
  await prisma.session.delete({ where: { sessionId: encryptedSessionId } });
}

export { saveSession, updateSession, getSessionData, deleteSession };
