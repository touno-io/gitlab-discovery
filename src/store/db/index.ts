/**
 * Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

import Dexie                      from 'dexie';
import { IRepositories, IUsers }  from './types';

export class AppDatabase extends Dexie {
  public repositories: Dexie.Table<IRepositories, number>;
  public users: Dexie.Table<IUsers, number>;

  constructor() {
    super('GitLabDiscoveryDataBase');

    //
    // Define tables and indexes
    //

    this.version(1).stores({
      repositories: 'id++, gitLabRepositoryID, name, missing, path, created_at, updated_at',
      users: 'id++, login, name, avatar_url, email, id, token, created_at, updated_at',
    });

    this.repositories = this.table('repositories');
    this.users = this.table('users');
  }
}

export const db = new AppDatabase();
db.open();
