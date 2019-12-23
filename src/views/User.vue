<template>
    <div class="currentUser">
        <div class="card">
            <div class="img" @click="showModal = true">
                <img :src="currentUser.picture.large" class="card-img-top" alt="currentUser.picture.large">
            </div>
            <div class="card-body">
                <h5 class="card-title">{{currentUser.name}}</h5>
                <div>{{currentUser.phone}}</div>
                <div>{{currentUser.email}}</div>
                <router-link tag="a" class="btn btn-primary" to="/">На главную</router-link>
            </div>
        </div>
        <modal v-if="showModal" @close="showModal = false">
            <img slot="body" :src="currentUser.picture.large" class="card-img-top" alt="currentUser.picture.large">
        </modal>
    </div>
</template>
<script>
    import {mapState, mapMutations} from "vuex";
    import Modal from "../components/Modal";

    export default {
        data() {
            return {
                showModal: false
            }
        },
        computed: {
            ...mapState(["currentUser"])
        },
        methods: {
            ...mapMutations(["setCurrentUser"])
        },
        components: {
            Modal
        },
        created() {
            this.setCurrentUser(this.$route.params.id);
        },
    }
</script>
<style lang="scss">
    .currentUser {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .card {
        width: 500px;
        text-align: center;
        padding: 20px;

        &:after {
            content: "";
            position: absolute;
            top: 100px;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: #e5eaea;
            z-index: 0;
        }
    }

    .img {
        position: relative;
        width: 150px;
        height: 150px;
        margin: 0 auto;
        border: 5px solid #fff;
        border-radius: 100%;
        box-shadow: 0 0 0 2px #e5eaea;
        overflow: hidden;
        cursor: pointer;
        z-index: 1;
    }
</style>