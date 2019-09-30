/**
 * Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

import { git }        from './core';
import { normalize, join }  from 'path';
const isBuild = process.env.NODE_ENV === 'production';
import { remote } from "electron";

/** Set the local config value by name. */
export async function setGlobalConfigValue(
  name: string,
  value: string,
  env?: {
    HOME: string,
  },
): Promise<void> {
  const options = { env: {HOME: remote.app.getPath("home") }};
  const dugitePath =  join(
    (isBuild ? __dirname : __static),
    (isBuild ? '../../' : ''),
    '../public/dugite/git',
  );
  await git(
    ['config', '--global', '--replace-all', name, 'patrickalima98@live.com'],
    dugitePath,
    'setGlobalConfigValue',
    options,
  );
}
