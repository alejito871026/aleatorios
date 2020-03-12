<template>
  <div class="prodMedios">
    <h2 class="p-4 text-center"><strong>PRODUCTOS MEDIOS</strong></h2>
    <br />
    <div class="container">
      <div
        @click="escribirSemilla=true, cantidadDigitosSemilla=false, semilla = 0, semilla2 = 0, semillaOk = false, repetidas ='',mostrarTabla = false "
        class="btn btn-primary btn-block">Escribir semillas
      </div>
      <div
        @click="escribirSemilla=false, cantidadDigitosSemilla=true, semilla = 0, semilla2 = 0, mostrarSemillaAleatoria = false, repetidas ='',mostrarTabla = false"
        class="btn btn-info btn-block">Generar semillas
      </div>
      <br />
      <div v-if="escribirSemilla">
        <h3 class="p-3 text-center">
          <strong>escribir 2 semillas de 3 digitos o mas</strong>
        </h3>
        <input
          type="number"
          class="form-control col-md-12"
          @keyup="validarSemilla(), repetidas = ''"
          v-model="semilla"
        />
        <br>
        <input
          type="number"
          class="form-control col-md-12"
          @keyup="validarSemilla(), repetidas = ''"
          v-model="semilla2"
        />
        <br />
        <div v-if="semillaOk">
          <br />
          <div>
            <h3 class="text-center">Ahora agrege la cantidad de iteraciones maximo 1000</h3>
            <input
              type="number"
              class="form-control"
              @keyup="ejecutarIteraciones(), repetidas ='', mostrarTabla = false"
              v-model="cantidadIteraciones"
            />
            <br />
            <button
              v-if="ejecutar"
              @click="crearTabla(semilla,semilla2,cantidadIteraciones)"
              class="btn btn-block btn-warning"
            >ejecutar</button>
          </div>
          <br />
          <button class="btn btn-danger btn-block" @click="semillaOk = false, semilla = 0, semilla2=0, mostrarSemillaAleatoria = false, cantidadDigitos = '', generar=false, mostrarTabla = false, repetidas=''">regresar</button>
        </div>
        <div class="alert alert-danger alert-dismissible" v-if="alerta1">
          <strong>Cuidado!</strong> hay mas digitos de los permitidos
        </div>
        <div class="alert alert-primary alert-dismissible" v-if="alerta2">
          <strong>Vamos!</strong> aun faltan digitos
        </div>
      </div>

      
      <div v-if="cantidadDigitosSemilla && mostrarSemillaAleatoria == false">
        <h4 class="p-3 text-center">
          <strong>Escribir la cantidad de digitos que tendran las semillas minimo 4 maximo 5</strong>
        </h4>
        <input
          class="form-control col-md-12"
          type="number"
          @keyup="validar(), repetidas=''"
          v-model="cantidadDigitos"
        />
        <br />
        <button
          class="btn btn-success btn-block"
          @click="generarNumero(cantidadDigitos)"
          v-if="generar == true"
        >generar</button>
      </div>
      <div class="alert alert-danger alert-dismissible" v-if="alerta3">
        <strong>Cuidado!</strong>
        estas cometiendo un error {{cantidadDigitos}} no es un digito permitdo
      </div>
      <div v-if="!escribirSemilla && mostrarSemillaAleatoria == true ">
        <h3 class="p-3 text-center">
          <strong>El sistema le a generado las siguientes semillas</strong>
        </h3>
        <input class="form-control col-md-12" type="number" disabled v-model="semilla" />
        <br />
        <input class="form-control col-md-12" type="number" disabled v-model="semilla2" />
        <br />
        <div v-if="mostrarSemillaAleatoria == true">
          <h3 class="text-center">Ahora agrege la cantidad de iteraciones maximo 1000</h3>
          <input
            type="number"
            class="form-control"
            @keyup="ejecutarIteraciones(), repetidas=''"
            v-model="cantidadIteraciones"
          />
          <br />
          <button
            v-if="ejecutar"
            @click="crearTabla(semilla,semilla2,cantidadIteraciones)"
            class="btn btn-block btn-warning"
          >ejecutar</button>
        </div>
        <br />
        <button
          class="btn btn-danger btn-block"
          @click=" semilla = 0, semilla2=0,mostrarSemillaAleatoria = false, cantidadDigitos = '', generar=false, mostrarTabla = false, repetidas = ''"
        >regresar</button>
      </div>
      <div v-if="mostrarTabla">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>semilla 1 </th>
              <th>semilla 2</th>
              <th>producto</th>
              <th>demitad</th>
              <th>Ri</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(resultado, index) in resultados" :key="resultado.id">   
              <td>{{index}}</td>           
              <td>{{resultado.xsubi}}</td>
              <td>{{resultado.xsubi2}}</td> 
              <td>{{resultado.xproducto}}</td>
              <td>{{resultado.dmita}}</td>
              <td>{{resultado.ri}}</td>
            </tr>
          </tbody>
        </table>
        <h2>las variables Ri que no estan repetidas son {{repetidas.length}}</h2>
        <br>
        <h2>estos son los valores pseudoaletorios unicos</h2>
        <div v-for="(repetidos,index) in repetidas" :key="repetidos.id">
          <td>{{index}} -- {{repetidos}}</td>
        </div>
      </div>
    </div>
    <div v-if="repetidas!=''">
      <apexchart width="500" type="scatter" :options="options" :series="series"></apexchart>
      <div>
      <button v-if="!orden" class="btn btn-block btn-primary" @click="ordenar()">ordenar</button>
      <button v-if="orden" class="btn btn-block btn-primary" @click="desordenar()">desordenar</button>
    </div>
    </div>    
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: "prodMedios",
  props: {},
  components:{
    'apexchart': VueApexCharts
  },
  data() {
    return {
      orden:false,
      escribirSemilla: false,
      semilla: 0,
      semilla2: 0,
      cantidadDigitos: 0,
      cantidadIteraciones: 0,
      cantidadDigitosSemilla: false,
      generar: false,
      mostrarSemillaAleatoria: false,
      alerta1: false,
      alerta2: false,
      alerta3: false,
      semillaOk: false,
      ejecutar: false,
      resultados:[],
      mostrarTabla:false,
      total:0,
      repetidas:[],
      series: [{
        name: 'series',
        data: [],
      }],
      options: {
        chart: {
          type:'scatter'
        },
        xaxis: {
          tickAmount: 1,
        },
        yaxis: {
          tickAmount: 1,
        }
      },
    };
  },
  created() {},
  methods: {
    validar() {
      this.mostrarTabla = false
      this.cantidadIteraciones = 0;
      if (this.cantidadDigitos == "") {
        this.alerta1 = false;
        this.alerta2 = false;
        this.alerta3 = false;
        this.generar = false;
        this.mostrarSemillaAleatoria = false;
        return;
      } else {
        if (this.cantidadDigitos <= 3 || this.cantidadDigitos >= 6) {
          this.alerta1 = false;
          this.alerta2 = false;
          this.alerta3 = true;
          setTimeout(() => (this.alerta3 = false), 2000);
          this.generar = false;
          return;
        } else {
          this.total = this.cantidadDigitos
          this.alerta3 = false;
          this.generar = true;
        }
      }
    },
    validarSemilla() {
      this.mostrarTabla = false
      this.ejecutar = false;
      this.cantidadIteraciones = 0;
      let n = "";
      n = n + this.semilla;
      if (n == "") {
        this.alerta1 = false;
        this.alerta2 = false;
        this.alerta1 = false;
        this.semillaOk = false;
      }
      if (n.length <= 3 || n.length > 5) {
        this.semillaOk = false;
        if (n.length <= 3) {
          this.alerta3 = false;
          this.alerta2 = true;
          setTimeout(() => (this.alerta2 = false), 2000);
        }
        if (n.length > 5) {
          this.alerta1 = true;
          setTimeout(() => (this.alerta1 = false), 2000);
          this.alerta2 = false;
          this.alerta3 = false;
        }
      } else {
        this.alerta1 = false;
        this.alerta2 = false;
        this.alerta3 = false;
        this.semillaOk = true;
        this.total = n.length;
      }
    },
    generarNumero(n) {
      this.ejecutar = false;
      this.mostrarSemillaAleatoria = true;
      this.semilla = Math.random();
      this.semilla2 = Math.random();
      let semi = this.semilla;
      let semi2 = this.semilla2;
      let nuevaSemilla = "";
      let nuevaSemilla2 = "";
      let nn = 0;
      semi = semi.toString();
      semi2 = semi2.toString();
      let cantidad = semi.length - 2;
      for (let y = 0; y <= cantidad; y++) {
        if (y > 1) {
          nuevaSemilla = nuevaSemilla + semi[y];
          nuevaSemilla2 = nuevaSemilla2 + semi2[y];
          nn++;
        }
        if (nn == n) {
          y = cantidad;
        }
      }
      if (nuevaSemilla[0] == 0) {
        this.generarNumero(n);
      } else {
        this.semilla = nuevaSemilla;
      }
      if (nuevaSemilla2[0] == 0) {
        this.generarNumero(n);
      } else {
        this.semilla2 = nuevaSemilla2;
      }
    },
    ejecutarIteraciones() {
      this.resultados = [];
      this.mostrarTabla = false
      if (this.cantidadIteraciones > 1 && this.cantidadIteraciones <= 1000) {
        this.ejecutar = true;
      } else {
        this.ejecutar = false;
      }
    },
    crearTabla(semilla,semilla2, iteraciones) {
      console.log(semilla);
      console.log(semilla2)
      console.log(iteraciones);
      let subi = 0;
      let subi2 = 0;
      let producto = 0;
      let total = 0;
      let resta = 0;
      let demita = '';
      for(let t = 0; t<=(iteraciones-1); t ++){
        subi = parseInt(semilla);
        subi2 = parseInt(semilla2);
        producto = semilla * semilla2;
        producto = producto.toString();
        total = producto.length;
        let r = "0,"
        if(this.total == 4){
          if(total < 6 ){
              resta = 6 - total;
              for(let n = 0; n <= resta-1; n++){
                producto = '0' + producto
              }          
              demita = producto[1]+producto[2]+producto[3]+producto[4];
            }else{
              if(total == 6){
                demita = producto[1]+producto[2]+producto[3]+producto[4];
              }
              if(total == 7 ){
                resta = 8 - total;
                for(let n = 0; n <= resta-1; n++){
                  producto = '0' + producto                }          
                demita = producto[2]+producto[3]+producto[4]+producto[5];
              } 
               if(total==8){
                 demita = producto[2]+producto[3]+producto[4]+producto[5];
               }  
            }
        }  
          if(this.total == 5){
            if(total < 7){
              resta = 7 - total;
              for(let n = 0; n <= resta-1; n++){
                producto = '0' + producto
              } 
              demita = producto[1]+producto[2]+producto[3]+producto[4]+producto[5];
            }else{
              if(total == 7){
               demita = producto[1]+producto[2]+producto[3]+producto[4]+producto[5];
              }
              if(total == 8 ){
                resta = 9 - total;
                for(let n = 0; n <= resta-1; n++){
                  producto = '0' + producto
                }          
                demita = producto[2]+producto[3]+producto[4]+producto[5]+producto[6];
              } 
               if(total==9){
                 demita = producto[2]+producto[3]+producto[4]+producto[5]+producto[6];
               }
               if(total == 10){
              resta = 11 - total;
              for(let n = 0; n <= resta-1; n++){
                producto = '0' + producto
              } 
              demita = producto[3]+producto[4]+producto[5]+producto[6]+producto[7];
            }  
            if(total==11){
              demita = producto[3]+producto[4]+producto[5]+producto[6]+producto[7];
               }
          }
        }  
        var variables = {
          xsubi: subi,
          xsubi2: subi2,
          xproducto: producto,
          dmita: demita,
          ri: r + demita
        };
        this.resultados.push(variables);
        semilla = subi2
        semilla2 = demita
      }
      
      this.mostrarTabla = true
      const edadesDistintas = [... new Set(this.resultados.map(x => x.dmita))];
      this.repetidas = edadesDistintas
      this.series[0].data = this.repetidas
      console.log(this.repetidas)
    },
    ordenar(){
      this.orden = true
      this.repetidas.sort((a,b) => a - b);
      this.series[0].data = this.repetidas
    },
    desordenar(){
      this.orden = false
      const edadesDistintas = [... new Set(this.resultados.map(x => x.dmita))];
      this.repetidas = edadesDistintas
      this.series[0].data = this.repetidas
    },  
  }
};
</script>