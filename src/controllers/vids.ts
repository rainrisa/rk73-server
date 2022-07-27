import { Request, Response } from "express";
import generateId from "../functions/generateId.js";
import getNthVid from "../functions/getNthVid.js";
import { Vid } from "../models/index.js";

export async function createVid(req: Request, res: Response) {
  try {
    const newVid = new Vid({
      id: await generateId(Vid),
      th: await getNthVid(Vid),
      name: req.body.name,
      image: req.body.image,
      hash: req.body.hash,
      click: 0,
      link: req.body.link,
      since: +new Date(),
    });
    const result = await newVid.save();
    return res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getAllVids(req: Request, res: Response) {
  try {
    const vid = await Vid.find();
    return res.send(vid);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getVid(req: Request, res: Response) {
  try {
    // https://stackoverflow.com/a/30314448
    if (Number(req.params.id) === Number(req.params.id)) {
      const vid = await Vid.findOne({ id: req.params.id });
      return res.send(vid);
    } else {
      const vid = await Vid.findOne({ name: req.params.id });
      return res.send(vid);
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getExpiredVids(req: Request, res: Response) {
  try {
    const timeNow = +new Date();
    const timeExpired = timeNow - 4665600000; // 54 days
    const vidHasExpired = await Vid.where("since").lt(timeExpired);

    return res.send(vidHasExpired);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function updateVidInfo(req: Request, res: Response) {
  try {
    if (
      Object.keys(req.body).length === 0 &&
      Object.getPrototypeOf(req.body) === Object.prototype
    ) {
      return res.status(400).send({ message: "Request body is empty" });
    }
    const result = await Vid.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    return res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function updateVidClick(req: Request, res: Response) {
  try {
    const result = await Vid.findOneAndUpdate(
      { id: req.params.id },
      { $inc: { click: 1 } },
      { new: true }
    );
    return res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
}
