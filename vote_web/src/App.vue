<template>
  <div>
    <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="/">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Flag-map_of_Colombia.svg/1200px-Flag-map_of_Colombia.svg.png" 
          width="24" height="30" class="d-inline-block align-top" alt="">
          Eleccciones
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link to="/home" class="nav-link">Inicio</router-link>            
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">Votar</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/results" class="nav-link">Resultados</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/people" class="nav-link">Personas</router-link>            
          </li>
        </ul>
      </div>
    </nav>
    <!-- ROUTER -->
    <div id="dv-router">
      <router-view/>
    </div>    
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#dv-router{
  margin-top: 5px;
}
</style>