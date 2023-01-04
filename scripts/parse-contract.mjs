import fs from "fs";

import { parseMD } from "@manabie-com/mana-markdown-contract";

const fileContents = fs.readFileSync("docs/contracts/USER_PROFILE.md", "utf8");
const result = parseMD(fileContents);
const { metadata, content } = result;

console.log(metadata); // { owner: 'user', users: [ 'adobo', 'payment' ] }
console.log(content); // "## Details."
