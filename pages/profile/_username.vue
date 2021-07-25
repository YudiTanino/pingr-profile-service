<template>
    <div>
        <PingrHeader/>
        <div class="flex flex-col h-screen">
            <div class="grid place-items-center mx-2 my-20">
                <div class="mt-5">
                    <ProfileInfo class="mb-3"/>
                    <Connections/>
                </div>
            </div>
        </div>
        <username />
        <name />
        <creationDate v-if="isPublic" />
        <birthdate v-if="isPublic" />
        <description />
        <location v-if="isPublic" v-bind:value="user.location"  />
    </div>
</template>

<script>
import {getUser} from "../../api"
import PingrHeader from "~/components/header.vue"
import Connections from "~/components/connections.vue"

export default {
    components: { Connections, PingrHeader },
    data: () => {
        return {
            isPublic: true,
        }
    },
    beforeMount() {
        document.querySelector('body').setAttribute('style', 'background:#253140')
    },
    computed: {
        isPublic(){
            return this.$store.state.profile.user.public;
        },
        
        user(){
            return this.$store.state.profile.user
        }
    },
    async created(){
        const user = await getUser(this.$axios, this.$route.params.username);
        this.$store.commit('profile/insert', user);
    }
}
</script>