type SetNumberFn = (opts: { name: string; val: NumberValue | NumberVariable; col: VariableCollection; })
    => Promise<| { variable: NumberVariable; message: null } | { variable: null; message: string }>;
type SetColorFn = (opts: { name: string; val: ColorValue | ColorVariable; col: VariableCollection; })
    => Promise<| { variable: ColorVariable; message: null } | { variable: null; message: string }>;
type SetFontFn = (opts: { name: string; val: FontFamilyValue | FontFamilyVariable; col: VariableCollection; })
    => Promise<| { variable: FontFamilyVariable; message: null } | { variable: null; message: string }>;
type SetSizeFn = (opts: { name: string; val: SizeValue | SizeVariable; col: VariableCollection; })
    => Promise<| { variable: SizeVariable; message: null } | { variable: null; message: string }>;
type SetPercFn = (opts: { name: string; val: PercentageValue | PercentageVariable; col: VariableCollection; })
    => Promise<| { variable: PercentageVariable; message: null } | { variable: null; message: string }>;

const setNumber: SetNumberFn = async ({ name, val, col }) =>
{
    try {
        const variable = await col.createNumberVariable(name, val)
        if (variable) return { variable, message: null }
        throw new Error('setNumber: failed to create number variable')
    } catch (e: any) {
        return { variable: null, message: e.message || String(e) }
    }
}
const setColor: SetColorFn = async ({ name, val, col }) =>
{
    try {
        const variable = await col.createColorVariable(name, val)
        if (variable) return { variable, message: null }
        throw new Error('setColor: failed to create color variable')
    } catch (e: any) {
        return { variable: null, message: e.message || String(e) }
    }
}
const setFont: SetFontFn = async ({ name, val, col }) =>
{
    try {
        const variable = await col.createFontFamilyVariable(name, val)
        if (variable) return { variable, message: null }
        throw new Error('setFont: failed to create font variable')
    } catch (e: any) {
        return { variable: null, message: e.message || String(e) }
    }
}
const setSize: SetSizeFn = async ({ name, val, col }) =>
{
    try {
        const variable = await col.createSizeVariable(name, val)
        if (variable) return { variable, message: null }
        throw new Error('setSize: failed to create size variable')
    } catch (e: any) {
        return { variable: null, message: e.message || String(e) }
    }
}
const setPerc: SetPercFn = async ({ name, val, col }) =>
{
    try {
        const variable = await col.createPercentageVariable(name, val)
        if (variable) return { variable, message: null }
        throw new Error('setPerc: failed to create percentage variable')
    } catch (e: any) {
        return { variable: null, message: e.message || String(e) }
    }
}

const set = { number: setNumber, color: setColor, font: setFont, size: setSize, perc: setPerc }
export const variable = { set } 