<template>
    <form class="admin-popup-data" @submit.prevent="matchPasswords">
        <label for="admin-pass">
            Senha de administrador
            <input id="admin-pass" type="password" v-model="adminPass">
        </label>

        <p class="error-text" v-if="errorInfo">
            {{ errorInfo }}
        </p>

        <button class="button-primary">
            {{ buttonTitle ? buttonTitle : 'Voltar' }}
        </button>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import useStore from '../store/index';

export default defineComponent({
    name : 'AdminForm',
    data() {
        return {
            adminPass : '',
            errorInfo : '',
        }
    },
    emits: [ 'matchPassowrds'],
    methods: {
        matchPasswords() {
            const matchPass = this.store.verifyAdminPass(this.adminPass);
            if(!matchPass) {
                this.errorInfo = 'Credenciais inválidas' 
            }
            else {
                this.errorInfo = '' 
            }

            this.$emit('matchPassowrds', matchPass);
        }
    },
    props: {
        buttonTitle : {
            type: String,
            required: false,
        }
    },
    setup() {
        const store = useStore();
        return {
            store,
        }
    }
})
</script>

<style lang="scss" scoped>
.admin-popup-data {
    display: flex;
    flex-direction: column;
    gap:1rem;

    .error-text {
        font-size: .75rem;
        color: red;
    }

    label {
        display: flex;
        flex-direction: column;
    }
}
</style>