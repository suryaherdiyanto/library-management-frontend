<template>
  <div id="nav" class="main-header pt-5 pb-5">
    <div class="container">
      <div class="columns is-justify-content-center">
        <div class="column is-1 has-text-centered">
          <router-link to="/">Home</router-link> <i class="fas fa-home"></i>
        </div>
        <div class="column is-1 has-text-centered">
          <router-link to="/login">Login</router-link>
        </div>
      </div>
    </div>
  </div>
  <router-view/>
</template>

<script>
export default {
	created() {
		
	}
}
</script>