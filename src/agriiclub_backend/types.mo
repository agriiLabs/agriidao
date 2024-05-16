module {
    
    public type Role = {        
        #owner;
        #user;        
        #authorized;    
    };

    public type Permission = {
        #assign_role;        
        #lowest;
    };

    public type User = {
        principal : Principal;
        role : ?Role;        
        suspended : Bool;
        created : Int;
    };
};