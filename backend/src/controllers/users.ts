import type { RequestHandler } from "express";
import { IUser } from "../types/index.js";
import { db } from "../db/index.mjs";
import { ObjectId } from "mongodb";

const collection = "users";
const userCol = db.collection<IUser>(collection);

const getUserProfile: RequestHandler = async (req, res) => {
  const userId = req?.params?.id || req.body?.decoded?._id;

  if (!ObjectId.isValid(userId)) {
    res.status(403).send({ message: `Invalid user id` });
    return;
  }

  try {
    const result = await userCol.findOne({ _id: new ObjectId(userId) });

    console.log("result: ", result); // [{...}] []

    res.status(200).send({
      message: "User profile fetched!",
      data: {
        _id: result?._id,
        name: result?.name,
        email: result?.email,
        isDoctor: result?.isDoctor,
        experience: result?.experience,
        organization: result?.organization,
        specialization: result?.specialization,
        createdOn: result?.createdOn,
      },
    });
  } catch (err) {
    console.log("error getting data mongodb: ", err);
    res.status(500).send("server error, please try later");
  }
};

const getAllDoctors: RequestHandler = async (req, res) => {
  try {
    const data = await userCol
      .find<IUser>({ isDoctor: true })
      .sort({ _id: -1 })
      .project({ password: 0 })
      .limit(150)
      .toArray();

    if (!data.length) {
      res.status(404).send({ message: "Users Not Found!" });
      return;
    }
    res.status(200).send({ message: "All Users fetched", data });
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Unknown Error" });
  }
};

const checkValidToken: RequestHandler = async (req, res) => {
  res.status(200).send({ message: "token ok" });
};

export { getUserProfile, getAllDoctors, checkValidToken };
