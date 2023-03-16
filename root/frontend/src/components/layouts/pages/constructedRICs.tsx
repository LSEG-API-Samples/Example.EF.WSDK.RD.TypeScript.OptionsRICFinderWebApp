import React from 'react';
import createDatatable from '../../../helper/createDataTable'

export default function ShowRIC() {
    // eslint-disable-next-line
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        (async () => {
            let res = await fetch('http://localhost:4000/findingRICs/showRIC');
            if (res.ok) {
                res = await res.json()
                setData(res as any)
            }
            createDatatable(setData, res)

        })()
    }, []);

    return (
        <div className="dataTable">
            <h3 className='titleTable'> Table of found RICs</h3>
            <table id="showRICs" className="display" width="100%"></table>
        </div>
    )
}


