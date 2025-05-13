// -- 
//  Private Helpers - type
// --



// -- 
//  Private Helpers - fn 
// --

/*
const _setNumber: _VariableSetNumber = async (name, value, collection) =>
{
    try {
        const variable = await collection.createNumberVariable(name, value)
        return variable ? { ok: true, variable } : { ok: false, variable: undefined }
    } catch {
        return { ok: false, variable: undefined }
    }
}

const _setColor: _VariableSetColor = async (name, value, collection) =>
{
    try {
        const variable = await collection.createColorVariable(name, value)
        return variable ? { ok: true, variable } : { ok: false, variable: undefined }
    } catch {
        return { ok: false, variable: undefined }
    }
}

const _setFont: _VariableSetFont = async (name, value, collection) =>
{
    try {
        const variable = await collection.createFontFamilyVariable(name, value)
        return variable ? { ok: true, variable } : { ok: false, variable: undefined }
    } catch {
        return { ok: false, variable: undefined }
    }
}

const _setSize: _VariableSetSize = async (name, value, collection) =>
{
    try {
        const variable = await collection.createSizeVariable(name, value)
        return variable ? { ok: true, variable } : { ok: false, variable: undefined }
    } catch {
        return { ok: false, variable: undefined }
    }
}

const _setPercentage: _VariableSetPercentage = async (name, value, collection) =>
{
    try {
        const variable = await collection.createPercentageVariable(name, value)
        return variable ? { ok: true, variable } : { ok: false, variable: undefined }
    } catch {
        return { ok: false, variable: undefined }
    }
}

const _getByName: _VariableGetByName = async (name, collection) =>
{
    try {
        const variable = await collection.getVariableByName(name)
        return variable ? { ok: true, variable } : { ok: false, variable: undefined }
    } catch {
        return { ok: false, variable: undefined }
    }
}

const _getById: _VariableGetById = async (id, collection) =>
{
    try {
        const variable = await collection.getVariable(id)
        return variable ? { ok: true, variable } : { ok: false, variable: undefined }
    } catch {
        return { ok: false, variable: undefined }
    }
}

const _getAll: _VariableGetAll = async (collection) =>
{
    try {
        const variables = await collection.getAllVariables()
        return variables ? { ok: true, variables } : { ok: false, variables: undefined }
    } catch {
        return { ok: false, variables: undefined }
    }
}

const _delByName: _VariableDelByName = async (name, collection) =>
{
    try {
        const variable = await collection.getVariableByName(name)
        if (!variable) return { ok: false, variable: undefined }

        const removed = await variable.remove()
        return removed ? { ok: true, variable } : { ok: false, variable: undefined }
    } catch {
        return { ok: false, variable: undefined }
    }
}

const _delById: _VariableDelById = async (id, collection) =>
{
    try {
        const variable = await collection.getVariable(id)
        if (!variable) return { ok: false, variable: undefined }

        const removed = await variable.remove()
        return removed ? { ok: true, variable } : { ok: false, variable: undefined }
    } catch {
        return { ok: false, variable: undefined }
    }
}

const _delAll: _VariableDelAll = async (collection) =>
{
    try {
        const variables = await collection.getAllVariables()
        if (!variables) return { ok: false, variable: undefined }

        await Promise.all(variables.map((v) => v.remove()))
        return { ok: true, variable: variables }
    } catch {
        return { ok: false, variable: undefined }
    }
}

// --
// Public API - types
// --

export type SetByName = (
    name: string,
    value: number | NumberVariable | string | ColorVariable | FontFamilyVariable | SizeValue | SizeVariable | PercentageVariable,
    type: 'number' | 'color' | 'font' | 'size' | 'percentage',
    collection: VariableCollection,
    fallback: 'if_exist_return_undefined' | 'if_exist_update_existing'
) => Promise<{ ok: true; variable: Variable } | { ok: false; variable: undefined }>;

// --
// Public Api - fn
// --
*/