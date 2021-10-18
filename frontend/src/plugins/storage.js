// import { Web3Storage } from 'web3.storage';
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'

function getAccessToken() {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEYzMkUzMDRiOTdjOWJhRDhkNzA2MzE2MkMwMDk3NjZmZTBiNjU3NTYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MzQ0NjU2MTc1NDUsIm5hbWUiOiJ0cnV0aGRpc2NvIn0.BVzh7Cm2YevqAKRe3_7IL_Kd2QlUngaTgt6A-FGJPkc'
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}

const storage = {
  upload: async (file) => {
    const client = makeStorageClient();
    const cid = await client.put(files);
    console.log(cid);
    return cid;
  }
}

export default storage;
