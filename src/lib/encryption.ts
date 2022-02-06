import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

import { SECRET_KEY } from 'constants/encryption';

const ALGORITHM = 'aes-256-ctr';
const ENCODING = 'hex';

const encrypt = (text: string) => {
  const initVector = randomBytes(16);
  const cipher = createCipheriv(ALGORITHM, SECRET_KEY, initVector);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    initVector: initVector.toString(ENCODING),
    content: encrypted.toString(ENCODING),
  };
};

const decrypt = (initVector: string, content: string) => {
  const decipher = createDecipheriv(ALGORITHM, SECRET_KEY, Buffer.from(initVector, ENCODING));
  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(content, ENCODING)),
    decipher.final(),
  ]);

  return decrpyted.toString();
};

export { encrypt, decrypt };
