import * as nodeCrypto from 'crypto';

globalThis.crypto = nodeCrypto as unknown as Crypto;
