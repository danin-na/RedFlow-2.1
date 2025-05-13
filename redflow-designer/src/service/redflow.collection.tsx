// --
//  Private Helpers
// --

const _setByName: _Collection_SetByName_Fn = async ({name}) => 
{
    const collection = await webflow
        .createVariableCollection(name)
        .catch(() => undefined)

    return collection
        ? { ok: true, collection }
        : { ok: false, collection: undefined }
}

const _getById: _Collection_GetById_Fn = async ({id}) =>
{
    const collection = await webflow
        .getVariableCollectionById(id)
        .catch(() => undefined)

    return collection
        ? { ok: true, collection }
        : { ok: false, collection: undefined }
}

const _getByName: _Collection_GetByName_Fn = async ({name}) =>
{
    const all = await webflow
        .getAllVariableCollections()
        .catch(() => [] as VariableCollection[])

    for (const collection of all)
        if ((await collection.getName()) === name)
            return { ok: true, collection }

    return { ok: false, collection: undefined }
}

const _getDefault: _Collection_GetDefault_Fn = async () =>
{
    const collection = await webflow
        .getDefaultVariableCollection()
        .catch(() => undefined)

    return collection
        ? { ok: true, collection }
        : { ok: false, collection: undefined }
}

const _getAll: _Collection_GetAll_Fn = async () =>
{
    const collections = await webflow
        .getAllVariableCollections()
        .catch(() => undefined)

    return collections
        ? { ok: true, collection: collections }
        : { ok: false, collection: undefined }
}

const _delById: _Collection_DelById_Fn = async ({id}) =>
{
    const ok = await webflow
        .removeVariableCollection(id)
        .catch(() => false)

    return { ok, collection: undefined }
}

// --
// Public Api
// --

/**
 * @interface
 * ```ts
 * { name: string, fallback: 'if_exist_return_undefined' | 'if_exist_return_existing' }
 * ```
 * @returns 
 * ```ts
 * { ok: true, collection: VariableCollection } | { ok: false, collection: undefined }
 * ```
 * @throws `it might throws error`. handel it using try-catch.
 */

const setByName: Collection_SetByName_Fn = async (options) =>
{
    const existing = await _getByName({ name: options.name })
        .catch(() => ({ ok: false, collection: undefined }))

    // If Not Exist : SetByName

    if (!existing.ok) return await _setByName({ name: options.name })

    // If Exist : Fallback

    switch (options.fallback) {
        case 'if_exist_return_existing':
            return { ok: true, collection: existing.collection }

        case 'if_exist_return_undefined':
            return { ok: false, collection: undefined }

        default:
            return { ok: false, collection: undefined }
    }
}

/**
 * @interface
 * ```ts
 * { name: string, fallback: 'if_notExist_return_undefined' | 'if_notExist_return_newOne' }
 * ```
 * @returns 
 * ```ts
 * { ok: true, collection: VariableCollection } | { ok: false, collection: undefined }
 * ```
 * @throws `it might throws error`.  handel it using try-catch.
 */

const getByName: Collection_GetByName_Fn = async (options) =>
{
    const existing = await _getByName({ name: options.name })
        .catch(() => ({ ok: false, collection: undefined }))

    // If Exist : GetByName

    if (existing.ok) return { ok: true, collection: existing.collection }

    // If Not Exist : Fallback

    switch (options.fallback) {
        case 'if_notExist_return_newOne':
            return await _setByName(options)

        case 'if_notExist_return_undefined':
            return { ok: false, collection: undefined }

        default:
            return { ok: false, collection: undefined }
    }
}

export const collection = { setByName, getByName }
