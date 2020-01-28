(function () {
    var $usernameFld, $passwordFld;
    var $firstNameFld, $lastNameFld, $roleFld;
    var $tbody;
    var userService = new AdminUserServiceClient();
    var currentUserId = -1;
    $(main);

    function main() {
        $usernameFld = $("#usernameFld");
        $passwordFld = $("#passwordFld");
        $firstNameFld = $("#firstNameFld");
        $lastNameFld = $("#lastNameFld");
        $roleFld = $("#roleFld");
        $tbody = $("tbody");
        userService.findAllUsers().then(renderUsers);


        $searchBtn = $("#searchBtn");
        $createBtn1 = $("#createBtn");
        $updateBtn = $("#updateBtn");

        $createBtn1.click(createUser);
        $updateBtn.click(updateUser);
        $searchBtn.click(filterUsers);
    }

    function createUser() {
        const username = $usernameFld.val();
        const password = $passwordFld.val();
        const firstname = $firstNameFld.val();
        const lastname = $lastNameFld.val();
        const role = $roleFld.val();
        clearAll();
        console.log(username);

        userService.createUser( {username: username,
            password:password, firstname:firstname,lastname:lastname,role:role})
            .then(newUser => {
                userService.findAllUsers().then(renderUsers);
            })
    }
    function findAllUsers() {
        return userService.findAllUsers().then(renderUsers);
    }

    function filterUsers() {
        const username = $usernameFld.val();
        const firstname = $firstNameFld.val();
        const lastname = $lastNameFld.val();
        const role = $roleFld.val();
        if (!username) {
            clearAll();
            return findAllUsers();
        }
        return userService.findAllUsers().then(data => {
            clearAll();
            const result = data.filter((value) => value.username === username &&
                                                  (! firstname || value.firstname === firstname)
            && (!lastname || value.lastname === lastname)
            && (!role || value.role === role));
            renderUsers(result);
        });

    }

    function findUserById(userId) {
        userService.findUserById(userId).then(data => {
            renderUser(data);})
    }

    function deleteUser() {
        var button;
        var index = -1;
        button = $(event["currentTarget"]);
        var current_tr =  button.parents(".wbdv-template.wbdv-user");
        var curr_username = current_tr.find('.wbdv-username').text();
        userService.findAllUsers().then((users) => {
            for (let i = 0; i<users.length; i++) {
                if (users[i].username === curr_username) {
                    console.log(users[i]._id);
                    index = users[i]._id;
                    userService.deleteUser(index)
                        .then(response => {
                            userService.findAllUsers().then(renderUsers);
                        })
                }
            }
        });
    }

    function selectUser() {
        var button;
        button = $(event["currentTarget"]);
        var current_tr =  button.parents(".wbdv-template.wbdv-user");
        var curr_username = current_tr.find('.wbdv-username').text();
        userService.findAllUsers().then( (users) => {
            for (let i = 0; i<users.length; i++) {
                if (users[i].username === curr_username) {
                    currentUserId =  users[i]._id;
                }
            }
        });
        $('#usernameFld').val(curr_username);
        var curr_password = current_tr.find('.wbdv-password').text();
        $('#passwordFld').val(curr_password);
        var curr_first_name = current_tr.find('.wbdv-first-name').text();
        $('#firstNameFld').val(curr_first_name);
        var curr_last_name = current_tr.find('.wbdv-last-name').text();
        $('#lastNameFld').val(curr_last_name);
        var curr_role = current_tr.find('.wbdv-role').text();
        $('#roleFld').val(curr_role);
    }

    function updateUser() {
        const username = $usernameFld.val();
        const password = $passwordFld.val();
        const firstname = $firstNameFld.val();
        const lastname = $lastNameFld.val();
        const role = $roleFld.val();

        clearAll();

        userService.updateUser(currentUserId, {username: username,
        password:password, firstname:firstname,lastname:lastname,role:role})
            .then(newUser => {
                userService.findAllUsers().then(renderUsers);
            })
    }
    function renderUser(user) {
        $tbody.empty();
        var tr;
            tr = $('<tr class="wbdv-template table-warning wbdv-user"/>');
            tr.append("<td class='wbdv-username text-danger'>" + user.username + '</td>');
            tr.append("<td class='wbdv-password text-danger '>" + user.password + "</td>");
            tr.append("<td class='wbdv-first-name text-danger'>" + user.firstname + "</td>");
            tr.append("<td class='wbdv-last-name text-danger'>" + user.lastname + "</td>");
            tr.append("<td class='wbdv-role text-danger'>" + user.role + "</td>");
            tr.append("<td class='wbdv-actions text-danger'><span class='float-right'>"
                      + "<i class='fa-2x fa fa-times wbdv-remove danger'></i>"
                      + "<i class='pl-3 fa-2x fa fa-pencil wbdv-edit primary'></i></span></td>");
            $tbody.append(tr);

        $('.wbdv-remove').click(deleteUser);
        $('.wbdv-edit').click(selectUser);
    }

    function renderUsers(users) {
        $tbody.empty();
        var tr;
        for (let i = 0; i < users.length; i++) {
            tr = $('<tr class="wbdv-template table-warning wbdv-user"/>');
            tr.append("<td class='wbdv-username text-danger'>" + users[i].username + '</td>');
            tr.append("<td class='wbdv-password text-danger '>" + users[i].password + "</td>");
            tr.append("<td class='wbdv-first-name text-danger'>" + users[i].firstname + "</td>");
            tr.append("<td class='wbdv-last-name text-danger'>" + users[i].lastname + "</td>");
            tr.append("<td class='wbdv-role text-danger'>" + users[i].role + "</td>");
            tr.append("<td class='wbdv-actions text-danger'><span class='float-right'>"
                      + "<i class='fa-2x fa fa-times wbdv-remove danger'></i>"
                      + "<i class='pl-3 fa-2x fa fa-pencil wbdv-edit primary'></i></span></td>");
            $tbody.append(tr);
        }

        $('.wbdv-remove').click(function(){
            deleteUser();
        });
        $('.wbdv-edit').click(function(){
            selectUser();
        });
    }
    function clearAll() {
        $usernameFld.val("");
        $passwordFld.val("");
        $firstNameFld.val("");
        $lastNameFld.val("");
        $roleFld.val("FACULTY");
    }
})();
