import Dexie from 'dexie';

export const db = new Dexie('GitLabDiscoveryDataBase');
export const dbUsers = new Dexie('GitLabDiscoveryUsersDataBase');

db.version(1).stores({
  repositories: 'id++, gitLabRepositoryID, name, missing, path, created_at, updated_at',
});

dbUsers.version(1).stores({
  users: 'id++, login, name, avatar_url, email, id, created_at, updated_at',
});

db.open();
dbUsers.open();
