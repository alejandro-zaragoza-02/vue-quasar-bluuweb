<template>

    <q-page class="row justify-center">
        <div class="col-12 col-sm-6 col-md-5">
            <h3 class="row justify-center">Login</h3>
            <q-form @submit.prevent="handleSubmit">
                <q-input
                    type="email"
                    v-model="email"
                    label="Email"
                    :rules="[
                        (val) =>
                            (val.length < 1 || /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) || 'Formato de email incorrecto'  
                    ]"
                />
                <q-input
                    type="password"
                    v-model="password"
                    label="Contraseña"
                    :rules="[
                        (val) => 
                            (val.length < 1 || val.length > 5) || 'La contraseña debe tener mínimo 6 carácteres.',  
                    ]"
                />
                <div padding>
                    <q-btn type="submit">Login</q-btn>
                </div>
            </q-form>
        </div>
    </q-page>

</template>


<script setup>

import { ref } from "vue";
import { useUserStore } from "../stores/userStore";
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const $q = useQuasar();

const email = ref('test@test.com');
const password = ref('123456');

const handleSubmit = async () => {

    try {
        await userStore.login(email.value, password.value);
        router.push('/');
    } catch (error) {
        console.error(error.error);
        alertError(error.error);
    }
}

const alertError = (message = "Error de servidor") => {
    $q.dialog({
        title: "Error",
        message: message,
    });
};

</script>