import { Vid } from "../models/vids.js";
import getRandomInt from "./getRandomInt.js";

async function generateId(collection: typeof Vid): Promise<number> {
  const id = getRandomInt(10000, 79999);
  if (String(id).startsWith("6")) return generateId(collection);
  else {
    const alreadyExist = await collection.find({ id });
    if (alreadyExist.length > 0) return generateId(collection);
    else return id;
  }
}

export default generateId;
