import Candidate from '@/models/Candidate.js'
const CandidateJSON = require('@/data/Candidate.json')

export default {
  newInstance: (candidate) => {
    return new Candidate(
      candidate.id,
      candidate.firstName,
      candidate.lastName,
      candidate.number,
      candidate.urlPhoto,
      0
    );
  },
  getCandidateList() {
    var candidateList = [];
    var obj = {};

    for(var i = 0; i < CandidateJSON.length; i++) {
      obj = CandidateJSON[i];

      candidateList.push(
        new Candidate(obj.id, obj.firstName, obj.lastName, obj.number, obj.urlPhoto, 0)
      );
    }    

    return candidateList;
  }
}