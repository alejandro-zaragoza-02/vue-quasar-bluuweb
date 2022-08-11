<template>
  <q-page padding>
    <q-btn @click="acces">Ingresar</q-btn>
    <q-btn @click="createLink">Crear Link</q-btn>
    {{ token }} - {{ exp }}
  </q-page>
</template>

<script setup>

import { api } from 'src/boot/axios';
import { ref } from 'vue';

const token = ref('');
const exp = ref('');

const acces = () => {
  api.post('auth/login', {
    "email": "zetapetayt@gmail.com",
    "password": "123456"
  }).then(res => {
    console.log(res.data);
    token.value = res.data.token.token;
    exp.value = res.data.token.expiresIn;
    setTime();
  }).catch(err => console.error(err));
}

const createLink = async () => {
  try {
    const res = await api({
      method: 'POST',
      url: 'links',
      headers: {
        Authorization: 'Bearer ' + token.value
      },
      data: {
        longLink: 'https://twitter.com/'
      }
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}

const setTime = () => {
  setTimeout(() => {
    refreshToken();
  }, exp.value * 1000 - 6000);
}

const refreshToken = async () => {
  try {
    const res = await api.get('auth/refresh');
    console.log(res.data);
    token.value = res.data.token;
    exp.value = res.data.expiresIn;
    setTime();
  } catch (error) {
    console.error(error);
  }
  
}

refreshToken();
</script>
