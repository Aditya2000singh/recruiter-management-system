import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import CreateJobModal from "../components/CreateJobModal";

import {
  getJobs,
  createJob,
  deleteJob
} from "../services/jobService";

function Jobs() {

  const [jobs, setJobs] =
    useState([]);

  const [showModal,
    setShowModal] =
    useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {

    try {

      const data =
        await getJobs();

      setJobs(data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleCreateJob =
    async (jobData) => {

      try {

        await createJob(
          jobData
        );

        fetchJobs();

      } catch (error) {

        console.log(error);

        alert(
          "Unable to create job"
        );

      }

    };

  return (

    <DashboardLayout>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Jobs
          </h1>

          <p className="text-slate-500 mt-1">
            Manage all job openings
          </p>

        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          + Create Job
        </button>

      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-2xl shadow">

          <h3 className="text-gray-500">
            Total Jobs
          </h3>

          <p className="text-4xl font-bold mt-3">
            {jobs.length}
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <h3 className="text-gray-500">
            Active Jobs
          </h3>

          <p className="text-4xl font-bold mt-3">
            {jobs.length}
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <h3 className="text-gray-500">
            AI Screened
          </h3>

          <p className="text-4xl font-bold mt-3">
            12
          </p>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="p-5 text-left">
                Title
              </th>

              <th className="p-5 text-left">
                Skills
              </th>

              <th className="p-5 text-left">
                Description
              </th>

              <th className="p-5 text-left">
                 Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {jobs.map((job) => (

              <tr
                key={job.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="p-5 font-medium">
                  {job.title}
                </td>

                <td className="p-5">

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {job.required_skills}
                  </span>

                </td>

                <td className="p-5 text-slate-600">
                  {job.description}
                </td>


                <td className="p-5">

                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"

                  onClick={async () => {

                    const confirmDelete =
                      window.confirm(
                        "Delete this job?"
                      );

                    if (!confirmDelete) {
                      return;
                    }

                    try {

                      await deleteJob(job.id);

                      fetchJobs();

                    } catch (error) {

                      console.log(error);

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

        <CreateJobModal
          onClose={() =>
            setShowModal(false)
          }
          onCreate={
            handleCreateJob
          }
        />

      )}

    </DashboardLayout>

  );

}

export default Jobs;