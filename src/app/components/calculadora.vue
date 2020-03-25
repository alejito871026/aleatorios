<template>
<div class="calculator">  
    <div class="results">
        <input class="input" v-model="current">
    </div>
</div>
</template>

<script>
export default {
    name :'calculadora',
  data () {
    return {
    //the data we'll use in
    //building our app goes in here
    current : '',
    }
  },
  methods : {
    press(x) {
        //we make a reference to the inner text
        // of each button to dispatch our functions
        this.current = this.current + x;
        console.log(this.current)
    },
  },
}
</script>

<style>
</style>