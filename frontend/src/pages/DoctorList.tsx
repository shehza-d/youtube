import React, { useState, useEffect } from "react";
import axios from "axios";
import { IUser } from "../types";

export default function DoctorList() {
  const [doctorsData, setDoctorsData] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://products-api-dot-learning-chatbot-393109.lm.r.appspot.com/api/v1/profiles",
        );
        console.log(
          "🚀 ~ file: DoctorList.tsx:14 ~ fetchData ~ response:",
          response,
        );

        const data = response.data.data as IUser[];

        setDoctorsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="my-4 text-2xl font-bold">
        Book your appointment with your Doctor now!
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {doctorsData.map((doctor) => (
          <a
            href={`/profile/${doctor._id}`}
            key={doctor._id}
            className="flex items-center rounded bg-white p-4 shadow-md "
          >
            <img
              className="h-[200px] w-[200px]"
              src="https://cdn3d.iconscout.com/3d/premium/thumb/surgeon-5682858-4731206.png?f=webp"
              alt="doctor image"
            />
            <div>
              <h2 className="mb-2 text-lg font-bold">{doctor.name}</h2>
              <p>
                <strong>Email:</strong> {doctor.email}
              </p>
              <p>
                <strong>Specialization:</strong> {doctor?.specialization}
              </p>
              <p>
                <strong>Experience:</strong> {doctor?.experience} years
              </p>
              <p>
                <strong>Organization:</strong> {doctor?.organization}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
