<template>
  <q-page padding>
    <div class="text-h6 text-center">Profile</div>
    <div class="q-pa-md"></div>
    <q-card>
      <q-card-section>
        <q-input
          v-model="registerForm.firstname"
          :model-value="registerForm.firstname"
          label="First Name"
          outlined
        >
          <template v-slot:after>
            <q-btn class="full-height" icon="save" @click="onSave" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section>
        <q-input
          v-model="registerForm.lastname"
          :model-value="registerForm.lastname"
          label="Last Name"
          outlined
        >
          <template v-slot:after>
            <q-btn class="full-height" icon="save" @click="onSave" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section>
        <q-input
          v-model="registerForm.email"
          :model-value="registerForm.email"
          label="Email"
          type="email"
          outlined
          readonly
        />
      </q-card-section>
      <q-card-section>
        <q-input
          v-model="registerForm.username"
          :model-value="registerForm.username"
          label="Username"
          outlined
          readonly
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'boot/axios';

export default defineComponent({
  name: 'ProfilePage',
  setup() {
    const registerForm = ref({
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: 'REDACTED',
    });

    const $q = useQuasar();
    let me = null;

    onMounted(() => {
      me = $q.localStorage.getItem('me');
      if (me) {
        registerForm.value.firstname = me.firstname;
        registerForm.value.lastname = me.lastname;
        registerForm.value.email = me.email;
        registerForm.value.username = me.username;
      }
    });

    return {
      registerForm,
      onSave() {
        if (!registerForm.value.firstname || !registerForm.value.lastname) {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'First Name and Last Name are required',
          });
          return;
        }
        api.put(`/users/${me.id}`, registerForm.value).then(() => {
          $q.notify({
            color: 'positive',
            message: 'Profile updated',
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }).catch(() => {
          $q.notify({
            color: 'negative',
            message: 'Profile update failed',
          });
        });
      },
    };
  },
});
</script>
