import React from 'react';
import { useParams } from "react-router-dom";


export default function ShowChartWorkspace() {
    const [data, setData] = React.useState([]);
    const params = useParams()

    React.useEffect(() => {
        (async () => {
            let res = await fetch(`http://localhost:4000/findingRICs/chartWorkspace/${params.id}`);
            if (res.ok) {
                res = await res.json()
                setData(res as any)
            }
        })()
    }, [params.id]);
    return (

        <div className='chartContainer'>
            <ef-card header={`Prices for ${data['ric']} from ${data['exchange']}`} class='lineChart' >
                <iframe title='chart' className='chartFrame' src={`https://workspace.refinitiv.com/salesforce/Apps/NewFinancialChart/?s=${data['ric']}`}></iframe>
            </ef-card>
        </div >
    )
}