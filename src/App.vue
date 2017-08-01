<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <input type="text" placeholder="Enter one city" v-model="city" @keyup.enter="getRawData(city)">
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      title: 'Vue.js Weather',
      city: ''
    }
  },
  methods: {
    getRawData(city) {
      alert(city)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}
</style>
