/**
 * Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */
import { DebugClient } from "vscode-debugadapter-testsupport";
import assert = require('assert');
import { IPartialLocation } from "vscode-debugadapter-testsupport/lib/debugClient";

export class DebugClientEx extends DebugClient {
    hitBreakpoint(launchArgs: any, location: any, expectedStopLocation?: IPartialLocation, expectedBPLocation?: IPartialLocation): Promise<any> {
        this.launch(launchArgs).then(()=>{
            this.setBreakpointsRequest({
                lines: [location.line],
                breakpoints: [{ line: location.line, column: location.column }],
                source: { path: location.path, name: location.name},
            });
            return this.configurationDoneRequest();
        });

        return this.waitForEvent('stopped').then(event => {
            assert.equal(event.body.reason, "breakpoint");
        });
    }
}