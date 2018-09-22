<template>
    <div id="aquarium-container" class="right-panels-content">
     <div id="top-bar-info-file">
       <span id="name-file-top">{{file}}</span>
        <svg class="status-files-icon" v-if="fileStatus == '??' || fileStatus == 'A'" version="1.1" viewBox="0 0 135.47 135.47" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
         <g transform="translate(0 -161.53)" fill="#008000">
          <path transform="matrix(.26458 0 0 .26458 0 161.53)" d="m0 0v512h512v-512h-512zm32.83 32.83h446.34v446.34h-446.34v-446.34z" stroke-width="1.056"/>
          <path transform="matrix(.26458 0 0 .26458 0 161.53)" d="m227.21 94.375v132.84h-132.84v57.578h132.84v132.84h57.578v-132.84h132.84v-57.578h-132.84v-132.84h-57.578z"/>
         </g>
        </svg>

        <svg  class="status-files-icon" v-if="fileStatus == 'D'" version="1.1" viewBox="0 0 135.47 135.47" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
         <g transform="translate(0 -161.53)">
          <path transform="matrix(.26458 0 0 .26458 0 161.53)" d="m0 0v512h512v-512h-512zm32.83 32.83h446.34v446.34h-446.34v-446.34zm61.545 194.38v57.578h323.25v-57.578h-323.25z" fill="#f00" stroke-width="1.056"/>
         </g>
        </svg>

        <svg class="status-files-icon" v-if="fileStatus == 'M'" version="1.1" viewBox="0 0 135.47 135.47" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
         <g transform="translate(0 -161.53)">
          <path transform="matrix(.26458 0 0 .26458 0 161.53)" d="m0 0v512h512v-512h-512zm32.83 32.83h446.34v446.34h-446.34v-446.34zm223.17 96.9a126.27 126.27 0 0 0-126.27 126.27 126.27 126.27 0 0 0 126.27 126.27 126.27 126.27 0 0 0 126.27-126.27 126.27 126.27 0 0 0-126.27-126.27z" fill="#d4aa00" stroke-width="1.056"/>
         </g>
        </svg>
     </div>
      <div id="aquarium-editor" v-if="code.length > 0" v-html="makeLines()"></div>
    </div>  
</template>
<script>
  import { GitProcess } from 'dugite'
  import { mapGetters } from 'vuex'
  export default {
    name: 'aquarium-editor',
    data () {
      return {
        code: []
      }
    },
    computed: {
      ...mapGetters(['currentProject'])
    },
    methods: {
      getFileContent () {
        GitProcess.exec(this.args, this.currentProject).then(result => {
          console.log(this.args)
          let code = result.stdout.split('\n')
          code = code.splice(4, result.stdout.split('\n').length)
          this.code = code
        })
      },
      makeArgs () {
        /**
         * Render the diff for a file within the repository working directory. The file will be
         * compared against HEAD if it's tracked, if not it'll be compared to an empty file meaning
         * that all content in the file will be treated as additions.
        */
        if ((this.fileStatus === '??' && this.mode !== 'history') || (this.fileStatus === 'A' && this.mode !== 'history')) {
          // `git diff --no-index` seems to emulate the exit codes from `diff` irrespective of
          // whether you set --exit-code
          this.args = [
            'diff',
            '--no-ext-diff',
            '--no-index',
            '--patch-with-raw',
            '-z',
            '--no-color',
            '--',
            '/dev/null',
            this.file
          ]
        } else if (this.mode === 'history') {
          this.args = [
            'show',
            '--pretty=',
            this.hash,
            '--',
            this.file
          ]
        } else {
          this.args = [
            'diff',
            'HEAD',
            '--no-ext-diff',
            '--patch-with-raw',
            '-z',
            '--no-color',
            '--',
            this.file
          ]
        }
        // ['diff', this.file]
        // args
      },
      createNumberLine (a) {
        let linesFilter = new RegExp(/[@@](.*)[@@]/, 'gm')
        let getLines = a.match(linesFilter)
        let getStartCode = []
        if (getLines !== null) {
          getStartCode = getLines[0].replace(/@/gi, '')
          getStartCode = getStartCode.replace(/ /gi, '')
          getStartCode = getStartCode.replace('-', '')
          getStartCode = getStartCode.replace('+', '|')
          getStartCode = getStartCode.split('|')
          getStartCode[0] = parseInt(getStartCode[0])
          getStartCode[1] = parseInt(getStartCode[1])
        }
        return getStartCode
      },
      makeLines () {
        // Temp solution...
        return `<pre>${this.code.join('\n').replace(/</gi, '&lt;').replace(/>/gi, '&gt;')}</pre>`
      }
    },
    watch: {
      file: function () {
        if (this.file !== '') {
          this.makeArgs()
          this.getFileContent()
        }
      }
    },
    props: {
      file: { required: true },
      fileStatus: {required: true},
      mode: {required: false},
      hash: {required: false}
    }
  }
</script>
<style lang="scss">
  #top-bar-info-file{
    background-color: #f6f6f6;
    width: 100%;
    border-bottom: 1px solid #e6e6e6;
    border-top: 1px solid #e6e6e6;
    position: relative;
    padding: 5px 10px;
    min-height: 30px;
  }
  #aquarium-container{
    background-color: white;
    
    #aquarium-editor {
      overflow-y: auto;
      height: calc(100% - 30px);
      width: 100%;
    }
    
    pre {
      padding: 10px;
      white-space: pre-wrap;
    }
  }
</style>