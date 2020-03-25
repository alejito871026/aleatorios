<template>
  <div class="cuadMedios">
    <h2 class="p-4 text-center"><strong>CUADRADOS MEDIOS</strong></h2>
    <br />
    <div class="container">
      <h3 class="p-3 text-center">
          <strong>Escriba la funcion del modelo,</strong>
          <strong>escriba 'x'  donde ira el pseudoaleatorio </strong>
        </h3>
        <input
          type="text"
          class="form-control col-md-12"
          @keyup="validarSemilla(), repetidas = '',verFuncionAlgebraica(), arreglo = []"
          v-model="funcionn"
        />
        <br>
        <div>
          <h4 class="text-center">log(n,base)--sin(n deg)--cos(n deg)--tan(n deg)--acos(n)--asin(n)--atan(n)<br>atan2(coorX, coorY)--pow(n,exp)</h4>
        </div>
        <div class="alert alert-warning alert-dismissible" v-if="alerta5">
          <strong>Debes escribir la base</strong> luego del valor logaritmico ejemplo <strong>log(100 , base)</strong> 
        </div>
        <div class="alert alert-warning alert-dismissible" v-if="alerta6">
          <strong>Debes escribir deg</strong> luego del valor a evaluar, ejemplo <strong>sin(89 deg)</strong> 
        </div>
        <div class="alert alert-warning alert-dismissible" v-if="alerta7">
          <strong>Debes escribir la base!</strong> luego del valor a evaluar, ejemplo<strong>cos(100 , base)</strong> 
        </div>
        <div class="alert alert-warning alert-dismissible" v-if="alerta8">
          <strong>Debes escribir la base!</strong> luego del valor a evaluar, ejemplo <strong>tan(100 , base)</strong> 
        </div>
        <br>
      <div
        @click="escribirSemilla=true, cantidadDigitosSemilla=false, semilla = 0, cantidadDigitos=0, semillaOk = false, repetidas ='', mostrarTabla = false "
        class="btn btn-primary btn-block"
      >Escribir semilla</div>
      <div
        @click="escribirSemilla=false, cantidadDigitosSemilla=true, semilla = 0, mostrarSemillaAleatoria = false, cantidadDigitos=0, repetidas ='',mostrarTabla = false"
        class="btn btn-info btn-block"
      >Generar semilla</div>
      <br />
      <div v-if="escribirSemilla">
        <h3 class="p-3 text-center">
          <strong>escribir semilla mayor a 3 digitos</strong>
        </h3>
        <input
          type="number"
          class="form-control col-md-12"
          @keyup="validarSemilla(),repetidas ='',mostrarTabla = false, arreglo = []"
          v-model="semilla"
        />
        <br />
        <div v-if="semillaOk">
          <br />
          <div>
            <h3 class="text-center">Ahora agrege la cantidad de iteraciones maximo 1000</h3>
            <input
              type="number"
              class="form-control"
              @keyup="ejecutarIteraciones(), repetidas ='',mostrarTabla = false, arreglo = []"
              v-model="cantidadIteraciones"
            />
            <br />
            <button
              v-if="ejecutar"
              @click="crearTabla(semilla,cantidadIteraciones)"
              class="btn btn-block btn-warning"
            >ejecutar</button>
          </div>
          <br />
          <button class="btn btn-danger btn-block" @click="semillaOk = false, semilla = 0, mostrarSemillaAleatoria = false, cantidadDigitos = '', generar=false,
           mostrarTabla = false, repetidas=''">regresar</button>
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
          <strong>escribir la cantidad de digitos qeu tendra la semilla minimo 4 maximo 5</strong>
        </h4>
        <input
          class="form-control col-md-12"
          type="number"
          @keyup="validar(), repetidas='', arreglo = []"
          v-model="cantidadDigitos"
        />
        <br />
        <button
          class="btn btn-success btn-block"
          @click="generarNumero(cantidadDigitos) , repetidas =''"
          v-if="generar == true"
        >generar</button>
      </div>
      <div class="alert alert-danger alert-dismissible" v-if="alerta3">
        <strong>Cuidado!</strong>
        estas cometiendo un error {{cantidadDigitos}} no es un digito permitdo
      </div>
      <div v-if="!escribirSemilla && mostrarSemillaAleatoria == true ">
        <h3 class="p-3 text-center">
          <strong>El sistema le a generado la siguiente semilla</strong>
        </h3>
        <input class="form-control col-md-12" type="number" disabled v-model="semilla" />
        <br />
        <div v-if="mostrarSemillaAleatoria == true">
          <h3 class="text-center">Ahora agrege la cantidad de iteraciones maximo 1000</h3>
          <input
            type="number"
            class="form-control"
            @keyup="ejecutarIteraciones(), repetidas ='', arreglo = []"
            v-model="cantidadIteraciones"
          />
          <br />
          <button
            v-if="ejecutar"
            @click="crearTabla(semilla,cantidadIteraciones)"
            class="btn btn-block btn-warning"
          >ejecutar</button>
        </div>
        <br />
        <button
          class="btn btn-danger btn-block"
          @click="mostrarSemillaAleatoria = false, cantidadDigitos = '', generar=false, mostrarTabla = false, repetidas=''"
        >regresar</button>
      </div>
      <div v-if="mostrarTabla">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>semilla</th>
              <th>elevado</th>
              <th>demitad</th>
              <th>Ri</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(resultado, index) in resultados" :key="resultado.id">   
              <td>{{index}}</td>           
              <td>{{resultado.xsubi}}</td> 
              <td>{{resultado.xelevado}}</td>
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
      <br>
      <div>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Operacion</th>
              <th>Resultado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(resultados, index) in arreglo" :key="resultados.id">   
              <td>{{index}}</td>           
              <td>{{resultados.n}}</td>
              <td>{{resultados.r}}</td>
            </tr>
          </tbody>
        </table>
      </div>
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
  name: "cuadMedios",
  props: {},
  components:{
    'apexchart': VueApexCharts
  },
  data() {
    return {
      orden:false,
      escribirSemilla: false,
      semilla: 0,
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
      funcionn:'',
      alerta5:false,
      alerta6:false,
      alerta7:false,
      alerta8:false,
      arreglo : [],
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
      this.semilla = Math.random(n);
      let semi = this.semilla;
      console.log(this.semilla)
      let nuevaSemilla = "";
      let nn = 0;
      semi = semi.toString();
      let cantidad = semi.length - 2;
      for (let y = 0; y <= cantidad; y++) {
        if (y > 1) {
          nuevaSemilla = nuevaSemilla + semi[y];
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
    crearTabla(semilla, iteraciones) {
      console.log(semilla);
      console.log(iteraciones);
      let subi = 0;
      let elevado = 0;
      let total = 0;
      let resta = 0;
      let demita = '';
      for(let t = 0; t<=(iteraciones-1); t ++){
        subi = parseInt(semilla);
        elevado = semilla * semilla;
        elevado = elevado.toString();
        total = elevado.length;
        let r = "0,"
        if(this.total == 4){
          if(total < 6 ){
              resta = 6 - total;
              for(let n = 0; n <= resta-1; n++){
                elevado = '0' + elevado
              }          
              demita = elevado[1]+elevado[2]+elevado[3]+elevado[4];
            }else{
              if(total == 6){
                demita = elevado[1]+elevado[2]+elevado[3]+elevado[4];
              }
              if(total == 7 ){
                resta = 8 - total;
                for(let n = 0; n <= resta-1; n++){
                  elevado = '0' + elevado
                }          
                demita = elevado[2]+elevado[3]+elevado[4]+elevado[5];
              } 
               if(total==8){
                 demita = elevado[2]+elevado[3]+elevado[4]+elevado[5];
               }  
            }
        }  
          if(this.total == 5){
            if(total < 7){
              resta = 7 - total;
              for(let n = 0; n <= resta-1; n++){
                elevado = '0' + elevado
              } 
              demita = elevado[1]+elevado[2]+elevado[3]+elevado[4]+elevado[5];
            }else{
              if(total == 7){
               demita = elevado[1]+elevado[2]+elevado[3]+elevado[4]+elevado[5];
              }
              if(total == 8 ){
                resta = 9 - total;
                for(let n = 0; n <= resta-1; n++){
                  elevado = '0' + elevado
                }          
                demita = elevado[2]+elevado[3]+elevado[4]+elevado[5]+elevado[6];
              } 
               if(total==9){
                 demita = elevado[2]+elevado[3]+elevado[4]+elevado[5]+elevado[6];
               }
               if(total == 10){
              resta = 11 - total;
              for(let n = 0; n <= resta-1; n++){
                elevado = '0' + elevado
              } 
              demita = elevado[3]+elevado[4]+elevado[5]+elevado[6]+elevado[7];
            }  
            if(total==11){
              demita = elevado[3]+elevado[4]+elevado[5]+elevado[6]+elevado[7];
               }
          }
        }  
        var variables = {
          xsubi: subi,
          xelevado: elevado,
          dmita: demita,
          ri: r + demita
        };
        this.resultados.push(variables);
        semilla = demita
      }
      
      this.mostrarTabla = true
      const edadesDistintas = [... new Set(this.resultados.map(x => x.dmita))];
      this.repetidas = edadesDistintas
      this.series[0].data = this.repetidas
      this.funcion(this.repetidas)
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
    verFuncionAlgebraica(){
      let n = ''
      let b = 0
      let texto = ''
      n = n + this.funcionn
      for(b = 0; b<=(n.length-1);b++){
        texto = n[b-2]+n[b-1]+n[b]
        if(texto=='log'){
          this.alerta5 = true
          setTimeout(() => (this.alerta5 = false), 6000);
        }
        if(texto=='sin'){
          this.alerta6 = true
          setTimeout(() => (this.alerta6 = false), 6000);
        }
        if(texto=='cos'){
          this.alerta7 = true
          setTimeout(() => (this.alerta7 = false), 6000);
        }
        if(texto=='tan'){
          this.alerta8 = true
          setTimeout(() => (this.alerta8 = false), 6000);
        }
      }
    },
    funcion(x){
      let t = '' 
      let texto =  ''
      let b = 0
      let tt = ''
      for (let a = 0; a<= (x.length-1); a++){
        for(b = 0; b<=(this.funcionn.length-1);b++){
          if(this.funcionn[b]=='x'){
            t = t + x[a].toString()
          }else{
            t = t + this.funcionn[b]
          }
          if(b==(this.funcionn.length-1)){
            tt = t
            t = ''
          }
        }
        //Licencia Math.js es de código abierto y tiene licencia bajo la licencia Apache 2.0
        //https://mathjs.org/download.html
        let variab = {
          n:tt,
          r:''
        }
        this.axios.post('http://api.mathjs.org/v4/',{"expr": [tt],"precision": 10})
        .then(res=>{
          variab.r = res.data.result[0]
          this.arreglo.push(variab)
        })
        .catch(err=>{console.log(err)})        
      }
    },
  }
};
</script>
