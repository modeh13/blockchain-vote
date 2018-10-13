import Person from '@/models/Person.js'
import Vote from '@/handlers/Vote'
const PersonJSON = require('@/data/Person.json')

export default {  
  getDefaultPerson() {
    return new Person(0, '', '', '', false);
  },
  getPerson(nroDoc) {
    //return Vue.http.get('/api/person/' + nroDoc);

    return new Promise((resolve, reject) => {
      var person = this.getDefaultPerson();
      var personFilter = PersonJSON.filter(person => person.nroDoc == nroDoc);
      
      if(personFilter.length > 0) {
        Vote.init();
        person = personFilter[0];
  
        Vote.getIfPersonVoted(person.nroDoc)
          .then(voted => {                   
            person.voted = voted;
            resolve(person);
          }) 
          .catch(error => reject(error));
      }
      else {
        resolve(person);
      }
    })
  },
  getPersonList() {    
    var obj = {};
    var person = {};
    var promises = [];
    Vote.init();    

    for(var i = 0; i < PersonJSON.length; i++) {
      obj = PersonJSON[i];
      person = new Person(obj.id, obj.firstName, obj.lastName, obj.nroDoc, false);
      
      promises.push(
        new Promise((resolve, reject) => {
          let personPromise = person;
          Vote.getIfPersonVoted(personPromise.nroDoc).then(voted => {
              personPromise.voted = voted;
              resolve(personPromise);
            })
            .catch(error => reject(error))
        })
      );     
    }
    return new Promise((resolve, reject) => {
      Promise.all(promises).then(personList => {        
        resolve(personList);
      }).catch(error => reject(error));
    });
  }
}