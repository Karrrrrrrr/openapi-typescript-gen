import { V3 } from "../../src/v3.js";
import fs from 'fs'


const data = JSON.parse(fs.readFileSync('./openapi3.0.json', 'utf-8'))
const v3 = new V3()
v3.genType(data)
v3.genApi(data)
