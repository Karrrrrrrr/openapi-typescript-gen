import { V2 } from "../../src/v2.js";
import fs from 'fs'


const data = JSON.parse(fs.readFileSync('./swagger2.0.json', 'utf-8'))
const v2 = new V2()
v2.genType(data)
v2.genApi(data)
