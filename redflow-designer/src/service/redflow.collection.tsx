// -- 
//  Private Helpers - type
// --

type _SetByName = (name: string)
    => Promise<{ ok: true, collection: VariableCollection } | { ok: false, collection: undefined }>

type _GetById = (id: string)
    => Promise<{ ok: true, collection: VariableCollection } | { ok: false, collection: undefined }>

type _GetByName = (name: string)
    => Promise<{ ok: true, collection: VariableCollection } | { ok: false, collection: undefined }>

type _GetDefault = ()
    => Promise<{ ok: true, collection: VariableCollection } | { ok: false, collection: undefined }>

type _DelById = (id: string)
    => Promise<{ ok: true, collection: VariableCollection } | { ok: false, collection: undefined }>

type _GetAll = ()
    => Promise<{ ok: true, collection: VariableCollection[] } | { ok: false, collection: undefined }>

// -- 
//  Private Helpers - fn
// --

const _setByName: _SetByName = async (name) =>
{
    try {
        const collection = await webflow.createVariableCollection(name)
        return collection ? { ok: true, collection } : { ok: false, collection: undefined }
    } catch {
        return { ok: false, collection: undefined }
    }
}

const _getById: _GetById = async (id) =>
{
    try {
        const collection = await webflow.getVariableCollectionById(id)
        return collection ? { ok: true, collection } : { ok: false, collection: undefined }
    } catch {
        return { ok: false, collection: undefined }
    }
}

const _getByName: _GetByName = async (name) =>
{
    try {
        const all = await webflow.getAllVariableCollections()
        for (const col of all) if ((await col.getName()) === name) return { ok: true, collection: col }
        return { ok: false, collection: undefined }
    } catch {
        return { ok: false, collection: undefined }
    }
}

const _getDefault: _GetDefault = async () =>
{
    try {
        const collection = await webflow.getDefaultVariableCollection()
        return collection ? { ok: true, collection } : { ok: false, collection: undefined }
    } catch {
        return { ok: false, collection: undefined }
    }
}

const _getAll: _GetAll = async () =>
{
    try {
        const collections = await webflow.getAllVariableCollections()
        return collections ? { ok: true, collection: collections } : { ok: false, collection: undefined }
    } catch {
        return { ok: false, collection: undefined }
    }
}

const _delById: _DelById = async (id) =>
{
    try {
        const ok = await webflow.removeVariableCollection(id)
        return ok ? { ok: true, collection: undefined } : { ok: false, collection: undefined }
    } catch {
        return { ok: false, collection: undefined }
    }
}

// --
// Public Api - type
// --

type SetByName = (name: string, fallback: 'if_exist_return_undefined' | 'if_exist_return_existing')
    => Promise<{ ok: true, collection: VariableCollection } | { ok: false, collection: undefined }>

type GetByName = (name: string, fallback: 'if_notExist_return_undefined' | 'if_notExist_return_newOne')
    => Promise<{ ok: true, collection: VariableCollection } | { ok: false, collection: undefined }>

// --
// Public Api - fn
// --

const setByName: SetByName = async (name, fallback) =>
{
    try {
        const existing = await _getByName(name)
        if (!existing.ok) return await _setByName(name)
        if (fallback === 'if_exist_return_existing') return { ok: true, collection: existing.collection }
        if (fallback === 'if_exist_return_undefined') return { ok: false, collection: undefined }
    } catch {
        return { ok: false, collection: undefined }
    }
}

const getByName: GetByName = async (name, fallback) =>
{
    try {
        const existing = await _getByName(name)
        if (existing.ok) { return { ok: true, collection: existing.collection } }
        if (fallback === 'if_notExist_return_newOne') return await _setByName(name)
        if (fallback === 'if_notExist_return_undefined') return { ok: false, collection: undefined }
    } catch {
        return { ok: false, collection: undefined }
    }
}

export const collection = { setByName, getByName } 
