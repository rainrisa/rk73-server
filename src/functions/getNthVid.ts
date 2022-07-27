import { Vid } from "../models/vids.js";

async function getNthVid(collection: typeof Vid) {
  const nthList = await collection.find().sort({ th: -1 });
  return nthList.length !== 0 ? nthList[0].th + 1 : 1;
}

export default getNthVid;
