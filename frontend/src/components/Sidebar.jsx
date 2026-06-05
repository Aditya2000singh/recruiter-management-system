import {
  FaUsers,
  FaBriefcase,
  FaUpload,
  FaChartBar,
  FaSignOutAlt
} from "react-icons/fa";

import {
  Link,
  useNavigate
} from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem(
      "access_token"
    );

    navigate("/");
  };

  return (

    <div className="w-64 bg-slate-900 text-white h-screen p-6">

      <h1 className="text-2xl font-bold mb-10">
        TalentFlow AI
      </h1>

      <div className="space-y-6">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <FaChartBar />
          Dashboard
        </Link>

        <Link
          to="/candidates"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <FaUsers />
          Candidates
        </Link>

        <Link
          to="/jobs"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <FaBriefcase />
          Jobs
        </Link>

        <Link
          to="/resume-upload"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <FaUpload />
          Resume Upload
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-400 hover:text-red-300"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </div>

  );

}

export default Sidebar;