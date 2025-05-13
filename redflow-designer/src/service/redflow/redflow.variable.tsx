// ------------- Types

// Promise
type Variable_Res_Single = { ok: true; variable: Variable } | { ok: false; variable: undefined }
type Variable_Res_Array = { ok: true; variable: Variable[] } | { ok: false; variable: undefined }
type VariableValue = number | string | SizeValue | NumberVariable | ColorVariable | FontFamilyVariable | SizeVariable | PercentageVariable

// Private Helpers
type _Variable_Fn_SetNumber = (options: {
    name: string
    value: number | NumberVariable
    collection: VariableCollection
}) => Promise<Variable_Res_Single>

type _Variable_Fn_SetColor = (options: {
    name: string
    value: string | ColorVariable
    collection: VariableCollection
}) => Promise<Variable_Res_Single>

type _Variable_Fn_SetFont = (options: {
    name: string
    value: string | FontFamilyVariable
    collection: VariableCollection
}) => Promise<Variable_Res_Single>

type _Variable_Fn_SetSize = (options: {
    name: string
    value: SizeValue | SizeVariable
    collection: VariableCollection
}) => Promise<Variable_Res_Single>

type _Variable_Fn_SetPerc = (options: {
    name: string
    value: number | PercentageVariable
    collection: VariableCollection
}) => Promise<Variable_Res_Single>

type _Variable_Fn_GetByName = (options: {
    name: string
    collection: VariableCollection
}) => Promise<Variable_Res_Single>

type _Variable_Fn_GetById = (options: {
    id: VariableId
    collection: VariableCollection
}) => Promise<Variable_Res_Single>

type _Variable_Fn_GetAll = (options: {
    collection: VariableCollection
}) => Promise<Variable_Res_Array>

type _Variable_Fn_DelByName = (options: {
    name: string
    collection: VariableCollection
}) => Promise<Variable_Res_Single>

type _Variable_Fn_DelById = (options: {
    id: VariableId
    collection: VariableCollection
}) => Promise<Variable_Res_Single>

type _Variable_Fn_UpdateByName = (options: {
    name: string
    value: VariableValue
    collection: VariableCollection
}) => Promise<Variable_Res_Single>

// Public Api
export type Variable_Fn_SetByName = (options: (
    | { name: string; type: "number"; value: number | NumberVariable }
    | { name: string; type: "color"; value: string | ColorVariable }
    | { name: string; type: "font"; value: string | FontFamilyVariable }
    | { name: string; type: "size"; value: SizeValue | SizeVariable }
    | { name: string; type: "percentage"; value: number | PercentageVariable })
    & {
        collection: VariableCollection,
        fallback:
        | "if_exist_fail"
        | "if_exist_overwrite"
        | "if_exist_preserve"
    }
) => Promise<Variable_Res_Single>

// ------------- Private Helpers

const _setNumber: _Variable_Fn_SetNumber = async ({ name, value, collection }) =>
{
    try {
        const variable = await collection.createNumberVariable(name, value)
        if (variable) return { ok: true, variable }
        return { ok: false, variable: undefined }
    } catch {
        return { ok: false, variable: undefined }
    }
}
const _setColor: _Variable_Fn_SetColor = async ({ name, value, collection }) =>
{
    try {
        const variable = await collection.createColorVariable(name, value)
        if (variable) return { ok: true, variable }
        return { ok: false, variable: undefined }
    } catch {
        return { ok: false, variable: undefined }
    }
}
const _setFont: _Variable_Fn_SetFont = async ({ name, value, collection }) =>
{
    try {
        const variable = await collection.createFontFamilyVariable(name, value)
        if (variable) return { ok: true, variable }
        return { ok: false, variable: undefined }
    } catch {
        return { ok: false, variable: undefined }
    }
}
const _setSize: _Variable_Fn_SetSize = async ({ name, value, collection }) =>
{
    try {
        const variable = await collection.createSizeVariable(name, value)
        if (variable) return { ok: true, variable }
        return { ok: false, variable: undefined }
    } catch {
        return { ok: false, variable: undefined }
    }
}
const _setPerc: _Variable_Fn_SetPerc = async ({ name, value, collection }) =>
{
    try {
        const variable = await collection.createPercentageVariable(name, value)
        if (variable) return { ok: true, variable }
        return { ok: false, variable: undefined }
    } catch {
        return { ok: false, variable: undefined }
    }
}
const _getByName: _Variable_Fn_GetByName = async ({ name, collection }) =>
{
    try {
        const variable = await collection.getVariableByName(name)
        if (variable) return { ok: true, variable }
        return { ok: false, variable: undefined }
    } catch {
        return { ok: false, variable: undefined }
    }
}
const _getById: _Variable_Fn_GetById = async ({ id, collection }) =>
{
    try {
        const variable = await collection.getVariable(id)
        if (variable) return { ok: true, variable }
        return { ok: false, variable: undefined }
    } catch {
        return { ok: false, variable: undefined }
    }
}
const _getAll: _Variable_Fn_GetAll = async ({ collection }) =>
{
    try {
        const variables = await collection.getAllVariables()
        if (variables) return { ok: true, variable: variables }
        return { ok: false, variable: undefined }
    } catch {
        return { ok: false, variable: undefined }
    }
}
const _delByName: _Variable_Fn_DelByName = async ({ name, collection }) =>
{
    try {
        const variable = await collection.getVariableByName(name)
        if (!variable) return { ok: false, variable: undefined }
        const removed = await variable.remove()
        if (removed) return { ok: true, variable }
        return { ok: false, variable: undefined }
    } catch {
        return { ok: false, variable: undefined }
    }
}
const _delById: _Variable_Fn_DelById = async ({ id, collection }) =>
{
    try {
        const variable = await collection.getVariable(id)
        if (!variable) return { ok: false, variable: undefined }
        const removed = await variable.remove()
        if (removed) return { ok: true, variable }
        return { ok: false, variable: undefined }
    } catch {
        return { ok: false, variable: undefined }
    }
}
const _updateByName: _Variable_Fn_UpdateByName = async ({ name, value, collection }) =>
{
    try {
        const variable = await collection.getVariableByName(name)
        if (!variable) return { ok: false, variable: undefined }
        if (variable.type === 'Color') await variable.set(value as string | ColorVariable)
        if (variable.type === 'Number') await variable.set(value as number | NumberVariable)
        if (variable.type === 'Size') await variable.set(value as SizeValue | SizeVariable)
        if (variable.type === 'FontFamily') await variable.set(value as string | FontFamilyVariable)
        if (variable.type === 'Percentage') await variable.set(value as number | PercentageVariable)
        return { ok: true, variable: await collection.getVariableByName(name) }
    } catch {
        return { ok: false, variable: undefined }
    }
}

// ------------- Public Api

/**
 * @type
 * ```ts
 * options: (
 *   | { name: string; type: "number"; value: number | NumberVariable }
 *   | { name: string; type: "color"; value: string | ColorVariable }
 *   | { name: string; type: "font"; value: string | FontFamilyVariable }
 *   | { name: string; type: "size"; value: SizeValue | SizeVariable }
 *   | { name: string; type: "percentage"; value: number | PercentageVariable })
 *   & { collection: VariableCollection, 
 *       fallback: "if_exist_fail"| "if_exist_overwrite"| "if_exist_preserve" }
 * ```
 * @returns
 * ```
 * { ok: true; variable: Variable } | { ok: false; variable: undefined }
 * ```
 */

const setByName: Variable_Fn_SetByName = async ({ name, type, value, collection, fallback }) =>
{
    try {
        const existing = await _getByName({ name, collection });
        if (!existing.ok) { // If Not Exist -> SetByName
            switch (type) {
                case "number": return await _setNumber({ name, value: value as number | NumberVariable, collection });
                case "color": return await _setColor({ name, value: value as string | ColorVariable, collection });
                case "font": return await _setFont({ name, value: value as string | FontFamilyVariable, collection });
                case "size": return await _setSize({ name, value: value as SizeValue | SizeVariable, collection });
                case "percentage": return await _setPerc({ name, value: value as number | PercentageVariable, collection });
                default: return { ok: false, variable: undefined };
            }
        }
        switch (fallback) { // If Exist -> Fallback
            case "if_exist_overwrite": return await _updateByName({ name, value, collection });
            case "if_exist_preserve": return { ok: true, variable: existing.variable }
            case "if_exist_fail": return { ok: false, variable: undefined }
            default: return { ok: false, variable: undefined };
        }
    } catch {
        return { ok: false, variable: undefined };
    }
};

// ------------- Export

export const variable = { setByName }
