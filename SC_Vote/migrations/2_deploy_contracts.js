var Vote = artifacts.require("./Vote.sol");
var PersonJSON = require("../../vote_web/src/data/Person.json");
var CandidateJSON = require("../../vote_web/src/data/Candidate.json");

module.exports = function(deployer) {
  deployer.deploy(Vote, 
                  CandidateJSON.map(c => c.id),
                  PersonJSON.map(p => p.nroDoc));
};