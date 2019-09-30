/**
 * Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

export interface User {
  name: string;
  email: string;
  avatar_url?: string;
}

export interface RootState {
  user?: User;
  theme: number;
  lastCloneLocation: string;
  idUser: number;
  signUpProgress: number;
  initialConfig: undefined | 'complete';
}
