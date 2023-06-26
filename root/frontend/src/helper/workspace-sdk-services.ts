import * as WSDKLoader from '@refinitiv-workspace-sdk/loader';
import { Modes, SxSSessionType, } from '@refinitiv-types/workspace-sdk-core';
import creds from '../session.config.json';

class WsdkHelper {
    appIsAlreadyOpened = false;
    openedAppName = ''
    constructor() {
        WSDKLoader.init(
            {
                Mode: 'sxs' as Modes.SxS,
                SxSSession: {
                    ApiKey: creds.sessions.SxSSession.ApiKey,
                    ProductId: creds.sessions.SxSSession.ProductId,
                    Type: 'sxsweb' as SxSSessionType.SxSWeb,
                },
            },
            ["DesktopAgent", {
                name: 'DataLibrary',
                appKey: creds.sessions.SxSSession.ApiKey,
            }],

        );
    }
    public getWsdk() {
        return WSDKLoader.ready();
    }

    async getStremingSession(rics: any) {
        const wsdk = await this.getWsdk();
        console.log('DesktopAgent plugin has loaded: ', !!wsdk.DesktopAgent);
        const { Pricing, dataSession } = wsdk.DataLibrary;
        try {
            await dataSession.open();
            const pricingStream = Pricing.Definition({
                universe: rics,
                fields: ['BID'],
            }).getStream();
            return pricingStream
        }
        catch (error: any) {
            console.error('Error loading Workspace SDK');
        }
    }

    async initialize_wsdk() {

        const wsdk = await this.getWsdk();
        await wsdk.DesktopAgent.joinChannel("1");
        wsdk.DesktopAgent.addContextListener(null, (context) => {
            console.log(context);
        });
    }

    async openApp(appName: string, ric: string, launchtype: any) {
        console.log(`openApp ${appName} for ${ric}`);
        const wsdk = await this.getWsdk();
        await wsdk.DesktopAgent.open(
            { name: appName, wsdkOptions: { target: launchtype } },
            {
                type: "fdc3.instrument",
                id: {
                    RIC: ric,
                },
            },
        );
        this.appIsAlreadyOpened = true;
        this.openedAppName = appName
    }

    async broadcast(ric: string) {
        console.log(`broadcasting ric: ${ric}`);
        const wsdk = await this.getWsdk();
        await wsdk.DesktopAgent.broadcast({
            type: "fdc3.instrument",
            id: {
                RIC: ric,
            },
        });
    }

    async openAppOrBroadcast(appName: string, ric: string, launchtype: any) {
        console.log(this.openedAppName, appName)
        if (this.appIsAlreadyOpened && this.openedAppName === appName) {
            await this.broadcast(ric);
        } else {
            await this.openApp(appName, ric, launchtype);
        }
    }
}

export const wsdkHelper = new WsdkHelper();