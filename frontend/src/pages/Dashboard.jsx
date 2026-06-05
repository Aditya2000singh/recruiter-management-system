import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getDashboard
} from "../services/dashboardService";

function Dashboard() {

  const [dashboard,
    setDashboard] =
    useState({
      total_jobs: 0,
      total_candidates: 0,
      assigned_candidates: 0
    });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {

    try {

      const data =
        await getDashboard();

      setDashboard(data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <DashboardLayout>

      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow">

          <h3 className="text-gray-500">
            Total Jobs
          </h3>

          <p className="text-4xl font-bold mt-3">
            {dashboard.total_jobs}
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <h3 className="text-gray-500">
            Total Candidates
          </h3>

          <p className="text-4xl font-bold mt-3">
            {dashboard.total_candidates}
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <h3 className="text-gray-500">
            Assigned Candidates
          </h3>

          <p className="text-4xl font-bold mt-3">
            {dashboard.assigned_candidates}
          </p>

        </div>

      </div>

    </DashboardLayout>

  );
}

export default Dashboard;