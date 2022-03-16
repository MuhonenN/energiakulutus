export enum FetchState {
    DEFAULT = 'DEFAULT',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export interface Consumption {
    timestamp: any;
    reportingGroup: string;
    locationName: string;
    value: number;
    unit: string;
}
