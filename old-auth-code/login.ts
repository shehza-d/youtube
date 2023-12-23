import type { RequestHandler } from "express";
import { db } from "../../db/index.js";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import { IUser } from "../../types/index.js";
import { SECRET } from "../../config/index.js";

const collection = "users";
const userCol = db.collection<IUser>(collection);

export const loginHandler: RequestHandler = async (req, res, next) => {
  let { email } = req?.body;
  const { password, stayLoggedIn } = req?.body;

  if (!email || !password) {
    res.status(403).send({ message: `Required parameters missing!` });
    return;
  }

  email = email.toLowerCase();

  try {
    const user = await userCol.findOne({ email });

    if (!user) {
      // user not found
      res.status(401).send({ message: "Incorrect email or password!" });
      return;
    }
    // user found

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      res.status(401).send({ message: "Incorrect email or password!" });
      return;
    }

    const token = jwt.sign(
      {
        // we don't add any secret value in this object
        isDoctor: user.isDoctor,
        isAdmin: false,
        name: user.name,
        email,
        _id: user._id,
      },
      SECRET,
      { expiresIn: stayLoggedIn ? "30d" : "1d" }
    );

    // @ts-ignore
    delete user?.password; // password should not be sent to client

    res
      .cookie("myToken", token, {
        httpOnly: true,
        secure: true,
        // expires: new Date(Date.now() + 86400000), // browser delete this cookie after 1 day BUT checking expiration of token is still must
      })
      .status(200)
      .send({ message: "Logged In successfully!", userData: user });
  } catch (err) {
    console.log("error getting data mongodb: ", err);
    res.status(500).send({ message: "Server error, please try again later." });
  }
};
