const { encrypt } = require("eth-sig-util");
const { bufferToHex } = require('ethereumjs-util');

// import addresses from '../contracts/addresses.json';
// import { ethers } from 'ethers';

const encryption = {
  encrypt: async (signer, publicKey, submission) => {

    const signedSubmission = "" + submission;

    const packet = bufferToHex(
      Buffer.from(
        JSON.stringify(
          encrypt(
            publicKey,
            { data: signedSubmission },
            'x25519-xsalsa20-poly1305',
          )
        ),
        'utf8'
      )
    );

    return packet;

  },
}

export default encryption;
