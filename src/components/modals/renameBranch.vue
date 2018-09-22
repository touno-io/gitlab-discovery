<template>
  <modal title="Rename branch">
    <div id="rename_branch_body">
      <div class="position-relative p-4">
        <span>Name</span>
        <input
          id="name_branch"
          v-model="newName"
          type="text"
          placeholder="Name for new branch"
          class="my-2"
          @input="checkName">
        <div id="error-msg">
          <span
            v-if="validName === false && newName.length > 0"
            class="alert-name text-danger">Is not a valid branch name</span>
          <span
            v-if="newNameExists === true"
            class="alert-name text-danger">A branch with that name already exists.</span>
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
          @click="rename">Rename branch</button>
      </div>
    </div>
  </modal>
</template>
<script>
import { GitProcess } from 'dugite';
import { mapActions, mapGetters } from 'vuex';
import path from 'path';
import Modal from '../LandingPage/Modal';
import Utils from '../../utils';

export default {
  name: 'RenewName',
  components: { Modal },
  data() {
    return {
      newName: '',
      validName: false,
      oldName: '',
      branchs: [],
      newNameExists: false,
    };
  },
  computed: {
    ...mapGetters([
      'currentBranch',
      'defaultBranch',
      'currentProject',
    ]),
  },
  watch: {
    defaultBranch() {
      [this.oldName] = this.currentBranch;
      this.listBranchs();
    },
  },
  mounted() {
    [this.oldName] = this.currentBranch;
    this.listBranchs();
  },
  methods: {
    ...mapActions([
      'closeModal',
      'switchProject',
      'removeProject',
      'updateOperation',
    ]),
    close() {
      this.closeModal();
    },
    checkName() {
      /* eslint-disable no-control-regex */
      const reg = new RegExp('[\\x00-\\x20\\x7F~^:?*\\[\\|""<>]+|@{|\\.\\.+|^\\.|\\.$|\\.lock$|\\/$', 'gm');
      const check = this.newName.match(reg);
      const checkExistsName = this.branchs.filter(branch => {
        let [, name] = branch;
        name = path.basename(name);
        return name === this.newName;
      });
      if (checkExistsName.length > 0) {
        this.newNameExists = true;
      } else {
        this.newNameExists = false;
      }

      if (check !== null) {
        this.validName = false;
      } else {
        this.validName = true;
      }
    },
    selectBranch(name) {
      this.oldName = name;
    },
    rename() {
      if (this.validName === true) {
        // git checkout -b myFeature dev
        GitProcess.exec(['branch', '-m', this.oldName, this.newName], this.currentProject)
          .then(() => {
            this.updateOperation('globalUpdate');
            this.close();
          });
      }
    },
    openExternal(url) {
      Utils().showExternal(url);
    },
    listBranchs() {
      const delimiter = '1F';
      const delimiterString = String.fromCharCode(parseInt(delimiter, 16));
      const prefixes = ['refs/heads', 'refs/remotes'];
      const prefix = [
        '%(committerdate:iso8601)',
        '%(refname)',
        '%(refname:short)',
        '%(upstream:short)',
        '%(objectname)', // SHA
        '%(author)',
        '%(committer)',
        '%(parent)', // parent SHAs
        '%(symref)',
        '%(subject)',
        '%(body)',
        '%(trailers:unfold,only)',
        `%${delimiter}`, // indicate end-of-line as %(body) may contain newlines
      ].join('%00');
      GitProcess.exec(['for-each-ref', '--sort=-committerdate:iso8601', `--format=${prefix}`, ...prefixes], this.currentProject)
        .then((result) => {
          let list = result.stdout;
          list = list.split(delimiterString);
          // Remove the trailing newline
          list.splice(-1, 1);
          list.forEach((branch) => {
            this.branchs.push(branch.split('\0').filter(String));
          });
        });
    },
  },
};
</script>

<style lang="scss">
  #rename_branch_body {
    #error-msg{
      height: 40px;
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
