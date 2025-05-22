<template>
    <button class="proceed-button" @click="handleContinue" :data-text="buttonText">
        {{ buttonText }}
    </button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: "ProceedButton",
    props: {
        text: {
            type: String,
            required: true,
        },
    },
    setup(props, { emit }) {
        const buttonText = ref(props.text);
        const handleContinue = () => {
            emit("handleContinue");
        };
        return { buttonText, handleContinue };
    },
});
</script>

<style scoped lang="scss">
@use "sass:math";

.proceed-button {
    color: #7c7c7c;
    position: fixed;
    font-family: "JetBrains Mono", monospace;
    border-left: none;
    border-right: none;
    background-color: transparent;
    font-size: 30px;
    margin-top: 10px;
    animation: glitch 2.5s infinite;
    cursor: pointer;
}

@media (max-width: 600px) {
    .proceed-button {
        font-size: 20px;
        margin-top: 0px;
    }
}

@keyframes fudge {
    from {
        transform: translate(0px, 0px);
    }
    to {
        transform: translate(0px, 2%);
    }
}

@keyframes glitch {
    1% {
        transform: rotateX(10deg) skewX(90deg);
    }
    2% {
        transform: rotateX(0deg) skewX(0deg);
    }
}

@keyframes noise-1 {
    $steps: 30;
    @for $i from 1 through $steps {
        #{math.percentage($i*(math.div(1, $steps)))} {
            $top: math.random(100);
            $bottom: math.random(101 - $top);
            clip-path: inset(#{$top}px 0 #{$bottom}px 0);
        }
    }
}

@keyframes noise-2 {
    $steps: 30;
    @for $i from 0 through $steps {
        #{math.percentage($i*(math.div(1, $steps)))} {
            $top: math.random(100);
            $bottom: math.random(101 - $top);
            clip-path: inset(#{$top}px 0 #{$bottom}px 0);
        }
    }
}

@keyframes fudge {
    from {
        transform: translate(0px, 0px);
    }
    to {
        transform: translate(0px, 2%);
    }
}

@keyframes fudge {
    from {
        transform: translate(0px, 0px);
    }
    to {
        transform: translate(0px, 2%);
    }
}
</style>
