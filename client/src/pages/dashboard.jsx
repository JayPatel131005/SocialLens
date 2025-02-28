import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for API calls
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
      try {
        // Fetch user ID from local storage or authentication context // Adjust based on your auth method

        // Fetch reported problems from backend
        const response = await axios.get(`http://localhost:8000/api/problems/getreportedproblems`);
        const data = response.data;

        // Calculate stats
        const totalIssues = data.length;
        const resolvedIssues = data.filter(issue => issue.status === "Resolved").length;
        const pendingIssues = totalIssues - resolvedIssues;
        const fraudReports = data.filter(issue => issue.isFraud).length;

        setStats({
          totalIssues,
          resolvedIssues,
          pendingIssues,
          fraudReports,
        });

        // Transform data for the bar chart
        const groupedIssues = data.reduce((acc, issue) => {
          if (issue.type) { // Ensure the type exists
            acc[issue.type] = (acc[issue.type] || 0) + 1;
          }
          return acc;
        }, {});
        

        const chartData = Object.keys(groupedIssues).map(category => ({
          name: category,
          count: groupedIssues[category],
        }));

        setIssues(chartData);
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
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
