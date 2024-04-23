<template>
  <q-layout view="hHh lpr lFr">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexLayout',
});
</script>
