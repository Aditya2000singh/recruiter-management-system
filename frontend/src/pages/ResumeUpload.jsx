import { useState } from "react";

import {
  uploadResume
} from "../services/resumeService";

function ResumeUpload() {

  const [file, setFile] =
    useState(null);

  const handleUpload =
    async () => {

      if (!file) {

        alert(
          "Select a PDF first"
        );

        return;
      }

      try {

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        const result =
          await uploadResume(
            formData
          );

        alert(
          result.message
        );

      } catch (error) {

        console.log(error);

        alert(
          "Upload Failed"
        );

      }

    };

  return (

    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        Resume Upload
      </h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setFile(
            e.target.files[0]
          )
        }
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-5 py-3 rounded-xl ml-4"
      >
        Upload Resume
      </button>

    </div>

  );

}

export default ResumeUpload;