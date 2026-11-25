<template>
    <div class="name">
        <span>{{name}}</span>
    </div>
</template>

<script>
export default {
    props: ["name"]
}
</script>


<style>
.name{
    @apply text-white font-bold text-xl my-4;
}
</style>
