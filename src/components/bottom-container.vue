<template>
  <div id="bottom-panel">
    <div
      id="commit-form"
      class="py-2">
      <div class="mb-1">
        <img
          v-if="user !== null"
          id="photo-user"
          :src="user.avatar">
        <img
          v-else
          id="photo-user"
          src=""><input
            id="sumary"
            v-model="title"
            type="text"
            placeholder="Sumary (Required)">
      </div>
      <textarea
        id="description"
        v-model="subject"
        placeholder="Description" />
      <button
        id="commit-btn"
        :class="{'disable': numfiles <= 0 || title.length <= 0}"
        class="button small d-block w-100"
        @click="createCommit">Commit</button>
    </div>
    <div
      v-if="listcommits.length > 0"
      id="undo-commit"
      class="py-2">
      <div id="commit-info">
        <span id="time_status">Salvo {{ commitLastTime }}</span>
        <span id="initial_commit_desc">{{ listcommits[0][3] }}</span>
      </div>
      <div id="actions">
        <button
          id="undo-first-commit"
          class="button alternative small"
          @click="undoLastCommit">Undo</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { GitProcess } from 'dugite';
import moment from 'moment';

export default {
  name: 'BottomContainer',
  props: {
    numfiles: {
      type: Number,
      required: true,
    },
    listcommits: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      commitLastTime: moment(this.lastCommit).fromNow(),
      title: '',
      subject: '',
    };
  },
  computed: {
    ...mapGetters([
      'currentProject',
      'lastCommit',
      'user',
    ]),
  },
  mounted() {
    console.log(this.listcommits);
  },
  methods: {
    createCommit() {
      if (this.numfiles > 0 && this.title.length > 0) {
        GitProcess.exec(['add', '.'], this.currentProject)
          .then(() => {
            GitProcess.exec(['commit', '-m', this.title, '-m', this.subject], this.currentProject)
              .then(() => {
                this.updateLastCommit(moment().format('YYYY-MM-DD HH:mm:ss Z'));
                this.title = '';
                this.subject = '';
                this.updateOperation('globalUpdate');
              });
          });
      }
    },
    undoLastCommit() {
      GitProcess.exec(['reset', '--soft', 'HEAD~1'], this.currentProject)
        .then(() => {
          this.updateLastCommit(null);
          this.updateOperation('globalUpdate');
        });
    },
    ...mapActions([
      'updateLastCommit',
      'updateOperation',
    ]),
  },
};

</script>
<style lang="scss">
  .disable {
    opacity: 0.8;
    transform: none !important;
  }
</style>
