import { useState } from 'react';
import { Consumption, FetchState } from '../types';
import datas from './data.json'

export function useApiRequest() {
    const [fetchState, setFetchState] = useState(FetchState.DEFAULT);
    const [request, setRequest] = useState<Array<Consumption>>([]);

    const getData = async () => {
        try {
            setFetchState(FetchState.LOADING);

            const res = await fetchData();
            // const resData = res.data as Array<Consumption>;

            setRequest(res);
            setFetchState(FetchState.SUCCESS);
        } catch (err) {
            setFetchState(FetchState.ERROR);
        }
    };

    // try axios
    const fetchData = async () => {
        const res = await fetch(
            `https://helsinki-openapi.nuuka.cloud/api/v1.0/EnergyData/Daily/ListByProperty?Record=LocationName&SearchString=1000%20Hakaniemen%20kauppahalli&ReportingGroup=Electricity&StartTime=2019-01-01&EndTime=2019-12-31`,
            { mode: 'no-cors' }

            // `https://cors-anywhere.herokuapp.com/https://helsinki-openapi.nuuka.cloud/api/v1.0/EnergyData/Daily/ListByProperty?Record=LocationName&SearchString=1000%20Hakaniemen%20kauppahalli&ReportingGroup=Electricity&StartTime=2019-01-01&EndTime=2019-12-31`,
            // { headers: { 'Access-Control-Allow-Origin': '*' } }
        );
        // const data = await res.json();
        // const resData = res.data as Array<Consumption>;
        const data = await datas
        return data;
    };

    return [request, fetchState, getData] as const;
}
