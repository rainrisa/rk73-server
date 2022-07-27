import { Request, Response } from "express";
import getNthUser from "../functions/getNthUser.js";
import { User } from "../models/users.js";

export async function createUser(req: Request, res: Response) {
  try {
    const newUser = new User({
      id: req.params.telegramId,
      th: await getNthUser(User),
      click: 0,
      point: 0,
      since: +new Date(),
    });
    const result = await newUser.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await User.find();
    return res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const user = await User.findOne({ id: req.params.telegramId });
    return res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function updateUserClick(req: Request, res: Response) {
  try {
    const result = await User.findOneAndUpdate(
      { id: req.params.telegramId },
      { $inc: { click: 1 } },
      { new: true }
    );
    return res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function updateUserPoint(req: Request, res: Response) {
  try {
    const result = await User.findOneAndUpdate(
      { id: req.params.telegramId },
      { $inc: { point: 1 } },
      { new: true }
    );
    return res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function takeUserPoint(req: Request, res: Response) {
  try {
    const result = await User.findOneAndUpdate(
      { id: req.params.telegramId, point: { $gte: 3 } },
      { $inc: { point: -3 } },
      { new: true }
    );
    return result
      ? res.send(result)
      : res.status(400).send({ message: "User points is not enough" });
  } catch (err) {
    res.status(500).send(err);
  }
}
