<template>
    <div class = "texto">
        <span>{{property}}:</span>
        <span>{{value}}</span>
    </div>
</template>

<script>
export default {
 props: ['property', 'value']
}
</script>

<style>
.texto{
    @apply text-white text-base;
}
</style>