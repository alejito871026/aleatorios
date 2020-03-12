<template>
  <div class="cuadradosMedios">
    <barra/>
    <cuadMedios/>
  </div>
</template>

<script>
// @ is an alias to /src
import cuadMedios from "../components/cuadMedios.vue";
import barra from "../components/barra.vue"

export default {
  name: "cuadradosMedios",
  components: {
    cuadMedios,
    barra,
  },
  data(){
    return{

    }
  },
  methods:{

  }
};
</script>
