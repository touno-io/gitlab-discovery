<template>
  <div class="hello">
    <h1></h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="javascript:nw.Shell.openExternal('https://vuejs.org')"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="javascript:nw.Shell.openExternal('https://nwjs.io/')"
          target="_blank"
        >
          Core Docs NW.js
        </a>
      </li>
      <li>
        <a
          href="javascript:nw.Shell.openExternal('https://groups.google.com/forum/#!forum/nwjs-general')"
          target="_blank"
        >
          Forum NW.js
        </a>
      </li>
      <li>
        <a
          href="javascript:nw.Shell.openExternal('https://forum.vuejs.org')"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="javascript:nw.Shell.openExternal('https://chat.vuejs.org')"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="javascript:nw.Shell.openExternal('https://twitter.com/vuejs')"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="javascript:nw.Shell.openExternal('http://vuejs-templates.github.io/webpack/')"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="javascript:nw.Shell.openExternal('https://github.com/vuejs/awesome-vue')"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
