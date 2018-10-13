<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h5>Personas</h5>
          </div>
          <div class="card-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col-12">
                  <div class="table-responsive">
                    <table id="tblPeople" class="table table-striped table-bordered dt-responsive nowrap" 
                      style="width:100%"> 
                      <thead class="thead-dark">                        
                      </thead>                     
                    </table>
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
import PersonService from '@/services/PersonService.js'

export default {
  name: 'People',
  data: function(){
    return {
    }
  },
  mounted(){
    console.log("mounted");
    PersonService.getPersonList().then(personList => {
      $('#tblPeople').DataTable({
        ordering: false,
        responsive: true,
        destroy: true,
        data: personList,
        language: {
          processing: "Procesando...",
          lengthMenu: "Mostrar _MENU_ registros",
          zeroRecords: "No se encontraron resultados",
          emptyTable: "Ninguno dato disponible en esta tabla",
          info: "Registros del _START_ al _END_ de un total de _TOTAL_.",
          infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
          infoFiltered: "(filtrado de un total de _MAX_ registros)",
          infoPostFix: "",
          search: "Buscar:",
          url: "",
          infoThousands: ",",
          loadingRecords: "Cargando...",
          paginate: {
            sFirst: "Primero",
            sLast: "Último",
            sNext: "Siguiente",
            sPrevious: "Anterior"
          },
          aria: {
            sSortAscending: ": Activar para ordenar la columna de manera ascendente",
            sSortDescending: ": Activar para ordenar la columna de manera descendente"
          },         
        },
        columns: [
          { 
            title: "#",
            data: "id",
            searchable: false,
            className: 'dt-center',
            width: "5%"
          },
          { 
            title: "Documento",
            data: "nroDoc",
            className: 'dt-center',
            width: "15%"
          },
          { 
            title: "Nombres",
            data: "firstName",
            width: "35%"
          },
          { 
            title: "Apellidos",
            data: "lastName",
            width: "35%"
          },
          { 
            title: "Votó",
            data: "voted",
            className: 'dt-center',
            width: "10%"
          },
        ],
        columnDefs: [{
          targets: 4,
          data: "voted",
          render: function ( data, type, row, meta ) {
            return (data) ? '<i class="fas fa-check-circle fa-lg mb-2" style="color: green;"></i>' :
                            '<i class="far fa-circle fa-lg mb-2" style="color: red;"></i>';          
          }
        }]
      });      
    });
  }
}
</script>

<style>
.table-responsive .table .dt-center {
  text-align: center;
}
</style>