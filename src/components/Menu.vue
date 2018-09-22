<template>
  <ul id="main-menu">
    <li
      v-for="(item) in menu"
      :key="item.id"
      :id="item.id"
      :class="{'active depth-8':item.id == menuStatus && selectMenu !== false}"
      @mouseover="showMenu(item.id)"
      @click="selectMenu(item.id)">
      <span>{{ item.title }}</span>
      <ul
        v-if="item.subMenu"
        class="submenu depth-12">
        <li
          v-for="(subItens) in item.subMenu"
          :key="subItens.title"
          @click="runMenuFunc(subItens.id)"><span>{{ subItens.title }}</span></li>
      </ul>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Utils from '../utils';

export default {
  name: 'MenuApp',
  data() {
    return {
      menu: [
        {
          title: 'File',
          id: 'file',
          subMenu: [
            { title: 'New repositorie', id: 'new-repo', hotkey: '' },
            { title: 'Add local repositorie', id: 'add-local-repo', hotkey: '' },
            { title: 'Clone repositorie', id: 'clone-repo', hotkey: '' },
            { title: 'Opitions', id: '', hotkey: '' },
            { title: 'Exit', id: 'exit', hotkey: '' },
          ],
        },
        {
          title: 'Edit',
          id: 'edit',
          subMenu: [
            { title: 'Undo', id: '', hotkey: '' },
            { title: 'Redo', id: '', hotkey: '' },
            { title: 'Cut', id: '', hotkey: '' },
            { title: 'Copy', id: '', hotkey: '' },
            { title: 'Paste', id: '', hotkey: '' },
            { title: 'Paste all', id: '', hotkey: '' },
          ],
        },
        {
          title: 'View',
          id: 'view',
          subMenu: [
            { title: 'Changes', id: 'changes', hotkey: '' },
            { title: 'History', id: 'history', hotkey: '' },
            { title: 'Repository list', id: 'repoList', hotkey: '' },
            { title: 'Branches list', id: 'branch', hotkey: '' },
            // {title: 'Toggle full screen',id: '', hotkey: '',},
            { title: 'Reset zoom', id: '', hotkey: '' },
            { title: 'Zoom in', id: '', hotkey: '' },
            { title: 'Zoom out', id: '', hotkey: '' },
            { title: 'Troggle developer tools', id: 'dev-tools', hotkey: '' },
          ],
        },
        {
          title: 'Repository',
          id: 'reposity',
          subMenu: [
            { title: 'Push', id: '', hotkey: '' },
            { title: 'Pull', id: '', hotkey: '' },
            { title: 'Remove', id: 'removeProject', hotkey: '' },
            // {title: 'View on GitLab',id: '', hotkey: '',},
            { title: 'Open in Command Prompt', id: '', hotkey: '' },
            { title: 'Show in explorer', id: 'show-explorer', hotkey: '' },
            { title: 'Repository settings...', id: '', hotkey: '' },
          ],
        },
        {
          title: 'Branch',
          id: 'branch',
          subMenu: [
            { title: 'New branch...', id: 'new-branch', hotkey: '' },
            { title: 'Rename...', id: 'rename-branch', hotkey: '' },
            { title: 'Delete', id: 'delete-branch', hotkey: '' },
            { title: 'Update from default branch', id: '', hotkey: '' },
            { title: 'Compare to branch', id: '', hotkey: '' },
            { title: 'Merge into current branch', id: '', hotkey: '' },
            { title: 'Compare on GitLab', id: '', hotkey: '' },
          ],
        },
        {
          title: 'Help',
          id: 'help',
          subMenu: [
            { title: 'Report issue...', id: '', hotkey: '' },
            { title: 'Contact GitLab support...', id: '', hotkey: '' },
            { title: 'Show User Guides', id: '', hotkey: '' },
            { title: 'Show logs in Explorer', id: '', hotkey: '' },
            { title: 'About GitLab Discovery', id: 'about', hotkey: '' },
          ],
        },
      ],
      menuStatus: null,
    };
  },
  computed: {
    ...mapGetters(['menuState', 'currentProject']),
  },
  watch: {
    menuState() {
      if (this.menuState === false && this.menuStatus !== null) {
        this.closeMenu();
      }
    },
  },
  methods: {
    selectMenu(id) {
      this.openMenu();
      this.addEscapeMenu();
      if (this.menuStatus === null) {
        this.menuStatus = id;
      } else {
        this.menuStatus = null;
      }
    },
    showMenu(id) {
      if (this.menuStatus !== null && this.menuState === true) {
        this.menuStatus = id;
      }
    },
    addEscapeMenu() {
      Utils().addScapeKey('remove_complete', () => {
        this.closeMenu();
      });
    },
    runMenuFunc(id) {
      switch (id) {
        case 'new-repo':
          this.showModal('create');
          break;
        case 'add-local-repo':
          this.showModal('addLocalRepo');
          break;
        case 'exit':
          Utils().closeWin();
          break;
        case 'changes':
          this.showTab('files');
          break;
        case 'history':
          this.showTab('history');
          break;
        case 'branch':
          this.showListControl('branch');
          break;
        case 'repoList':
          this.showListControl('projects');
          break;
        case 'clone-repo':
          this.showModal('clone');
          break;
        case 'dev-tools':
          Utils().openDevTools();
          break;
        case 'show-explorer':
          Utils().showExternal(this.currentProject);
          break;
        case 'new-branch':
          this.showModal('newBranch');
          break;
        case 'rename-branch':
          this.showModal('renameBranch');
          break;
        case 'delete-branch':
          this.showModal('deleteBranch');
          break;
        case 'removeProject':
          this.showModal('removeProject');
          break;
        case 'about':
          this.showModal('about');
          break;
        default:
          break;
      }
    },
    closeMenu() {
      this.openMenu();
      this.menuStatus = null;
    },
    ...mapActions(['openMenu', 'showModal', 'showTab', 'showListControl']),
  },
};
</script>

<style lang="scss">
  ul, li, span {cursor: default;}
</style>
