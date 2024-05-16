import Types "types";
import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Error "mo:base/Error";
import AssocList "mo:base/AssocList";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";

shared ({ caller = initializer }) actor class AgriiUser() = this {
  type Permission = Types.Permission;
  type Role = Types.Role;
  type User = Types.User;

  // access control variables
  private stable var roles : AssocList.AssocList<Principal, Role> = List.nil();
  private stable var role_requests : AssocList.AssocList<Principal, Role> = List.nil();
  
  var user = HashMap.HashMap<Principal, User>(0, Principal.equal, Principal.hash);

  private stable var userEntries : [(Principal, User)] = [];

  system func preupgrade() {
    userEntries := Iter.toArray(user.entries());
  };

  system func postupgrade() {
    user :=HashMap.fromIter<Principal, User>(userEntries.vals(), 0, Principal.equal, Principal.hash);
  };

  //-----------------------------------------Access control implimentation---------------------------------------------

  // determine if a principal has a role with permissions
  func has_permission(pal : Principal, perm : Permission) : Bool {
    let role = get_role(pal);
    switch (role, perm) {
      case (? #owner or ? #user, _) true;
      case (? #authorized, #lowest) true;
      case (_, _) false;
    };
  };

  func principal_eq(a : Principal, b : Principal ) : Bool {
    return a == b;
  };

  func get_role(pal : Principal) : ?Role {
    if (pal == initializer) {
      ? #owner;
    } else {
      AssocList.find<Principal, Role>(roles, pal, principal_eq);
    };
  };

  // rejected unauthorized user identities
  func require_permission(pal : Principal, perm : Permission) : async () {
    if (has_permission(pal, perm) == false) {
      throw Error.reject("unathrotized");
    };
  };

  public shared ({ caller }) func my_role() : async Text {
   let role = get_role(caller);
   switch (role) {
     case (null) {
        return "Unauthenticated";
      };
      case (? #owner) {
        return "Owner";
      };
      case (? #user) {
        return "User";
      };
      case (? #authorized) {
        return "Authorized User";
      };
    };
  }; 

  func isAuthorized(pal : Principal) : Bool {
    let role = get_role(pal);
    switch (role) {
      case (? #owner or ? #user or ? #authorized) true;
      case (_) false;
    };
  };

  func isUser(pal : Principal) : Bool {
    let role = get_role(pal);
    switch (role) {
      case (? #owner or ? #user) true;
      case (_) false;
    };
  };

  // assign a new role to a principal
  public shared ({ caller }) func assign_role(assignee : Principal, new_role : ?Role) : async () {
    await require_permission(caller, #assign_role);

    switch new_role {
      case (? #owner) {
        throw Error.reject("Cannot assign anyone to be the owner");
        };
      case (_) {};
      };
      if (assignee == initializer) {
        throw Error.reject("Cannot assign a role to the caniser owner")
      };
      roles := AssocList.replace<Principal, Role>(roles, assignee, principal_eq, new_role).0;
      role_requests := AssocList.replace<Principal, Role>(role_requests, assignee, principal_eq, null).0;
  };

  public shared ({ caller }) func getAllUsers() : async [(Principal, Role)] {
    List.toArray(roles);
  };

  public shared ({ caller }) func addAgriiUser(agriiUser : User) : async () {
    assert (isUser(caller) or caller == agriiUser.principal);
    user.put(agriiUser.principal, agriiUser);
  };

  public shared query ({ caller }) func getAllAgriiiUsers() : async [User] {
    assert (isUser(caller) or isAuthorized(caller));
    return Iter.toArray(user.vals());
  };

};
