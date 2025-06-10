module {
        public type UserRequest = {
        principalId: ?Principal; 
        firstName: Text;
        lastName: Text;
        email: Text; 
    }; 
    
        public type User = {
        id: Text;
        principalId: ?Principal; 
        firstName: Text;
        lastName: Text;
        email: Text; 
    }; 
};