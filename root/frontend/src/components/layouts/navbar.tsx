import handleClick from '../../helper/handleClick'

export default function Navbar() {

    return (
        <ef-tab-bar id='construct-ric'>
            <ef-tab label="Tab 1" value="tab1" data-url="/" onClick={handleClick} icon="home">Home
            </ef-tab>
            <ef-tab label="Tab 2" value="tab2" data-url="/findingRICs/showRIC" onClick={handleClick} icon="add-to-briefcase">Constructed RICs
            </ef-tab>
            <ef-tab label="Tab 3" value="tab3" data-url="/findingRICs/constructRIC" onClick={handleClick} icon='add-panel'>Construct New RIC
            </ef-tab>
        </ef-tab-bar>
    )
}