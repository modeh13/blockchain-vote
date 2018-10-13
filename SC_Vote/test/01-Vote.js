const Vote = artifacts.require('Vote');

chai =  require('chai');
chaiAsPromised =  require('chai-as-promised');

chai.use(chaiAsPromised);

expect = chai.expect;

contract('Vote', accounts => {
    describe('Contract', () => {
        it('Should get a Vote contract instance', () => { 
            Vote.deployed().then(instance => {
                vote = instance;
                expect(vote).to.not.be.null;
            });
        });        
    })

    describe('Candidates', () => {
        it('Candidates count', () => {
            vote.candidates().then(candidates => {
                expect(candidates.length).to.be.equal(3);
            });
        });

        it('Candidate 1 vote count', () => {
            vote.getCandidateVotes().then(count => {
                expect(count).to.be.equal(0);
            });
        });

        it('Registre vote Candidate 1', () => {
            vote.registerVote(1098698008, 2).then(response => {
                expect(response.tx).to.match(/\w{66}/);
            });
        });

        it('Candidate 2 vote count after register vote', () => {
            vote.getCandidateVotes().then(count => {
                expect(count).to.be.equal(1);
            });
        });

        it('Person DNI already exist', () => {
            expect(vote.ballot[1098698008]).to.not.be.null;            
        });

        it("Person DNI already doesn't exist", () => {            
            expect(vote.ballot[1098665984]).to.be.equal(undefined);
        });
    });
});