import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const PATH_DB = path.join(__dirname, ("..", "db", "db.json"));
