import React from 'react';
import { useParams } from "react-router-dom";
import createPriceChart from '../../../helper/createPriceChart'


export default function ShowPrices() {
    const [data, setData] = React.useState([]);
    const params = useParams()

    React.useEffect(() => {
        (async () => {
            let res = await fetch(`http://localhost:4000/findingRICs/pricesChart/${params.id}`);
            if (res.ok) {
                res = await res.json()
                setData(res as any)
            }
            createPriceChart(res);
        })()
    }, [params.id]);

    return (
        <div className='chartContainer'>
            <ef-card header={`Prices for ${data['ric']} from ${data['exchange']}`} class='lineChart' >
                <ef-chart id="line"></ef-chart>
            </ef-card>
        </div >
    )
}