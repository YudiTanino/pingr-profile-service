<template>
    <div>
        <PingrHeader/>
        <div class="flex flex-col h-screen">
            <div class="grid place-items-center mx-2 my-20">
                <div class="mt-5">
                    <ProfileInfo class="mb-3" v-bind:isPublic = "isPublic" v-bind:user = "user"/>
                    <Connections />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getUser} from "../../api"
import PingrHeader from "~/components/header.vue"
import ProfileInfo from "~/components/profileInfo.vue"
import Connections from "~/components/connections.vue"

export default {
    components: { Connections, PingrHeader, ProfileInfo },
    
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