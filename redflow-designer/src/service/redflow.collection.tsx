// ------------- Types

// Promise
type Collection_Res_Single = { ok: true, collection: VariableCollection } | { ok: false, collection: undefined }
type Collection_Res_Array = { ok: true, collection: VariableCollection[] } | { ok: false, collection: undefined }

// Private Helpers
type _Collection_Fn_SetByName = (options: { name: string }) => Promise<Collection_Res_Single>
type _Collection_Fn_GetById = (options: { id: string }) => Promise<Collection_Res_Single>
type _Collection_Fn_GetByName = (options: { name: string }) => Promise<Collection_Res_Single>
type _Collection_Fn_GetDefault = () => Promise<Collection_Res_Single>
type _Collection_Fn_GetAll = () => Promise<Collection_Res_Array>
type _Collection_Fn_DelById = (options: { id: string }) => Promise<Collection_Res_Single>

// Public Api
type Collection_Fn_SetByName = (options: { name: string, fallback: "if_exist_skip" | "if_exist_return" }) => Promise<Collection_Res_Single>
type Collection_Fn_GetByName = (options: { name: string, fallback: "if_!exist_skip" | "if_!exist_create" }) => Promise<Collection_Res_Single>

// ------------- Private Helpers

const _setByName: _Collection_Fn_SetByName = async ({ name }) =>
{
    try {
        const collection = await webflow.createVariableCollection(name)
        if (collection) return { ok: true, collection }
        return { ok: false, collection: undefined }
    } catch {
        return { ok: false, collection: undefined }
    }
}
const _getById: _Collection_Fn_GetById = async ({ id }) =>
{
    try {
        const collection = await webflow.getVariableCollectionById(id)
        if (collection) return { ok: true, collection }
        return { ok: false, collection: undefined }
    } catch {
        return { ok: false, collection: undefined }
    }
}
const _getByName: _Collection_Fn_GetByName = async ({ name }) =>
{
    try {
        const all = await webflow.getAllVariableCollections()
        for (const collection of all) if ((await collection.getName()) === name) return { ok: true, collection }
        return { ok: false, collection: undefined }
    } catch {
        return { ok: false, collection: undefined }
    }
}
const _getDefault: _Collection_Fn_GetDefault = async () =>
{
    try {
        const collection = await webflow.getDefaultVariableCollection()
        if (collection) return { ok: true, collection }
        return { ok: false, collection: undefined }
    } catch {
        return { ok: false, collection: undefined }
    }
}
const _getAll: _Collection_Fn_GetAll = async () =>
{
    try {
        const collection = await webflow.getAllVariableCollections()
        if (collection) return { ok: true, collection }
        return { ok: false, collection: undefined }
    } catch {
        return { ok: false, collection: undefined }
    }
}
const _delById: _Collection_Fn_DelById = async ({ id }) =>
{
    try {
        const collection = await webflow.getVariableCollectionById(id)
        if (!collection) return { ok: false, collection: undefined }
        const ok = await webflow.removeVariableCollection(id)
        return ok ? { ok: true, collection } : { ok: false, collection: undefined }
    } catch {
        return { ok: false, collection: undefined }
    }
}

// ------------- Public Api

/**
 * @type
 * ```ts
 * { name: string, fallback: 'if_exist_return' | 'if_exist_skip' }
 * ```
 * @returns
 * ```ts
 * { ok: true, collection: VariableCollection } | { ok: false, collection: undefined }
 * ```
 */

const setByName: Collection_Fn_SetByName = async ({ name, fallback }) =>
{
    try {
        const existing = await _getByName({ name })
        if (!existing.ok) return await _setByName({ name }) // If Not Exist -> SetByName
        switch (fallback) { // If Exist -> Fallback
            case "if_exist_return": return { ok: true, collection: existing.collection }
            case "if_exist_skip": return { ok: false, collection: undefined }
            default: return { ok: false, collection: undefined }
        }
    } catch {
        return { ok: false, collection: undefined }
    }
}

/**
 * @type
 * ```ts
 * { name: string, fallback: 'if_!exist_create' | 'if_!exist_skip' }
 * ```
 * @returns
 * ```ts
 * { ok: true, collection: VariableCollection } | { ok: false, collection: undefined }
 * ```
 */

const getByName: Collection_Fn_GetByName = async ({ name, fallback }) =>
{
    try {
        const { ok, collection } = await _getByName({ name })
        if (ok) return { ok: true, collection } // If Exist -> Return
        switch (fallback) { // If Not Exist -> Fallback
            case "if_!exist_create": return await _setByName({ name })
            case "if_!exist_skip": return { ok: false, collection: undefined }
            default:
                return { ok: false, collection: undefined }
        }
    } catch {
        return { ok: false, collection: undefined }
    }
}

// ------------- Export

export const collection = { setByName, getByName }
