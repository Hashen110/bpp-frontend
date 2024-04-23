<template>
  <q-page padding id="chartsPageQPage">
    <div id="chartsPage" class="full-width" style="height: 90vh;"></div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { init } from 'klinecharts';
import { api } from 'boot/axios';

export default defineComponent({
  name: 'ChartsPage',
  setup() {
    const $q = useQuasar();

    function klines(chart) {
      api.get('/klines').then((response) => {
        chart.applyNewData(response.data.klines);
        chart.createIndicator('VOL');
        chart.createIndicator('MACD');
        chart.createIndicator('KDJ');
        chart.createIndicator('RSI');
      }).catch(() => {
        $q.notify({
          color: 'negative',
          message: 'Failed to get klines',
        });
      });
    }

    onMounted(() => {
      klines(init('chartsPage'));
    });
  },
});
</script>
