type getPresetFn = ()
    => Promise<ElementPresets>
type GetSelectedFn = ()
    => Promise<{ element: AnyElement; message: null } | { element: null; message: string }>
type GetAllFn = ()
    => Promise<{ elements: AnyElement[]; message: null } | { elements: null; message: string }>
type GetRootFn = ()
    => Promise<{ element: AnyElement; message: null } | { element: null; message: string }>
type SetBeforeFn = (opts: { target: AnyElement; element: AnyElement | Component | BuilderElement | ElementPreset<AnyElement>; })
    => Promise<{ element: AnyElement; message: null } | { element: null; message: string }>
type SetAfterFn = (opts: { target: AnyElement; element: AnyElement | Component | BuilderElement | ElementPreset<AnyElement>; })
    => Promise<{ element: AnyElement; message: null } | { element: null; message: string }>
type SetAsFirstChildFn = (opts: { target: AnyElement; element: AnyElement | Component | BuilderElement | ElementPreset<AnyElement>; })
    => Promise<{ element: AnyElement; message: null } | { element: null; message: string }>
type SetAsLastChildFn = (opts: { target: AnyElement; element: AnyElement | Component | BuilderElement | ElementPreset<AnyElement>; })
    => Promise<{ element: AnyElement; message: null } | { element: null; message: string }>
type DelTargetFn = (opts: { target: AnyElement; })
    => Promise<{ element: AnyElement; message: null } | { element: null; message: string }>

const getPreset: getPresetFn = async () =>
{
    return webflow.elementPresets
}
const getSelected: GetSelectedFn = async () =>
{
    try {
        const element = await webflow.getSelectedElement()
        if (element) return { element, message: null }
        throw new Error('getSelected: failed to fetch selected element')
    } catch (e: any) {
        return { element: null, message: e.message || String(e) }
    }
}
const getAll: GetAllFn = async () =>
{
    try {
        const elements = await webflow.getAllElements()
        if (elements.length) return { elements, message: null }
        throw new Error('getAll: failed to fetch all elements')
    } catch (e: any) {
        return { elements: null, message: e.message || String(e) }
    }
}
const getRoot: GetRootFn = async () =>
{
    try {
        const element = await webflow.getRootElement()
        if (element) return { element, message: null }
        throw new Error('getRoot: failed to fetch root element')
    } catch (e: any) {
        return { element: null, message: e.message || String(e) }
    }
}
const setBefore: SetBeforeFn = async ({ target, element }) =>
{
    try {
        const inserted = await target.before(element)
        if (inserted) return { element: inserted, message: null }
        throw new Error('setBefore: failed to insert element before target')
    } catch (e: any) {
        return { element: null, message: e.message || String(e) }
    }
}
const setAfter: SetAfterFn = async ({ target, element }) =>
{
    try {
        const inserted = await target.after(element)
        if (inserted) return { element: inserted, message: null }
        throw new Error('setAfter: failed to insert element after target')
    } catch (e: any) {
        return { element: null, message: e.message || String(e) }
    }
}
const setAsFirstChild: SetAsFirstChildFn = async ({ target, element }) =>
{
    try {
        if (target.children) {
            const inserted = await target.prepend(element)
            if (inserted) return { element: inserted, message: null }
        }
        throw new Error('setAsFirstChild: failed to prepend element as first child')
    } catch (e: any) {
        return { element: null, message: e.message || String(e) }
    }
}
const setAsLastChild: SetAsLastChildFn = async ({ target, element }) =>
{
    try {
        if (target.children) {
            const inserted = await target.append(element)
            if (inserted) return { element: inserted, message: null }
        }
        throw new Error('setAsLastChild: failed to append element as last child')
    } catch (e: any) {
        return { element: null, message: e.message || String(e) }
    }
}
const delTarget: DelTargetFn = async ({ target }) =>
{
    try {
        if (target) {
            await target.remove()
            return { element: target, message: null }
        }
        throw new Error('removeTarget: failed to remove target element')
    } catch (e: any) {
        return { element: null, message: e.message || String(e) }
    }
}

const get = { selected: getSelected, all: getAll, root: getRoot, preset: getPreset }
const set = { before: setBefore, after: setAfter, asFistChild: setAsFirstChild, asLastChild: setAsLastChild }
const del = { target: delTarget }
export const element = { get, set, del }