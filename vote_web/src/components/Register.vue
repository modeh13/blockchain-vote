<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header" style='' :style="{'color:red': nroDoc != ''}">
            <h5>Votar</h5>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col-12">
                  <form class="form-inline">
                    <div class="form-group mx-sm-3 mb-2">
                      <label for="inpNroDoc" class="sr-only">Documento</label>
                      <input type="text" class="form-control" id="inpNroDoc" placeholder="Documento" 
                        v-model="nroDoc" @keypress="cleanMessage($event)" />                      
                    </div>
                    <button type="button" class="btn btn-primary mx-sm-2 mb-2" @click="searchPerson">
                      <i class="fas fa-search"></i>
                    </button>                    
                  </form>
                  <small id="smNroDoc" class="form-text text-muted mx-sm-3">{{ errorMessage }}</small>
                </div>                
                <div v-if="person.id > 0" class="col-12">
                  <hr />
                  <div class="form-row">
                    <div class="form-group col-md-2 col-6">
                      <label for="lblField" class="font-weight-bold">Documento</label>
                      <label id="lblField" class="form-control">{{ person.nroDoc }}</label>
                    </div>
                    <div class="form-group col-md-5 col-12">
                      <label for="lblField" class="font-weight-bold">Nombre</label>
                      <label id="lblField" class="form-control">{{ person.firstName }}</label>
                    </div>
                    <div class="form-group col-md-5 col-12">
                      <label for="lblField" class="font-weight-bold">Apellido</label>
                      <label id="lblField" class="form-control">{{ person.lastName }}</label>
                    </div>
                  </div>
                </div>
                <div v-if="person.id > 0 && person.voted" class="col-12">
                  <div id="dv-voted">
                    <p class="text-center font-weight-bold pb-3">Su voto ya fue registrado.</p>
                    <p class="text-center">
                      <i class="fas fa-check-circle fa-lg mb-2" style="color: green; font-size: 8em;"></i>
                    </p>                    
                  </div>
                </div>
                <div v-if="person.id > 0 && !person.voted" class="col-12">
                  <hr />
                  <p class="h3 text-center">Candidatos</p>
                  <candidates-grid :candidateList="candidateList"
                    @onCandidateSelected="candidate => this.candidate = candidate">
                  </candidates-grid>
                  <button type="button" class="btn btn-primary btn-lg btn-block" data-toggle="modal" 
                    data-target="#modalConfirm">
                    Registrar VOTO
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>  
      </div>
    </div>
    <!-- Modal confirmación -->
    <div class="modal fade" id="modalConfirm" tabindex="-1" role="dialog" aria-labelledby="modalConfirmLabel" 
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalConfirmLabel">Confirmación</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ¿ Está seguro que desea registrar su voto por {{ candidate.firstName + ' ' + candidate.lastName}} ?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="registerVote">Guardar</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Respuesta -->
    <div class="modal fade" id="modalResponse" tabindex="-1" role="dialog" aria-labelledby="modalResponseLabel" 
      aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalResponseLabel">Respuesta</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>
              Su voto fue registrado satisfactoriamete con la siguiente transacción <b>{{ transactionHash }}</b>. 
            </p>
            <p>
              Gracias por su voto.
            </p>            
            
          </div>
          <div class="modal-footer">            
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="navigateRegister" >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PersonServices from '@/services/PersonService.js'
import CandidateServices from '@/services/CandidateService.js'
import CandidatesGrid from '@/components/CandidatesGrid'
import router from '@/router/index.js'
import Vote from '@/handlers/Vote'

export default {
  name: 'Register',
  data () {
    return {      
      nroDoc: '',      
      candidateList: [],
      candidate: {},
      errorMessage: '',
      transactionHash: '',
      person: {}
    }
  },
  methods : {
    searchPerson() {      
      this.errorMessage = '';      
      
      PersonServices.getPerson(this.nroDoc)
        .then(person => {
          this.person = person;

          if(this.person.id > 0) {
            console.log(`El documento ingresado es ${this.nroDoc}`);                    
          }
          else {
            this.errorMessage = "Persona no encontrada.";
          }
        })
        .catch(error => {
          console.error;
          this.errorMessage = "Persona no encontrada.";
      });      
    },
    navigateRegister() {
       router.push("home");
    },
    cleanMessage(event) {
      if(this.errorMessage != "") {
        this.errorMessage = "";
      }
    },
    registerVote() {      
      if(this.candidate != undefined && this.candidate.id > 0) {
        $('#modalConfirm').modal('hide');        

        Vote.registerVote(this.person.nroDoc, this.candidate.id)
          .then(response => {
            this.transactionHash = response.tx;
            $("#modalResponse").modal("show");
          })
          .catch(error => console.error);
      }
    }
  },  
  beforeCreate: () => {
    Vote.init();
  },
  created() {    
    this.person = PersonServices.getDefaultPerson();    
    this.candidateList = CandidateServices.getCandidateList();
  },
  components: {
    'candidates-grid': CandidatesGrid
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#smNroDoc {
  color:#d23434 !important;
  font-size: 70%;
}
#dv-voted {
  background: aliceblue;
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 2px;
}
</style>