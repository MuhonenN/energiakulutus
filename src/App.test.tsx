import { fireEvent, render, screen } from '@testing-library/react';
import faker from 'faker';
import * as apiHooks from './Hooks/apiHooks';
import App from './App';
import { FetchState } from './types';

describe('<App />', () => {
    const renderComponent = () => render(<App />);
    const defaultText =
        'Paina nappulaa hakeaksesi Hakaniemen kauppahallin energiakulutusdata.';
    const loadingText = 'Haetaan tietoja...';
    const errorText = 'Jokin meni pieleen. Yritä uudelleen';
    const successText = 'Lista Hakaniemen kauppahallin energiankulutuksesta';

    it('should render default state', () => {
        renderComponent();

        const stateEl = screen.queryByText(defaultText);

        expect(stateEl).toBeInTheDocument();
    });

    it('should render loading state on loading', () => {
        const fetchState = FetchState.LOADING;
        jest.spyOn(apiHooks, 'useApiRequest').mockReturnValue([
            [],
            fetchState,
            jest.fn(),
        ]);
        renderComponent();

        const stateEl = screen.queryByText(loadingText);
        expect(stateEl).toBeInTheDocument();
    });

    it('should render error state on error', () => {
        const fetchState = FetchState.ERROR;
        jest.spyOn(apiHooks, 'useApiRequest').mockReturnValue([
            [],
            fetchState,
            jest.fn(),
        ]);
        renderComponent();

        const stateEl = screen.queryByText(errorText);
        expect(stateEl).toBeInTheDocument();
    });

    it('should render success state on success', () => {
        const fetchState = FetchState.SUCCESS;
        const requests = [
            {
                timestamp: faker.datatype.string(),
                reportingGroup: faker.datatype.string(),
                locationName: faker.datatype.string(),
                value: faker.datatype.number(),
                unit: faker.datatype.string(),
            },
            {
                timestamp: faker.datatype.string(),
                reportingGroup: faker.datatype.string(),
                locationName: faker.datatype.string(),
                value: faker.datatype.number(),
                unit: faker.datatype.string(),
            },
            {
                timestamp: faker.datatype.string(),
                reportingGroup: faker.datatype.string(),
                locationName: faker.datatype.string(),
                value: faker.datatype.number(),
                unit: faker.datatype.string(),
            },
        ];
        jest.spyOn(apiHooks, 'useApiRequest').mockReturnValue([
            requests,
            fetchState,
            jest.fn(),
        ]);
        renderComponent();

        const stateEl = screen.queryByText(successText);
        const request = requests[0];
        const requestTitle = `${request.reportingGroup} - ${request.locationName}`;
        const requestEl = screen.queryByText(requestTitle);

        expect(stateEl).toBeInTheDocument();
        expect(requestEl).toBeInTheDocument();
    });

    it('should call API on button click', () => {
        const getRequestsMock = jest.fn();

        jest.spyOn(apiHooks, 'useApiRequest').mockReturnValue([
            [],
            FetchState.DEFAULT,
            getRequestsMock,
        ]);

        renderComponent();

        const btnEl = screen.queryByText('Hae') as HTMLButtonElement;

        fireEvent.click(btnEl);

        expect(getRequestsMock).toBeCalledTimes(1);
    });
});
