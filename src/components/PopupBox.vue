<template>
    <section id="popup-area" @click.self="closePopup">
        <div class="popup-box scale-in-center">
            <span
                v-if="canClose"
                class="popup-close-button"
                @click="closePopup"
            >
                X
            </span>
                <slot></slot>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name : 'PopupBox',
    data() {
        return {}
    },
    props: {
        canClose : {
            type : Boolean,
            required: false,
            default : true,
        },
    },
    methods: {
        closePopup() {
            if(this.canClose) {
                this.$emit('closePopup')
            }
        }
    },
    emits: [
        'closePopup',
    ]
})
</script>


<style lang="scss" scoped>
#popup-area {
    position: fixed;
    top: 0;
    bottom: 0;

    right: 0;
    left: 0;

    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(2px);

    display: flex;
    justify-content: center;
    align-items: center;

    .popup-box {
        position: relative;
        background-color: white;
        border-radius: .5rem;
        box-shadow: 0 0 20px  rgba(0, 0, 0, 0.2);

        padding : .75rem 1.5rem;

        .popup-close-button{
            display: flex;
            justify-content: center;
            align-items: center;

            font-size: .75rem;
            width   : 1.25rem;
            height  : 1.25rem;
            border-radius: 50%;

            color:white;
            background-color: brown;

            position: absolute;
            right   : -0.25rem;
            top     : -0.25rem;

            cursor: pointer;
        }
    }
}


@-webkit-keyframes scale-in-center {
    0% {
        -webkit-transform: scale(0);
                transform: scale(0);
        opacity: 1;
    }
    100% {
        -webkit-transform: scale(1);
                transform: scale(1);
        opacity: 1;
    }
}
@keyframes scale-in-center {
    0% {
        -webkit-transform: scale(0);
                transform: scale(0);
        opacity: 1;
    }
    100% {
        -webkit-transform: scale(1);
                transform: scale(1);
        opacity: 1;
    }
}

.scale-in-center {
	-webkit-animation: scale-in-center 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: scale-in-center 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
</style>