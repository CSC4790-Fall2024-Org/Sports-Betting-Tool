import React, { useState, useEffect } from 'react';

// Function to group markets by name
const groupMarketsByName = (games) => {
    const groupedMarkets = {};

    games.forEach(game => {
        game.sportsbooks.forEach(sportsbook => {
            sportsbook.odds.forEach(odd => {
                if (!groupedMarkets[odd.market]) {
                    groupedMarkets[odd.market] = [];
                }
                groupedMarkets[odd.market].push({
                    team: odd.name,
                    price: odd.price,
                    sportsbook: sportsbook.name,
                    game: `${game.teams.away.name} vs ${game.teams.home.name}`
                });
            });
        });
    });

    return groupedMarkets;
};

// OddsPage component
const OddsPage = () => {
    const [oddsData, setOddsData] = useState([]);
    const [groupedMarkets, setGroupedMarkets] = useState({});
    const [selectedMarket, setSelectedMarket] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/odds/')  // Fetch odds data from Django API
            .then(response => response.json())
            .then(data => {
                setOddsData(data.games);
                setGroupedMarkets(groupMarketsByName(data.games));  // Group markets by name
            });
    }, []);

    const handleMarketChange = (marketName) => {
        setSelectedMarket(marketName);
    };

    return (
        <div>
            <h1>Sports Betting Odds</h1>

            {/* Market Selection */}
            <label htmlFor="market">Select Market:</label>
            <select id="market" onChange={e => handleMarketChange(e.target.value)}>
                <option value="">Select a market</option>
                {Object.keys(groupedMarkets).map(market => (
                    <option key={market} value={market}>
                        {market}
                    </option>
                ))}
            </select>

            {/* Display Odds in Table */}
            {selectedMarket && (
                <table>
                    <thead>
                        <tr>
                            <th>Sportsbook</th>
                            <th>Game</th>
                            <th>Team/Player</th>
                            <th>Odds</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupedMarkets[selectedMarket].map((market, index) => (
                            <tr key={index}>
                                <td>{market.sportsbook}</td>
                                <td>{market.game}</td>
                                <td>{market.team}</td>
                                <td>{market.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OddsPage;
