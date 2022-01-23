import React, { Component, useState, useEffect } from 'react';
import { Input, AutoComplete, notification } from 'antd';

const SearchBox = ({ onSearchAirport, airports, searchBoxIsLoading, setSearchBoxIsLoading }) => {
    const [airportsFinalList, setAirportsFinalList] = useState([]);

    const onSearch = (airportFullName) => {

        if (airportsList.includes(airportFullName)) {
            setSearchBoxIsLoading(true);
            onSearchAirport(airportFullName.substring(airportFullName.indexOf('(') + 1,
                airportFullName.indexOf(')')));
        } else { // if the input string is not an airport name
            notification.open({
                message: 'Airport Not Found',
                duration: 3,
                description:
                    'Please select an airport name that you can find in the autocomplete dropdown list.'
            });
        }
    };

    /**
     * callback func when an airport on the map is clicked
     */
    const mapClickAirportCB = (IATA) => {

    }

    /**
     * callback func when an airport on the map is clicked
     */
    const mapClickFlightCB = (IATA) => {

    }

    let airportsList = airports.length == 0 ? [] : airports
        .filter(airport => airport.hasOwnProperty('iata') && airport.iata !== "\\N")
        .map(airport => `${airport.name} (${airport.iata})`);

    let onChange = (e) => {
        let text = e.target.value.toLowerCase();
        setAirportsFinalList(airportsList
            .filter(airportName => airportName.toLowerCase().includes(text))
            .map(airportName => ({ value: airportName })));
        console.log(airportsFinalList);
    }

    return (
        <AutoComplete
            options={airportsFinalList}
            style={{
                position: 'fixed', top: 30, zIndex: 10, left: '50%',
                transform: 'translateX(-50%)', width: '30%'
            }}
        >
            <Input.Search size="large" placeholder="search for airports" enterButton style={{}} onSearch={onSearch} loading={searchBoxIsLoading} onChange={onChange} />
        </AutoComplete>)
}

export default SearchBox;