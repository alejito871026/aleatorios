<template>
  <div class="productosMedios">
    <barra/>
    <prodMedios/>
  </div>
</template>
<script>
import prodMedios from "../components/prodMedios.vue";
import barra from "../components/barra.vue"

export default {
  name: "productosMedios",
  components: {
    prodMedios,
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