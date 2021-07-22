<template>
<div class="flex items-center justify-center">
    <img class="m-2" style="height: 1.75em" src="~/static/connections-icon.png"/>
    <p class="m-2">followers: {{ followers.length }}</p>
    <p class="m-2">following: {{ follows.length }}</p>
</div>
</template>

<script>
export default {
    data() {
        return {
            follows: [],
             followers: []
        }
    },
    async beforeMount() {
        try {
            const data = await this.$axios.$get("/follow/" + this.$route.params.id, { type: 'user' });
            this.follows = data.follows;
            this.followers = data.followers;
        } catch (err) {
            this.follows = [];
            this.followers = [];
        }
        this.$store.commit('profile/set_connections', { follows: this.follows, followers: this.followers });
    }
}
</script>
