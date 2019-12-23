<template>
    <div class="container">
        <router-view/>
    </div>
</template>
<script>
    import {mapActions} from "vuex";

    export default {
        methods: {
            ...mapActions(['init']),
        },
        created() {
            this.init();
        }
    }
</script>
<style lang="scss">

</style>
