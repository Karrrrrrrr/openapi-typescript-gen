import fs from 'fs'
import { defaultFileContent } from './config.js'

const data = JSON.parse(fs.readFileSync('./openapi.json', 'utf-8'))
const writeFile = (path, content) => {
    const split = path.split('/')
    const dir = split.filter((_, index) => index !== split.length - 1).join('/')
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
    fs.writeFileSync(path, content, 'utf-8')

}
const getType = (options) => {
    const { type, format, $ref, items } = options
    const enums = options.enum
    if (enums)
        return enums.map(item =>
            typeof item === 'string' ?
                `'${item}'` :
                `${item}`)
            .join(' | ')

    if (type === 'integer' || type === 'float') return 'number'

    if (type === 'bool' || type === 'boolean') return 'boolean'

    if (type === 'string') return 'string'

    if (type === 'array') return `${getType(items)}[]`

    if ($ref) return $ref.replace('#/components/schemas/', '')

    return 'unknown'
}
const genType = () => {
    let s = ''
    s += 'type int = number\n\n'
    s += 'type int64 = number\n\n'
    s += 'type float = number\n\n'
    s += 'type Time = string\n\n'
    s += 'type time = string\n\n'
    for (let name in data.components.schemas) {
        const schema = data.components.schemas[name].properties
        // console.log(name, )
        const fields = []
        for (let field in schema) {
            fields.push({
                name: field,
                type: getType(schema[field]),
                comment: schema[field].example ? `// ${schema[field].example}` : ''
            })
        }
        const indent = '\t'
        const fieldString = fields.map(item => {
            return `${indent}${item.name}: ${item.type} ${item.comment}`
        }).join('\n')
        const typeClass = `type ${name} = {
${fieldString}
}

`
        s += typeClass
    }
    writeFile('types/types-gen.d.ts', s)
}

const genApi = () => {
    const groups = {}

    for (let path in data.paths) {
        const methods = data.paths[path]
        for (let methodName in methods) {
            const method = methods[methodName]
            const tag = method.tags[0]
            // console.log(method.tags[0])
            // continue
            groups[tag] ||= defaultFileContent
            let apiFile = groups[tag]

            // console.log(method)
            const functionName = method['operationId']
            let paramsBody = ''
            const { parameters = [] } = method
            let query = ``
            let data = ``
            let header = ``
            // console.log(parameters)
            if (parameters.length > 0) {
                paramsBody += '\n'

                const pathParams = parameters.filter(item => item.in === 'path')
                const queryParams = parameters.filter(item => item.in === 'query')
                const headerParams = parameters.filter(item => item.in === 'header')
                const otherParams = parameters.filter(item => item.in !== 'path' && item.in !== 'query' && item.in !== 'header')

                pathParams.forEach(item => {
                    paramsBody += `\t${item.name}: ${getType(item.schema)},\n`
                })
                queryParams.forEach(item => {
                    query += `\t\t${item.name}${item.required ? '' : '?'}: ${getType(item.schema)},\n`
                })
                headerParams.forEach(item => {
                    header += `\t\t${item.name}${item.required ? '' : '?'}: ${getType(item.schema)},\n`
                })

                if (query) {
                    paramsBody += `\tquery: {\n${query}\t}\n`
                }
                otherParams.forEach(item => {
                    paramsBody += `\t${item.name}: ${getType(item.schema)},\n`
                })
                if (header) {
                    paramsBody += `\theader: {\n${header}\t}\n`
                }
            }

            const funcBody = `
export function ${functionName}(${paramsBody}) {
    return request({
        url: \`${path.replace('{', '${ ').replace('}', ' }')}\`,
        method: '${methodName.toUpperCase()}',
        params${query ? ': query' : ': undefined'},
        data${data ? '' : ': undefined'},
        header${header ? '' : ': undefined'},
    })
}
`
            apiFile += funcBody
            groups[tag] = apiFile
        }
    }
    for (let key in groups) {
        try {
            fs.mkdirSync('./api')
        } catch (e) {

        }
        writeFile(`./api/${key}-gen.ts`, groups[key])

    }
}
genType()
genApi()
