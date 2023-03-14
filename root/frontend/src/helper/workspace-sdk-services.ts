import * as WSDKLoader from '@refinitiv-workspace-sdk/loader';
import { Modes, SxSSessionType, } from '@refinitiv/workspace-sdk-core';
import creds from '../session.config.json';

class WsdkHelper {
    appIsAlreadyOpened = false;

    constructor() {
        WSDKLoader.init(
            {
                Mode: 'sxs' as Modes.SxS,
                // AppInstanceId: "YOUR_APP_INSTANCE_ID",
                SxSSession: {
                    ApiKey: creds.sessions.SxSSession.ApiKey,
                    ProductId: creds.sessions.SxSSession.ProductId,
                    Type: 'sxsweb' as SxSSessionType.SxSWeb,
                },
            },
            ["DesktopAgent"]
        );
    }
    public getWsdk() {
        return WSDKLoader.ready();
    }

    async openApp(appName: string, ric: string) {
        console.log("openApp");
        const wsdk = await this.getWsdk();
        await wsdk.DesktopAgent.open(
            { name: "OV" },
            {
                type: "fdc3.instrument",
                id: {
                    RIC: ric,
                },
            }
        );
        this.appIsAlreadyOpened = true;
    }

    async broadcast(ric: string) {
        console.log(`broadcasting ric: ${ric}`);
        const wsdk = await this.getWsdk();
        wsdk.DesktopAgent.broadcast({
            type: "fdc3.instrument",
            id: {
                RIC: ric,
            },
        });
    }

    async openAppOrBroadcast(appName: string, ric: string) {
        if (!this.appIsAlreadyOpened) {
            await this.openApp(appName, ric);
        } else {
            this.broadcast(ric);
        }
    }
}

export const wsdkHelper = new WsdkHelper();