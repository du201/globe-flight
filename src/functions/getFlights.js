import fetch from "node-fetch"

let airport = 'IND'
let API_key = "1c39aabe965d1994225d0b18518c692a"

async function getFlights(airport, iata_type, API_key) {
    const response = await fetch(`http://api.aviationstack.com/v1/flights?access_key=${API_key}&${iata_type}=${airport}`);
    const receivedResponse = await response.json()
    var data = [];
    var count = 0;
    const apiResponse = receivedResponse.data;
        if (Array.isArray(apiResponse)) {
            apiResponse.forEach(flight => {
                if (flight['flight_status'] == 'active') {
                    var json = {
                        name: flight['airline']['name'],
                        flight_iata: flight['flight']['iata'],
                        dep_airport: flight['departure']['airport'],
                        dep_iata: flight['departure']['iata'],
                        arr_airport: flight['arrival']['airport'],
                        arr_iata: flight['arrival']['iata'],
                        delay: flight['arrival']['delay'] + flight['departure']['delay'],
                        arr_time: flight['arrival']['estimated'],
                        dep_time: flight['departure']['estimated']
                    }
                    data.push(json)
                    count += 1
                }
            });
        }
    var result = {
        count: count,
        flights: data
    }
    return result
    
}

async function getAllFlights(API_key) {
    const arrivals = await getFlights(airport, 'arr_iata', API_key)
    const departures = await getFlights(airport, 'dep_iata', API_key)

    var result = {
        arr_count: arrivals.count,
        dep_count: departures.count,
        flights: arrivals['flights'].concat(departures['flights'])
    }
    console.log(result)
}

getAllFlights(API_key)
