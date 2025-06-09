import Types "types";
import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Error "mo:base/Error";
import AssocList "mo:base/AssocList";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";

shared ({ caller = initializer }) actor class InvAdmin() = this {

// import Types from a module
type Permission = Types.Permission;
type Role = Types.Role;
type Staff = Types.Staff;

//Access control variables
private stable var roles : AssocList.AssocList<Principal, Role> = List.nil();
private stable var role_requests : AssocList.AssocList<Principal, Role> = List.nil();

var staff = HashMap.HashMap<Principal, Staff>(0, Principal.equal, Principal.hash);

private stable var staffEntries : [(Principal, Staff)] = [];

system func preupgrade() {
       
        staffEntries := Iter.toArray(staff.entries());
    };

    system func postupgrade() {
        staff := HashMap.fromIter<Principal, Staff>(staffEntries.vals(), 0, Principal.equal, Principal.hash);
    };

  //-----------------------------------------Access control implimentation---------------------------------------------

    // Determine if a principal has a role with permissions
    func has_permission(pal : Principal, perm : Permission) : Bool {
        let role = get_role(pal);
        switch (role, perm) {
            case (? #owner or ? #admin, _) true;
            case (? #authorized, #lowest) true;
            case (_, _) false;
        };
    };

    func principal_eq(a : Principal, b : Principal) : Bool {
        return a == b;
    };

    func get_role(pal : Principal) : ?Role {
        if (pal == initializer) {
            ? #owner;
        } else {
            AssocList.find<Principal, Role>(roles, pal, principal_eq);
        };
    };

    // Reject unauthorized user identities
    func require_permission(pal : Principal, perm : Permission) : async () {
        if (has_permission(pal, perm) == false) {
            throw Error.reject("unauthorized");
        };
    };

    public shared query ({ caller }) func my_role() : async Result.Result<Role, Text> {
        let role = get_role(caller);
        switch (role) {
            case (null) {
                return #err ("no role found");
            };
            case (? value) {
                return #ok (value);
            };
            
        };
    };

    func isAuthorized(pal : Principal) : Bool {
        let role = get_role(pal);
        switch (role) {
            case (? #owner or ? #admin or ? #staff) true;
            case (_) false;
        };
    };

    func isAdmin(pal : Principal) : Bool {
        let role = get_role(pal);
        switch (role) {
            case (? #owner or ? #admin) true;
            case (_) false;
        };
    };

    // Assign a new role to a principal
    public shared ({ caller }) func assign_role(assignee : Principal, new_role : ?Role) : async () {
        await require_permission(caller, #assign_role);

        switch new_role {
            case (? #owner) {
                throw Error.reject("Cannot assign anyone to be the owner");
            };
            case (_) {};
        };
        if (assignee == initializer) {
            throw Error.reject("Cannot assign a role to the canister owner");
        };
        roles := AssocList.replace<Principal, Role>(roles, assignee, principal_eq, new_role).0;
        role_requests := AssocList.replace<Principal, Role>(role_requests, assignee, principal_eq, null).0;
    };

    public shared ({ caller }) func getAllAdmins() : async [(Principal, Role)] {
        List.toArray(roles);
    };

    public shared ({ caller }) func addStaffMember(staffMember : Staff) : async () {
        assert (isAdmin(caller) or caller == staffMember.principal);
        staff.put(staffMember.principal, staffMember);
    };

    public shared query ({ caller }) func getAllStaffMembers() : async [Staff] {
        assert (isAdmin(caller) or isAuthorized(caller));
        return Iter.toArray(staff.vals());
    };

    public shared query ({ caller }) func getApprovedStaff() : async [Staff] {
        assert (isAdmin(caller) or isAuthorized(caller));
        let verifiedStaff = Buffer.Buffer<Staff>(0);
        for (staffMember in staff.vals()) {
            if (staffMember.approved == true) {
                verifiedStaff.add(staffMember);
            };
        };
        return Buffer.toArray<Staff>(verifiedStaff);
    };

    public shared query ({ caller }) func getUnapprovedStaff() : async [Staff] {
        assert (isAdmin(caller) or isAuthorized(caller));
        let unverifiedStaff = Buffer.Buffer<Staff>(0);
        for (staffMember in staff.vals()) {
            if (staffMember.approved == false) {
                unverifiedStaff.add(staffMember);
            };
        };
        return Buffer.toArray<Staff>(unverifiedStaff);
    };

    public shared ({ caller }) func deleteStaffMember(id : Principal) : async Bool {
        assert (isAdmin(caller));
        staff.delete(id);
        return true;
    };

    public shared ({ caller }) func updateStaffMember(staffMember : Staff) : async () {
        assert (isAdmin(caller) or caller == staffMember.principal);
        staff.put(staffMember.principal, staffMember);
    };

    public shared query ({ caller }) func getStaffMember(id : Principal) : async Result.Result<Staff, Text> {
        assert (isAdmin(caller) or caller == id);
        switch (staff.get(id)) {
            case (null) {
                return #err("Invalid result ID");
            };
            case (?result) {
                return #ok(result);
            };
        };
    };
};
