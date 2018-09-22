import path from 'path';

const state = {
  clone: [],
  modal: {
    active: false,
    window: '',
  },
  showMenu: false,
  showTab: 'files',
  currentUser: null,
  controlStatus: null,
  commit: null,
  lastCommitUpdate: null,
  window_size: 'normal',
  operation: 'pushing',
  projects: {
    list: null,
    current: {
      path: '',
      avatar_url: 'null',
      last_fetch_origin: 'null',
      branch: [],
      branchList: [],
      defaultBranch: '',
      status: '',
    },
    others: [],
  },
  rev_list: [0, 0],
};
/*  eslint no-shadow: ["error", { "allow": ["state", "payload"] }] */
/*  eslint-disable max-len */
/*  eslint no-param-reassign: ["error", {"props": true, "ignorePropertyModificationsFor": ["state", "payload"] }] */
const mutations = {
  DEFINE_CLONE(state, payload) {
    state.clone = payload;
  },
  FINISH_CREATE_REPO(state) {
    state.operation.createRepo = 'success';
  },
  CREATING_REPO(state) {
    state.operation.createRepo = 'creating';
  },
  SHOW_MODAL(state, payload) {
    state.modal.active = true;
    state.modal.window = payload;
  },
  CLOSE_MODAL(state) {
    state.modal.active = false;
    state.modal.window = '';
  },
  SHOW_FILES_TAB(state) {
    state.showTab = 'files';
  },
  SHOW_HISTORY_TAB(state) {
    state.showTab = 'history';
  },
  SELECT_COMMIT(state, payload) {
    state.commit = payload;
  },
  SHOW_MENU(state, payload) {
    state.showMenu = payload;
  },
  UPDATE_BRANCH(state, payload) {
    state.projects.current.branch = payload;
  },
  UPDATE_DEFAULT_BRANCH(state, payload) {
    state.projects.current.defaultBranch = payload;
  },
  UPDATE_OPERATION(state, payload) {
    state.operation = payload;
  },
  SHOW_LIST_CONTROL(state, payload) {
    state.controlStatus = payload;
  },
  SET_WIN_SIZE(state, payload) {
    state.window_size = payload;
  },
  UPDATE_PROJECTS_LIST(state, payload) {
    if (payload.lastProject.length > 0 || payload.projects.length > 0) {
      state.projects.others = payload.projects;
      state.projects.current.path = payload.lastProject[0].path;
      state.projects.current.avatar_url = payload.lastProject[0].avatar_url;
      state.projects.current.last_fetch_origin = payload.lastProject[0].last_fetch_origin;
      state.projects.list = 'have_projects';
    } else {
      // not repository projects
      state.projects.list = null;
    }
  },
  SWITCH_PROJECTS(state, payload) {
    state.projects.current.path = payload.path;
    state.operation = 'switch_project';
    state.rev_list = [0, 0];
    state.projects.current.branch = [];
  },
  ADD_NEW_REPO(state, payload) {
    state.projects.others.push({
      name: payload[1],
      path: payload[0],
      avatar_url: 'null',
      last_fetch_origin: 'null',
    });
    [state.projects.current.path] = payload;
    state.operation = 'add_new_repo';
    state.projects.list = 'have_projects';
  },
  UPDATE_LAST_FETCH_ORIGIN(state, payload) {
    state.projects.current.last_fetch_origin = payload;
  },
  UPDATE_REV_LIST(state, payload) {
    state.rev_list = payload;
  },
  REMOVE_PROJECT(state, payload) {
    if (payload.length > 0) {
      state.projects.others = payload;
      state.projects.current.path = payload[0].path;
      state.operation = 'switch_project';
    } else {
      state.projects.list = null;
      state.projects.current = {
        path: '',
        avatar_url: 'null',
        last_fetch_origin: 'null',
        branch: [],
      };
      state.projects.others = [];
      state.operation = null;
    }
  },
  UPDATE_LAST_COMMIT(state, payload) {
    state.lastCommitUpdate = payload;
  },
  UPDATE_PROJECT_STATUS(state, payload) {
    state.projects.current.status = payload;
  },
  UPDATE_CURRENT_USER(state, payload) {
    state.currentUser = payload;
  },
};

const getters = {
  modal: state => state.modal,
  createRepo: state => state.operation.createRepo,
  showTabStatus: state => state.showTab,
  showCommit: state => state.commit,
  menuState: state => state.showMenu,
  currentProject: state => state.projects.current.path,
  currentBranch: state => state.projects.current.branch,
  defaultBranch: state => state.projects.current.defaultBranch,
  operation: state => state.operation,
  currentProjectName: state => path.basename(state.projects.current.path),
  currentProjectAvatar: state => state.projects.current.avatar_url,
  currentProjectFetchOrigin: state => state.projects.current.last_fetch_origin,
  controlStatus: state => state.controlStatus,
  windowSize: state => state.window_size,
  listProjects: state => state.projects.others,
  getAllProjectsInfo: state => {
    if (state.projects.list !== null) {
      return {
        lastProject: [
          {
            name: '',
            path: state.projects.current.path,
            avatar_url: 'null',
            last_fetch_origin: state.projects.current.last_fetch_origin,
          },
        ],
        projects: state.projects.others,
      };
    }
    return {
      lastProject: [],
      projects: [],
    };
  },
  currentRevList: state => state.rev_list,
  projectsFound: state => state.projects.list,
  cloneOperation: state => state.clone,
  lastCommit: state => state.lastCommitUpdate,
  projectStatus: state => state.projects.current.status,
  user: state => state.currentUser,
};

const actions = {
  someAsyncTask({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER');
  },
  defineClone({ commit }, payload) {
    commit('DEFINE_CLONE', payload);
  },
  finishCreateRepo({ commit }) {
    commit('FINISH_CREATE_REPO');
  },
  creatingRepo({ commit }) {
    commit('CREATING_REPO');
  },
  showModal({ commit }, payload) {
    commit('SHOW_MODAL', payload);
  },
  closeModal({ commit }) {
    commit('CLOSE_MODAL');
  },
  showTab({ commit }, payload) {
    if (payload === 'files') {
      commit('SHOW_FILES_TAB');
    } else if (payload === 'history') {
      commit('SHOW_HISTORY_TAB');
    }
  },
  openMenu({ commit }) {
    if (state.showMenu === false) {
      commit('SHOW_MENU', true);
    } else {
      commit('SHOW_MENU', false);
    }
  },
  selectCommit({ commit }, payload) {
    commit('SELECT_COMMIT', payload);
  },
  updateBranch({ commit }, payload) {
    commit('UPDATE_BRANCH', payload);
  },
  updateDefaultBranch({ commit }, payload) {
    commit('UPDATE_DEFAULT_BRANCH', payload);
  },
  updateOperation({ commit }, payload) {
    commit('UPDATE_OPERATION', payload);
  },
  showListControl({ commit }, payload) {
    if (payload === state.controlStatus) commit('SHOW_LIST_CONTROL', null);
    commit('SHOW_LIST_CONTROL', payload);
  },
  setWinSize({ commit }, payload) {
    commit('SET_WIN_SIZE', payload);
  },
  /* updateListProjects ({ commit }, payload) {
    commit('UPDATE_PROJECTS_LIST', payload)
  }, */
  switchProject({ commit }, payload) {
    commit('SWITCH_PROJECTS', payload);
  },
  updateProjectsList({ commit }, payload) {
    commit('UPDATE_PROJECTS_LIST', payload);
  },
  addNewRepo({ commit }, payload) {
    commit('ADD_NEW_REPO', payload);
  },
  updateLastFetchOrigin({ commit }, payload) {
    commit('UPDATE_LAST_FETCH_ORIGIN', payload);
  },
  updateRevList({ commit }, payload) {
    commit('UPDATE_REV_LIST', payload);
  },
  removeProject({ commit }, paylaod) {
    commit('REMOVE_PROJECT', paylaod);
  },
  updateLastCommit({ commit }, payload) {
    commit('UPDATE_LAST_COMMIT', payload);
  },
  updateProjectStatus({ commit }, payload = '') {
    commit('UPDATE_PROJECT_STATUS', payload);
  },
  updateCurrentUser({ commit }, payload) {
    commit('UPDATE_CURRENT_USER', payload);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
