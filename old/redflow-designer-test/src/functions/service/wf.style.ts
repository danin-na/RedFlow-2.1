type SetByNameFn = (opts: { name: string; props: PropertyMap })
    => Promise<{ style: Style; message: null } | { style: null; message: string }>;

const setByName: SetByNameFn = async ({ name, props }) =>
{
    try {
        const style = await webflow.createStyle(name);
        const result = await style.setProperties(props);
        if (style) return { style, message: null };
        throw new Error('setByName: failed to set properties');
    } catch (e: any) {
        return { style: null, message: e.message || String(e) };
    }
};


