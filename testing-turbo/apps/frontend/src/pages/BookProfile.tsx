import { useState } from "react";

export default function BookProfile() {
  const [formData, setFormData] = useState({
    patientName: "",
    date: "",
    time: "",
    // Add more fields as needed
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // You can handle form submission here, such as sending data to an API
    console.log("Form submitted with:", formData);
    // Add your logic for appointment booking, for example, sending data to an API
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto flex flex-col items-center">
      <h1 className="my-4 text-center text-3xl font-bold">Doctors Profile</h1>
      <div className="margin-auto w-[90%]  md:w-[50%]">
        <div className="mb-6 flex items-center rounded bg-white p-6 shadow-md">
          <img
            className="h-[200px] w-[200px]"
            src="https://cdn3d.iconscout.com/3d/premium/thumb/surgeon-5682858-4731206.png?f=webp"
          />
          <div>
            {/* Doctor's profile information can be displayed here */}
            <h2 className="mb-4 text-xl font-bold">Dr. John Doe</h2>
            <p>Specialization: Cardiologist</p>
            <p>Experience: 10 years</p>
            {/* Add more profile details as needed */}
          </div>
        </div>
        <div className="rounded bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold">Book an Appointment</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="patientName"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Patient Name
              </label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                placeholder="Enter patient's name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="date"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="time"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
              />
            </div>
            {/* Add more fields for the appointment form as needed */}
            <button
              type="submit"
              className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
