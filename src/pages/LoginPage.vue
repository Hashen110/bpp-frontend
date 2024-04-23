<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="text-h4 text-center">Login</div>
        <div class="q-pa-md">
          <q-form @submit="onLoginSubmit" @reset="onLoginReset" class="q-gutter-md">
            <q-input
              v-model="loginForm.username"
              :model-value="loginForm.username"
              label="Username"
              outlined
            />
            <q-input
              v-model="loginForm.password"
              :model-value="loginForm.password"
              label="Password"
              type="password"
              outlined
            />
            <div>
              <q-btn label="Login" type="submit" color="primary"/>
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="text-h4 text-center">Register</div>
        <div class="q-pa-md">
          <q-form @submit="onRegisterSubmit" @reset="onRegisterReset" class="q-gutter-md">
            <q-input
              v-model="registerForm.firstname"
              :model-value="registerForm.firstname"
              label="First Name"
              outlined
            />
            <q-input
              v-model="registerForm.lastname"
              :model-value="registerForm.lastname"
              label="Last Name"
              outlined
            />
            <q-input
              v-model="registerForm.email"
              :model-value="registerForm.email"
              label="Email"
              type="email"
              outlined
            />
            <q-input
              v-model="registerForm.username"
              :model-value="registerForm.username"
              label="Username"
              outlined
            />
            <q-input
              v-model="registerForm.password"
              :model-value="registerForm.password"
              label="Password"
              type="password"
              outlined
            />
            <div>
              <q-btn label="Register" type="submit" color="primary"/>
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'boot/axios';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const loginForm = ref({
      username: '',
      password: '',
    });
    const registerForm = ref({
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
    });

    const $q = useQuasar();

    return {
      loginForm,
      onLoginSubmit() {
        if (!loginForm.value.username) {
          $q.notify({
            color: 'negative',
            message: 'Username is required',
          });
        } else if (!loginForm.value.password) {
          $q.notify({
            color: 'negative',
            message: 'Password is required',
          });
        } else {
          api.post('/auth/login', loginForm.value).then((res) => {
            if (res.data) {
              $q.localStorage.set('refreshToken', res.data.refreshToken);
              window.location.href = '/';
            } else {
              $q.notify({
                color: 'negative',
                message: 'Failed to login',
              });
            }
          }).catch(() => {
            $q.notify({
              color: 'negative',
              message: 'Failed to login',
            });
          });
        }
      },
      onLoginReset() {
        loginForm.value.username = '';
        loginForm.value.password = '';
      },
      registerForm,
      onRegisterSubmit() {
        if (!registerForm.value.firstname) {
          $q.notify({
            color: 'negative',
            message: 'First Name is required',
          });
        } else if (!registerForm.value.lastname) {
          $q.notify({
            color: 'negative',
            message: 'Last Name is required',
          });
        } else if (!registerForm.value.email) {
          $q.notify({
            color: 'negative',
            message: 'Email is required',
          });
        } else if (!registerForm.value.username) {
          $q.notify({
            color: 'negative',
            message: 'Username is required',
          });
        } else if (!registerForm.value.password) {
          $q.notify({
            color: 'negative',
            message: 'Password is required',
          });
        } else {
          api.post('/auth/register', registerForm.value).then((res) => {
            if (res.data) {
              $q.localStorage.set('refreshToken', res.data.refreshToken);
              window.location.href = '/';
            } else {
              $q.notify({
                color: 'negative',
                message: 'Failed to register',
              });
            }
          }).catch(() => {
            $q.notify({
              color: 'negative',
              message: 'Failed to register',
            });
          });
        }
      },
      onRegisterReset() {
        registerForm.value.firstname = '';
        registerForm.value.lastname = '';
        registerForm.value.email = '';
        registerForm.value.username = '';
        registerForm.value.password = '';
      },
    };
  },
});
</script>
