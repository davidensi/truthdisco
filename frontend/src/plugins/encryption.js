// import { ethers } from 'ethers';
const { encrypt } = require("eth-sig-util");
const { bufferToHex } = require('ethereumjs-util');


const encryption = {
  encrypt: async (signer, publicKey, submission) => {

    const signedSubmission = await signer.signMessage(submission);

    console.log(signedSubmission);

    const packet = bufferToHex(
      Buffer.from(
        JSON.stringify(
          encrypt(
            publicKey,
            {
              data: submission,
            },
            'x25519-xsalsa20-poly1305',
          )
        ),
        'utf8'
      )
    );

    return packet;

  },

  decrypt: async (packet, provider, address) => {
    const plain = await provider.request({
      method: 'eth_decrypt',
      params: [packet, address]
    });
    return plain;
  }
}

export default encryption;
