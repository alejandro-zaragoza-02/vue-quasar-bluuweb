<template>
  <q-page padding>
    {{ userStore.token }} - {{ userStore.exp }}
  </q-page>
</template>


<script setup>

import { api } from 'src/boot/axios';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();

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

</script>
