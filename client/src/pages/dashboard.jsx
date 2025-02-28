import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [stats, setStats] = useState({
    totalIssues: 0,
    resolvedIssues: 0,
    pendingIssues: 0,
    fraudReports: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const dummyData = [
        { name: "Pothole", count: 10 },
        { name: "Garbage", count: 5 },
        { name: "Traffic Violation", count: 7 },
        { name: "Street Light", count: 3 },
      ];

      setStats({
        totalIssues: 25,
        resolvedIssues: 12,
        pendingIssues: 8,
        fraudReports: 5,
      });

      setIssues(dummyData);
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h2> Dashboard</h2>

      {/* Stats Section */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Issues</h3>
          <p>{stats.totalIssues}</p>
        </div>
        <div className="stat-card">
          <h3>Resolved Issues</h3>
          <p>{stats.resolvedIssues}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Issues</h3>
          <p>{stats.pendingIssues}</p>
        </div>
        <div className="stat-card">
          <h3>Fraud Reports</h3>
          <p>{stats.fraudReports}</p>
        </div>
      </div>

      {/* Create Report Button */}
      <div className="create-report-btn" onClick={() => navigate("/reportproblem")}>
  Create a New Report
</div>


      {/* Issue Chart */}
      <div className="chart-container">
        <h3>Reported Issues Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={issues}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#4A90E2" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
