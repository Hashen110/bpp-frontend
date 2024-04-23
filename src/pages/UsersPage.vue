<template>
  <q-page padding>
    <div class="text-h6 text-center">Profile</div>
    <div class="q-pa-md"></div>
    <q-table
      :rows="users"
      :columns="columns"
      row-key="id"
      :loading="users.length === 0"
    >
      <template v-slot:body-cell-isAdmin="props">
        <q-td :props="props">
          <q-chip
            :label="props.row.isAdmin ? 'Yes' : 'No'"
            :color="props.row.isAdmin ? 'positive' : 'negative'"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onBeforeMount } from 'vue';
import { api } from 'boot/axios';

export default defineComponent({
  name: 'UsersPage',
  setup() {
    const users = ref([]);

    onBeforeMount(() => {
      api.get('/users').then((res) => {
        users.value = res.data.users;
      });
    });

    return {
      users,
      columns: [
        { name: 'id', label: 'Id', field: 'id' },
        { name: 'firstname', label: 'First Name', field: 'firstname' },
        { name: 'lastname', label: 'Last Name', field: 'lastname' },
        { name: 'email', label: 'Email', field: 'email' },
        { name: 'username', label: 'Username', field: 'username' },
        { name: 'isAdmin', label: 'Is Admin', field: 'isAdmin' },
      ],
    };
  },
});
</script>
