const Problems = require('../Models/ProblemSchema');

// Function to create a new problem report
const newProblem = async (req, res) => {
  const { title, description, type, reportedBy, images } = req.body;

  try {
    const problem = new Problems({
      title,
      description,
      type,
      reportedBy,
      images,
    });

    await problem.save();
    res.status(201).json({ message: "Problem successfully reported", problem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving problem", error });
  }
};

// Function to get all problems reported by a specific user
const getReportedProblem = async (req, res) => {
  try {
    const response = await Problems.find({});
    if (response.length > 0) {
      res.status(200).json(response); // Success, send the found problems
    } else {
      res.status(404).json({ message: "No problems found for the provided user ID" });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send("Couldn't find any reported issue");
  }
};

module.exports = {
  newProblem,
  getReportedProblem,
};
