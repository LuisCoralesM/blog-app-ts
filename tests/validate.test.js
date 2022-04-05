import {  } from "./src/index.js";
import axios from "axios";

// Use the fetchData to valid the inserted data
const fetchData = async (url) => {
    const response = await axios.get(url);
    return response;
}

describe("", () => {
    describe("Validation of inserted data", () => {
        test("the get returns 200", () => {
            expect(fetchData("localhost:5500/users").status).toBe(200);
        });
    
        test("if the post inserts one new user", () => {
            expect().toBeTruthy();
        });
    
        test("if the get one function returns only one", () => {
    
        });
    
        test("if the get functions retrieve all the needed data", () => {
    
        });
    
        test("if the get all function filter data with param queries", () => {
    
        });
    
        test("if the put correctly updates data", () => {
    
        });
    
        test("if the delete just change the state of the value", () => {
    
        });
    });
});
