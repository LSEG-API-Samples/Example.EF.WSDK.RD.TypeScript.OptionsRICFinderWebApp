export default function Home() {

    return (
        <div>
            <h2 className="title">  Web Application for finding Option RICs</h2>
            <ef-layout size="150px" class="outerLayouts">
                The current Web Application allows to construct option RICs on equities and indices traded in different exchanges. The current version covers the following exchanges:
            </ef-layout>
            <ef-layout flex nowrap class="rulesTable">
                <div>
                    <ef-layout size="150px" class="exchange"><b>Exchange</b> </ef-layout>
                    <ef-layout size="150px" class="exchange">US OPRA </ef-layout>
                    <ef-layout size="150px" class="exchange">EUREX </ef-layout>
                    <ef-layout size="150px" class="exchange">Osaka Exchange</ef-layout>
                    <ef-layout size="150px" class="exchange">Stock Exchange of Hong Kong </ef-layout>
                    <ef-layout size="150px" class="exchange">Hong Kong Future Exchange </ef-layout>
                    <ef-layout size="150px" class="exchange">Intercontinental Exchange</ef-layout>
                </div>
                <div>
                    <ef-layout size="150px" class="rules"><b>Rules</b></ef-layout>
                    <ef-layout size="150px" class="rules">refer to RULES7, RULES2, RULES3, RULES4 in Workspace, and Guideline for strikes above 10000 in MyRefinitiv.</ef-layout>
                    <ef-layout size="150px" class="rules"> refer to RULES2, RULES3, RULES4 in Workspace, and general option RIC structure in MyRefinitiv.</ef-layout>
                    <ef-layout size="150px" class="rules"> refer to RULES2, RULES3, RULES4 in Workspace, and RIC structure for Osaka exchange in MyRefinitiv</ef-layout>
                    <ef-layout size="150px" class="rules"> refer to RULES2, RULES3, RULES4 in Workspace, and RIC structure for HK exchange in MyRefinitiv..</ef-layout>
                    <ef-layout size="150px" class="rules"> refer to RULES2, RULES3, RULES4 in Workspace, and RIC structure for HK exchange in MyRefinitiv.</ef-layout>
                    <ef-layout size="150px" class="rules"> refer to RULES2, RULES3, RULES4 in Workspace, and general option RIC structure in MyRefinitiv.</ef-layout>

                </div>
                <div>
                    <ef-layout size="150px" class="source"><b>Source</b></ef-layout>
                    <ef-layout size="150px" class="source">Workspace, <a href="https://my.refinitiv.com/content/mytr/en/datanotification/DN099473.html"> My Refinitiv</a></ef-layout>
                    <ef-layout size="150px" class="source">Workspace, <a href="https://my.refinitiv.com/content/mytr/en/faqs/2016/09/000195632.html"> My Refinitiv</a></ef-layout>
                    <ef-layout size="150px" class="source">Workspace,<a href="https://my.refinitiv.com/content/mytr/en/faqs/2014/10/000189842.html"> My Refinitiv</a></ef-layout>
                    <ef-layout size="150px" class="source">Workspace, <a href="https://my.refinitiv.com/content/mytr/en/faqs/2021/04/000198505.html?_ga=2.108482370.1726826935.1662621989-1891820599.1655665290"> My Refinitiv</a></ef-layout>
                    <ef-layout size="150px" class="source">Workspace, <a href="https://my.refinitiv.com/content/mytr/en/faqs/2021/04/000198505.html?_ga=2.172363363.1726826935.1662621989-1891820599.1655665290"> My Refinitiv</a></ef-layout>
                    <ef-layout size="150px" class="source">Workspace, <a href="https://my.refinitiv.com/content/mytr/en/faqs/2016/09/000195632.html?_ga=2.172363363.1726826935.1662621989-1891820599.1655665290"> My Refinitiv</a></ef-layout>
                </div>
            </ef-layout >
            <div>
                <ef-layout class="outerLayouts">
                    Syntax for expired options is universal accross exchanges and can be found <a href="https://my.refinitiv.com/content/mytr/en/faqs/2018/09/000178972.html?_ga=2.209080274.1726826935.1662621989-1891820599.1655665290">here</a>.
                </ef-layout>
            </div>
        </div >
    )
}