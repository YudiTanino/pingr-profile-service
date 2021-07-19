<template>
    <div>
        <span>{{name}}</span>
    </div>
</template>

<script>
export default {
    computed: {
        name() {
            return this.$store.state.profile.user.name
        }
    },
}
</script>