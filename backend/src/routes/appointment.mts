import express from "express";
import {
  getAllAppointments,
  addAppointments,
} from "../controllers/appointments.js";

const router = express.Router();

router.get("/appointments/:id", getAllAppointments);
router.post("/appointment", addAppointments);
// router.patch("/appointment/:id", updateFaq); //not now
// router.delete("/appointment/:id", deleteFaq); //not now
// router.delete("/faqs", deleteAllFaqs);

export { router as crudRouter };
