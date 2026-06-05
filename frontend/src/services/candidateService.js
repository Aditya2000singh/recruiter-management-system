import api from "./api";

export const getCandidates = async () => {

  const response =
    await api.get(
      "/candidates/my-candidates"
    );

  return response.data;
};

export const createCandidate = async (
  candidateData
) => {

  const response =
    await api.post(
      "/candidates",
      candidateData
    );

  return response.data;
};

export const updateCandidate = async (
  candidateId,
  candidateData
) => {

  const response =
    await api.put(
      `/candidates/${candidateId}`,
      candidateData
    );

  return response.data;
};

export const deleteCandidate = async (
  candidateId
) => {

  const response =
    await api.delete(
      `/candidates/${candidateId}`
    );

  return response.data;
};


