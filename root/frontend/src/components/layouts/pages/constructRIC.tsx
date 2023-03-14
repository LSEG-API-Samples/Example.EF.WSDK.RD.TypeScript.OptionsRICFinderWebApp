import React from "react"
import handleClick from '../../../helper/handleClick'
import { showFoundRICDialogue, showNoFoundRICDialogue } from "./searchOutput";

export default function ConstructRIC() {
    const [data, setData] = React.useState([]);
    const [status, setStatus] = React.useState([]);
    const [loading, setLoading] = React.useState(false)


    const handleSubmit = async (event: any) => {
        setLoading(true);
        event.preventDefault();
        let res = await fetch('http://localhost:4000/findingRICs/constructRIC', {
            method: 'POST',
            body: JSON.stringify({
                asset: (document.getElementById('asset') as HTMLInputElement).value,
                maturity: (document.getElementById('maturity') as HTMLInputElement).value,
                strike: (document.getElementById('strike') as HTMLInputElement).value,
                optionType: document.querySelector("ef-select").value,
            }),
            headers: { 'content-type': 'application/json' }
        })
        if (res.status === 200) {
            setStatus((await res as any).status)
            res = await res.json()
            setData(res as any)
        }
        setLoading(false)
    };

    return (
        <div className="formContainer">
            <ef-card class="card">
                <span slot="header"><b>Construct Option RIC</b></span>
                <form onSubmit={handleSubmit} id="requestForm">
                    <div >
                        <label htmlFor="asset">Assset RIC/ISIN</label>
                        <ef-text-field class="inputField" id="asset" value="BARC.L" placeholder="Insert asset RIC or ISIN"></ef-text-field>
                    </div>
                    <div>
                        <label htmlFor="maturity">Maturity
                            date</label>
                        <ef-text-field class="inputField" id="maturity" value="2023-03-18" placeholder="Maturity date in yyyy-mm-dd"></ef-text-field>
                    </div>
                    <div>
                        <label htmlFor="strike">Strike</label>
                        <ef-number-field class="inputField" id="strike" value='210' placeholder="Insert strike price"></ef-number-field>
                    </div>
                    <div >
                        <label htmlFor="colFormLabelSm" className="col-sm-6 col-form-label col-form-label" >Option
                            type</label>
                        <ef-select class="inputField">
                            <ef-item value="Call">Call</ef-item>
                            <ef-item value="Put">Put</ef-item>
                        </ef-select>
                    </div>
                    <div className="btnHolder">
                        <button disabled={loading}>
                            {loading ? 'Loading' : 'Get the results'}
                        </button>
                    </div>
                </form>
            </ef-card>

            {(data as any || []).map((element: any, index: number) => {
                if (element.asset && status as any === 200) {
                    return showFoundRICDialogue(element, index, handleClick)
                }
                else if (!element.asset && status as any === 200) {
                    return showNoFoundRICDialogue(element, index, handleClick)
                }
            })}
        </div>
    )
}