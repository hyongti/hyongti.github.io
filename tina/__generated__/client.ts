import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '75b7ff5dae418072d4d775a5a45329efef486039', queries,  });
export default client;
  