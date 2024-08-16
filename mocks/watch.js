import * as fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const path = fileURLToPath(import.meta.url);
const directoryName = dirname(path);
const hostname = "http://127.0.0.1:9000";

console.log(`Watching changes to [${directoryName}/mappings] ...`);

fs.watch(directoryName + "/mappings", (eventType, filename) => {
  console.log(`${filename} : ${eventType}`);
  fetch(`${hostname}/__admin/mappings/reset`, {
    method: "POST",
  })
    .then((response) => {
      console.log(`Wiremock reset [${hostname}/__admin/mappings/reset]`);
    })
    .catch((error) => {
      console.error("error while reseting wiremock:", error);
    });
});
