<template>
  <div
    v-if="projectsFound !== null"
    id="operations"
    class="control-btns">
    <div
      class="p-2 controls-btns-content"
      @click="runOperation">
      <!-- eslint-disable max-len -->
      <div
        v-if="projectStatus !== 'publish'"
        id="operation-icons"
        :class="{'active': operation !== 'switch_branch' && operation !== null && operation !== 'cloning'}">
        <!-- eslint-disable max-len -->
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"><title>icn/retry</title><defs>
            <path
              id="rtry"
              d="M4.074 6.957c-.578 2.136.7 4.331 2.856 4.904a4.05 4.05 0 0 0 2.479-.124 1.013 1.013 0 0
              1 1.303.579.998.998 0 0 1-.585 1.291 6.086 6.086 0 0 1-3.72.187c-3.232-.858-5.15-4.151-4.284-7.355l-.749-.199a.498.498 0 0 1-.122-.917L3.47 4.056a.507.507 0 0 1 .69.183l1.28 2.198a.497.497 0 0 1 .05.38.505.505 0 0 1-.618.353l-.798-.212zm7.852 2.086c.578-2.136-.7-4.331-2.856-4.904a4.05 4.05 0 0 0-2.479.124 1.013 1.013 0 0 1-1.303-.579.998.998 0 0 1 .585-1.291 6.086 6.086 0 0 1 3.72-.187c3.232.858 5.15 4.151 4.284 7.355l.749.199a.498.498 0 0 1 .122.917l-2.218 1.268a.507.507 0 0 1-.69-.183l-1.28-2.198a.497.497 0 0 1-.05-.38.505.505 0 0 1 .618-.353l.798.212z" /></defs>
          <use
            fill="#000"
            fill-rule="nonzero"
            xlink:href="#rtry" /></svg>
      </div>
      <div
        v-else
        id="operation-icons">
        <!-- eslint-disable-next-line -->
        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><title>icn/upload</title><g fill="none" fill-rule="evenodd"><path d="M8.745 3.01l-.428.036-.321-.286a3 3 0 0 0-4.985 2.494l.035.43-.286.32a3 3 0 0 0 4.49 3.98l.75-.85.75.85a3 3 0 1 0 3.485-4.72l-.344-.155-.156-.343a3 3 0 0 0-2.99-1.755z" stroke="#000" stroke-width="2"/><path fill="#FFF" d="M5 8h6v6H5z"/><circle fill="#000" cx="5" cy="11" r="1"/><circle fill="#000" cx="11" cy="11" r="1"/><path d="M9 9h1.7a.3.3 0 0 0 .2-.525l-2.701-2.4a.3.3 0 0 0-.399 0l-2.7 2.4A.3.3 0 0 0 5.3 9H7v5a1 1 0 1 0 2 0V9z" fill="#000"/></g></svg>
      </div>
      <div id="operation-info">
        <div v-if="showMasterActions">
          <span
            v-if="projectStatus === 'publish'"
            id="current-operation">Publish repository</span>
          <span
            v-if="operationstatus.pedding === null && projectStatus === ''"
            id="current-operation">Fetch origin branch</span>
          <span
            v-if="operationstatus.pedding === 'pending_pull_origin' && projectStatus === ''"
            id="current-operation">Pull origin branch</span>
          <span
            v-if="operationstatus.pedding === 'pending_push_origin' && projectStatus === ''"
            id="current-operation">Push origin branch</span>
          <span
            v-if="currentProjectFetchOrigin === 'null' && projectStatus === ''"
            id="title-operation">Never fetched</span>
          <span v-else-if="projectStatus === 'publish'">
            Publish this repository to GitLab
          </span>
          <span
            v-else
            id="title-operation">Last fetched {{ getTime(currentProjectFetchOrigin) }}</span>
        </div>
        <div v-show="operation === 'refreshing'">
          <span id="current-operation">Refreshing repository</span>
          <span id="title-operation">Hang on...</span>
        </div>
        <div v-if="operation === 'pushing' || operation === 'pulling'">
          <span
            v-if="operation === 'pulling'"
            id="current-operation">Pulling origin</span>
          <span
            v-if="operation === 'pushing'"
            id="current-operation">Pushing to origin</span>
          <span
            v-if="operationstatus.vProgress !== null"
            id="title-operation">{{ operationstatus.vProgress }}</span>
          <span
            v-else
            id="title-operation">Hang on...</span>
        </div>
        <div
          v-if="currentRevList[0] > 0 || currentRevList[1] > 0"
          id="push-pull-rev-list">
          <div
            v-if="currentRevList[0] > 0"
            class="items">
            <!-- eslint-disable max-len -->
            <svg
              width="10"
              height="10"
              version="1.1"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:cc="http://creativecommons.org/ns#"
              xmlns:dc="http://purl.org/dc/elements/1.1/"
              xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
              xmlns:xlink="http://www.w3.org/1999/xlink"><metadata><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title>icn/arrow-up-pull</dc:title></cc:Work></rdf:RDF></metadata><title>icn/arrow-up-pull</title><defs><path
                id="aup"
                d="M8 6V4a1 1 0 0 1 1.624-.781l4.997 3.988a1 1 0 0 1 .003 1.561L9.626 12.78A1 1 0 0 1 8 12V9.994l-5
                 .004a1.998 1.998 0 0 1-2-1.996V8a2 2 0 0 1 2-2h5z" /></defs><use
                  transform="rotate(-90 7.9987 8.0003)"
                  width="100%"
                  height="100%"
                  style="fill-rule:evenodd;fill:#000000"
                  xlink:href="#aup" />
            </svg>
            <span>{{ currentRevList[0] }}</span>

          </div>
          <div
            v-if="currentRevList[1] > 0"
            class="items">
            <svg
              width="10"
              height="10"
              version="1.1"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:cc="http://creativecommons.org/ns#"
              xmlns:dc="http://purl.org/dc/elements/1.1/"
              xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
              xmlns:xlink="http://www.w3.org/1999/xlink">
              <metadata><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type
                rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title>icn/arrow-down-push</dc:title></cc:Work></rdf:RDF></metadata><title>icn/arrow-down-push</title><defs>
                  <path
                    id="adp"
                    d="M8 6V4a1 1 0 0 1 1.624-.781l4.997 3.988a1 1 0 0 1 .003 1.561L9.626 12.78A1 1 0 0 1 8 12V9.994l-5 .004a1.998 1.998 0 0 1-2-1.996V8a2 2 0 0 1 2-2h5z" /></defs>
              <use
                transform="rotate(90 7.9987 8.0003)"
                width="100%"
                height="100%"
                style="fill-rule:evenodd;fill:#000000"
                xlink:href="#adp" />
            </svg>
            <span>{{ currentRevList[1] }}</span>
          </div>
        </div>
      </div>
      <div
        v-if="operation === 'refreshing' || operation === 'fetch_origin'"
        class="progress">
        <div
          id="progressbar-clone"
          :class="{'loading': operation !== null}"
          class="progress-bar progressbar-primary"
          role="progressbar" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import EventBus from '../events';

export default {
  name: 'Operation',
  components: {},
  props: {
    operationstatus: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters([
      'operation',
      'projectsFound',
      'currentProjectFetchOrigin',
      'currentRevList',
      'projectStatus',
    ]),
    showMasterActions() {
      const getOperation = this.operation;
      const regex = new RegExp('pulling|pushing|refreshing', 'gm');
      if (getOperation) {
        if (getOperation.match(regex)) return false;
      }
      return true;
    },
  },
  methods: {
    ...mapActions([
      'updateOperation',
      'showModal',
    ]),
    runOperation() {
      if (this.projectStatus === 'publish') {
        this.showModal('publishProject');
      } else if (this.operationstatus.pedding === 'pending_pull_origin') {
        EventBus.$emit('pullOrigin');
      } else if (this.operationstatus.pedding === 'pending_push_origin') {
        EventBus.$emit('pushOrigin');
      } else {
        EventBus.$emit('getOrigin');
      }
    },
    getTime(t) {
      const time = t.match(/([0-9]{4,}-[0-9]{2,}-[0-9]{2,} [0-9]{2,}:[0-9]{2,}:[0-9]{2,})/);
      let date;
      if (time !== null) {
        date = moment(time[0]).toDate();
      }
      return moment(date).fromNow();
    },
  },
};
</script>

<style lang="scss">
  /* CSS */
</style>
