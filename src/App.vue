<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <input type="text" placeholder="Enter one city" v-model="searchCity" @keyup.enter="getRawData(searchCity)"><br>
    <span>City: {{ returnCity | capitalize }}</span><br>
    <span>Country: {{ country }}</span><br>
    <div v-if="loading">
      <div class="loader">Loading...</div>
    </div>
    <div v-else>
      <h4>{{ today }}</h4>
      <span>Temperature: {{ todayMaxTemp | format }} | {{ todayMinTemp | format }}</span><br>
      <span>Condition: {{ todayDayCond | capitalize }} | {{ todayNightCond | capitalize }}</span><br>
      <h4>{{ tomorrow }}</h4>
      <span>Temperature: {{ tomorrowMaxTemp | format }} | {{ tomorrowMinTemp | format }}</span><br>
      <span>Condition: {{ tomorrowDayCond | capitalize }} | {{ tomorrowNightCond | capitalize }}</span><br>
      <h4>{{ theDayAfterTomorrow }}</h4>
      <span>Temperature: {{ theDayAfterTomoMaxTemp | format}} | {{ theDayAfterTomoMinTemp | format}}</span><br>
      <span>Condition: {{ theDayAfterTomoDayCond | capitalize }} | {{ theDayAfterTomoNightCond | capitalize }}</span><br>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import format from 'date-fns/format'
import addDays from 'date-fns/add_days'

export default {
  name: 'app',
  data() {
    return {
      title: 'Vue.js Weather',
      rawData: '',
      searchCity: '',
      returnCity: '',
      country: '',
      today: '',
      tomorrow: '',
      theDayAfterTomorrow: '',
      todayMaxTemp: '',
      todayMinTemp: '',
      tomorrowMaxTemp: '',
      tomorrowMinTemp: '',
      theDayAfterTomoMaxTemp: '',
      theDayAfterTomoMinTemp: '',
      todayDayCond: '',
      todayNightCond: '',
      tomorrowDayCond: '',
      tomorrowNightCond: '',
      theDayAfterTomoDayCond: '',
      theDayAfterTomoNightCond: '',
      loading: true
    }
  },
  filters: {
    capitalize(value) {
      if (value) {
        if (value.includes(' ')) {
          return value.split(' ').map(x => {
            return x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()
          }).join(' ')
        } else {
          return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        }
      }
    },
    format(value) {
      if (value) {
        return value + '°C'
      }
    }
  },
  methods: {
    getRawData(city) {
      this.loading = true
      axios.get('https://free-api.heweather.com/v5/forecast', {
        params: {
          city: city,
          key: 'dcfbc7bb58a34c85a0fd91c8d78c9da2',
          lang: 'en'
        }
      }).then(response => {
        this.loading = false
        this.rawData = response.data.HeWeather5
        this.getDetails(this.rawData)
      }).catch(error => console.log('Axios get error ' + error))
    },
    getDetails(value) {
      if (value[0].status !== 'unknown city') {
        this.returnCity = value[0].basic.city
        this.country = value[0].basic.cnty
        this.todayMaxTemp = value[0].daily_forecast[0].tmp.max
        this.todayMinTemp = value[0].daily_forecast[0].tmp.min
        this.tomorrowMaxTemp = value[0].daily_forecast[1].tmp.max
        this.tomorrowMinTemp = value[0].daily_forecast[1].tmp.min
        this.theDayAfterTomoMaxTemp = value[0].daily_forecast[2].tmp.max
        this.theDayAfterTomoMinTemp = value[0].daily_forecast[2].tmp.min
        this.todayDayCond = value[0].daily_forecast[0].cond.txt_d
        this.todayNightCond = value[0].daily_forecast[0].cond.txt_n
        this.tomorrowDayCond = value[0].daily_forecast[1].cond.txt_d
        this.tomorrowNightCond = value[0].daily_forecast[1].cond.txt_n
        this.theDayAfterTomoDayCond = value[0].daily_forecast[2].cond.txt_d
        this.theDayAfterTomoNightCond = value[0].daily_forecast[2].cond.txt_n
      } else {
        alert('Please enter a valid city name!')
      }
    },
    getDate() {
      let today = new Date()
      this.today = format(today, 'DD/MM/YYYY')
      this.tomorrow = format(addDays(today, 1), 'DD/MM/YYYY')
      this.theDayAfterTomorrow = format(addDays(today, 2), 'DD/MM/YYYY')
    },
    getInitialLocData() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.getRawData(position.coords.latitude + ',' + position.coords.longitude)
        })
      } else {
        alert('Unknown geolocation based on your ip')
      }
    }
  },
  mounted() {
    this.getDate()
    // this.getInitialLocData()
    this.getRawData('Wellington')
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

h1,
h2 {
  font-weight: normal;
}

.loader {
  color: #42b983;
  font-size: 20px;
  margin: 100px auto;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  -webkit-animation: load4 1.3s infinite linear;
  animation: load4 1.3s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}

@-webkit-keyframes load4 {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}

@keyframes load4 {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}
</style>
