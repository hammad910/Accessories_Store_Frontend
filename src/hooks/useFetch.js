import { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../utils/api'


function useFetch(endpoint) {

    const [data, setData] = useState()

    useEffect(() => {
        useDataFromApi();
    }, [endpoint])

    const useDataFromApi =async () => {
        const res = await fetchDataFromApi(endpoint)
        setData(res)
    }

    return {data}

}

export default useFetch
