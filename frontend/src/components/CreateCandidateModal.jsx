import { useState } from "react";

function CreateCandidateModal({
  onClose,
  onCreate
}) {

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      skills: "",
      experience: 0
    });

  const handleSubmit = () => {
    onCreate(formData);
    onClose();
  };

  return (

    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

      <div className="bg-white p-8 rounded-2xl w-[500px]">

        <h2 className="text-2xl font-bold mb-6">
          Add Candidate
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Name"
            className="w-full border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value
              })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Phone"
            className="w-full border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value
              })
            }
          />

          <textarea
            placeholder="Skills"
            className="w-full border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({
                ...formData,
                skills: e.target.value
              })
            }
          />

          <input
            type="number"
            placeholder="Experience"
            className="w-full border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({
                ...formData,
                experience: Number(
                  e.target.value
                )
              })
            }
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg w-full"
          >
            Create Candidate
          </button>

        </div>

      </div>

    </div>

  );

}

export default CreateCandidateModal;