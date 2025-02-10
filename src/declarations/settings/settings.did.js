export const idlFactory = ({ IDL }) => {
  const AcCategoryRequest = IDL.Record({
    'name' : IDL.Text,
    'acTypeId' : IDL.Text,
  });
  const AcTypeRequest = IDL.Record({ 'name' : IDL.Text });
  const Role = IDL.Variant({
    'admin' : IDL.Null,
    'owner' : IDL.Null,
    'staff' : IDL.Null,
  });
  const Time = IDL.Int;
  const AcCategory = IDL.Record({
    'id' : IDL.Text,
    'timeStamp' : Time,
    'name' : IDL.Text,
    'createdBy' : IDL.Text,
    'acTypeId' : IDL.Text,
    'isDelete' : IDL.Bool,
  });
  const AcType = IDL.Record({
    'id' : IDL.Text,
    'timeStamp' : Time,
    'name' : IDL.Text,
    'createdBy' : IDL.Text,
    'isDelete' : IDL.Bool,
  });
  const Result_3 = IDL.Variant({ 'ok' : AcCategory, 'err' : IDL.Text });
  const Result_2 = IDL.Variant({ 'ok' : AcType, 'err' : IDL.Text });
  const Country = IDL.Record({
    'region' : IDL.Text,
    'code' : IDL.Text,
    'name' : IDL.Text,
    'callingCode' : IDL.Text,
    'currency' : IDL.Text,
  });
  const Result_1 = IDL.Variant({ 'ok' : Country, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : Role, 'err' : IDL.Text });
  const Settings = IDL.Service({
    'addAcCategory' : IDL.Func([AcCategoryRequest], [], []),
    'addAcType' : IDL.Func([AcTypeRequest], [], []),
    'assign_role' : IDL.Func([IDL.Principal, IDL.Opt(Role)], [], []),
    'deleteAcCategory' : IDL.Func([AcCategory], [], []),
    'deleteAcType' : IDL.Func([AcType], [], []),
    'getAcCategoryLatest' : IDL.Func([IDL.Text], [Result_3], ['query']),
    'getAcCategoryVersions' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(AcCategory)],
        ['query'],
      ),
    'getAcTypeLatest' : IDL.Func([IDL.Text], [Result_2], ['query']),
    'getAcTypeVersions' : IDL.Func([IDL.Text], [IDL.Vec(AcType)], ['query']),
    'getAllCountries' : IDL.Func([], [IDL.Vec(Country)], ['query']),
    'getAllLatestAcCategories' : IDL.Func([], [IDL.Vec(AcCategory)], ['query']),
    'getAllLatestAcTypeCategories' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(AcCategory)],
        ['query'],
      ),
    'getAllLatestAcTypeCategoriesByName' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(AcCategory)],
        ['query'],
      ),
    'getAllLatestAcTypes' : IDL.Func([], [IDL.Vec(AcType)], ['query']),
    'getCategoryByName' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'getCountryByCode' : IDL.Func([IDL.Text], [Result_1], ['query']),
    'getCountryByName' : IDL.Func([IDL.Text], [Result_1], ['query']),
    'getCountryByRegion' : IDL.Func([IDL.Text], [IDL.Vec(Country)], ['query']),
    'isAdmin' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'isAuthorized' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'my_role' : IDL.Func([], [Result], ['query']),
    'updateAcCategory' : IDL.Func([AcCategory], [], []),
    'updateAcType' : IDL.Func([AcType], [], []),
  });
  return Settings;
};
export const init = ({ IDL }) => { return []; };
