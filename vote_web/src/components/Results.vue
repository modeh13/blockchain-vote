<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h5>Resultados</h5>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col-12">
                  <div class="row justify-content-md-center dv-results">
                    <div class="col-12">
                      <p class="h5 text-center">Votos totales: {{ votesTotal }}</p>          
                    </div>
                    <div class="col-12 col-md-4"  v-for="(item) in candidatesList" :key="item.id">
                      <div class="dv-candidate">
                        <p class="h6 dv-name">{{ item.firstName + ' ' + item.lastName }}</p>
                        <img :src="item.urlPhoto" class="img-fluid" alt="Responsive image">
                        <p><b>Votos: </b>{{ item.voteCount }}</p>
                        <div class="progress">
                          <div class="progress-value">{{ getPercentage(item.voteCount) }}%</div>
                          <div class="progress-bar progress-bar-striped bg-info" role="progressbar" 
                              :style="{ width: getPercentage(item.voteCount) + '%' }"
                              :aria-valuenow="getPercentage(item.voteCount)" aria-valuemin="0" aria-valuemax="100">                              
                          </div>
                        </div>
                      </div>                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CandidateServices from '@/services/CandidateService.js'
import Vote from '@/handlers/Vote'

export default {
  name: 'results',
  data() {
    return {
      candidatesList: [],
      votesTotal: 0,      
    }
  },
  methods: {
    getPercentage(voteCount) {
      if(voteCount <= 0) return 0;
      return parseFloat((voteCount / this.votesTotal) * 100.00).toFixed(2);
    }
  },
  beforeCreate() {    
    Vote.init();
  },
  created() {
    this.candidatesList = CandidateServices.getCandidateList();    
  },
  mounted() {    
    this.candidatesList.forEach(c => {           
      Vote.getCandidateVotes(c.id).then(count => {
        c.voteCount = count.toNumber();
      });
    }); 

    Vote.getTotalVotes().then(count => 
      this.votesTotal = count.toNumber()
    );
  },
}
</script>

<style scoped>
.img-fluid {
    width: 100% !important;
    height: 200px !important;
  }
  .dv-candidate {
    border-radius: 2px;    
    box-sizing: border-box;    
    margin-bottom: 20px;
  }
  .dv-candidate .dv-name{    
    padding: 5px;
    margin-bottom: 2px;    
    background: #104f71;
    color: white;
    border-radius: 2px;
  }
.progress .progress-value {
  position: absolute;  
  text-align: center;
  width: 90%;
  left: 5%;
}
</style>