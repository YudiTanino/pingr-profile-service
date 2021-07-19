<template>
    <div>
        <span>{{creationDate}}</span>
    </div>
</template>

<script>
export default {
    computed: {
        creationDate() {
            return this.$store.state.profile.user.creationDate
        }
    },
}
</script>