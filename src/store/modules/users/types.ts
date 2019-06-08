/**
 * Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

export interface IUser {
  login: string;
  name: string;
  avatar_url: string;
  email: string;
  id: number;
  token: string;
}

export interface IState {
  users: IUser[];
}
