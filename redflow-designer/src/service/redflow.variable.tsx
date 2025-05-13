// --
//  Private Helpers
// --

const _setNumber: _Variable_SetNumber_Fn = async ({ name, value, collection }) => 
{

    const variable = await collection
        .createNumberVariable(name, value)
        .catch(() => undefined)

    return variable
        ? { ok: true, variable }
        : { ok: false, variable: undefined }
}

const _setColor: _Variable_SetColor_Fn = async ({ name, value, collection }) => 
{

    const variable = await collection
        .createColorVariable(name, value)
        .catch(() => undefined)

    return variable
        ? { ok: true, variable }
        : { ok: false, variable: undefined }
}

const _setFont: _Variable_SetFont_Fn = async ({ name, value, collection }) => 
{
    const variable = await collection
        .createFontFamilyVariable(name, value)
        .catch(() => undefined)

    return variable
        ? { ok: true, variable }
        : { ok: false, variable: undefined }
}

const _setSize: _Variable_SetSize_Fn = async ({ name, value, collection }) => 
{
    const variable = await collection
        .createSizeVariable(name, value)
        .catch(() => undefined)

    return variable
        ? { ok: true, variable }
        : { ok: false, variable: undefined }
}

const _setPerc: _Variable_SetPerc_Fn = async ({ name, value, collection }) => 
{
    const variable = await collection
        .createPercentageVariable(name, value)
        .catch(() => undefined)

    return variable
        ? { ok: true, variable }
        : { ok: false, variable: undefined }
}

const _getByName: _Variable_GetByName_Fn = async ({ name, collection }) => 
{
    const variable = await collection
        .getVariableByName(name)
        .catch(() => undefined)

    return variable
        ? { ok: true, variable }
        : { ok: false, variable: undefined }
}

const _getById: _Variable_GetById_Fn = async ({ id, collection }) => 
{
    const variable = await collection
        .getVariable(id)
        .catch(() => undefined)

    return variable
        ? { ok: true, variable }
        : { ok: false, variable: undefined }
}

const _getAll: _Variable_GetAll_Fn = async ({ collection }) => 
{
    const variables = await collection
        .getAllVariables()
        .catch(() => undefined)

    return variables
        ? { ok: true, variable: variables }
        : { ok: false, variable: undefined }
}

const _delByName: _Variable_DelByName_Fn = async ({ name, collection }) => 
{
    const variable = await collection
        .getVariableByName(name)
        .catch(() => undefined)

    if (!variable) return { ok: false, variable: undefined }

    const removed = await variable
        .remove()
        .catch(() => false)

    return removed
        ? { ok: true, variable }
        : { ok: false, variable: undefined }
}

const _delById: _Variable_DelById_Fn = async ({ id, collection }) => 
{
    const variable = await collection
        .getVariable(id)
        .catch(() => undefined)

    if (!variable) return { ok: false, variable: undefined }

    const removed = await variable
        .remove()
        .catch(() => false)

    return removed
        ? { ok: true, variable }
        : { ok: false, variable: undefined }
}

// --
// Public Api
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
