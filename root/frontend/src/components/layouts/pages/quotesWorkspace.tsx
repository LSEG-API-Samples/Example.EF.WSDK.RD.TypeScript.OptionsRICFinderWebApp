import React from 'react';
import { useParams } from "react-router-dom";


export default function ShowQuotesWorkspace() {
    const [data, setData] = React.useState([]);
    const params = useParams()

    React.useEffect(() => {
        (async () => {
            let res = await fetch(`http://localhost:4000/findingRICs/quotesWorkspace/${params.id}`);
            if (res.ok) {
                res = await res.json()
                setData(res as any)
            }
        })()
    }, [params.id]);

    return (
        <div className='chartContainer'>
            <ef-card header={`Quotes for ${data['ric']} from ${data['exchange']}`} class='lineChart' >
                <iframe title='quotes' className='quotesFrame' src={`https://workspace.refinitiv.com/salesforce/Apps/Quoteline/?s=${data['ric']}`}></iframe>
            </ef-card>
        </div >
    )
}