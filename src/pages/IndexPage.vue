<template>
  <q-page padding>
    <div class="row non-selectable">
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 q-pa-sm">
        <div class="q-pa-sm text-center bg-yellow rounded-borders">
          <div class="text-h4">${{ price24h.openPrice }}</div>
          <div class="text-h6">Open Price</div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 q-pa-sm">
        <div class="q-pa-sm text-center bg-amber rounded-borders">
          <div class="text-h4">${{ price24h.highPrice }}</div>
          <div class="text-h6">High Price</div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 q-pa-sm">
        <div class="q-pa-sm text-center bg-orange rounded-borders">
          <div class="text-h4">${{ price24h.lowPrice }}</div>
          <div class="text-h6">Low Price</div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 q-pa-sm">
        <div class="q-pa-sm text-center bg-deep-orange rounded-borders">
          <div class="text-h4">${{ price24h.volume }}</div>
          <div class="text-h6">Volume</div>
        </div>
      </div>
      <div class="col-12 q-pl-sm text-center">
        <div class="text-subtitle1 text-italic">
          24hr Ticker Price Change Statistics
        </div>
      </div>
    </div>
    <q-separator spaced="md" />
    <div>
      <div class="text-subtitle1 q-my-md">
        Find the price of a cryptocurrency at a specific date
      </div>
      <div class="row">
        <div class="col">
          <q-date
            v-model="date"
            :model-value="date"
            today-btn
            navigation-min-year-month="2018"
            navigation-max-year-month="2028"
            name="date"
            class="q-mr-sm"
          />
        </div>
        <div class="col">
          <div class="text-h6 text-center">Predicted Bitcoin Price on {{ predictedDate }}</div>
          <br>
          <div class="text-h5 text-center">{{ predictedPrice }}</div>
        </div>
      </div>
      <br>
      <br>
      <q-btn
        color="primary"
        label="Search"
        @click="searchPrice"
      />
      <br>
      <br>
      <div class="full-width">
        <canvas id="futureChart"></canvas>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import Chart from 'chart.js/auto';
import { api } from 'boot/axios';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const $q = useQuasar();

    const price24h = ref({
      openPrice: 0,
      highPrice: 0,
      lowPrice: 0,
      volume: 0,
    });
    const date = ref('');
    const predictedDate = ref('');
    const predictedPrice = ref('');

    function ticker24h() {
      api.get('/ticker/24hr').then((response) => {
        const { openPrice, highPrice, lowPrice, volume } = response.data;
        price24h.value.openPrice = Math.round((Number.parseFloat(openPrice) + Number.EPSILON) * 100) / 100;
        price24h.value.highPrice = Math.round((Number.parseFloat(highPrice) + Number.EPSILON) * 100) / 100;
        price24h.value.lowPrice = Math.round((Number.parseFloat(lowPrice) + Number.EPSILON) * 100) / 100;
        price24h.value.volume = Math.round((Number.parseFloat(volume) + Number.EPSILON) * 100) / 100;
      }).catch(() => {
        $q.notify({
          color: 'negative',
          message: 'Failed to get 24h price',
        });
      }).finally(() => setTimeout(() => ticker24h(), 60000));
    }

    function searchPrice() {
      if (!date.value) {
        $q.notify({
          color: 'negative',
          message: 'Please select a date',
        });
        return;
      }
      api.get(`/prices/price?date=${date.value}`).then((response) => {
        const { price } = response.data;
        predictedDate.value = date.value;
        const high = (Number.parseFloat(price) * 1.025).toFixed(2);
        const low = (Number.parseFloat(price) / 1.025).toFixed(2);
        predictedPrice.value = `$${low} - $${Number.parseFloat(price).toFixed(2)} - $${high}`;
      }).catch(() => {
        $q.notify({
          color: 'negative',
          message: 'Failed to get price',
        });
      });
    }

    onMounted(() => {
      ticker24h();

      const today = new Date();
      const month = `0${(today.getMonth() + 1)}`.slice(-2);
      const day = `0${today.getDate()}`.slice(-2);
      date.value = `${today.getFullYear()}/${month}/${day}`;
      searchPrice();

      api.get('/prices').then((response) => {
        const { predictions } = response.data;

        const startDate = new Date('2024-04-15');
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + predictions.length);
        const dateArray = [];
        for (let cDate = new Date(startDate); cDate <= endDate; cDate.setDate(cDate.getDate() + 1)) {
          dateArray.push(new Date(cDate).toLocaleDateString());
        }

        new Chart( // eslint-disable-line no-new
          document.getElementById('futureChart'),
          {
            type: 'line',
            data: {
              labels: dateArray,
              datasets: [{
                label: 'Predicted Bitcoin Price',
                data: predictions.map((prediction) => prediction.toFixed(2)),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
              }],
            },
          },
        );
      }).catch(() => {
        $q.notify({
          color: 'negative',
          message: 'Failed to get price',
        });
      });
    });

    return {
      price24h,
      date,
      predictedDate,
      predictedPrice,
      searchPrice,
    };
  },
});
</script>
