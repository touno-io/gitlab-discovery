/* tslint:disable */

import Dexie from 'dexie';

export const db = new Dexie('GitLabDiscoveryBase');
export const dbUsers = new Dexie('GitLabDiscoveryUserDataBase');

db.version(1).stores({
  repositories: 'id++,gitLabRepositoryID,name,missing,path',
});

dbUsers.version(1).stores({
  users: 'id++, login, name, avatar_url, email, id, name '
});

db.open();
dbUsers.open();