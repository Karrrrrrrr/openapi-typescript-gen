import fs from 'fs'
import { defaultFileContent } from './config.js'

const data = JSON.parse(fs.readFileSync('./示例项目.openapi.json', 'utf-8'))
const writeFile = (path, content) => {
    const split = path.split('/')
    const dir = split.filter((_, index) => index !== split.length - 1).join('/')
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
    fs.writeFileSync(path, content, 'utf-8')

}

const genEnums = (enums) => {
    return enums.map(item =>
        typeof item === 'string' ?
            `'${item}'` :
            `${item}`)
        .join(' | ')
}
const $refToType = ($ref) => {
    // 排除空格
    return $ref.replace('#/components/schemas/', '').replace('%20', '')
}
const getType = (options) => {
    const { type, format, $ref, items } = options
    const enums = options.enum
    if (enums)
        return genEnums(enums)

    if (type === 'integer' || type === 'float') return 'number'

    if (type === 'bool' || type === 'boolean') return 'boolean'

    if (type === 'string') return 'string'

    if (type === 'array') return `${getType(items)}[]`

    if ($ref) return $refToType($ref)

    return 'unknown'
}
const genType = () => {
    let s = ''
    s += 'export type int = number\n\n'
    s += 'export type int64 = number\n\n'
    s += 'export type float = number\n\n'
    s += 'export type float64 = number\n\n'
    s += 'export type Time = string\n\n'
    s += 'export type time = string\n\n'
    // 用作dayjs的参数
    s += 'export type MaybeTime = time | Date | number | undefined | null\n\n'
    Object.entries(data.components.schemas).forEach(([name, schema]) => {
        name = name.replace(' ', '')
        if (!schema) return
        if (schema.type === 'string') {
            if (schema.enum) {
                s += `export type ${name} = ${genEnums(schema.enum)}\n`
                return
            }
            s += `export type ${name} = string\n`

            return
        }
        // oneOf 暂定为any
        if (schema.oneOf) {
            s += `export type ${name} = any\n`
            return
        }

        const properties = schema.properties
        const fields = properties ? Object.entries(properties).map(([field, type]) => {
            return ({
                name: field,
                type: getType(type),
                comment: type.example ? `// ${type.example}` : ''
            })

        }) : []
        const indent = '\t'
        const fieldString = fields.map(item => {
            return `${indent}${item.name}: ${item.type} ${item.comment}`
        }).join('\n')
        const typeClass =
            `export type ${name} = {
${fieldString}
}

`
        s += typeClass
    })
    writeFile('./src/typing/gen.ts', s)
}
const transformObjectKey = (name) => {
    name = name.replace('"', '\\"').replace(`'`, `\\'`)
    if (/[\-%()/\\ ~!@#$^&*\[\]{}|]/.test(name)) {
        return `'${name}'`
    }
    return name
}

const genApi = () => {
    const groups = {}
    const groupImports = {}
    const addGroupType = (name, typeName) => {
        groupImports[name] ||= new Set()
        groupImports[name].add(typeName)
    }

    for (let path in data.paths) {
        const methods = data.paths[path]
        for (let methodName in methods) {
            const method = methods[methodName]
            const tag = (method.tags || ['default'])[0]
            const description = method.description
            let functionComment = ''
            if (description) {
                functionComment = description.split('\n').map(item=> `// ${item}`).join('\n')
            }
            groups[tag] ||= ''
            let apiFile = groups[tag]

            // console.log(method)
            const functionName = method['operationId']
            let paramsBody = ''
            const { parameters = [], requestBody } = method
            let query = ``
            let data = ``
            let headers = ``
            if (parameters.length || requestBody) paramsBody += '\n'
            if (parameters.length) {
                const pathParams = parameters.filter(item => item.in === 'path')
                const queryParams = parameters.filter(item => item.in === 'query')
                const headerParams = parameters.filter(item => item.in === 'header')
                // const otherParams = parameters.filter(item => item.in !== 'path' && item.in !== 'query' && item.in !== 'header')

                pathParams.forEach(item => {
                    paramsBody += `\t${transformObjectKey(item.name)}: ${getType(item.schema)},\n`
                    if (item.schema.$ref) {
                        addGroupType(tag, $refToType(item.schema.$ref))
                    }
                })
                queryParams.forEach(item => {
                    query += `\t\t${transformObjectKey(item.name)}${item.required ? '' : '?'}: ${getType(item.schema)},\n`
                    if (item.schema.$ref) {
                        addGroupType(tag, $refToType(item.schema.$ref))
                    }
                })
                headerParams.forEach(item => {
                    headers += `\t\t${transformObjectKey(item.name)}${item.required ? '' : '?'}: ${getType(item.schema)},\n`
                    if (item.schema.$ref) {
                        addGroupType(tag, $refToType(item.schema.$ref))
                    }
                })

                if (query) {
                    paramsBody += `\tquery: {\n${query}\t},\n`
                }
                // otherParams.forEach(item => {
                //     paramsBody += `\t${transformObjectKey(item.name)}: ${getType(item.schema)},\n`
                //     if (item.schema.$ref) {
                //         addGroupType(tag, $refToType(item.schema.$ref))
                //     }
                // })
                if (headers) {
                    paramsBody += `headers: {\n${headers}\t},\n`
                }
            }
            if (requestBody) {
                data = {}
                const $ref = requestBody.content?.['application/json']?.schema?.$ref

                if ($ref) {
                    paramsBody += `\tdata: ${$refToType($ref)},\n`
                    addGroupType(tag, $refToType($ref))
                } else {
                    paramsBody += `\tdata: {},\n`
                }
            }

            const funcBody = `
${functionComment}
export function ${functionName}(${paramsBody}) {
    return request({
        url: \`${path.replace('{', '${ ').replace('}', ' }')}\`,
        method: '${methodName.toUpperCase()}',
        params${query ? ': query' : ': undefined'},
        data${data ? '' : ': undefined'},
        headers${headers ? '' : ': undefined'},
    })
}
`
            apiFile += funcBody
            groups[tag] = apiFile
        }
    }
    for (let key in groups) {
        const types = [...(groupImports[key]?.keys() || [])].toSorted().map(item => {
            return `\t${item}`
        }).join(',\n')

        writeFile(`./src/api/${key}-gen.ts`,
            defaultFileContent +
            `import type {\n` +
            types + `\n} from '~types'\n` +
            groups[key])
    }
}
genType()
genApi()
