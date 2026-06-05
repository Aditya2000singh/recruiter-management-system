import { useEffect, useState } from "react";

import CreateCandidateModal from "../components/CreateCandidateModal";

import EditCandidateModal from "../components/EditCandidateModal";

import {
  getCandidates,
  createCandidate,
  updateCandidate,
  deleteCandidate
} from "../services/candidateService";

import {
  getAllJobs,
  assignCandidate,
  scoreCandidate
} from "../services/jobService";

function Candidates() {

  const [candidates, setCandidates] =
    useState([]);

  const [jobs, setJobs] =
    useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [editCandidate,
  setEditCandidate] =
  useState(null);

  useEffect(() => {

    fetchCandidates();
    fetchJobs();

  }, []);

  const fetchCandidates = async () => {

    try {

      const data =
        await getCandidates();

      setCandidates(data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchJobs = async () => {

    try {

      const data =
        await getAllJobs();

      setJobs(data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleUpdateCandidate =
  async (
    candidateId,
    candidateData
  ) => {

    try {

      await updateCandidate(
        candidateId,
        candidateData
      );

      fetchCandidates();

      setEditCandidate(null);

    } catch (error) {

      console.log(error);

      alert(
        "Update Failed"
      );

    }

  };

  const handleCreateCandidate =
    async (candidateData) => {

      try {

        await createCandidate(
          candidateData
        );

        fetchCandidates();

        setShowModal(false);

      } catch (error) {

        console.log(error);

        alert(
          "Unable to create candidate"
        );

      }

    };

  return (

    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Candidates
          </h1>

          <p className="text-gray-500 mt-2">
            Manage and review applicants
          </p>

        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-blue-600 text-white px-5 py-3 rounded-xl"
        >
          + Add Candidate
        </button>

      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="p-5 text-left">
                Candidate
              </th>

              <th className="p-5 text-left">
                Skills
              </th>

              <th className="p-5 text-left">
                Experience
              </th>

              <th className="p-5 text-left">
                AI Score
              </th>

              <th className="p-5 text-left">
                Assign Job
              </th>

              <th className="p-5 text-left">
                Score
              </th>

              <th className="p-5 text-left">
                Edit
              </th>

              <th className="p-5 text-left">
                Delete
              </th>

            </tr>

          </thead>

          <tbody>

            {candidates.map((candidate) => (

              <tr
                key={candidate.id}
                className="border-t"
              >

                <td className="p-5">

                  <div className="font-semibold">
                    {candidate.name}
                  </div>

                  <div className="text-gray-500 text-sm">
                    {candidate.email}
                  </div>

                </td>

                <td className="p-5 max-w-md">
                  {candidate.skills}
                </td>

                <td className="p-5">
                  {candidate.experience} Years
                </td>

                <td className="p-5">

                  <div>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {candidate.fit_score ?? "Not Scored"}
                  </span>

                  {candidate.fit_reason && (

                    <button
                      className="ml-3 text-blue-600 underline"
                      onClick={() =>
                        alert(candidate.fit_reason)
                      }
                    >
                      View Reason
                    </button>

                  )}

                </div>

                </td>

                <td className="p-5">

                  <select
                    className="border rounded-lg p-2"
                    defaultValue={
                      candidate.job_id || ""
                    }
                    onChange={async (e) => {

                      if (!e.target.value) {
                        return;
                      }

                      try {

                        await assignCandidate(
                          candidate.id,
                          e.target.value
                        );

                        setCandidates((prev) =>
                          prev.map((c) =>
                            c.id === candidate.id
                              ? {
                                  ...c,
                                  job_id: Number(
                                    e.target.value
                                  )
                                }
                              : c
                          )
                        );

                        alert(
                          "Assigned Successfully"
                        );

                      } catch (error) {

                        console.log(error);

                      }

                    }}
                  >

                    <option value="">
                      Select Job
                    </option>

                    {jobs.map((job) => (

                      <option
                        key={job.id}
                        value={job.id}
                      >
                        {job.title}
                      </option>

                    ))}

                  </select>

                </td>

                <td className="p-5">

                  <button

                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"

                    onClick={async () => {

                      if (!candidate.job_id) {

                        alert(
                          "Assign Job First"
                        );

                        return;

                      }

                      try {

                        const result =
                          await scoreCandidate(
                            candidate.job_id,
                            candidate.id
                          );

                        setCandidates((prev) =>
                          prev.map((c) =>
                            c.id === candidate.id
                              ? {
                                  ...c,
                                  fit_score:
                                    result.fit_score
                                }
                              : c
                          )
                        );

                        alert(
                          `Score: ${result.fit_score}`
                        );

                      } catch (error) {

                        console.log(error);

                        alert(
                          "Scoring Failed"
                        );

                      }

                    }}

                  >

                    Score

                  </button>

                </td>

                <td className="p-5">

                  <button

                    onClick={() =>
                      setEditCandidate(
                        candidate
                      )
                    }

                    className="bg-amber-500 text-white px-4 py-2 rounded-lg"

                  >

                    Edit

                  </button>

                </td>

                <td className="p-5">

                  <button

                    className="bg-red-500 text-white px-4 py-2 rounded-lg"

                    onClick={async () => {

                      const confirmDelete =
                        window.confirm(
                          "Delete candidate?"
                        );

                      if (!confirmDelete) {
                        return;
                      }

                      try {

                        await deleteCandidate(
                          candidate.id
                        );

                        fetchCandidates();

                      } catch (error) {

                        console.log(error);

                        alert(
                          "Delete Failed"
                        );

                      }

                    }}

                  >

                    Delete

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {showModal && (

        <CreateCandidateModal
          onClose={() =>
            setShowModal(false)
          }
          onCreate={
            handleCreateCandidate
          }
        />

      )}

      {editCandidate && (

      <EditCandidateModal

        candidate={
          editCandidate
        }

        onClose={() =>
          setEditCandidate(null)
        }

        onUpdate={
          handleUpdateCandidate
        }

      />

    )}

    </div>

  );

}

export default Candidates;