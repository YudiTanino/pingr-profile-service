<template>
    <div>
        <div>
            <username />
            <name />
            <creationDate v-if="isPublic" />
            <birthdate v-if="isPublic" />
            <description />
            <location v-if="isPublic" />
        </div>
        <Connections/>
    </div>
</template>

<script>
import {getUser} from "../../api"
import Connections from "~/components/connections.vue"

export default {
    components: { Connections },
    data: () => {
        return {
            isPublic: true,
        }
    },
    async created(){
        const user = await getUser(this.$axios, this.$route.params.id)
        this.$store.commit('profile/insert', user)
    }
}
</script>