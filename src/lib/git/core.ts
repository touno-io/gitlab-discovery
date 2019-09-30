/**
 * Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

import { IGitExecutionOptions } from './interface';
import {
  GitProcess,
}                               from 'dugite';
import * as GitPerf             from './git-perf';

/**
 * A shell for interact with Git 
 * @param args  - The Arguments to pass to `git`.
 * @param path  - The working directory path for the execution of the command.
 * @param name  - The name for the command based on its caller's context.
 * This will be used for performance measurements and debugging.
 */

export async function git(
  args: string[],
  path: string,
  name: string,
  options?: IGitExecutionOptions,
) {
  const defaultOptions: IGitExecutionOptions = {
    successExitCodes: new Set([0]),
    expectedErrors: new Set(),
  };

  const opts = { ...defaultOptions, ...options };

  const commandName = `${name}: git ${args.join(' ')}`;

  const result = await GitPerf.measure(commandName, () =>
    GitProcess.exec(args, path, options),
  );
}
