module {
        public type UserRequest = {
        principalId: ?Principal; //? makes it nullable
        firstName: Text;
        lastName: Text;
        email: Text; 
    }; 
    
        public type User = {
        id: Text;
        principalId: ?Principal; //? makes it nullable
        firstName: Text;
        lastName: Text;
        email: Text; 
    }; 
};