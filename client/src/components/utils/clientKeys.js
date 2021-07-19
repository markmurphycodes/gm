import { nacl } from 'tweetnacl';

export const getKeysWithSignature = (secret) => {


    return nacl.sign.keyPair(secret);
}