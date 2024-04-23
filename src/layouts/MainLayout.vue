<template>
  <q-layout view="hHh lpr lFr">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>Bitcoin Price Prediction</q-toolbar-title>
        <div>
          $ {{ tickerPrice }}
          <q-tooltip>Bitcoin latest price</q-tooltip>
        </div>
        <q-space />
        <q-btn icon="person" rounded>
          <q-menu>
            <q-list>
              <q-item clickable to="/profile">
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Profile</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable to="/login">
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      elevated
    >
      <q-list>
        <q-item clickable to="/">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/charts">
          <q-item-section avatar>
            <q-icon name="candlestick_chart" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Charts</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/profile">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Profile</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="isAdmin" clickable to="/users">
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Users</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onBeforeMount, onBeforeUnmount } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'boot/axios';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const $q = useQuasar();

    const leftDrawerOpen = ref(false);
    const tickerPrice = ref(0);
    const interval = ref(null);
    const isAdmin = ref(false);

    onBeforeMount(() => {
      api.get('/ticker/price').then((res) => {
        tickerPrice.value = Math.round((Number.parseFloat(res.data.price) + Number.EPSILON) * 100) / 100;
      }).catch(() => {
        $q.notify({
          color: 'negative',
          message: 'Failed to get ticker price',
        });
      }).finally(() => {
        interval.value = setInterval(() => {
          api.get('/ticker/price').then((res) => {
            tickerPrice.value = Math.round((Number.parseFloat(res.data.price) + Number.EPSILON) * 100) / 100;
          }).catch(() => {
            $q.notify({
              color: 'negative',
              message: 'Failed to get ticker price',
            });
          });
        }, 60000);
      });
      isAdmin.value = $q.localStorage.getItem('me').isAdmin !== 0;
    });

    onBeforeUnmount(() => {
      clearInterval(interval.value);
    });

    return {
      leftDrawerOpen,
      tickerPrice,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      isAdmin,
    };
  },
});
</script>
