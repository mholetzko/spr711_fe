import { fetchFood } from "./FoodApi";
import fetchMock from "fetch-mock";

const foodApiStub: string = "http://gql_stub.com";
fetchMock.mock(foodApiStub, { a: 1 });

describe("fetchFood from API", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  it("build a simple query", () => {
    process.env.REACT_APP_FOODAPI_URI = foodApiStub;
    const props = { harvest: true };
    // eslint-disable-next-line jest/valid-expect-in-promise
    fetchFood(props).then((data) => {
      console.log(data);
      expect(data).toStrictEqual({ a: 1 });
    });
  });
});
