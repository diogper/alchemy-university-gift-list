const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

const merkleTree = new MerkleTree(niceList);

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main(invitee) {
  // TODO: how do we prove to the server we're on the nice list? 

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    invitee: invitee,
    proof: merkleTree.getProof(niceList.findIndex(n => n === invitee))
  });

  console.log({ gift });
}


readline.question(`What's your name?\n`, name => {
  let invitee = name;
  main(invitee)
  readline.close();
});
