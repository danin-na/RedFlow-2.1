// ------------- Types

// Private Helpers
type _Variable_Fn_SetNumber
    = (options: { name: string, value: NumberValue | NumberVariable, collection: VariableCollection })
        => Promise<NumberVariable>

type _Variable_Fn_SetColor
    = (options: { name: string, value: ColorValue | ColorVariable, collection: VariableCollection })
        => Promise<ColorVariable>

type _Variable_Fn_SetFont
    = (options: { name: string, value: FontFamilyValue | FontFamilyVariable, collection: VariableCollection })
        => Promise<FontFamilyVariable>

type _Variable_Fn_SetSize
    = (options: { name: string, value: SizeValue | SizeVariable, collection: VariableCollection })
        => Promise<SizeVariable>

type _Variable_Fn_SetPercent
    = (options: { name: string, value: PercentageValue | PercentageVariable, collection: VariableCollection })
        => Promise<PercentageVariable>

type _Variable_Fn_GetByName
    = (options: { name: string, collection: VariableCollection })
        => Promise<Variable>

type _Variable_Fn_GetById
    = (options: { id: VariableId, collection: VariableCollection })
        => Promise<Variable>

type _Variable_Fn_GetAll
    = (options: { collection: VariableCollection })
        => Promise<Array<Variable>>

type _Variable_Fn_DelByName
    = (options: { name: string, collection: VariableCollection })
        => Promise<Variable>

type _Variable_Fn_DelById
    = (options: { id: VariableId, collection: VariableCollection })
        => Promise<Variable>

type _Variable_Fn_UpdateByName
    = (options: { name: string, value: VariableValue, collection: VariableCollection })
        => Promise<Variable>

type VariableValue = number | string | SizeValue | NumberVariable | ColorVariable | FontFamilyVariable | SizeVariable | PercentageVariable


// Public Api
export type Variable_Fn_SetByName = (options: (
    | { name: string; type: "number"; value: number | NumberVariable }
    | { name: string; type: "color"; value: string | ColorVariable }
    | { name: string; type: "font"; value: string | FontFamilyVariable }
    | { name: string; type: "size"; value: SizeValue | SizeVariable }
    | { name: string; type: "percentage"; value: number | PercentageVariable })
    & {
        collection: VariableCollection,
        fallback: "if_exist_fail" | "if_exist_overwrite" | "if_exist_preserve"
    }
) => Promise<Variable>

// ------------- Private Helpers

const _setNumber: _Variable_Fn_SetNumber = async ({ name, value, collection }) =>
{
    const variable = await collection.createNumberVariable(name, value)
    if (!variable) throw new Error(`Could not create number variable "${name}"`)
    return variable
}
const _setColor: _Variable_Fn_SetColor = async ({ name, value, collection }) =>
{
    const variable = await collection.createColorVariable(name, value)
    if (!variable) throw new Error(`Could not create color variable "${name}"`)
    return variable
}
const _setFont: _Variable_Fn_SetFont = async ({ name, value, collection }) =>
{
    const variable = await collection.createFontFamilyVariable(name, value)
    if (!variable) throw new Error(`Could not create font-family variable "${name}"`)
    return variable
}
const _setSize: _Variable_Fn_SetSize = async ({ name, value, collection }) =>
{
    const variable = await collection.createSizeVariable(name, value)
    if (!variable) throw new Error(`Could not create size variable "${name}"`)
    return variable
}
const _setPercent: _Variable_Fn_SetPercent = async ({ name, value, collection }) =>
{
    const variable = await collection.createPercentageVariable(name, value)
    if (!variable) throw new Error(`Could not create percentage variable "${name}"`)
    return variable
}
const _getByName: _Variable_Fn_GetByName = async ({ name, collection }) =>
{
    const variable = await collection.getVariableByName(name)
    if (!variable) throw new Error(`Could not retrieve variable "${name}"`)
    return variable
}
const _getById: _Variable_Fn_GetById = async ({ id, collection }) =>
{
    const variable = await collection.getVariable(id)
    if (!variable) throw new Error(`Could not retrieve variable with id "${id}"`)
    return variable
}
const _getAll: _Variable_Fn_GetAll = async ({ collection }) =>
{
    const variables = await collection.getAllVariables()
    if (!variables || !variables.length) throw new Error(`Could not retrieve any variables`)
    return variables
}
const _delByName: _Variable_Fn_DelByName = async ({ name, collection }) =>
{
    const variable = await collection.getVariableByName(name)
    if (!variable) throw new Error(`Variable "${name}" not found`)
    const removed = await variable.remove()
    if (!removed) throw new Error(`Failed to delete variable "${name}"`)
    return variable
}
const _delById: _Variable_Fn_DelById = async ({ id, collection }) =>
{
    const variable = await collection.getVariable(id)
    if (!variable) throw new Error(`Variable with id "${id}" not found`)
    const removed = await variable.remove()
    if (!removed) throw new Error(`Failed to delete variable with id "${id}"`)
    return variable
}
const _updateByName: _Variable_Fn_UpdateByName = async ({ name, value, collection }) =>
{
    const variable = await collection.getVariableByName(name)
    if (!variable) { throw new Error(`Variable "${name}" not found`) }

    if (variable.type === 'Color') await variable.set(value as string | ColorVariable)
    else if (variable.type === 'Number') await variable.set(value as number | NumberVariable)
    else if (variable.type === 'Size') await variable.set(value as SizeValue | SizeVariable)
    else if (variable.type === 'FontFamily') await variable.set(value as string | FontFamilyVariable)
    else if (variable.type === 'Percentage') await variable.set(value as number | PercentageVariable)
    else throw new Error("Unknown variable type: 'variable.type'")

    const updated = await collection.getVariableByName(name)
    if (!updated) throw new Error(`Could not retrieve updated variable "${name}"`)
    return updated
}

// ------------- Public Api

/**
 * @type
 * ```ts
 *  { name: string; type: "number"; value: number | NumberVariable }
 *  | { name: string; type: "color"; value: string | ColorVariable }
 *  | { name: string; type: "font"; value: string | FontFamilyVariable }
 *  | { name: string; type: "size"; value: SizeValue | SizeVariable }
 *  | { name: string; type: "percentage"; value: number | PercentageVariable }
 *  & { collection: VariableCollection }
 *  & { fallback: "if_exist_fail"| "if_exist_overwrite"| "if_exist_preserve" }
 * ```
 * @returns `Variable` | `error`
 * @throws it might throw an `Error`; use try/catch when you call this function
 */

const setByName: Variable_Fn_SetByName = async ({ name, type, value, collection, fallback }) => 
{
    const variable = await _getByName({ name, collection })
    if (!variable) { // If not found, create it (happy-path)
        if (type === 'color') return await _setColor({ name, value: value as string | ColorVariable, collection })
        else if (type === 'number') return await _setNumber({ name, value: value as number | NumberVariable, collection })
        else if (type === 'size') return await _setSize({ name, value: value as SizeValue | SizeVariable, collection })
        else if (type === 'font') return await _setFont({ name, value: value as string | FontFamilyVariable, collection })
        else if (type === 'percentage') return await _setPercent({ name, value: value as number | PercentageVariable, collection })
        else throw new Error(`Unknown variable type: ${type}`)
    }
    if (fallback === 'if_exist_overwrite') return await _updateByName({ name, value, collection })
    if (fallback === 'if_exist_preserve') return variable
    if (fallback === 'if_exist_fail') throw new Error(`Variable "${name}" already exists`)
    throw new Error(`Unknown fallback option: ${fallback}`)
}

// ------------- Export

export const variable = { setByName }
