<template>
  <div class="row justify-content-md-center">
    <div class="col-12 col-md-4" v-for="(item) in candidateList" :key="item.id"      
      @click="onCandidateSelected(item)">
      <div class="dv-candidate" :class="{'candidate-selected': item.id == candidateSelected.id}">
        <p class="h6 dv-name">{{ item.firstName + ' ' + item.lastName }}</p>        
        <img :src="item.urlPhoto" class="img-fluid" alt="Responsive image">
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'CandidatesGrid',
  props: {
    candidateList: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      candidateSelected: {}
    }
  },
  methods: {
    onCandidateSelected(candidate) {      
      this.candidateSelected = candidate;
      this.$emit('onCandidateSelected', this.candidateSelected);            
    },
  }
}
</script>

<style>
  .img-fluid {
    width: 100% !important;
    height: 200px !important;
  }
  .dv-candidate {
    border-radius: 2px;    
    box-sizing: border-box;
    cursor: pointer;
    margin-bottom: 20px;
  }  
    .dv-candidate:hover {
      box-shadow: 0px 0px 10px 2px #4c8faf;  
    }
  .dv-candidate .dv-name{    
    padding: 5px;
    margin-bottom: 2px;    
    background: #104f71;
    color: white;
    border-radius: 2px;
  }
  .candidate-selected, .candidate-selected:hover {
    box-shadow: 0px 0px 10px 2px #4CAF50;
  }
</style>