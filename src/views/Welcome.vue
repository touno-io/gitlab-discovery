<template>
  <div id="welcome">
    <div id="form">
      <div class="form_container columns align-items-center">

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

<script lang="ts">
  import Vue                        from 'vue';
  import { mapGetters, mapActions } from 'vuex';
  import { shell }                  from 'electron';
  import * as fs                    from 'fs';
  import * as path                  from 'path';
  // tslint:disable-next-line
  const Gitlab = require('gitlab').default;

  export default Vue.extend({
    name: 'welcome',
    data() {
      return {
        token: '',
        email: '',
        nameUser: '',
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
      sign() {
        this.currentWindow = 'sign_in_win';
      },
      openLink(url: string): void  {
        shell.openExternal(url);
      },
      addUser(): void {
        // tslint:disable-next-line
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
        const gitlab: any = new Gitlab({
          url: 'https://gitlab.com',
          token: this.token, // Can be created in your profile.
          useXMLHttpRequest: true,
        });

        gitlab.Users.current()
          .then((data: any) => {
            console.log(data);
            // this.updateCurrentUser({
            //   avatar: data.avatar_url,
            //   id: data.id,
            //   username: data.username,
            // });
          });
      },
      backStep(step: number) {
        this.step = step;
        this.gitlabUserName = '';
        this.gitlabUserEmail = '';
      },
    },
  });
</script>

<style lang="scss">
 #welcome {
  &::before {
    background-image: url('../assets/gitlab-icon-pattern-header.svg');
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

  .example-commit {
    border-radius: 4px;
    border: 1px solid rgb(235, 235, 235);
    background-color: #fff;
    overflow: hidden;
    margin-top: 30px;

    .example-commit-header{
      padding: 6px 10px;
      background-color: #efefef;
      color: rgb(32, 32, 32);
      display: block;
    }

    .example-commit-container{
      padding: 6px 10px;
    }
    .example-commit-title {
      font-weight: bold;
      display: block;
    }

    .example-commit-username,
    .example-commit-time {
      color: rgb(85, 85, 85);
      font-family: 'FiraGO Light';
    }
  }
 }
</style>
