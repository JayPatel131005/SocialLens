const router = require('express').Router();
const {newProblem,getReportedProblem} = require('../Controllers/ProblemController')

router.post('/newproblem',newProblem);
router.get('/getreportedproblems',getReportedProblem)
module.exports = router;