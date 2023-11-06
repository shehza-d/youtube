import type { RequestHandler } from "express";
import { db } from "../../db/index.mjs";
import { stringToHash } from "bcrypt-inzi";
import { IUser } from "../../types/index.js";
import { isValid } from "../../helpers/index.js";

const collection = "users";
const userCol = db.collection<IUser>(collection);

export const signupHandler: RequestHandler = async (req, res, next) => {
  let {
    name,
    email,
    password,
    isDoctor,
    organization,
    experience,
    specialization,
  } = req?.body as IUser;

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; // testing left

  if (
    !isValid(name) ||
    !isValid(email) ||
    !isValid(password) ||
    typeof isDoctor === "undefined"
    // !isValid(organization) ||
    // !isValid(experience) ||
    // !isValid(specialization)this is not req for Patient
  ) {
    // validation of length and type is required
    res.status(403).send({ message: `Required parameters missing!` });
    return;
  }
  if (!emailRegex.test(email)) {
    res.status(403).send({ message: `Please enter a valid Email!` });
    return;
  }

  email = email.toLowerCase();
  name = name.toLowerCase();

  try {
    const result = await userCol.findOne({ email });

    if (result) {
      // user already exists
      res.status(403).send({ message: "User already exist with this email." });
      return;
    }
    // user not found

    const passwordHash = await stringToHash(req.body.password);

    const doc = isDoctor
      ? {
          isDoctor: true,
          name,
          email,
          password: passwordHash,
          organization,
          experience,
          specialization,
          createdOn: new Date(),
        }
      : {
          isDoctor: false,
          name,
          email,
          password: passwordHash,
          createdOn: new Date(),
        };

    const insertResponse = await userCol.insertOne(doc);

    res.status(200).send({ message: "Signup successfully!", insertResponse });
  } catch (err) {
    console.log("error getting data mongodb: ", err);
    res.status(500).send({ message: "Server error, please try again later." });
  }
};
