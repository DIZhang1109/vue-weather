<template>
	<div id="app">
		<h1>{{ title }}</h1>
		<router-link to="/forecast">Weather Forecast</router-link>
		<router-link to="/airquality">Air Quality</router-link>
	</div>
</template>

<script>
export default {
	name: 'app',
	data() {
		return {
			title: 'Vuejs Weather App'
		}
	}
}
</script>

<style>
#app {
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}

h1,
h2 {
	font-weight: normal;
}
</style>
