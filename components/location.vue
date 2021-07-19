<template>
    <div>
        <span>{{location}}</span>
    </div>
</template>

<script>
export default {
    computed: {
        location() {
            return this.$store.state.profile.user.location
        }
    },
}
</script>