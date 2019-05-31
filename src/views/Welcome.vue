<!--
 Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
 Use of this source code is governed by a BSD-style license that can be
 found in the LICENSE file.
-->

<template>
  <div class="welcome">
    <div class="form">
      <div class="form-container columns align-items-center text-left">

        <div v-if="step == 0">
          <div
            v-show="currentWindow == 'welcome'"
            class="column full p-4 px-6">
            <h2>{{this.$i18n.t('welcome_title')}}</h2>
            <span class="py-4 d-block"> {{this.$i18n.t('welcome_about')}} </span>
            <div class="divider"></div>
            <span class="py-2 d-block">{{this.$i18n.t('new_question')}} <span class="a" @click="openLink('https://gitlab.com/users/sign_in#register-pane')">{{this.$i18n.t('create_account')}}</span>.</span>
            <a class="d-inline-block py-2" @click="sign()">{{this.$i18n.t('sign_in_gitlab')}}</a>
          </div>

          <div
            v-show="currentWindow == 'sign_in_win'"
            class="column full p-4 px-6">
            <h2>{{this.$i18n.t('sign_in_title')}}</h2>
            <span class="py-2">{{this.$i18n.t('welcome_insert_infos')}}</span>

            <input class="d-block my-2" type="text" v-model="token" :placeholder="this.$i18n.t('access_token')">
            <small v-if="errorToken == true" class="d-block mt-1 text-danger">{{ this.$i18n.t('invalid_token_message') }}</small>

            <input class="d-block my-2" type="text" v-model="email" :placeholder="this.$i18n.t('email')">
            <small v-if="errorEmail == true" class="d-block mt-1 text-danger">{{ this.$i18n.t('invalid_email_message') }}</small>

            <input class="d-block my-2" type="text" v-model="nameUser" :placeholder="this.$i18n.t('name')">
            <small v-if="errorNameUser == true" class="d-block mt-1 text-danger">{{ this.$i18n.t('invalid_nameuser_message') }}</small>

            <button class="button d-inline-block my-3" @click="addUser">{{this.$i18n.t('sign_in_title')}}</button>
            <small class="d-block mt-4 text-warning">{{this.$i18n.t('welcome_beta_warning')}}</small>

          </div>
        </div>

        <div v-if="step == 1">
          <h2>{{this.$i18n.t('configure_git_title')}}</h2>
          <span class="py-2 mb-3 d-block">{{this.$i18n.t('configure_git_desc')}}</span>
          <span class="d-block my-2">Name</span>
          <input type="text" placeholder="Your name" v-model="gitlabUserName"/>
          <span class="d-block my-2">Email</span>
          <input type="text" placeholder="Your email" v-model="gitlabUserEmail"/>
          <div class="d-block my-3">
            <button class="button primary-outline" @click="backStep(0)">Cancel</button>
            <button class="button ml-2">Next</button>
          </div>

          <div class="example-commit">
            <small class="example-commit-header">{{this.$i18n.t('example_commit')}}</small>
            <div class="example-commit-container">
              <small class="example-commit-title">{{this.$i18n.t('example_commit_title')}}</small>
              <small class="example-commit-username">{{ nameUser }}</small><small class="example-commit-time">{{this.$i18n.t('example_commit_time')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Vue                        from 'vue';
import { mapGetters, mapActions } from 'vuex';
// import { shell }                  from 'electron';
const shell = require('electron').shell;
// import * as fs                    from 'fs';
// import * as path                  from 'path';
// tslint:disable-next-line
// const Gitlab = require('gitlab').default;
import { Gitlab } from 'gitlab';

export default {
  name: 'welcome',
  data() {
    return {
      token: 'FhTnCHskarNKMgHgxFRd',
      email: 'patrickalima@nuinalp.com',
      nameUser: 'patrickalima98',
      errorEmail: false,
      errorNameUser: false,
      errorToken: false,
      step: 0,
      gitlabUserName: '',
      gitlabUserEmail: '',
      currentWindow: 'welcome',
    };
  },
  methods: {
    ...mapActions({
     ADD_USER: 'users/ADD_USER',
    }),
    sign() {
      this.currentWindow = 'sign_in_win';
    },
    openLink(url) {
      shell.openExternal(url);
    },
    addUser() {
      // eslint-disable-next-line
      const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      this.errorToken = false;
      this.errorNameUser = false;
      this.errorEmail = false;

      if (this.token === '') {
        this.errorToken = true;
        return;
      }

      if (this.nameUser === '') {
        this.errorNameUser = true;
        return;
      }

      if (!emailRegex.test(this.email)) {
        this.errorEmail = true;
        return;
      }

      this.getGitlabConn();
      // this.step = 1;
    },
    getGitlabConn() {
      const gitlab = new Gitlab({
        token: this.token, // Can be created in your profile.
      });
      
      gitlab.Users.current()
        .then((data) => {
          console.log(data);
          this.ADD_USER({
            login: data.username,
            name: data.name,
            avatar_url: data.avatar_url,
            email: data.email,
            id: data.id,
          });
        });
    },
    backStep(step) {
      this.step = step;
      this.gitlabUserName = '';
      this.gitlabUserEmail = '';
    },
  },
};
</script>

<style lang="scss">
.welcome {
  &::before {
    background-image: url('../assets/gitlab-icon-pattern-header.svg');
    background-size: cover;
    bottom: 0;
    content: '';
    height: 100%;
    left: 0;
    opacity: 0.1;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 1;
  }

  &::after {
    background-color: #548;
    bottom: 0;
    content: '';
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    width: 50%;
    z-index: 0;
  }

  .form {
    background-color: rgba(255, 255, 255, 0.75);
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 50%;
    z-index: 2;
  }

  .form-container {
    height: 100%;
    padding: 0 10%;
  }

  .divider {
    background-color: #e6e6e6;
    border-radius: 20px;
    display: block;
    height: 4px;
    margin: 10px 0;
    width: 20%;
  }

  .example-commit {
    background-color: #fff;
    border: 1px solid rgb(235, 235, 235);
    border-radius: 4px;
    margin-top: 30px;
    overflow: hidden;

    .example-commit-header {
      background-color: #efefef;
      color: rgb(32, 32, 32);
      display: block;
      padding: 6px 10px;
    }

    .example-commit-container {
      padding: 6px 10px;
    }

    .example-commit-title {
      display: block;
      font-weight: bold;
    }

    .example-commit-username,
    .example-commit-time {
      color: rgb(85, 85, 85);
      font-family: 'FiraGO Light';
    }
  }
}
</style>
