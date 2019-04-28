<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';

  export default Vue.extend({
    name: 'app',
    computed: {
      ...mapGetters([
        'theme',
        'ftu',
      ]),
    },
    methods: {
      ...mapActions([
        'updateTheme',
      ]),
    },
    mounted() {
     // Set a initial config
     if (!this.theme) {
       this.updateTheme('light');
     }
   },
 });

</script>

<style lang="scss">
  @import '@/assets/nuiverse/nuiverse.scss';
  @import '@/style/global.scss';
</style>
