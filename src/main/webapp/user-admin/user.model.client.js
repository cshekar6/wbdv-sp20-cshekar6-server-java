
function User(username, password, firstName, lastName, role ) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.setUsername = setUsername;
    this.getUsername = getUsername;

    this.setRole = setRole;
    this.getRole = getRole;

    function setUsername(username) {
        this.username = username;
    }

    function getUsername() {
        return this.username;
    }

    function setPassword(password) {
        this.password = password;
    }

    function getPassword() {
        return this.password;
    }

    function setFirstName(firstName) {
        this.firstName = firstName;
    }

    function getFirstName() {
        return this.firstName;
    }


    function setLastName(lastName) {
        this.lastName = lastName;
    }

    function getLastName() {
        return this.lastName;
    }

    function setRole(role) {
        this.role = role;
    }

    function getRole() {
        return this.role;
    }
}