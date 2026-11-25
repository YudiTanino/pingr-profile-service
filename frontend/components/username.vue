<template>
    <div class="username1">
        <span>@{{username}}</span>
    </div>
</template>

<script>
export default {
    props: ["username"]
}
</script>


<style>
.username1{
    @apply text-white my-2;
}
</style>