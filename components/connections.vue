<template>
    <div class="flex items-center justify-left">
        <img style="height: 4em" src="~/static/connections-icon.png"/>
        <p class="ml-1 mr-3 text-lg text-white">Followers: {{ followers.length }}</p>
        <p class="ml-4 text-lg text-white">Following: {{ follows.length }}</p>
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
