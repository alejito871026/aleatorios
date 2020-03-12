<template>
  <div class="barra">
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav">
            <li class="nav-item">
                <router-link to="/" class="nav-link">cuadrados medios</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/productosMedios" class="nav-link">Productos Medios</router-link>
            </li>
            <li class="nav-item">
                <a class="nav-link disabeled" href="#">proximos algoritmos</a>
            </li>
        </ul>
    </nav>
  </div>
</template>
<script>
export default {
 name:'barra'
}
</script>

<style>

</style>