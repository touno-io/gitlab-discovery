<template>
  <div
    id="history-commits"
    class="right-panels-content">
    <div
      id="header-commit"
      class="p-2">
      <div v-if="showCommit !== null">
        <span id="title-commit">{{ showCommit[3] }}</span>
        <span
          id="author-commit"
          class="mr-1 d-inline-block">{{ showCommit[1] }} commited</span>
        <span
          id="hash"
          class="mr-1 d-inline-block">{{ showCommit[0] }}</span>
      </div>
    </div>
    <div id="list-files-editor">
      <ul
        id="files"
        class="width-100 d-block mb-0">
        <li
          v-for="(item) in files"
          :key="item.file"
          :class="{selected:item.file == fileSelected[0]}"
          class="px-2 pr-4 py-1"
          @click="fileSelected = [item.file, item.type]">
          <span>{{ item.file }}</span>
          <svg
            v-if="item.type == '??' || item.type == 'A'"
            class="status-files-icon"
            version="1.1"
            viewBox="0 0 135.47 135.47"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:cc="http://creativecommons.org/ns#"
            xmlns:dc="http://purl.org/dc/elements/1.1/"
            xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
            <g
              transform="translate(0 -161.53)"
              fill="#008000">
              <path
                transform="matrix(.26458 0 0 .26458 0 161.53)"
                d="m0 0v512h512v-512h-512zm32.83 32.83h446.34v446.34h-446.34v-446.34z"
                stroke-width="1.056" />
              <!-- eslint-disable max-len -->
              <path
                transform="matrix(.26458 0 0 .26458 0 161.53)"
                d="m227.21 94.375v132.84h-132.84v57.578h132.84v132.84h57.578v-132.84h132.84v-57.578h-132.84v-132.84h-57.578z" />
            </g>
          </svg>
          <svg
            v-if="item.type == 'D'"
            class="status-files-icon"
            version="1.1"
            viewBox="0 0 135.47 135.47"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:cc="http://creativecommons.org/ns#"
            xmlns:dc="http://purl.org/dc/elements/1.1/"
            xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
            <g transform="translate(0 -161.53)">
              <path
                transform="matrix(.26458 0 0 .26458 0 161.53)"
                d="m0 0v512h512v-512h-512zm32.83 32.83h446.34v446.34h-446.34v-446.34zm61.545 194.38v57.578h323.25v-57.578h-323.25z"
                fill="#f00"
                stroke-width="1.056" />
            </g>
          </svg>

          <svg
            v-if="item.type == 'M'"
            class="status-files-icon"
            version="1.1"
            viewBox="0 0 135.47 135.47"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:cc="http://creativecommons.org/ns#"
            xmlns:dc="http://purl.org/dc/elements/1.1/"
            xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
            <g transform="translate(0 -161.53)">
              <path
                transform="matrix(.26458 0 0 .26458 0 161.53)"
                d="m0 0v512h512v-512h-512zm32.83 32.83h446.34v446.34h-446.34v-446.34zm223.17 96.9a126.27 126.27 0 0 0-126.27 126.27 126.27 126.27 0 0 0 126.27 126.27 126.27 126.27 0 0 0 126.27-126.27 126.27 126.27 0 0 0-126.27-126.27z"
                fill="#d4aa00"
                stroke-width="1.056" />
            </g>
          </svg>
        </li>
      </ul>
      <aquarium-editor
        v-if="fileSelected.length > 0"
        :file="fileSelected[0]"
        :folder="currentProject"
        :file-status="fileSelected[0]"
        :hash="showCommit[0]"
        mode="history" />
    </div>
  </div>
</template>
<script>
import { GitProcess } from 'dugite';
import { mapGetters } from 'vuex';
import AquariumEditor from './aquarium-editor';

export default {
  name: 'HistoryCommits',
  components: { AquariumEditor },
  data() {
    return {
      files: [],
      fileSelected: [],
    };
  },
  computed: {
    ...mapGetters(['showCommit', 'currentProject']),
  },
  watch: {
    showCommit() {
      this.getFilesCommit();
    },
    fileSelected() {
      console.log(this.fileSelected);
    },
  },
  methods: {
    getFilesCommit() {
      this.fileSelected = [];
      GitProcess.exec(['show', '--pretty=', '--name-status', this.showCommit[0]], this.currentProject)
        .then((result) => {
          const getOut = result.stdout.replace(/("|')/gi, '').split('\n');
          const newList = [];
          getOut.forEach((itens) => {
            if (itens !== '') {
              const tempList = itens.split('\t');
              newList.push({ file: tempList[1], type: tempList[0] });
            }
          });
          this.files = newList;
        });
    },
  },
};
</script>
<style lang="scss">
  #history-commits{

    #files {
      max-width: 250px !important;
      border-right: 1px solid #e6e6e6;
      background-color: rgb(255,255,255);
      padding: 16px;

      li{
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    #header-commit{
      height: 64px;
      display: block;
      width: 100%;
      background-color: rgb(255,255,255);
      border-bottom: 1px solid #e6e6e6;
      border-top: 1px solid #e6e6e6;
      span {color: rgb(60,60,60);}
      #title-commit {
        font-size: 16px;
        display: block;
        font-weight: bold;
      }
    }

    #list-files-editor{
      display: block;
      height: calc(100% - 64px);
      width: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: row;
    }

    #aquarium-container{
    height: auto;
    overflow-y: auto;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    }
  }
</style>
