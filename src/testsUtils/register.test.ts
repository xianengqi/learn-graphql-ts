import { host } from "./constants";
import { request } from "graphql-request";
import { startServer } from "../index";
// import fetch from "node-fetch"

const email = "bob@bob.com";
const password = "asdsafewtw";

const mutation = `
  mutation {
    register(email: "${email}", password: "${password}")
  }
`;

  

// main().catch((error) => console.error(error))

test("Register user", async () => {
  await startServer()
  const main = await request(host, mutation);
  expect(main).toEqual({ register: true });
});
