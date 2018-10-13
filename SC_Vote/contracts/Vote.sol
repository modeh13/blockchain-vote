pragma solidity ^0.4.17;

contract Vote {

    address owner;
    mapping (int => address) public ballot;  
    Candidate[] public candidates;
    Voter[] public voters;

    struct Voter
    {
        int dni;
        int candidateId;
        bool voted;
    }

    struct Candidate
    {
        int id;        
        int voteCount;        
    }

    function Vote(int[] candidateIds, int[] personDocs) public {
        owner = msg.sender;

        for (uint i = 0; i < candidateIds.length; i++) {           
            candidates.push(Candidate({
                id: candidateIds[i],
                voteCount: 0
            }));
        }

        for (i = 0; i < personDocs.length; i++) {           
            voters.push(Voter({
                dni: personDocs[i],
                candidateId: 0,
                voted: false
            }));
        }
    }

    modifier restricted() {
        require(owner == msg.sender);
        _;
    }

    modifier alreadyVote(int personDni) {        
        require(owner == msg.sender);
        
        for(uint i = 0; i < voters.length; i++) {
            if(voters[i].dni == personDni) {                
                require(!voters[i].voted);
            }
        }        
        _;
    }

    function getTotalVotes() public constant returns (int voteTotal) {
        voteTotal = 0;
        
        for(uint i = 0; i < candidates.length; i++) {
            voteTotal += candidates[i].voteCount;            
        }
    }

    function getCandidateVotes(int candidateId) public constant returns (int voteCount) {
        voteCount = 0;
        
        for(uint i = 0; i < candidates.length; i++) {
            if(candidates[i].id == candidateId) {
                voteCount = candidates[i].voteCount;
            }        
        }
    }

    function getCandidateWinner() public constant returns (int candidateId, int votes) {
        candidateId = 0;
        votes = 0;

        for(uint i = 0; i < candidates.length; i++) {
            if(candidates[i].voteCount > votes) {
                candidateId = candidates[i].id;
                votes = candidates[i].voteCount;
            }
        }
    }

    function getIfPersonVoted(int dni) public constant returns (bool voted) {
        voted = false;

        for(uint i = 0; i < voters.length; i++) {
            if(voters[i].dni == dni) {
                voted = voters[i].voted;
                break;                
            }
        }
    }

    function existPerson(int personDni) public constant returns (bool) {
        bool exist = false;

        for(uint i = 0; i < voters.length; i++) {
            if(voters[i].dni == personDni) {
                exist = true;
                break;
            }        
        }

        return exist;        
    }

    function existCandidate(int candidateId) public constant returns (bool) {
        bool exist = false;

        for(uint i = 0; i < candidates.length; i++) {
            if(candidates[i].id == candidateId) {
                exist = true;
                break;
            }        
        }

        return exist;        
    }

    function registerVote(int personDni, int candidateId) public alreadyVote(personDni) {

        if(existPerson(personDni) && existCandidate(candidateId)) {
            for(uint i = 0; i < candidates.length; i++) {
                if(candidates[i].id == candidateId) {
                    candidates[i].voteCount += 1;                
                }        
            }

            for(i = 0; i < voters.length; i++) {
                if(voters[i].dni == personDni) {
                    voters[i].candidateId = candidateId;
                    voters[i].voted = true;                
                }        
            }
        }
        else {
            require(false);
        }        
    }
}