import React, { useState } from "react";
import axios from "axios";
import "./ProblemReport.css";

const ProblemReport = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    location: "", // User ID (to be fetched from auth)
    images: "",
  });

  const [message, setMessage] = useState("");
 
  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/problems/newproblem", formData);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to report the issue.");
    }
  };

  return (
    <div className="form-container">
      <h2>Report a Problem</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title (Min 10 chars)" required onChange={handleChange} />
        <textarea name="description" placeholder="Description (Min 20 chars)" required onChange={handleChange}></textarea>
       <select name="type" className = "issue-select" required onChange={handleChange}>
  <option value="">Select an Issue Type</option>
  <option value="Street Light Problem">Street Light Problem</option>
  <option value="Road Issue">Road Issue</option>
  <option value="Pothole Problem">Pothole Problem</option>
  <option value="Theft/Crime Issue">Theft/Crime Issue</option>
  <option value="Water Supply Issue">Water Supply Issue</option>
  <option value="Garbage Collection">Garbage Collection</option>
  <option value="Electricity Issue">Electricity Issue</option>
  <option value="Traffic Violation">Traffic Violation</option>
  <option value="Public Transport Issue">Public Transport Issue</option>
  <option value="Other">Other</option>
</select>

        <input type="text" name="location" placeholder="Location" required onChange={handleChange} />
        <input type="text" name="images" placeholder="Image URL (optional)" onChange={handleChange} />
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default ProblemReport;
