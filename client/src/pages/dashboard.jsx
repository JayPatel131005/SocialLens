import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [issues, setIssues] = useState([]);
  const [stats, setStats] = useState({
    totalIssues: 0,
    resolvedIssues: 0,
    pendingIssues: 0,
    fraudReports: 0,
  });

  const [newIssue, setNewIssue] = useState({
    type: "",
    description: "",
  });

  const issueTypes = ["Pothole", "Garbage", "Traffic Violation", "Street Light", "Water Leakage"];

  useEffect(() => {
    const fetchData = async () => {
      // Dummy Data
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newIssue.type || !newIssue.description) return;

    // Update issue statistics
    const updatedIssues = [...issues];
    const foundIndex = updatedIssues.findIndex((item) => item.name === newIssue.type);

    if (foundIndex !== -1) {
      updatedIssues[foundIndex].count += 1;
    } else {
      updatedIssues.push({ name: newIssue.type, count: 1 });
    }

    setIssues(updatedIssues);
    setStats((prev) => ({ ...prev, totalIssues: prev.totalIssues + 1, pendingIssues: prev.pendingIssues + 1 }));

    // Clear form
    setNewIssue({ type: "", description: "" });
  };

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>

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

      {/* Issue Reporting Form */}
      <div className="issue-report-container">
        <h3>Report an Issue</h3>
        <form onSubmit={handleSubmit} className="issue-form">
          <select value={newIssue.type} onChange={(e) => setNewIssue({ ...newIssue, type: e.target.value })} required>
            <option value="">Select Issue Type</option>
            {issueTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Describe the issue..."
            value={newIssue.description}
            onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
            required
          ></textarea>
          <button type="submit">Submit Issue</button>
        </form>
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
