import { useState } from "react";

function EditCandidateModal({
  candidate,
  onClose,
  onUpdate
}) {

  const [formData, setFormData] =
    useState({
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone,
      skills: candidate.skills,
      experience: candidate.experience
    });

  const handleSubmit = () => {

    onUpdate(
      candidate.id,
      formData
    );

  };

  return (

    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

      <div className="bg-white p-8 rounded-2xl w-[500px]">

        <h2 className="text-2xl font-bold mb-6">
          Edit Candidate
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            value={formData.name}
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
            value={formData.email}
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
            value={formData.phone}
            className="w-full border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value
              })
            }
          />

          <textarea
            value={formData.skills}
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
            value={formData.experience}
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
            Update Candidate
          </button>

          <button
            onClick={onClose}
            className="border w-full py-3 rounded-lg"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>

  );

}

export default EditCandidateModal;