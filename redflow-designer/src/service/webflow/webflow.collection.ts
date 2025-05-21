type SetByNameFn = (opts: { name: string })
    => Promise<{ collection: VariableCollection; message: null } | { collection: null; message: string }>
type GetAllFn = ()
    => Promise<{ collection: VariableCollection[]; message: null } | { collection: null; message: string }>
type GetDefFn = ()
    => Promise<{ collection: VariableCollection; message: null } | { collection: null; message: string }>
type GetByNameFn = (opts: { name: string })
    => Promise<{ collection: VariableCollection; message: null } | { collection: null; message: string }>
type GetByIdFn = (opts: { id: string })
    => Promise<{ collection: VariableCollection; message: null } | { collection: null; message: string }>
type DelByNameFn = (opts: { name: string })
    => Promise<{ collection: VariableCollection; message: null } | { collection: null; message: string }>
type DelByIdFn = (opts: { id: string })
    => Promise<{ collection: VariableCollection; message: null } | { collection: null; message: string }>
type RenameByCollection = (opts: { collection: VariableCollection; name: string })
    => Promise<{ collection: VariableCollection; message: null } | { collection: null; message: string }>

const setByName: SetByNameFn = async ({ name }) =>
{
    try {
        const collection = await webflow.createVariableCollection(name)
        if (collection) return { collection, message: null }
        throw new Error('setByName: failed to create collection')
    } catch (e: any) {
        return { collection: null, message: e.message || String(e) }
    }
}
const getAll: GetAllFn = async () =>
{
    try {
        const collection = await webflow.getAllVariableCollections()
        if (collection.length) return { collection, message: null }
        throw new Error('getAll: failed to fetch collections')
    } catch (e: any) {
        return { collection: null, message: e.message || String(e) }
    }
}
const getDef: GetDefFn = async () =>
{
    try {
        const collection = await webflow.getDefaultVariableCollection()
        if (collection) return { collection, message: null }
        throw new Error('getDef: failed to fetch default collection')
    } catch (e: any) {
        return { collection: null, message: e.message || String(e) }
    }
}
const getById: GetByIdFn = async ({ id }) =>
{
    try {
        const collection = await webflow.getVariableCollectionById(id)
        if (collection) return { collection, message: null }
        throw new Error(`getById: failed to fetch collection by id ${id}`)
    } catch (e: any) {
        return { collection: null, message: e.message || String(e) }
    }
}
const getByName: GetByNameFn = async ({ name }) =>
{
    try {
        const collections = await webflow.getAllVariableCollections()
        for (const collection of collections)
            if (await collection.getName() === name)
                return { collection, message: null }
        throw new Error(`getByName: failed to fetch collection by name "${name}"`)
    } catch (e: any) {
        return { collection: null, message: e.message || String(e) }
    }
}
const delByName: DelByNameFn = async ({ name }) =>
{
    try {
        const { collection, message } = await getByName({ name })
        if (!collection) throw new Error(`delByName: ${message}`)
        if (await webflow.removeVariableCollection(collection.id)) return { collection, message: null }
        throw new Error(`delByName: failed to delete collection by name "${name}"`)
    } catch (e: any) {
        return { collection: null, message: e.message || String(e) }
    }
}
const delById: DelByIdFn = async ({ id }) =>
{
    try {
        const { collection, message } = await getById({ id })
        if (!collection) throw new Error(`delById: ${message}`)
        if (await webflow.removeVariableCollection(collection.id)) return { collection, message: null }
        throw new Error(`delById: failed to delete collection by id ${id}`)
    } catch (e: any) {
        return { collection: null, message: e.message || String(e) }
    }
}
const renameByCollection: RenameByCollection = async ({ collection, name }) =>
{
    try {
        await collection.setName(name)
        return { collection, message: null }
    } catch (e: any) {
        return { collection: null, message: e.message || String(e) }
    }
}

const set = { byName: setByName }
const get = { all: getAll, default: getDef, byId: getById, byName: getByName }
const del = { byName: delByName, byId: delById }
const rename = { byCollection: renameByCollection }
export const collection = { set, get, del, rename }