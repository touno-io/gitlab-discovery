<!--
 Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
 Use of this source code is governed by a BSD-style license that can be
 found in the LICENSE file.
-->

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  // Import the NUIverse
  @import './assets/nuiverse/nuiverse';

  .app {
    color: #2c3e50;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
</style>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>