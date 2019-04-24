const path = require('path');

const express = require('express');

const teamsController = require('../controllers/teams');

const router = express.Router();

router.get('/', teamsController.getTeams);
router.get('/:teamId', teamsController.getTeam);

module.exports = router;