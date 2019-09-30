/**
 * Copyright (c) 2019 The Nuinalp Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

import ElectronLog from 'electron-log';

class Log {
  constructor() { }

  public error(
    from: string,
    message: string,
  ) {
    ElectronLog.error(`[${from}] ${message}`);
  }

  public warn(
    from: string,
    message: string,
  ) {
    ElectronLog.warn(`[${from}] ${message}`);
  }

  public info(
    from: string,
    message: string): void {
    ElectronLog.info(`[${from}] ${message}`);
  }
}

const log = new Log();
export default log;
