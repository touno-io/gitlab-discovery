<template>
  <div
    id="clone-window"
    class="text-center p-10 row align-middle">
    <div
      id="clone-win-container"
      class="mx-auto">
      <span class="h4">Cloning {{ nameProject }}</span>
      <div class="progress">
        <div
          id="progressbar-clone"
          :style="{width: progress}"
          :class="{'loading': progress === ''}"
          class="progress-bar progressbar-primary"
          role="progressbar"/>
      </div>
      <span id="status-clone">{{ progressV }}</span>
    </div>
  </div>
</template>

<script>
import { GitProcess } from 'dugite';
import { mapActions, mapGetters } from 'vuex';
import path from 'path';
import config from '../../config';

export default{
  name: 'CloneWindow',
  data() {
    return {
      progress: '',
      progressV: '',
      cloneStatus: null,
      nameProject: '',
    };
  },
  computed: {
    ...mapGetters(['cloneOperation']),
  },
  mounted() {
    console.log(this.cloneOperation);
    this.nameProject = path.basename(this.cloneOperation.url_path, '.git');
    this.clone();
  },
  methods: {
    clone() {
      let urlRepo = this.cloneOperation.url_path;
      const { localPath } = this.cloneOperation;
      const { visibility } = this.cloneOperation;
      const dirProject = path.join(localPath, this.nameProject);

      if (visibility === 'private' || visibility === 'internal') {
        urlRepo = `https://gitlab.com:${config.token}@${urlRepo.replace(/(http:\/\/|https:\/\/)/gm, '')}`;
      }

      const Git = GitProcess.spawn(['clone', urlRepo, '--progress'], localPath);
      Git.stderr.on('data', (data) => {
        const message = data.toString('utf8');
        const regexPercent = /([0-9]?[0-9]?[0-9])%/gm;
        const number = message.match(regexPercent);
        if (number !== null) {
          [this.progress] = number;
        }
        // Update status project
        [this.progressV] = message.split(/\s{4,}/);
      });
      Git.stdout.on('close', () => {
        // After complete, add new repo...
        this.addNewRepo([dirProject, this.nameProject]);
        console.log('done');
      });
    },
    ...mapActions(['addNewRepo']),
  },
};
</script>

<style lang="scss">
  #clone-window{

  #clone-win-container {
    width: 80%;
  }
  .progress {
    height: 6px;
    .progress-bar{
      background-color: #4b4ba3;
      background-image: unset;
    }
  }
  }
</style>
