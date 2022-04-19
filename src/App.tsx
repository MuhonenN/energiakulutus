import './App.css';
import Header from './Header';
import { useApiRequest } from './Hooks/apiHooks';
import { FetchState } from './types';


function App() {
    const [request, fetchState, getData] = useApiRequest();

    const buttonOnClick = () => getData();

    return (
        <div className="container">
            <Header title="Energiankulutus" />
            {console.log(fetchState)}
            {fetchState === FetchState.DEFAULT && (
                <>
                    <p>
                        Paina nappulaa hakeaksesi Hakaniemen kauppahallin
                        energiakulutusdata.
                    </p>
                    <button onClick={buttonOnClick}>Hae</button>
                </>
            )}
            {fetchState === FetchState.LOADING && <p>Haetaan tietoja...</p>}
            {fetchState === FetchState.ERROR && (
                <>
                    <p>Jokin meni pieleen. Yritä uudelleen</p>
                    <button onClick={buttonOnClick}>Hae</button>
                </>
            )}
            {fetchState === FetchState.SUCCESS && (
                <>
                    <p>Lista Hakaniemen kauppahallin energiankulutuksesta</p>
                    <ul className="data-list">
                        {request.map((data) => (
                            <li key={data.timestamp} className="data">
                                <h3>
                                    {data.reportingGroup} - {data.locationName}
                                </h3>
                                <p>{data.timestamp}</p>
                                <p>
                                    <strong>{data.value}</strong> {data.unit}
                                </p>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default App;
