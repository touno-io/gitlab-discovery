<template>
  <div id="welcome">
    <div id="form">
      <div class="form_container columns align-items-center">
        <div class="column full p-4 px-6">
          <h2>Welcome to GitLab Discovery</h2>
          <span class="py-4 d-block">
            GitLab Discovery is the easiest way for you to contribute projects with GitLab to log in and get started right away.
          </span>
          <div class="divider"></div>
          <span class="py-2 d-block">New to GitLab? <a href="">Create your free account</a>.</span>
          <a href="" class="d-inline-block py-2">Sign into GitLab.com</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  name: "welcome",
})
export default class Welcome extends Vue {
  open(link: string) {
    if (this.$electron) {
      this.$electron.shell.openExternal(link);
    }
  }
}
</script>

<style lang="scss">
 
  
 #welcome {
  &::before {
    background-image: url('../../assets/gitlab-icon-pattern-header.svg');
    background-size: cover;
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    left: 0;
    opacity: .1;
  }

  &::after {
    position: absolute;
    content: "";
    width: 50%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    background-color: #554488;
  }

  #form {
    position: absolute;
    width: 50%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(255, 255, 255, 0.75);
    z-index: 2;
  }

  .form_container {
    height: 100%;
    padding: 0 10%;
  }

  .divider {
    width: 20%;
    height: 4px;
    border-radius: 20px;
    background-color: #E6E6E6;
    display: block;
    margin: 10px 0;
  }
 }
</style>
