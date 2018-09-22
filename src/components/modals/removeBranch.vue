<template>
  <modal title="Delete branch">
    <div id="delete_branch_body">
      <div class="position-relative p-4">
        <span class="my-1 d-block">Delete branch <code>{{ currentBranch[0] }}</code> ?</span>
        <span class="my-1 d-block">This action cannot be undone.</span>
        <!-- eslint-disable max-len -->
        <div
          v-if="existsRemote.length > 0"
          id="delete_remote_container">
          <strong class="py-2 d-block mb-2">The branch also exists on the remote, do you wish to delete it there as well?</strong>
          <input
            id="delete_remote"
            type="checkbox">
          <label for="delete_remote">
            Yes, delete this branch on the remote
          </label>
        </div>
      </div>
    </div>
    <div class="bottom p-4 text-right">
      <button
        id="cancel-btn"
        class="button primary"
        @click="close">Cancel</button>
      <button
        id="cancel-btn"
        class="button alternative"
        @click="prepare">Delete</button>
    </div>
  </modal>
</template>
<script>
import { GitProcess } from 'dugite';
import { mapActions, mapGetters } from 'vuex';
import Modal from '../LandingPage/Modal';
import Utils from '../../utils';

export default {
  name: 'RemoveBranch',
  components: { Modal },
  data() {
    return {
      branchs: [],
      existsRemote: [],
    };
  },
  computed: {
    ...mapGetters([
      'currentBranch',
      'defaultBranch',
      'currentProject',
    ]),
  },
  mounted() {
    // [this.oldName] = this.currentBranch;
    // this.listBranchs();
    this.remoteBranchList();
  },
  methods: {
    ...mapActions([
      'closeModal',
      'switchProject',
      'removeProject',
      'updateOperation',
      'updateOperation',
      'updateBranch',
      'updateOperation',
    ]),
    close() {
      this.closeModal();
    },
    selectBranch(name) {
      this.oldName = name;
    },
    remoteBranchList() {
      const delimiter = '1F';
      const delimiterString = String.fromCharCode(parseInt(delimiter, 16));
      const prefix = [
        '%(refname:short)',
        `%${delimiter}`, // indicate end-of-line as %(body) may contain newlines
      ].join('');
      GitProcess.exec(['for-each-ref', '--sort=-committerdate:iso8601', `--format=${prefix}`, 'refs/remotes'], this.currentProject)
        .then((result) => {
          let list = result.stdout;
          list = list.replace(/\n/gi, '').split(delimiterString);
          this.existsRemote = list.filter(branch => branch.indexOf('origin/') > -1);
        });
    },
    deleteBranch() {
      if (this.existsRemote.length > 0) {
        // Delete on local and remote
      } else {
        // Delete on local
        const [currentBranch] = this.currentBranch;
        GitProcess.exec(['branch', '-D', currentBranch], this.currentProject)
          .then((result) => {
            console.log(result);
            this.updateOperation('globalUpdate');
            this.close();
          });
      }
    /*  GitProcess.exec(['branch', '-m', this.oldName, this.newName], this.currentProject)
        .then(() => {
          this.updateOperation('switch_branch');
          this.updateBranch([this.defaultBranch]);
          this.close();
        }); */
    },
    prepare() {
      // Get Origin, using fetch
      // Name from repo
      const defaultBranch = [`refs/heads/${this.defaultBranch}`, this.defaultBranch];
      let [nameBranch] = defaultBranch;
      [nameBranch] = nameBranch.split('/').slice(-1);
      // Url whit Origin ex: origin/repo_name
      const [, urlOrigin] = defaultBranch;
      const args = ['checkout', urlOrigin, '--progress'];
      const Git = GitProcess.spawn(args, this.currentProject);
      Git.stderr.on('data', (data) => {
        const progress = data.toString('utf8');
        const check = progress.match(/([0-9]{0,3}%)/gi);
        if (check !== null) {
          const [percent] = progress.match(/([0-9]{0,3}%)/gi);
          console.log(percent);
        }
      });
      Git.stdout.on('close', () => {
        this.deleteBranch();
      });
    },
    openExternal(url) {
      Utils().showExternal(url);
    },
  },
};
</script>

<style lang="scss">
  #delete_branch_body {
    code {
      font-size: 14px;
      padding: 2px 4px;
    }
    strong {
      font-size: 14px;
    }
    #error-msg{
      height: 40px;
    }
    .disabled {
      opacity: 0.5;
      transition: none !important;
    }
    #delete_remote_container {
      input{
        display: inline-block;
        vertical-align: top;
        margin-right: 8px;
        width: auto;
      }
      label {
        display: inline-block;
        width: calc(100% - 32px);
      }
    }
  }
</style>
