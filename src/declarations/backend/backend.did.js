export const idlFactory = ({ IDL }) => {
  const Role = IDL.Variant({
    'admin' : IDL.Null,
    'owner' : IDL.Null,
    'authorized' : IDL.Null,
    'staff' : IDL.Null,
  });
  const Staff = IDL.Record({
    'created' : IDL.Int,
    'principal' : IDL.Principal,
    'role' : IDL.Opt(Role),
    'fullName' : IDL.Text,
    'email' : IDL.Text,
    'approved' : IDL.Bool,
    'phone' : IDL.Text,
    'suspended' : IDL.Bool,
  });
  const Role__1 = IDL.Variant({
    'admin' : IDL.Null,
    'owner' : IDL.Null,
    'authorized' : IDL.Null,
    'staff' : IDL.Null,
  });
  const Result = IDL.Variant({ 'ok' : Staff, 'err' : IDL.Text });
  const InvAdmin = IDL.Service({
    'addStaffMember' : IDL.Func([Staff], [], []),
    'assign_role' : IDL.Func([IDL.Principal, IDL.Opt(Role__1)], [], []),
    'deleteStaffMember' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'getAllAdmins' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, Role__1))],
        [],
      ),
    'getAllStaffMembers' : IDL.Func([], [IDL.Vec(Staff)], ['query']),
    'getApprovedStaff' : IDL.Func([], [IDL.Vec(Staff)], ['query']),
    'getStaffMember' : IDL.Func([IDL.Principal], [Result], ['query']),
    'getUnapprovedStaff' : IDL.Func([], [IDL.Vec(Staff)], ['query']),
    'my_role' : IDL.Func([], [IDL.Text], []),
    'updateStaffMember' : IDL.Func([Staff], [], []),
  });
  return InvAdmin;
};
export const init = ({ IDL }) => { return []; };
