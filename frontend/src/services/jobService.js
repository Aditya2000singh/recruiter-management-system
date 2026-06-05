import api from "./api";

export const getJobs = async () => {

  const response =
    await api.get(
      "/jobs/my-jobs"
    );

  return response.data;
};

export const getAllJobs = async () => {

  const response =
    await api.get(
      "/jobs/my-jobs"
    );

  return response.data;
};

export const createJob = async (
  jobData
) => {

  const response =
    await api.post(
      "/jobs",
      jobData
    );

  return response.data;
};

export const assignCandidate = async (
  candidateId,
  jobId
) => {

  const response =
    await api.put(
      `/candidates/${candidateId}/assign-job/${jobId}`
    );

  return response.data;
};

export const scoreCandidate = async (
  jobId,
  candidateId
) => {

  const response =
    await api.post(
      `/jobs/${jobId}/score/${candidateId}`
    );

  return response.data;
};

export const deleteJob = async (
  jobId
) => {

  const response =
    await api.delete(
      `/jobs/${jobId}`
    );

  return response.data;
};