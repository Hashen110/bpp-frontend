import { boot } from 'quasar/wrappers';
import { LocalStorage } from 'quasar';
import { api } from 'boot/axios';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ urlPath, app, redirect }) => {
  if (urlPath.includes('/login') || urlPath.includes('/register')) {
    LocalStorage.clear();
    return;
  }
  const refreshToken = LocalStorage.getItem('refreshToken');
  if (refreshToken) {
    try {
      let response = await api.post('/auth/refresh', { refreshToken, grantType: 'refreshToken' });
      api.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`;
      LocalStorage.set('refreshToken', response.data.refreshToken);
      app.config.globalProperties.$api = api;

      response = await api.get('/auth/me');
      app.config.globalProperties.$user = response.data;
      LocalStorage.set('me', response.data);
    } catch (e) {
      console.error(e);
      LocalStorage.clear();
      redirect({ path: '/login' });
    }
  } else {
    redirect({ path: '/login' });
  }
});
