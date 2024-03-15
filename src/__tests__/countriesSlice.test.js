import { configureStore } from "@reduxjs/toolkit";
import countriesService from "../services/countries";
import countriesSlice, { initializeCountries } from "../store/countriesSlice";

//we add decorator
jest.mock("../services/countries");

describe("countriesSlice tests", () => {
    let store;
    //before the test we need to create a store
    beforeEach(() => {
        store = configureStore({
            reducer: {
                countries: countriesSlice
            }
        })
    }
    );
    it("should handle the initialState", () => {
        const { countries, isLoading } = store.getState().countries
        //Testing for this
        // initialState: {
        //     countries: [],
        //     isLoading: true,
        //   },
        expect(countries).toEqual([]);
        expect(isLoading).toBe(true);
    })
    //we dispatch an action to the country
    //we expect the state to be updated because of the action.payload
    it("should handle getCountries", () => {
        store.dispatch({
            type: "countries/getCountries", //this is the action type; getCountries we access the reducer with this
            payload: ["Country1", "Country2"]
        })


        //we accept the data to be in here

        expect(store.getState().countries.countries).toEqual(["Country1", "Country2"])

        //in slice we take payload and change the isLoading to false
        expect(store.getState().countries.isLoading).toBe(false)
    })

    //mock this getAll
    it("should handle initializeCountries", async () => {
        const mockCountries = ["Country1", "Country2"];

        countriesService.getAll.mockResolvedValue(mockCountries);

        await store.dispatch(initializeCountries());

        expect(store.getState().countries.countries).toEqual(mockCountries);
        expect(store.getState().countries.isLoading).toEqual(false);
    })

})