import { db } from "../db/index.js";
import { ObjectId } from "mongodb";
import { IAppointment } from "../types/index.js";
import type { Request, Response } from "express";
import { isValid } from "../helpers/index.js";

const collection = "appointments";
const appointmentsCol = db.collection<IAppointment>(collection);

// const getAllFaqs = async (req: Request, res: Response) => {
//   try {
//     const data = await appointmentsCol
//       .find<IAppointment>({})
//       .sort({ _id: -1 })
//       // .project({ password: 0 })
//       .limit(150)
//       .toArray();

//     if (!data.length) {
//       res.status(404).send({ message: "Questions Not Found" });
//       return;
//     }

//     res.status(200).send({ message: "All Faqs fetched", data });
//   } catch (err: any) {
//     res.status(500).send({ message: err.message || "Unknown Error" });
//   }
// };

const getAllAppointments = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(403).send({ message: "Incorrect Doctor id" });
    return;
  }

  try {
    const query = { _id: new ObjectId(id) };

    const data = await appointmentsCol.findOne<IAppointment>(query);

    if (!data) throw Error("Appointment Not Found!");

    res.status(200).send({ message: "Appointment found", data });
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Unknown Error" });
  }
};

const addAppointments = async (req: Request, res: Response) => {
  let { doctorId, patientId, from, till } = req.body as IAppointment;

  // Validation
  if (
    !ObjectId.isValid(doctorId) ||
    !ObjectId.isValid(patientId) ||
    !from ||
    !till
  ) {
    res.status(403).send({ message: "Required parameter missing!" });
    return;
  }

  try {
    const doc = {
      doctorId,
      patientId,
      from,
      till,
      createdOn: new Date(),
    };

    const data = await appointmentsCol.insertOne(doc);

    if (data.acknowledged)
      res.status(201).send({
        message: "New Appointment Booked!",
        id: data.insertedId.toString(),
        data,
      });
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Unknown Error" });
  }
};

// const updateFaq = async (req: Request, res: Response) => {
//   const { question, answer, topic } = req.body;
//   const { id } = req.params;

//   // Validation
//   if (!ObjectId.isValid(id)) {
//     res.status(403).send({ message: "Incorrect FAQ id" });
//     return;
//   }

//   if ((!question && !topic && !answer) || !id) {
//     res.status(403).send({ message: "Required parameter missing!" });
//     return;
//   }
//   if (question && (typeof question !== "string" || question.length > 250)) {
//     res.status(403).send("question missing");
//     return;
//   }
//   if (answer && (typeof answer !== "string" || answer.length > 250)) {
//     res.status(403).send("answer missing");
//     return;
//   }

//   let faq: Partial<IAppointment> = {};

//   answer && (faq.answer = answer);
//   question && (faq.question = question);
//   topic && (faq.topic = topic);

//   try {
//     const filter = { _id: new ObjectId(id) };
//     const updateDoc = { $set: faq };
//     const data = await appointmentsCol.updateOne(filter, updateDoc);

//     if (!data.matchedCount) throw Error("FAQ Not Found!");

//     res.status(201).send({ message: "FAQ updated" });
//   } catch (err: any) {
//     res.status(500).send({ message: err.message || "Unknown Error" });
//   }
// };

// const deleteFaq = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   if (!ObjectId.isValid(id)) {
//     res.status(403).send({ message: "Incorrect FAQ id" });
//     return;
//   }
//   try {
//     const query = { _id: new ObjectId(id) };
//     const result = await appointmentsCol.deleteOne(query);

//     if (!result.deletedCount)
//       throw new Error("No documents matched the query. Deleted 0 documents.");

//     res.status(201).send({ message: "Successfully deleted one document." });
//   } catch (err: any) {
//     res.status(500).send({ message: err.message || "Unknown Error" });
//   }
// };
// const deleteAllFaqs = async (req: Request, res: Response) => {};

export { getAllAppointments, addAppointments };
