// -- 
//  Collection - Private Helpers
// --

type _Collection_SetByName_Opt  = { name: string }
type _Collection_GetById_Opt    = { id: string }
type _Collection_GetByName_Opt  = { name: string }
type _Collection_GetDefault_Opt = {}
type _Collection_DelById_Opt    = { id: string }
type _Collection_GetAll_Opt     = {}

type _Collection_SetByName_Res  = { ok: true;  collection: VariableCollection }   | { ok: false; collection: undefined }
type _Collection_GetById_Res    = { ok: true;  collection: VariableCollection }   | { ok: false; collection: undefined }
type _Collection_GetByName_Res  = { ok: true;  collection: VariableCollection }   | { ok: false; collection: undefined }
type _Collection_GetDefault_Res = { ok: true;  collection: VariableCollection }   | { ok: false; collection: undefined }
type _Collection_DelById_Res    = { ok: true;  collection: VariableCollection }   | { ok: false; collection: undefined }
type _Collection_GetAll_Res     = { ok: true;  collection: VariableCollection[] } | { ok: false; collection: undefined }

type _Collection_SetByName_Fn   = (options: _Collection_SetByName_Opt)  => Promise<_Collection_SetByName_Res>
type _Collection_GetById_Fn     = (options: _Collection_GetById_Opt)    => Promise<_Collection_GetById_Res>
type _Collection_GetByName_Fn   = (options: _Collection_GetByName_Opt)  => Promise<_Collection_GetByName_Res>
type _Collection_GetDefault_Fn  = (options: _Collection_GetDefault_Opt) => Promise<_Collection_GetDefault_Res>
type _Collection_DelById_Fn     = (options: _Collection_DelById_Opt)    => Promise<_Collection_DelById_Res>
type _Collection_GetAll_Fn      = (options: _Collection_GetAll_Opt)     => Promise<_Collection_GetAll_Res>

// -- 
//  Collection - Public Api
// --

type Collection_SetByName_Opt   = { name: string; fallback: 'if_exist_return_undefined' | 'if_exist_return_existing' }
type Collection_GetByName_Opt   = { name: string; fallback: 'if_notExist_return_undefined' | 'if_notExist_return_newOne' }

type Collection_SetByName_Res   = { ok: true; collection: VariableCollection } | { ok: false; collection: undefined }
type Collection_GetByName_Res   = { ok: true; collection: VariableCollection } | { ok: false; collection: undefined }

type Collection_SetByName_Fn    = (options:  Collection_SetByName_Opt) => Promise< Collection_SetByName_Res>
type Collection_GetByName_Fn    = (options:  Collection_GetByName_Opt) => Promise< Collection_GetByName_Res>

// -- 
//  Variable - Private Helpers
// --

type _Variable_SetNumber_Opt    = { name: string, value: number | NumberVariable, collection: VariableCollection}
type _Variable_SetColor_Opt     = { name: string, value: string | ColorVariable, collection: VariableCollection }
type _Variable_SetFont_Opt      = { name: string, value: string | FontFamilyVariable, collection: VariableCollection }
type _Variable_SetSize_Opt      = { name: string, value: SizeValue | SizeVariable, collection: VariableCollection }
type _Variable_SetPercent_Opt   = { name: string, value: number | PercentageVariable, collection: VariableCollection }
type _Variable_GetByName_Opt    = { name: string, collection: VariableCollection }
type _Variable_GetById_Opt      = { id: VariableId, collection: VariableCollection }
type _Variable_DelByName_Opt    = { name: string, collection: VariableCollection }
type _Variable_DelById_Opt      = { id: VariableId, collection: VariableCollection }
type _Variable_DelAll_Opt       = { collection: VariableCollection }
type _Variable_GetAll_Opt       = { collection: VariableCollection }

type _Variable_SetNumber_Res    = { ok: true; variable: Variable }   | { ok: false; variable: undefined }
type _Variable_SetColor_Res     = { ok: true; variable: Variable }   | { ok: false; variable: undefined }
type _Variable_SetFont_Res      = { ok: true; variable: Variable }   | { ok: false; variable: undefined }
type _Variable_SetSize_Res      = { ok: true; variable: Variable }   | { ok: false; variable: undefined }
type _Variable_SetPercent_Res   = { ok: true; variable: Variable }   | { ok: false; variable: undefined }
type _Variable_GetByName_Res    = { ok: true; variable: Variable }   | { ok: false; variable: undefined }
type _Variable_GetById_Res      = { ok: true; variable: Variable }   | { ok: false; variable: undefined }
type _Variable_DelByName_Res    = { ok: true; variable: Variable }   | { ok: false; variable: undefined }
type _Variable_DelById_Res      = { ok: true; variable: Variable }   | { ok: false; variable: undefined }
type _Variable_DelAll_Res       = { ok: true; variable: Variable[] } | { ok: false; variable: undefined }
type _Variable_GetAll_Res       = { ok: true; variable: Variable[] } | { ok: false; variable: undefined }

type _Variable_SetNumber_Fn     = (options: _Variable_SetNumber_Opt)  => Promise<_Variable_SetNumber_Res>
type _Variable_SetColor_Fn      = (options: _Variable_SetColor_Opt)   => Promise<_Variable_SetColor_Res>
type _Variable_SetFont_Fn       = (options: _Variable_SetFont_Opt)    => Promise<_Variable_SetFont_Res>
type _Variable_SetSize_Fn       = (options: _Variable_SetSize_Opt)    => Promise<_Variable_SetSize_Res>
type _Variable_SetPercent_Fn    = (options: _Variable_SetPercent_Opt) => Promise<_Variable_SetPercent_Res>
type _Variable_GetByName_Fn     = (options: _Variable_GetByName_Opt)  => Promise<_Variable_GetByName_Res>
type _Variable_GetById_Fn       = (options: _Variable_GetById_Opt)    => Promise<_Variable_GetById_Res>
type _Variable_DelByName_Fn     = (options: _Variable_DelByName_Opt)  => Promise<_Variable_DelByName_Res>
type _Variable_DelById_Fn       = (options: _Variable_DelById_Opt)    => Promise<_Variable_DelById_Res>
type _Variable_DelAll_Fn        = (options: _Variable_DelAll_Opt)     => Promise<_Variable_DelAll_Res>
type _Variable_GetAll_Fn        = (options: _Variable_GetAll_Opt)     => Promise<_Variable_GetAll_Res>