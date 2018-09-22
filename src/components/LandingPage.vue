<template>
  <div id="wrapper">
    <div
      v-show="menuState == true"
      class="menu-show"
      @click="openMenu" />
    <div
      v-if="controlStatus === 'branch' || controlStatus === 'projects'"
      id="controls-bkg"
      @click="showListControl('null')" />
    <title-bar />
    <header class="w1-100 p2 depth-8">
      <div id="project-controls">
        <div
          id="project-selected"
          :class="{'active depth-12': controlStatus === 'projects'}"
          class="control-btns">
          <div @click="showListControl('projects')">
            <div
              id="logo-project"
              class="d-inline-block align-top">
              <img
                v-src="currentProjectAvatar + '?private_token=' + config.token"
                v-if="currentProjectAvatar != 'null'"
                class="avatar-project d-inline-block">
              <span
                v-else
                class="custom-avatar-project d-inline-block">
                {{ currentProjectName[0] }}</span>
            </div>
            <div
              id="info-project"
              class="d-inline-block align-top p-2">
              <div id="current-project">Current project</div>
              <div
                v-if="currentProjectName !== ''"
                id="title-project">{{ currentProjectName }}</div>
              <div
                v-else
                id="title-project">No repositories</div>
            </div>
            <div class="icon-arrows">
              <!-- eslint-disable max-len -->
              <svg
                class="arrow-down"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"><path d="m10.472352 7.28232367c.3431062-.36783247.904419-.36783247 1.2592596-.00644059.3578153.36442148.3578153.95850784.0002156 1.28561559l-3.10532264 3.16826253c-.17025689.1734002-.39845625.2702388-.62654793.2702388-.24380864 0-.45151514-.0919745-.62697852-.2706782l-3.09835734-3.16693764c-.36405333-.352236-.36405333-.94614513-.01248284-1.28566765.34310619-.36783247.90441901-.36783247 1.25901327-.0066912l2.48658215 2.52737493z" /></svg>
              <!-- eslint-disable max-len -->
              <svg
                class="arrow-up"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"><title>arrow-up</title>
                <path
                  d="M8 7.586L5.879 9.707a1 1 0 1 1-1.415-1.414l2.829-2.829a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 1 1-1.415 1.414L8 7.586z"
                  fill-rule="evenodd" /></svg>
            </div>
          </div>
          <projects-list
            v-if="controlStatus === 'projects'"
            class="control-lists" />
        </div>
        <div
          v-if="projectsFound !== null"
          id="branch-select"
          :class="{'active depth-12': controlStatus === 'branch'}"
          class="control-btns">
          <div
            class="p-2 controls-btns-content"
            @click="showListControl('branch')">
            <div id="branch-icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"><title>icn/branch</title><defs><path
                  id="aua"
                  d="M4 11.268V4.732a2 2 0 1 1 2 0v3.583c.628-.388 1.37-.665 2.219-.831 1.025-.2 1.61-1.044 1.729-2.783A1.999 1.999 0 0 1 11 1a2 2 0 0 1 .946 3.763c-.174 2.627-1.279 4.28-3.344 4.684-1.315.257-2.151.819-2.602 1.706v.115a2 2 0 1 1-2 0zM5 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM5 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" /></defs><use
                    fill="#000"
                    fill-rule="nonzero"
                    xlink:href="#aua" /></svg>
            </div>
            <div id="info-branch">
              <div
                v-if="operation !== 'switch_branch'"
                id="current-branch">Current branch</div>
              <div
                v-if="operation === 'switch_branch'"
                id="current-branch">Switching to branch ({{ operationStatus.progress }})</div>
              <div id="title-branch">{{ currentBranch[0] }}</div>
            </div>
            <div
              v-if="operation === 'switch_branch'"
              class="progress">
              <div
                id="progressbar-clone"
                :style="{width: operationStatus.progress}"
                :class="{'loading': operationStatus.progress == null}"
                class="progress-bar progressbar-primary"
                role="progressbar" />
            </div>
            <div class="icon-arrows">
              <svg
                class="arrow-down"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"><path d="m10.472352 7.28232367c.3431062-.36783247.904419-.36783247 1.2592596-.00644059.3578153.36442148.3578153.95850784.0002156 1.28561559l-3.10532264 3.16826253c-.17025689.1734002-.39845625.2702388-.62654793.2702388-.24380864 0-.45151514-.0919745-.62697852-.2706782l-3.09835734-3.16693764c-.36405333-.352236-.36405333-.94614513-.01248284-1.28566765.34310619-.36783247.90441901-.36783247 1.25901327-.0066912l2.48658215 2.52737493z" /></svg>
              <svg
                class="arrow-up"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg">
                <title>arrow-up</title>
                <path
                  d="M8 7.586L5.879 9.707a1 1 0 1 1-1.415-1.414l2.829-2.829a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 1 1-1.415 1.414L8 7.586z"
                  fill-rule="evenodd" /></svg>
            </div>
          </div>
          <branch-list
            v-if="controlStatus === 'branch'"
            class="control-lists" />
        </div>
        <operation :operationstatus="operationStatus"/>
      </div>
    </header>
    <div id="app-body">
      <!--  Navegation left Panel   -->
      <nav
        v-if="projectsFound !== null"
        id="leftbar">
        <tabs>
          <tab
            id="files"
            :icon="icons.files"
            :selected="tab.active[0]"
            name="">
            <div id="total-files-view">
              <label class="mb-0">
                <input
                  id="all-files-set"
                  v-model="setAllFiles"
                  :indeterminate.prop="indeterminateFiles"
                  type="checkbox"
                  @click="setAllFilesCommit($event.target.checked)"><span class="text-center total-files-label">{{ files.length }} arquivos alterados</span>
              </label>
            </div>
            <!--  Fifes Tab  -->
            <!--  This Tabs show all files add, modified and deleted from current repositorie  -->
            <ul
              id="files"
              class="width-100 d-block mb-0">
              <li
                v-for="(item) in files"
                :class="{selected:item.file == fileSelected[0]}"
                :key="item.file"
                class="py-1"
                @click="selectFile(item)">
                <input
                  :value="item.file"
                  :id="item.file"
                  v-model="filesCommit"
                  type="checkbox"
                  @click="removeAddFile(item.file)">
                <span>{{ item.file.replace(/([^\/]+)\/?$/, '') }}<span class="file">{{ item.file.match(/([^\/]+)\/?$/g)[0] }}</span></span>

                <!--  Icons status files -->
                <!--  Icon for new or added file  -->
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
                    <path
                      transform="matrix(.26458 0 0 .26458 0 161.53)"
                      d="m227.21 94.375v132.84h-132.84v57.578h132.84v132.84h57.578v-132.84h132.84v-57.578h-132.84v-132.84h-57.578z" />
                  </g>
                </svg>
                <!--  Icon for changed file  -->
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
                <!--  Icon for deleted file  -->
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
            <!--  Commit container for create commit-->
            <bottom-container
              :numfiles="files.length"
              :listcommits="listCommits"/>
          </tab>
          <!--  Tab for show history commits for current repositorie  -->
          <tab
            id="history"
            :icon="icons.history"
            :selected="tab.active[1]"
            name="">
            <virtual-scroller
              v-if="listCommits.length > 0"
              id="commits-history"
              ref="itensListHistory"
              :items="listCommits"
              class="scroller width-100 d-block mb-0 py-3"
              item-height="66"
              content-tag="ul">
              <template slot-scope="props">
                <li
                  :class="{selected:props.item[0] == commitSelected}"
                  class="px-2 py-1"
                  @click="selectCommitList(props.item)">
                  <strong class="title-commit">{{ props.item[3] }}</strong>
                  <span class="author-commit">{{ props.item[1] }}</span>
                  <span class="hour-commit">{{ getTime(props.item[2]) }}</span>
                </li>
              </template>
            </virtual-scroller>
          </tab>
        </tabs>
      </nav>
      <!--  AquariumEditor is a temporaly solution for show content files -->
      <aquarium-editor
        v-if="projectsFound !== null"
        v-show="showTabStatus === 'files'"
        :file="fileSelected[0]"
        :file-status="fileSelected[1]" />
      <!--      HistoryCommits is a component from show list commits and show files and content -->
      <history-commits
        v-if="projectsFound !== null"
        v-show="showTabStatus === 'history'" />
      <!-- No repositories is a component for show message of projects not fond and show options for clone, create or add a local project.   -->
      <no-projects v-if="projectsFound === null && operation === null" />
      <!--  Modals are the windows from create, remove, clone repos and show about this App -->
      <modal-clone v-if="modal.window === 'clone'" />
      <modal-create v-if="modal.window === 'create'" />
      <modal-about v-if="modal.window === 'about'" />
      <modal-add-local-repo v-if="modal.window === 'addLocalRepo'" />
      <modal-remove-project v-if="modal.window === 'removeProject'" />
      <modal-new-branch v-if="modal.window === 'newBranch'"/>
      <modal-rename-branch v-if="modal.window === 'renameBranch'"/>
      <modal-remove-branch v-if="modal.window === 'deleteBranch'"/>
      <modal-publish-project v-if="modal.window === 'publishProject'"/>
      <clone-window
        v-if="operation === 'cloning'"
        class="active-window-show"
        title="alguma coisas" />
    </div>
  </div>
</template>

<script>
import Gitlab from 'gitlab';
import { mapGetters, mapActions } from 'vuex';
import { GitProcess } from 'dugite';
import path from 'path';
import moment from 'moment';
import AquariumEditor from './aquarium-editor';
import TitleBar from './titleBar';
import Tab from './LandingPage/Tab';
import Tabs from './LandingPage/Tabs';
import Modal from './LandingPage/Modal';
import ModalClone from './modals/clone';
import ModalCreate from './modals/create';
import ModalAbout from './modals/about';
import ModalRemoveProject from './modals/remove';
import ModalAddLocalRepo from './modals/addLocalRepository';
import ModalNewBranch from './modals/newBranch';
import ModalRenameBranch from './modals/renameBranch';
import ModalRemoveBranch from './modals/removeBranch';
import ModalPublishProject from './modals/publish';
import CloneWindow from './screns/cloning';
import HistoryCommits from './history-commits';
import BranchList from './branchList';
import ProjectsList from './projectsList';
import NoProjects from './NoProjects';
import bottomContainer from './bottom-container';
import Operation from './operation';
import Utils from '../utils';
import EventBus from '../events';
import config from '../config';

moment.locale('en');
export default {
  name: 'LandingPage',
  components: {
    TitleBar,
    Tab,
    Tabs,
    Modal,
    ModalClone,
    CloneWindow,
    ModalCreate,
    ModalAbout,
    ModalRemoveProject,
    ModalAddLocalRepo,
    ModalNewBranch,
    ModalRenameBranch,
    ModalRemoveBranch,
    ModalPublishProject,
    AquariumEditor,
    HistoryCommits,
    BranchList,
    ProjectsList,
    NoProjects,
    bottomContainer,
    Operation,
  },
  data() {
    return {
      numfiles: 0,
      tab: {
        files: 'active',
        history: '',
        active: [true, false],
      },
      timeOperations: {
        lastFetchOrigin: '',
      },
      LastTime: '',
      files: [],
      indeterminateFiles: false,
      setAllFiles: true,
      filesCommit: [],
      fileSelected: [],
      commitSelected: null,
      listCommits: [],
      focus: false,
      icons: {
        files: `<svg version="1.1" viewBox="0 0 135.47 135.47" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><g transform="translate(0 -161.53)"><path transform="matrix(.26458 0 0 .26458 0 161.53)" d="m113.48 10.867c-18.203 0-32.857 14.655-32.857 32.857v422.82c0 18.203 14.655 32.857 32.857 32.857h299.67c18.203 0 32.857-14.655 32.857-32.857v-422.82c0-18.203-14.655-32.857-32.857-32.857h-299.67zm25.953 33.604h247.76c15.699 0 28.338 12.639 28.338 28.338v364.65c0 15.699-12.639 28.336-28.338 28.336h-247.76c-15.699 0-28.336-12.637-28.336-28.336v-364.65c0-15.699 12.637-28.338 28.336-28.338z" stroke-width="1.2886"/><rect x="34.471" y="186.51" width="66.524" height="12.942" ry="6.4712" stroke-width=".30592"/><rect x="35.436" y="210.7" width="45.864" height="12.942" ry="6.4712" stroke-width=".25401"/>
          <rect x="36.4" y="234.89" width="60.326" height="12.942" ry="6.4712" stroke-width=".29132"/><rect x="37.364" y="259.08" width="60.326" height="12.942" ry="6.4712" stroke-width=".29132"/></g></svg>`,
        history: '<svg version="1.1" viewBox="0 0 135.47 135.47" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><g transform="translate(0 -161.53)"><path transform="matrix(.26458 0 0 .26458 0 161.53)" d="m256 11.734a244.27 244.27 0 0 0-244.27 244.27 244.27 244.27 0 0 0 244.27 244.27 244.27 244.27 0 0 0 244.27-244.27 244.27 244.27 0 0 0-244.27-244.27zm0 41.416a202.85 202.85 0 0 1 202.85 202.85 202.85 202.85 0 0 1-202.85 202.85 202.85 202.85 0 0 1-202.85-202.85 202.85 202.85 0 0 1 202.85-202.85zm0 28.672c-11.671 0-21.066 9.3957-21.066 21.066v154.73c-0.46251 4.8291 0.74088 9.7433 3.5352 13.842 0.00132 0.00194 0.00259 0.00393 0.00391 0.00586 0.09297 0.13918 0.1968 0.26946 0.29296 0.40625 0.16414 0.22864 0.33168 0.45468 0.50586 0.67774 1.383 1.8078 3.0356 3.3976 4.9258 4.6738 0.0027 0.00182 0.0051 0.00403 0.00781 0.00586l88.926 70.748c9.1329 7.266 22.334 5.7618 29.6-3.3711s5.7638-22.334-3.3691-29.6l-82.295-65.473v-146.65c0-11.671-9.3957-21.066-21.066-21.066z" stroke-width="2.0117"/></g></svg>',
      },
      operationStatus: {
        progress: null,
        pedding: null,
        vProgress: null,
      },
    };
  },
  computed: {
    ...mapGetters([
      'modal',
      'createRepo',
      'showTabStatus',
      'menuState',
      'currentProject',
      'currentProjectName',
      'currentBranch',
      'controlStatus',
      'operation',
      'getAllProjectsInfo',
      'currentProjectAvatar',
      'currentProjectFetchOrigin',
      'currentRevList',
      'projectsFound',
    ]),
  },
  watch: {
    /* 'createRepo': function () {
        this.InitialCommit()
      }, */
    filesCommit() {
      if (this.filesCommit.length === this.files.length) {
        this.indeterminateFiles = false;
      }
    },
    showTabStatus() {
      if (this.showTabStatus === 'history') {
        this.$refs.itensListHistory.$refs.items.children[0].click();
      }
    },
    operation() {
      switch (this.operation) {
        case 'switch_branch':
          this.checkOutBranch();
          break;
        case 'switch_project':
          this.updateOperation(null);
          this.clearLists();
          this.getBasicInformationProject();
          break;
        case 'add_new_repo':
          this.clearLists();
          this.updateOperation('switch_project');
          this.selectProject();
          break;
        case 'remove_current_project':
          this.clearLists();
          this.selectProject();
          break;
        case 'undo_last_commit':
          this.clearLists();
          break;
        case 'cloning':
          this.clearLists();
          this.updateOperation('cloning');
          break;
        case 'globalUpdate':
          this.updateOperation(null);
          this.clearLists();
          this.getBasicInformationProject();
          break;
        default:
          break;
      }
    },
    focus() {
      console.log(this.focus);
      if (this.projectsFound !== null && this.focus === true) {
        this.getBasicInformationProject();
      }
    },
    currentRevList() {
      if (this.currentRevList[1] > 0) {
        this.operationStatus.pedding = 'pending_pull_origin';
      } else if (this.currentRevList[0] > 0) {
        this.operationStatus.pedding = 'pending_push_origin';
      } else {
        this.operationStatus.pedding = null;
      }
    },
    projectsFound() {
      if (this.projectsFound === null) {
        this.removeEventCheck('all');
      } else {
        this.init();
      }
    },
  },
  mounted() {
    Utils().loadProjectsListFile().then((results) => {
      this.updateProjectsList(results);
    });
    EventBus.$on('pullOrigin', () => {
      this.pullOrigin();
    });
    EventBus.$on('pushOrigin', () => {
      this.pushOrigin();
    });
    EventBus.$on('getOrigin', () => {
      this.getOrigin();
    });
    EventBus.$on('globalUpdate', () => {
      this.getBasicInformationProject();
    });
    EventBus.$on('finishCreateRepo', (dirPath) => {
      this.finishCreateRepo(dirPath);
    });
    this.getUser();
  },
  methods: {
    ...mapActions([
      'selectCommit',
      'openMenu',
      'updateBranch',
      'showListControl',
      'updateOperation',
      'updateProjectsList',
      'updateLastFetchOrigin',
      'updateRevList',
      'updateDefaultBranch',
      'updateProjectStatus',
      'addNewRepo',
      'updateCurrentUser',
    ]),
    init() {
      // The init function starts the other functions of the App.
      if (this.operation !== 'cloning' && this.operation !== 'pending_pull_origin' && this.operation !== 'pending_push_origin') {
        this.updateOperation(null);
      }
      this.getBasicInformationProject();
      window.addEventListener('blur', () => {
        this.focus = false;
      });
      window.addEventListener('focus', () => {
        this.focus = true;
      });
    },
    getBasicInformationProject() {
      if (this.operation === null || this.operation === 'pending_pull_origin' || this.operation === 'pending_push_origin') {
        this.updateOperation('refreshing');
        this.getLastTime();
        this.gitStatus();
        this.getListCommits();
        this.getCurrentBranch();
        this.getDefaultBranch();
        this.getRemote();
        this.getOrigin();
        this.revList();
        this.updateOperation(null);
      }
    },
    undoInitialCommit() {
      GitProcess.exec(['update-ref', '-D', 'HEAD']);
    },
    getLastTime() {
      this.LastTime = moment().startOf('hour').fromNow();
    },
    gitStatus() {
      GitProcess.exec(['status', '--untracked-files=all', '--branch', '--porcelain=2', '-s'], this.currentProject)
        .then((result) => {
          const filtertLines = new RegExp(/^( M | D |A |[?? ]+)+(.*)/, 'gm');
          const filterType = new RegExp(/^( M | D |A .()|[?? ]+)/, 'gm');
          const getOut = result.stdout.replace(/("|')/gi, '');
          const listFiles = [];
          const word = getOut.match(filtertLines);
          console.log(word);
          if (word) {
            word.forEach((index, item) => {
              const getType = word[item].match(filterType)[0].replace(/ /gi, '');
              const getFile = word[item].replace(/^( M | D |A .()|[?? ]+)/gi, '');
              listFiles.push({ file: getFile, type: getType });
            });
            this.files = listFiles;
            this.setAllFilesCommit(true);
          }
        });
    },
    getListCommits() {
      GitProcess.exec(['log', '--pretty=format:"%h, %an, %ci, %s"', '--abbrev-commit'], this.currentProject)
        .then((result) => {
          console.log(result);
          const commitsHistory = result.stdout.split('\n');
          const tempList = [];
          commitsHistory.forEach((commits) => {
            tempList.push(commits.replace(/"/gi, '').split(','));
          });
          this.listCommits = tempList;
        });
    },
    setAllFilesCommit(event) {
      this.indeterminateFiles = false;
      const listFiles = this.files;
      const NewListFilesCommit = [];
      if (event === true) {
        listFiles.forEach((item) => {
          NewListFilesCommit.push(item.file);
        });
        this.filesCommit = NewListFilesCommit;
      } else {
        this.filesCommit = NewListFilesCommit;
      }
    },
    removeAddFile(obj) {
      const getThis = this.filesCommit.indexOf(obj);
      if (getThis !== -1) {
        this.indeterminateFiles = true;
        const index = this.filesCommit.indexOf(obj);
        this.filesCommit.splice(index, 1);
      }
    },
    selectFile(item) {
      this.fileSelected = [item.file, item.type];
    },
    selectCommitList(commit) {
      const [a] = commit;
      this.commitSelected = a;
      this.selectCommit(commit);
    },
    getTime(t) {
      const time = t.match(/([0-9]{4,}-[0-9]{2,}-[0-9]{2,} [0-9]{2,}:[0-9]{2,}:[0-9]{2,})/);
      let date;
      if (time !== null) {
        date = moment(time[0]).toDate();
      }
      return moment(date).fromNow();
    },
    getCurrentBranch() {
      GitProcess.exec(['symbolic-ref', '-q', 'HEAD'], this.currentProject)
        .then((result) => {
          console.log(result);
          const branch = result.stdout.replace(/(\n)/gi, '');
          let name = branch.split('/');
          name = name[name.length - 1];
          this.updateBranch([name, branch]);
          this.updateOperation(null);
        });
    },
    getDefaultBranch() {
      GitProcess.exec(['symbolic-ref', 'refs/remotes/origin/HEAD', '--'], this.currentProject)
        .then((result) => {
          console.log(result);
          const name = path.basename(result.stdout.replace(/\n/gi, ''));
          this.updateDefaultBranch(name);
          this.updateOperation(null);
        });
    },
    checkOutBranch() {
      // Get Origin, using fetch
      // Name from repo
      const branchName = this.currentBranch[1].split('/').slice(-1)[0];
      // Url whit Origin ex: origin/repo_name
      const urlOrigin = this.currentBranch[1];
      // Default args for create a local repo and switch for this new repo.
      let args = ['checkout', '-b', branchName, urlOrigin, '--progress'];
      // Check type if repo is local
      if (this.currentBranch[0].indexOf('refs/heads') > -1) {
        args = ['checkout', urlOrigin, '--progress'];
      }
      const Git = GitProcess.spawn(args, this.currentProject);
      Git.stderr.on('data', (data) => {
        const progress = data.toString('utf8');
        const check = progress.match(/([0-9]{0,3}%)/gi);
        if (check !== null) {
          const [percent] = progress.match(/([0-9]{0,3}%)/gi);
          this.operationStatus.progress = percent;
        }
      });
      Git.stdout.on('close', () => {
        this.getCurrentBranch();
        this.gitStatus();
        this.getListCommits();
        this.operationStatus.progress = '0%';
        this.updateOperation(null);
      });
    },
    getOrigin() {
      this.updateOperation('fetch_origin');
      const Git = GitProcess.spawn(['fetch', 'origin', '--progress', '--'], this.currentProject);
      Git.stderr.on('data', (data) => {
        const progress = data.toString('utf8');
        const check = progress.match(/([0-9]{0,3}%)/gi);
        if (check !== null) {
          const [percent] = check;
          this.operationStatus.progress = percent;
        }
      });
      Git.stdout.on('close', () => {
        const time = moment().format('YYYY-MM-DD HH:mm:ss Z');
        this.updateLastFetchOrigin(time);
        const projects = this.getAllProjectsInfo;
        Utils().updateProjectSelected(projects).then(() => {
        });

        this.getCurrentBranch();
        this.gitStatus();
        this.getListCommits();
        this.revList();
        this.operationStatus.progress = null;
        this.updateOperation(null);
      });
    },
    selectProject() {
      const projects = this.getAllProjectsInfo;
      Utils().updateProjectSelected(projects).then(() => {
      });
    },
    revList() {
      const [branchName] = this.currentBranch;
      GitProcess.exec(['rev-list', '--left-right', '--count', `${branchName}...origin/${branchName}`], this.currentProject)
        .then((result) => {
          const list = result.stdout.replace(/\n/gi, '').split('\t');
          this.updateRevList(list);
        });
    },
    pullOrigin() {
      this.updateOperation('pulling');
      // eslint-disable-next-line
      const Git = GitProcess.spawn(['pull', '--no-rebase', '--progress', 'origin'], this.currentProject);
      Git.stderr.on('data', (data) => {
        const progress = data.toString('utf8');
        const progressV = progress.split('\n');
        if (progress.match(/([0-9]{0,3}%)/gi) !== null) [this.operationStatus.progress] = progress.match(/([0-9]{0,3}%)/gi);
        if (progressV.lenght > 0) this.operationStatus.vProgress = progressV;
      });
      Git.stdout.on('close', () => {
        this.updateOperation(null);
        this.getBasicInformationProject();
      });
    },
    pushOrigin() {
      this.updateOperation('pushing');
      const [branchName] = this.currentBranch;
      const Git = GitProcess.spawn(['push', 'origin', `${branchName}:${branchName}`, '--progress'], this.currentProject);
      Git.stderr.on('data', (data) => {
        const progress = data.toString('utf8');
        const progressV = progress.split('\n');
        if (progress.match(/([0-9]{0,3}%)/gi) !== null) [this.operationStatus.progress] = progress.match(/([0-9]{0,3}%)/gi);
        if (progressV.lenght > 0) this.operationStatus.vProgress = progressV;
      });
      Git.stdout.on('close', () => {
        this.updateOperation(null);
        this.getBasicInformationProject();
      });
    },
    getRemote() {
      GitProcess.exec(['remote', '-v'], this.currentProject)
        .then((result) => {
          const list = result.stdout.replace(/\n/gi, '').split('\t');
          if (list.length <= 1) {
            // this.operationStatus.pedding = 'publish';
            this.updateProjectStatus('publish');
          }
        });
    },
    finishCreateRepo(pathProject) {
      this.clearLists();
      const nameProject = path.basename(pathProject);
      this.addNewRepo([pathProject, nameProject]);
    },
    clearLists() {
      this.files = [];
      this.filesCommit = [];
      this.fileSelected = [];
      this.commitSelected = null;
      this.listCommits = [];
    },
    getUser() {
      const api = new Gitlab({
        token: config.token,
      });
      api.Users.current()
        .then((data) => {
          console.log(data);
          this.updateCurrentUser({
            avatar: data.avatar_url,
            id: data.id,
            username: data.username,
          });
        });
    },
  },
};
</script>

<style lang="scss">
  html {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
  }
  *, *:before, *:after {
/*
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit;
*/
    font-size: 12px;
    }
  input[type=text], input[type=file], input[type=email], input[type=password], select, textarea{
    font-size: 12px;
  }
  header {
    background-color: #fafafa;
    width: 100%;
    display: block;
    position: relative;
    z-index: 2;
  }
  button {
    padding: 4px 15px !important;
    font-size:10pt !important;
    &.primary{
      background-color: #4b4ba3 !important;
      background-image: unset !important;
      border-color: #4b4ba3 !important;
      font-size: 12px;
    }
    &.alternative{
      background-color: white;
      border-color: #e6e6e6;
      color: rgb(64,64,64);
      font-size: 12px;
    }
  }
  body{
    background-color: rgb(250,250,250);
  }
  #app, #wrapper{
    height: 100%;
    position: relative;
  }
  .progress-bar{
    background-color: #4b4ba3 !important;
    background-image: none;
  }
  .menu-show{
    position: absolute;
    z-index: 12;
    background-color: rgba(0,0,0,0.5);
    width: 100%;
    height: calc(100% - 27px);
    top: 27px;
    left: 0;
  }
  #controls-bkg {
    position: absolute;
    z-index: 1;
    background-color: rgba(0,0,0,0.5);
    width: 100%;
    height: calc(100% - 27px);
    top: 27px;
    left: 0;
  }
  .right-panels-content {
    float: left;
    width: calc(100% - 340px);
    height: 100%;
  }
   .status-files-icon{
    position: absolute;
    width: 16px;
    right: 4px;
    top: 5px;
  }
  #commits-history {
    height: auto;
    overflow-y: auto;
    flex-grow: 1;
    li{
      border-bottom: 1px solid #e6e6e6;
      font-size: 12px;
      position: relative;
      margin: 0 !important;
      span{
        vertical-align: top;
        font-size: 12px;
        color: rgb(110,110,110);
      }
      .file{
        color: rgb(34,34,34);
      }
      &.selected{
        background-color: #4b4ba3;
        color: white;
        border-radius: 4px;
        > span, .file, strong{color: white;}
        svg path {fill: white !important;}
      }
    }
    .title-commit{display: block; margin-bottom: 4px; font-size: 14px; color: rgb(30,30,30)}
    .author-commit{display: inline-block; margin-right: 20px; color:rgb(100, 100, 100)}
    .hour-commit{display: inline-block; float: right; color:rgb(100, 100, 100)}
  }
  #files{
    height: auto;
    overflow-y: auto;
    flex-grow: 1;
    li{
      border-bottom: 1px solid #e6e6e6;
      font-size: 12px;
      position: relative;
      margin: 0 !important;
      span{
        vertical-align: top;
        font-size: 12px;
        color: rgb(110,110,110);
      }
      .file{
        color: rgb(34,34,34);
      }
      &.selected{
        background-color: #4b4ba3;
        color: white;
        border-radius: 4px;
        > span, .file{color: white;}
        svg path {fill: white !important;}
      }
    }
  }
  #app-body{
    height: calc(100% - 80px);
    overflow: hidden;
  }
  #leftbar {
    background-color: #fafafa;
    width: 340px;
    border-right: 1px solid #eaeaea;
    overflow: hidden;
    float: left;
    height: 100%;
    .tab-body {
      height: 100%;
      position: relative;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: row;
    }
    .tab-content{
      height: 100%;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      width: 280px;
      background-color: #fff;
      border-left: 1px solid #eaeaea;
      border-top: 1px solid #eaeaea;
      border-top-left-radius: 2px;
      padding: 0 16px;
    }
  }
  #project-selected{
    padding: 0px 10px;
    display: inline-block;
    width: 339px;
    vertical-align: top;
    position: relative;
    .avatar-project{
      width: 25px;
      background-color: white;
      border-radius: 100%;
      margin-right: 10px;
    }

    .custom-avatar-project{
      width: 100%;
      height: 100%;
      text-align: center;
      font-size: 16pt;
      border-radius: 100%;
      background-color: #EEEEEE;
      color: #555 !important;
    }
  }
  #logo-project {
    width: 38px;
    height: 38px;
    border-radius:100%;
    overflow: hidden;
    background-color: white;
    display: inline-block;
    border: 1px solid #eaeaea;
    margin: 7px 0;
  }
  #project-controls{
    display: block;
    #branch-select, #operations{
      display: inline-block;
      width: 240px;
      border-left: 1px solid #eaeaea;
      border-right: 1px solid #eaeaea;
      height: 53px;
      vertical-align: top;
      margin-right: -1px;
      > .controls-btns-content {
        height: 53px;
      }
      .progress {
        bottom: 4px;
      }
      #current-branch{display: block;}
      #title-branch{
        font-weight: bold;
        font-size: 9pt;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      position: relative;
    }
    #operations {
      #current-operation {display: block; font-weight: bold;}
      #title-operation {display: block;}
      #push-pull-rev-list{
        position: absolute;
        top: 50%;
        margin-top: -8px;
        right: 8px;
        background-color: #e0dfdf;
        border-radius: 8px;
        min-width: 30px;
        padding: 0 6px;
        height: 16px;
        .items {
          display: inline-block;
          height: 16px;
          vertical-align: top;
          &:not(last-chield) {
            margin-right: 4px;
          }
          span {
            font-size: 8pt;
            vertical-align: top;
          }
          svg {
            vertical-align: top;
            margin: 3px 0;
          }
        }
      }
      #operation-info {
        display: inline-block;
        vertical-align: top;
        width: calc(100% - 22px);
      }
      #operation-icons {
        display: inline-block;
        vertical-align: top;
        padding-bottom: 12px;
        padding-top: 12px;
        padding-right: 4px;
        &.active svg{
          animation: operation_run 1s linear infinite;
        }
      }
    }
    @keyframes operation_run {
      100% {transform: rotate(360deg)}
    }
    #branch-select, #operations {
      .progress {
        margin: 0;
        height: 2px;
      }
    }
    #branch-icon {
      display: inline-block;
      vertical-align:top;
      padding-bottom: 12px;
      padding-top: 12px;
      padding-right: 4px;
    }
    #info-branch {
      display: inline-block;
      vertical-align:top;
      width: calc(100% - 32px);
    }
    .control-btns{
      position: relative;
      &::before {
        position: absolute;
        content: ' ';
        width: 100%;
        height: 14px;
        bottom: -6px;
        background-color: white;
        z-index: 14;
        display: none;
        left: 0;
      }
      .control-lists {
        display: none;
      }
      &:hover{
        background-color: white;
      }
      &.active {
        background-color: white;
        z-index: 14;
        .arrow-up {
          display: block;
        }
        .arrow-down {
          display: none;
        }
        .control-lists {
          display: block;
        }
        &::before {
          display: block;
        }
      }
    }
    .icon-arrows {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 10px;
      .arrow-up {
        display: none;
      }
    }
  }
  #logo-project img{
    width: 100%;
    height: 100%;
    padding: 6px;
  }
  #info-project{
    width: calc(100% - 40px);
    color: rgb(64,64,64);
  }
  #info-project #title-project{
    font-size: 9pt;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  #info-project #current-project {
    display: block;
  }
  .tab-nav-item{
    width: 60px;
    height: 60px;
    text-align: center;
    padding: 0 18px;
    border-bottom: 1px solid transparent;
    border-top: 1px solid transparent;
    vertical-align: top;
    position: relative;
    &.active-item{
      border-bottom: 1px solid rgb(230,230,230);
      background-color: #fff;
      border-top: 1px solid rgb(230,230,230);
      width: 61px;
      svg path, rect, {background-color: #4b4ba3 !important; border-color: #4b4ba3;}
    }
  }
  #tab-navegation{
    position: relative;
    ul {
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: row;
      width: 60px;
    }
  }
  #tab-navegation ul, #tab-navegation ul li{
    margin: 0;
  }
  #total-files-view{
    border-bottom: 1px solid #eaeaea;
    padding: 12px 0;
    position: relative;
    margin-bottom: 8px;
  }
  #all-files-set{
    float: left;
  }
  #total-files-view label{
    width: 100%;
    display: block;
    height: 20px;
  }
  #total-files-view .total-files-label {
    width: calc(100% - 40px);
    text-align: center;
    padding: 0 20px;
    vertical-align: top;
  }
  .tab-nav-item::before{
    content: ' ';
    height: 100%;
    width: 4px;
    background-color: #4b4ba3;
    position: absolute;
    left: 0;
    bottom: 0;
    opacity: 0;
  }
  .tab-nav-item.active-item::before{
    opacity: 1;
  }
  #tab-navegation #files::after{
    content: ' ';
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background-color: #4b4ba3;
    position: relative;
    display: inline-block;
    margin-left: 6px;
  }
  #bottom-panel{
    width: 100%;
    border-top: 1px solid #eaeaea;
    #undo-commit{
      border-top: 1px solid #e6e6e6;
      display: block;
      #time_status{
        font-size: 11px;
        color: rgb(100, 100, 100);
        display: block;
      }
      #initial_commit_desc{
        color: #000;
        display: block;
        font-size: 11px;
      }
      #commit-info{
        display: inline-block;
      }
      #actions{
        display: inline-block;
        float: right;
        padding: 4px 0;
      }
    }
  }
  #commit-form{
    #commit-btn{
      width: 100%;
      background-color: #4b4ba3;
      border-color: #4b4ba3;
    }
    #photo-user{
      width: 28px;
      height: 28px;
      background-color: rgb(246,248,250);
      border-radius: 4px;
      margin-right: 4px;
    }
    #sumary{
      width: calc(100% - 36px);
    }
    textarea{
      height: 106px;
      resize: none;
      display: block;
      width: 100%;
    }
  }
    .active-window-show {
      z-index: 1;
      width: 100%;
      height: calc(100% - 81px);
      background-color: white;
      position: absolute;
    }
  #aquarium-area{
    float: left;
    width: calc(100% - 340px);
    height: 100%;
    overflow-y: auto;
    code{
      background-color: transparent;
    }
    pre{
      white-space: pre-wrap;
      width: calc(100% - 126px);
      min-height: 1px;
      -ms-flex-preferred-size: 0;
      flex-basis: 0;
      -webkit-box-flex: 1;
      -ms-flex-positive: 1;
      flex-grow: 1;
      max-width: 100%;
    }
    .lines{
      background-color: white;
      display: inline-block;
    }
    .add-lines{background-color: #cfffcf;}
    .del-lines{background-color: #f7dbdb;}
    .line-number{
      border-right: 4px solid rgba(0,0,0,0.5);
      width: 120px;
      vertical-align: top;
      min-height: 1px;
      flex-basis: 0;
      -webkit-box-flex: 1;
      flex-grow: 1;
      max-width: 120px;
      background-color: white;
      margin-right: -2px;
      .del-number{
        border-right: 1px solid rgba(0,0,0,0.2);
      }
      .del-number, .add-number{
        width: calc(50% - 3px);
        display: inline-block;
        text-align: center;
        min-height: 18px;
      }
    }
    .changed-line{
      width: 100%;
      .line-number{
        background-color: #4b4ba3;
        span{
          color:white;
        }
      }
    }
    .aquarium-lines{
      width: 100%;
      display: flex;
      .line-content{
        display: block;
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
      }
    }
  }
</style>
