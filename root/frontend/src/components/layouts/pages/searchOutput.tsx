import { wsdkHelper } from '../../../helper/workspace-sdk-services';

export function showFoundRICDialogue(element: any, index: any, handleClick: any) {
    let handleClickText = "View Prices"
    let handleClickInstrument = handleClick
    if (element.ric.indexOf("^") === -1) {
        handleClickText = 'Instrument overview'
        handleClickInstrument = function () {
            wsdkHelper.openApp("OV", element.ric)
        }
    }

    return (
        <ef-dialog id="d1" header="Search Output" opened key={index}>
            <div >
                <p>
                    <b>{element.ric} </b> is the option RIC we constructed for <i> {element.asset}</i> with maturity date of <i>
                        {element.maturity} </i> and strike price of <i>
                        {element.strike} </i> from <i>
                        {element.exchange} </i>
                </p>
            </div>
            <div slot="footer" >
                <ef-button class="viewBtnDialogue" data-url={`/findingRICs/pricesChart/${element._id}`} onClick={handleClickInstrument}>{handleClickText}</ef-button>
                <ef-button class="viewConstructedRICs" data-url={`/findingRICs/showRIC`} onClick={handleClick}>Constructed RICs</ef-button>
            </div >
        </ef-dialog>
    )
}

export function showNoFoundRICDialogue(element: any, index: any, handleClick: any) {
    return (
        <ef-dialog id="d1" header="Search Output" opened key={index}>
            <p>Unfortunetly we could not find RICs with prices. Here is the list of possible ones:</p>
            <p><i>  {element.join(",\n")}</i></p>
            <div slot="footer" >
                <ef-button class="viewBtnDialogue" data-url={`/findingRICs/constructRIC`} onClick={handleClick}>New RIC</ef-button>

                <ef-button data-url={`/findingRICs/showRIC`} onClick={handleClick}>Constructed RICs</ef-button>
            </div >
        </ef-dialog>)
}