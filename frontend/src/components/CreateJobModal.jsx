import { useState } from "react";

function CreateJobModal({
  onClose,
  onCreate
}) {

  const [title, setTitle] =
    useState("");

  const [requiredSkills, setRequiredSkills] =
    useState("");

  const [description, setDescription] =
    useState("");

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    await onCreate({
      title,
      required_skills:
        requiredSkills,
      description
    });

    onClose();
  };

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-lg p-8">

        <h2 className="text-2xl font-bold mb-6">
          Create New Job
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-4"
          />

          <input
            type="text"
            placeholder="Required Skills"
            value={requiredSkills}
            onChange={(e) =>
              setRequiredSkills(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-4"
          />

          <textarea
            placeholder="Description"
            rows="4"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-4"
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 bg-gray-200 rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-3 bg-blue-600 text-white rounded-xl"
            >
              Create Job
            </button>

          </div>

        </form>

      </div>

    </div>

  );
}

export default CreateJobModal;