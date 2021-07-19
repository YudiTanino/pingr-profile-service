<template>
    <div>
        <span>{{username}}</span>
    </div>
</template>

<script>
export default {
    computed: {
        username() {
            return this.$store.state.profile.user.username
        }
    },
}
</script>