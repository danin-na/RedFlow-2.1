namespace folder
{
    // --
    // Private Helper
    // --

    type _Set = {
        folder: { set: "byName"; name: string }
    }
    /**
     * configuration for which folder to create
     * ```
     * folder: { set: "byName"; name: string }
     * ```
     * @returns  ``` AssetFolder[] ```
     */
    async function _set ({ folder: f }: _Set): Promise<AssetFolder[]>
    {
        switch (f.set) {
            case "byName":
                return [await webflow.createAssetFolder(f.name)]
            default:
                throw new Error("Unsupported mode")
        }
    }

    type _Get = {
        folder: { get: "all" } | { get: "byId"; id: string } | { get: "byName"; name: string }
    }
    /**
     * configuration for which folders to retrieve
     * ```
     * folder: { get: "all" }
     * folder: { get: "byId"; id: string }
     * folder: { get: "byName"; name: string }
     * ```
     * @returns  ``` AssetFolder[] ``` or  ``` [] ```
     */
    async function _get ({ folder: f }: _Get): Promise<AssetFolder[]>
    {
        const fld = await webflow.getAllAssetFolders()

        switch (f.get) {
            case "all":
                return fld

            case "byId":
                return fld.filter((x) => x.id === f.id)

            case "byName": {
                const names = await Promise.all(fld.map((x) => x.getName()))
                return fld.filter((_, i) => names[i] === f.name)
            }

            default:
                throw new Error("Unsupported mode")
        }
    }

    type _Ensure = {
        folder: { ensure: "byName"; name: string }
    }
    /**
     * configuration for ensuring a folder exists or creating it if missing
     * ```
     * folder: { ensure: "byName"; name: string }
     * ```
     * @returns  ``` AssetFolder[] ```
     */
    async function _ensure ({ folder: f }: _Ensure): Promise<AssetFolder[]>
    {
        switch (f.ensure) {
            case "byName": {
                const fld = await _get({ folder: { get: "byName", name: f.name } })
                return fld.length ? fld : await _set({ folder: { set: "byName", name: f.name } })
            }
            default:
                throw new Error("Unsupported mode")
        }
    }

    // --
    // Public Api
    // --

    export type Set = {
        folder: {
            set: "byName"
            name: string
            fallback: "if_exist_then_duplicate" | "if_exist_return_exiting" | "if_exist_throw_error"
        }
    }
    /**
     * configuration for which folder to create or select
     * ```ts
     * folder: { set: "byName"; name: string; fallback: "if_exist_then_duplicate" | "if_exist_return_exiting" | "if_exist_throw_error" }
     * ```
     */
    export async function set ({ folder: f }: Set): Promise<AssetFolder[]>
    {
        switch (f.set) {
            case "byName":
                switch (f.fallback) {
                    case "if_exist_then_duplicate":
                        return await _set({ folder: { set: "byName", name: f.name } })

                    case "if_exist_return_exiting":
                        return await _ensure({ folder: { ensure: "byName", name: f.name } })

                    case "if_exist_throw_error": {
                        const existing = await _get({ folder: { get: "byName", name: f.name } })
                        if (existing.length) throw new Error(`Asset folder "${f.name}" already exists`)
                        return await _set({ folder: { set: "byName", name: f.name } })
                    }
                }

            default:
                throw new Error("Error in ' folder.set '")
        }
    }

    export type Get = {
        folder:
        | {
            get: "byName"
            name: string
            fallback: "if_not_exist_then_create" | "if_not_exist_return_empty" | "if_not_exist_throw_error"
        }
        | { get: "byId"; id: string }
    }
    /**
     * configuration for which folder to retrieve or select
     * ```ts
     * folder: { get: "byName"; name: string; fallback: "if_not_exist_then_create" | "if_not_exist_return_empty" | "if_not_exist_throw_error" }
     * folder: { get: "byId"; id: string }
     * ```
     */
    export async function get ({ folder: f }: Get): Promise<AssetFolder[]>
    {
        switch (f.get) {
            case "byName":
                switch (f.fallback) {
                    case "if_not_exist_then_create":
                        return await _ensure({ folder: { ensure: "byName", name: f.name } })
                    case "if_not_exist_return_empty":
                        return await _get({ folder: { get: "byName", name: f.name } })
                    case "if_not_exist_throw_error": {
                        const found = await _get({ folder: { get: "byName", name: f.name } })
                        if (!found.length) throw new Error(`Asset folder "${f.name}" not found`)
                        return found
                    }
                }
            case "byId":
                return await _get({ folder: { get: "byId", id: f.id } })
            default:
                throw new Error("Error in ' folder.get '")
        }
    }

    export type Assign = {
        folder: {
            assign: "byName"
            name: string
            asset: Asset
            fallback: "if_not_exist_then_create" | "if_not_exist_return_empty" | "if_not_exist_throw_error"
        }
    }
    /**
     * configuration for which folder to assign an asset to
     * ```
     * folder: { assign: "byName"; name: string; asset: Asset; fallback: "if_not_exist_then_create" | "if_not_exist_return_empty" | "if_not_exist_throw_error" }
     * ```
     */
    export async function assign ({ folder: f }: Assign): Promise<AssetFolder[]>
    {
        switch (f.assign) {
            case "byName": {
                let folders: AssetFolder[]

                switch (f.fallback) {
                    case "if_not_exist_then_create":
                        folders = await _ensure({ folder: { ensure: "byName", name: f.name } })
                        break

                    case "if_not_exist_return_empty":
                        folders = await _get({ folder: { get: "byName", name: f.name } })
                        if (!folders.length) return []
                        break

                    case "if_not_exist_throw_error":
                        folders = await _get({ folder: { get: "byName", name: f.name } })
                        if (!folders.length) throw new Error(`Asset folder "${f.name}" not found`)
                        break
                }

                const [fld] = folders
                await f.asset.setParent(fld)
                return [fld]
            }
            default:
                throw new Error("Unsupported assign")
        }
    }
}

namespace asset
{
    // --
    // Private Helper - Types
    // --

    // _set(asset): Promise<Asset>

    type _Set = {
        asset: { set: "byFile"; file: File } // return Asset
    }

    // _update(asset): Promise<Asset>

    type _Update = {
        asset: { originalAsset: Asset; newFile: File } // return Asset
    }

    // _get(asset): Promise<Asset[] | Asset> | null

    type _Get = {
        asset:
        | { get: "all" } // return Asset[]
        | { get: "byId"; id: string } // return Asset | null
        | { get: "byName"; name: string } // return Asset[]
    }

    // _ensure(asset): Promise<Asset[] | Asset>
    type _Ensure = {
        asset:
        | { ensure: "byName"; name: string; file: File } // return Asset[] | Asset
        | { ensure: "byId"; id: string; file: File } // return Asset
    }

    // _makeFile(file): Promise<File>
    type _MakeFile = {
        file: {
            make: "byContent"
            name: string
            content: string
            extension: string
            mimeType: "text/plain" | "text/csv"
        } // return File
    }

    // --
    // Private Helper - Fn
    // --

    /**
     * configuration for which asset to create by file
     * ```
     * type _Set =
     * {
     *    asset: { set: "byFile"; file: File } // return Asset
     * }
     * ```
     */
    async function _set ({ asset: a }: _Set): Promise<Asset>
    {
        switch (a.set) {
            case "byFile":
                return await webflow.createAsset(a.file)
            default:
                throw new Error("Unsupported mode")
        }
    }

    /**
     * configuration for updating an existing asset's file
     * ```
     * type _Update =
     * {
     *    asset: { originalAsset: Asset; newFile: File } // return Asset
     * }
     * ```
     */
    async function _update ({ asset: a }: _Update): Promise<Asset>
    {
        try {
            await a.originalAsset.setFile(a.newFile)
            return a.originalAsset
        } catch {
            throw new Error("Webflow error to update file")
        }
    }

    /**
     * configuration for which assets to retrieve
     * ```
     * type _Get =
     * {
     *     asset:
     *     | { get: "all" } // return Asset[]
     *     | { get: "byId"; id: string } // return Asset | null
     *     | { get: "byName"; name: string } // return Asset[]
     * }
     */
    async function _get ({ asset: a }: _Get): Promise<Asset[] | Asset | null>
    {
        switch (a.get) {
            case "all":
                return await webflow.getAllAssets()
            case "byId":
                const asset = await webflow.getAssetById(a.id)
                return asset ? asset : null
            case "byName": {
                const assets = await webflow.getAllAssets()
                const names = await Promise.all(assets.map((x) => x.getName()))
                return assets.filter((_, i) => names[i] === a.name)
            }
            default:
                throw new Error("Unsupported mode")
        }
    }

    /**
     * configuration for which asset to ensure
     * ```ts
     * type _Ensure =
     * {
     *     asset:
     *     | { ensure: "byName"; name: string; file: File } // return Asset[] | Asset
     *     | { ensure: "byId"; id: string; file: File } // return Asset
     * }
     * ```
     */
    async function _ensure ({ asset: a }: _Ensure): Promise<Asset[] | Asset>
    {
        switch (a.ensure) {
            case "byName": {
                const result = (await _get({ asset: { get: "byName", name: a.name } })) as Asset[]
                if (result.length > 0) return result
                return await _set({ asset: { set: "byFile", file: a.file } })
            }

            case "byId": {
                const result = (await _get({ asset: { get: "byId", id: a.id } })) as Asset | null
                if (result) return result
                return await _set({ asset: { set: "byFile", file: a.file } })
            }

            default:
                throw new Error("Unsupported ensure mode")
        }
    }

    /**
     * Create a File from raw content, normalizing the name and applying given extension & mimeType
     * ```ts
     * type _MakeFile =
     * {
     *      file:
     *      | { make: "byContent", name: string; content: string; extension: string; mimeType: 'text/plain' | 'text/csv' } // return File
     * }
     * ```
     */
    function _makeFile ({ file: f }: _MakeFile): File
    {
        // strip any existing extension
        const baseName = f.name.replace(/\.[^.]+$/, "")
        const fileName = `${baseName}${f.extension}`

        // wrap content in a Blob, then into a File
        const blob = new Blob([f.content], { type: f.mimeType })
        return new File([blob], fileName, { type: f.mimeType })
    }

    // --
    // Public Api
    // --

    export type Set = {
        asset:
        | {
            set: "Text_File"
            content: string
            fileName: string
            fallback: "if_exist_then_duplicate" | "if_exist_then_update" | "if_exist_throw_error"
        }
        | {
            set: "Json_File"
            content: string | Record<string, any>
            fileName: string
            fallback: "if_exist_then_duplicate" | "if_exist_then_update" | "if_exist_throw_error"
        }
        folder?: {
            name: string
            fallback: "if_not_exist_then_create" | "if_not_exist_return_empty" | "if_not_exist_throw_error"
        }
    }
    /**
     * Create Asset and optionally assign it to a folder.
     * ```ts
     * asset:
        | {
            set: "Text_File"
            content: string
            fileName: string
            fallback: "if_exist_then_duplicate" | "if_exist_then_update" | "if_exist_throw_error"
        }
        | {
            set: "Json_File"
            content: string | Record<string, any>
            fileName: string
            fallback: "if_exist_then_duplicate" | "if_exist_then_update" | "if_exist_throw_error"
        }
        folder?: {
            name: string
            fallback: "if_not_exist_then_create" | "if_not_exist_return_empty" | "if_not_exist_throw_error"
        }
     * ```
     */
    export async function set ({ asset: a, folder: f }: Set): Promise<Asset>
    {
        // build a File from the incoming content
        let fl: File

        switch (a.set) {
            case "Text_File":
                fl = _makeFile({
                    file: {
                        make: "byContent",
                        name: a.fileName,
                        content: a.content,
                        extension: ".txt",
                        mimeType: "text/plain",
                    },
                })
                break

            case "Json_File":
                const json = typeof a.content === "string" ? a.content : JSON.stringify(a.content, null, 2)
                fl = _makeFile({
                    file: {
                        make: "byContent",
                        name: a.fileName,
                        content: json,
                        extension: ".txt",
                        mimeType: "text/plain",
                    },
                })
                break

            default:
                throw new Error("Unsupported asset type")
        }

        // handle the three asset-level fallback modes
        let result: Asset
        const filename = a.fileName + ".text"
        switch (a.fallback) {
            case "if_exist_then_duplicate":
                result = await _set({ asset: { set: "byFile", file: fl } })
                break

            case "if_exist_then_update": {
                const found = (await _get({ asset: { get: "byName", name: filename } })) as Asset[]
                if (found.length > 0) {
                    result = await _update({ asset: { originalAsset: found[0], newFile: fl } })
                } else {
                    result = await _set({ asset: { set: "byFile", file: fl } })
                }
                break
            }

            case "if_exist_throw_error": {
                const found = (await _get({ asset: { get: "byName", name: filename } })) as Asset[]
                if (found.length > 0) {
                    throw new Error(`Asset "${filename}" already exists`)
                }
                result = await _set({ asset: { set: "byFile", file: fl } })
                break
            }

            default:
                throw new Error("Unsupported fallback mode")
        }

        // forward the optional folder block (your existing folder.assign helper handles its own fallbacks)
        if (f) {
            await folder.assign({
                folder: {
                    assign: "byName",
                    name: f.name,
                    asset: result,
                    fallback: f.fallback,
                },
            })
        }

        return result
    }

    export type Get = {
        asset: { get: "all" } | { get: "byId"; id: string } | { get: "byName"; name: string }
    }
    /**
     * configuration for which assets to retrieve
     * ```
     * asset: { get: "all" }
     * asset: { get: "byId"; id: string }
     * asset: { get: "byName"; name: string }
     * ```
     */
    export async function get ({ asset: a }: Get): Promise<Asset[]>
    {
        switch (a.get) {
            case "all":
                return _get({ asset: { get: "all" } })
            case "byId":
                return _get({ asset: { get: "byId", id: a.id } })
            case "byName":
                return _get({ asset: { get: "byName", name: a.name } })
            default:
                throw new Error("Unsupported mode")
        }
    }

    export type Read = (m: ReadType) => Promise<any>
    export type ReadType = { mode: "Json"; name: string }

    export const read: Read = async (m) =>
    {
        switch (m.mode) {
            case "Json": {
                const [assetFile] = await _get({ mode: "byName", name: m.name })
                console.log(assetFile)
                if (!assetFile) {
                    throw new Error(`Asset with name "${m.name}" not found`)
                }
                const url = await assetFile.getUrl()
                const response = await fetch(url)
                const text = await response.text()
                return JSON.parse(text)
            }
            default:
                throw new Error("Unsupported read mode")
        }
    }
}

export const file = { folder, asset }
