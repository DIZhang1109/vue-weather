<template>
	<div id="app">
		<h1>{{ title }}</h1>
		<router-link to="/">Home</router-link><br>
	</div>
</template>

<script>
export default {
	name: 'app',
	data() {
		return {
			title: 'Air Quality'
		}
	}
}
</script>

<style scoped>
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
