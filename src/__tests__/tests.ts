import request from "supertest"

const baseURL = "localhost:6060"

describe("POST /productions", () => {
    /**
     * Satisfy Requirement 1: Insert (+delete) a given quantity of beer type produced in a day
     */
    const newProduction = {
        "name": "weiss",
        "day": "2022-01-12",
        "quantity": 4
    }
    afterAll(async () => {
        await request(baseURL).delete(`/productions/name/${newProduction.name}/date/${newProduction.day}`)
    })
    it("should add a beer into production", async () => {
        const response = await request(baseURL).post("/productions").send(newProduction)
        expect(response.statusCode).toBe(201)
    })
    it("should return status 500", async () => {
        const response = await request(baseURL).post("/productions").send(newProduction)
        expect(response.statusCode).toBe(500)
    })
})

describe("GET /productions/quantity", () => {
    /**
     * Satisfy Requirement 2: Get the quantity of beer produced either in one day or in a range of 
     *                        days, by type or overall.
     */
    it("should return 5", async () => {
        const response = await request(baseURL).get("/productions/quantity/name/date/2022-01-01")
        expect(response.statusCode).toBe(200)
        let expectedResult = {"success": true, "data": [{"produced_beer": "5"}]}
        expect(response.body).toEqual(expectedResult)
    })
    it("should return 3", async () => {
        const response = await request(baseURL).get("/productions/quantity/name/pils/date/2022-01-01")
        expect(response.statusCode).toBe(200)
        let expectedResult = {"success": true, "data": [{"produced_beer": "3"}]}
        expect(response.body).toEqual(expectedResult)
    })
    it("should return 35", async () => {
        const response = await request(baseURL).get("/productions/quantity/name/date/2022-01-01/2022-01-05")
        expect(response.statusCode).toBe(200)
        let expectedResult = {"success": true, "data": [{"produced_beer": "35"}]}
        expect(response.body).toEqual(expectedResult)
    })
    it("should return 12", async () => {
        const response = await request(baseURL).get("/productions/quantity/name/weiss/date/2022-01-01/2022-01-05")
        expect(response.statusCode).toBe(200)
        let expectedResult = {"success": true, "data": [{"produced_beer": "12"}]}
        expect(response.body).toEqual(expectedResult)
    })
    it("should return status 404", async () => {
        const response = await request(baseURL).get("/productions/quantity/name/date/")
        expect(response.statusCode).toBe(400)
    })
})

describe("GET /laudable/count", () => {
    /**
     * Satisfy Requirement 3: Get the number of laudable days in a range of dates, optionally
     *                        by beer type.
     * 
     * A laudable day is defined as:
     *  - Produced beer is not 0;
     *  - The amount of produced beer is strictly greater to the amount of all previous days;
     *  - The amount of produced beer is strictly greater to the amount of the following day.
     */
    it("should return 1", async () => {
        const response = await request(baseURL).get("/productions/laudable/count/name/date/2022-01-01/2022-01-03")
        expect(response.statusCode).toBe(200)
        let expectedResult = {"success": true, "data": [{"count": "1"}]}
        expect(response.body).toEqual(expectedResult)
    })
    it("should return 2", async () => {
        const response = await request(baseURL).get("/productions/laudable/count/name/date/2022-01-01/2022-01-05")
        expect(response.statusCode).toBe(200)
        let expectedResult = {"success": true, "data": [{"count": "2"}]}
        expect(response.body).toEqual(expectedResult)
    })
    it("should return 1", async () => {
        const response = await request(baseURL).get("/productions/laudable/count/name/weiss/date/2022-01-01/2022-01-03")
        expect(response.statusCode).toBe(200)
        let expectedResult = {"success": true, "data": [{"count": "1"}]}
        expect(response.body).toEqual(expectedResult)
    })
    it("should return 2", async () => {
        const response = await request(baseURL).get("/productions/laudable/count/name/weiss/date/2022-01-01/2022-01-05")
        expect(response.statusCode).toBe(200)
        let expectedResult = {"success": true, "data": [{"count": "2"}]}
        expect(response.body).toEqual(expectedResult)
    })
    it("should return status 400", async () => {
        const response = await request(baseURL).get("/productions/laudable/count/name/date/")
        expect(response.statusCode).toBe(400)
    })
})