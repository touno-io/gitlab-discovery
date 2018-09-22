<template>
  <modal title="Create a branch">
    <div id="create_branch_body">
      <div class="position-relative p-4">
        <span>Name</span>
        <input
          id="name_branch"
          v-model="nameBranch"
          type="text"
          placeholder="Name for new branch"
          class="my-2"
          @input="checkName">
        <span
          id="error-msg"
          :class="{'showError':validName === false && nameBranch.length > 0}"
          class="alert-name text-danger">Is not a valid branch name</span>
        <div v-if="defaultBranch !== currentBranch[0]">
          <span>Create branch based on...</span>
          <ul
            id="branch-based"
            class="my-3">
            <li
              :class="{'active': basedOn === defaultBranch}"
              class="py-2 px-3"
              @click="selectBranch(defaultBranch)">
              <span class="title">{{ defaultBranch }}</span>
              <span class="desc">The default branch in your repository.
              Pick this to start on something new that's not dependent on your current branch.
              </span>
            </li>
            <li
              :class="{'active': basedOn === currentBranch[0]}"
              class="py-2 px-3"
              @click="selectBranch(currentBranch[0])">
              <span class="title">{{ currentBranch[0] }}</span>
              <span class="desc">The currently checked out branch.
              Pick this if you need to build on work done in this branch.</span>
            </li>
          </ul>
        </div>
        <!-- eslint-disable max-len -->
        <div v-else>
          Your new branch will be based on your currently checked out branch ({{ currentBranch[0] }}). {{ currentBranch[0] }} is the <a @click="openExternal('https://docs.gitlab.com/ee/user/project/repository/branches/index.html#default-branch')">default branch</a> for your repository.
        </div>
      </div>
      <div class="bottom p-4 text-right">
        <button
          id="cancel-btn"
          class="button alternative"
          @click="close">Cancel</button>
        <button
          id="cancel-btn"
          :class="{'disabled': validName === false}"
          class="button primary"
          @click="create">Create branch</button>
      </div>
    </div>
  </modal>
</template>
<script>
import { GitProcess } from 'dugite';
import { mapActions, mapGetters } from 'vuex';
import Modal from '../LandingPage/Modal';
import Utils from '../../utils';

export default {
  name: 'ModalNewBranch',
  components: { Modal },
  data() {
    return {
      nameBranch: '',
      validName: false,
      basedOn: '',
    };
  },
  computed: {
    ...mapGetters([
      'currentProjectName',
      'getAllProjectsInfo',
      'currentProject',
      'currentBranch',
      'defaultBranch',
    ]),
  },
  watch: {
    defaultBranch() {
      this.basedOn = this.defaultBranch;
    },
  },
  mounted() {
    this.basedOn = this.defaultBranch;
  },
  methods: {
    ...mapActions([
      'closeModal',
      'switchProject',
      'removeProject',
      'showListControl',
      'updateOperation',
    ]),
    close() {
      this.closeModal();
    },
    checkName() {
      /* eslint-disable no-control-regex */
      const reg = new RegExp('[\\x00-\\x20\\x7F~^:?*\\[\\|""<>]+|@{|\\.\\.+|^\\.|\\.$|\\.lock$|\\/$', 'gm');
      const check = this.nameBranch.match(reg);
      if (check !== null) {
        this.validName = false;
      } else {
        this.validName = true;
      }
    },
    selectBranch(name) {
      this.basedOn = name;
    },
    create() {
      if (this.validName === true) {
        // git checkout -b myFeature dev
        GitProcess.exec(['checkout', '-b', this.nameBranch, this.basedOn], this.currentProject)
          .then(() => {
            this.updateOperation('globalUpdate');
            this.close();
          });
      }
    },
    openExternal(url) {
      Utils().showExternal(url);
    },
  },
};
</script>

<style lang="scss">
  #create_branch_body {
    #error-msg{
        opacity: 0;
        visibility: hidden;
        height: 20px;
      &.showError{
        opacity: 1;
        visibility: visible;
      }
    }
    .disabled {
      opacity: 0.5;
      transition: none !important;
    }

    #branch-based{
      border: 1px solid #e6e6e6;
      border-radius: 4px;
      overflow: hidden;
      li{
        margin: 0;
        &:hover{
          background-color: #e6e6e6;
        }
        &:not(:last-child){
          border-bottom: 1px solid #e6e6e6;
        }
      }

      .title{
        font-size: 14px;
        font-weight: 600;
      }

      .active{
        background-color: #4b4ba3 !important;
        .title, .desc {
          color: white;
        }
      }
    }
  }
</style>
