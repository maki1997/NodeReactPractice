import {getAllUsers} from "./controller/user/getAllUsers";
import {addUser} from "./controller/user/addUser";
import {getUserById} from "./controller/user/getUserById";
import {deleteUser} from "./controller/user/deleteUser";
import {updateUser} from "./controller/user/updateUser";
import {getAllTeams} from "./controller/team/getAllTeams";
import {addTeam} from "./controller/team/addTeam";
import {getTeamById} from "./controller/team/getTeamById";
import {deleteTeam} from "./controller/team/deleteTeam";
import {updateTeam} from "./controller/team/updateTeam";


export const AppRoutes = [
    {
        path: "/users",
        method: "get",
        action: getAllUsers
    },
    {
        path: "/users/:id",
        method: "get",
        action: getUserById
    },
    {
        path: "/users/:id",
        method: "put",
        action: updateUser
    },
    {
        path: "/users/:id",
        method: "delete",
        action: deleteUser
    },
    {
        path: "/users",
        method: "post",
        action: addUser
    },
    {
        path: "/teams",
        method: "get",
        action: getAllTeams
    },
    {
        path: "/teams/:id",
        method: "get",
        action: getTeamById
    },
    {
        path: "/teams/:id",
        method: "put",
        action: updateTeam
    },
    {
        path: "/teams/:id",
        method: "delete",
        action: deleteTeam
    },
    {
        path: "/teams",
        method: "post",
        action: addTeam
    }
];
