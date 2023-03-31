export default function deleteSelected(setData: any, id: any) {

    (async () => {
        let res = await fetch(`http://localhost:4000/findingRICs/showRIC/${id}`,
            { method: 'DELETE', })
        if (res.ok) {
            res = await res.json()
            setData(res as any)
        };
    })()
}

