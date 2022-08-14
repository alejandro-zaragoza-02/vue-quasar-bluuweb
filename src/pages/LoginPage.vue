<template>

    <h3>Login</h3>
    <p>{{userStore.token}}</p>

</template>


<script setup>

import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();
console.log(userStore);

</script>