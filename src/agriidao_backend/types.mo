module {
    
    public type Role = {        
        #owner;
        #admin;        
        #staff;
    };

    public type Permission = {
        #assign_role;        
        #lowest;
    };

    public type Staff = {
        fullName : Text;
        email : Text;
        phone : Text;
        role : ?Role;
        approved : Bool;
        principal : Principal;
        suspended : Bool;
        created : Int;
    };
};