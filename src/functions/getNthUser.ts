import { User } from "./../models/users.js";

async function getNthUser(collection: typeof User) {
  const nthList = await collection.find().sort({ th: -1 });
  return nthList.length !== 0 ? nthList[0].th + 1 : 1;
}

export default getNthUser;
