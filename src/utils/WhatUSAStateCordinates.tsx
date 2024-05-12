import {IStateProps} from "@/components/interfaces/IStateProps";
import {useConfig} from "@/hooks/useConfig";

export const WhatUSAStateCordinates = (lng: number, lat: number, rightAnswerState: string, diff: string) => {
    const states: IStateProps[] = [
        // 1
        {
            name: "Alabama",
            lat: 32.318230,
            lng: -86.902298
        },
        // 2 NO ALASKA
        // 3
        {
            name: "Arizona",
            lat: 34.048927,
            lng: -111.093735
        },
        // 4
        {
            name: "Arkansas",
            lat: 34.799999,
            lng: -92.199997
        },
        // 5
        {
            name: "California",
            lat: 36.778259,
            lng: -119.417931
        },
        // 6
        {
            name: "Colorado",
            lat: 39.113014,
            lng: -105.358887
        },
        // 7
        {
            name: "Connecticut",
            lat: 41.599998,
            lng: -72.699997
        },
        // 8
        {
            name: "Delaware",
            lat: 39.000000,
            lng: -75.500000
        },
        // 9
        {
            name: "Florida",
            lat: 27.994402,
            lng: -81.760254
        },
        // 10
        {
            name: "Georgia",
            lat: 33.247875,
            lng: -83.441162
        },
        // NO Hawaii
        // 12
        {
            name: "Idaho",
            lat: 44.068203,
            lng: -114.742043
        },
        // 13
        {
            name: "Illinois",
            lat: 40.000000,
            lng: -89.000000
        },
        // 14
        {
            name: "Indiana",
            lat: 40.273502,
            lng: -86.126976
        },
        // 15
        {
            name: "Iowa",
            lat: 42.032974,
            lng: -93.581543
        },
        // 16
        {
            name: "Kansas",
            lat: 38.500000,
            lng: -98.000000
        },
        // 17
        {
            name: "Kentucky",
            lat: 37.839333,
            lng: -84.270020
        },
        // 18
        {
            name: "Louisiana",
            lat: 30.391830,
            lng: -92.329102
        },
        // 19
        {
            name: "Maine",
            lat: 45.367584,
            lng: -68.972168
        },
        // 20
        {
            name: "Maryland",
            lat: 39.045753,
            lng: -76.641273
        },
        // 21
        {
            name: "Massachusetts",
            lat: 42.407211,
            lng: -71.382439
        },
        // 22
        {
            name: "Michigan",
            lat: 44.182205,
            lng: -84.506836
        },
        // 23
        {
            name: "Minnesota",
            lat: 46.392410,
            lng: -94.636230
        },
        // 24
        {
            name: "Mississippi",
            lat: 33.000000,
            lng: -90.000000
        },
        // 25
        {
            name: "Missouri",
            lat: 38.573936,
            lng: -92.603760
        },
        // 26
        {
            name: "Montana",
            lat: 46.965260,
            lng: -109.533691
        },
        // 27
        {
            name: "Nebraska",
            lat: 41.500000,
            lng: -100.000000
        },
        // 28
        {
            name: "Nevada",
            lat: 39.876019,
            lng: -117.224121
        },
        // 29
        {
            name: "New Hampshire",
            lat: 44.000000,
            lng: -71.500000
        },
        // 30
        {
            name: "New Jersey",
            lat: 39.833851,
            lng: -74.871826
        },
        // 31
        {
            name: "New Mexico",
            lat: 34.307144,
            lng: -106.018066
        },
        // 32
        {
            name: "New York",
            lat: 43.000000,
            lng: -75.000000
        },
        // 33
        {
            name: "North Carolina",
            lat: 35.782169,
            lng: -80.793457
        },
        // 34
        {
            name: "North Dakota",
            lat: 47.650589,
            lng: -100.437012
        },
        // 35
        {
            name: "Ohio",
            lat: 40.367474,
            lng: -82.996216
        },
        // 36
        {
            name: "Oklahoma",
            lat: 36.084621,
            lng: -96.921387
        },
        // 37
        {
            name: "Oregon",
            lat: 44.000000,
            lng: -120.500000
        },
        // 38
        {
            name: "Pennsylvania",
            lat: 41.203323,
            lng: -77.194527
        },
        // 39
        {
            name: "Rhode Island",
            lat: 41.700001,
            lng: -71.500000
        },
        // 40
        {
            name: "South Carolina",
            lat: 33.836082,
            lng: -81.163727
        },
        // 41
        {
            name: "South Dakota",
            lat: 44.500000,
            lng: -100.000000
        },
        // 42
        {
            name: "Tennessee",
            lat: 35.860119,
            lng: -86.660156
        },
        // 43
        {
            name: "Texas",
            lat: 31.000000,
            lng: -100.000000
        },
        // 44
        {
            name: "Utah",
            lat: 39.419220,
            lng: -111.950684
        },
        // 45
        {
            name: "Vermont",
            lat: 44.000000,
            lng: -72.699997
        },
        // 46
        {
            name: "Virginia",
            lat: 37.926868,
            lng: -78.024902
        },
        // 47
        {
            name: "Washington",
            lat: 47.751076,
            lng: -120.740135
        },
        // 48
        {
            name: "West Virginia",
            lat: 39.000000,
            lng: -80.500000
        },
        // 49
        {
            name: "Wisconsin",
            lat: 44.500000,
            lng: -89.500000
        },
        // 50
        {
            name: "Wyoming",
            lat: 43.075970,
            lng: -107.290283
        },
    ]

/*    console.log("Right answer state: ", rightAnswerState);
    console.log("Lattitude: ", lat);
    console.log("Longitude: ", lng);*/

    const isInsideUSA = (lng: number, lat: number) => {
        // USA coordinates
        if (lng < -125 || lng > -66 || lat < 25 || lat > 50) {
            return "Outside USA"
        }
        return true;
    }

    if (isInsideUSA(lng, lat) === "Outside USA") {
        return {
            state: "Outside USA",
            actualChosenState: "Outside USA"
        }
    }

    const whatStatesClosest = (lng: number, lat: number) => {
        const statesInOrder = states.map((state) => {
            return {
                name: state.name,
                distance: Math.sqrt(Math.pow(state.lat - lat, 2) + Math.pow(state.lng - lng, 2))
            }
        }
        ).sort((a, b) => a.distance - b.distance);
        /*const IndexOfRightAnswerState = statesInOrder.findIndex((state) => state.name === rightAnswerState);
         console.log("Closest states: ", statesInOrder);
         console.log("Right answer state index: ", IndexOfRightAnswerState);*/
        return statesInOrder;
    }

    const didUserWin = (rightAnswerState: string, closestStates: { name: string; distance: number; }[]) => {
        if (diff === "easy") {
            // if easy it can be in 5 closest states
            for (let i = 0; i < 5; i++) {
                if (closestStates[i].name === rightAnswerState) {
                    return {
                        state: rightAnswerState,
                        actualChosenState: closestStates[0].name
                    }
                }
            }
            return {
                state: closestStates[0].name,
                actualChosenState: closestStates[0].name
            }
        }
        if (diff === "medium") {
            // if medium it can be in 3 closest states
            const actualChosenState = closestStates[0].name;
            for (let i = 0; i < 3; i++) {
                if (closestStates[i].name === rightAnswerState) {
                    return {
                        state: rightAnswerState,
                        actualChosenState: actualChosenState
                    }
                }
            }
            return {
                state: actualChosenState,
                actualChosenState: actualChosenState
            }
        }
        if (diff === "hard") {
            const actualChosenState = closestStates[0].name;
            // if hard it can be in 2 closest state
            for (let i = 0; i < 2; i++) {
                if (closestStates[i].name === rightAnswerState) {
                    return {
                        state: rightAnswerState,
                        actualChosenState: actualChosenState
                    }
                }
            }
            return {
                state: actualChosenState,
                actualChosenState: actualChosenState
            }
        }
        return {
            state: closestStates[0].name,
            actualChosenState: closestStates[0].name
        }
    }
    return didUserWin(rightAnswerState, whatStatesClosest(lng, lat));
}

