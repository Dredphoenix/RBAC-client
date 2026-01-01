
export const PERMISSIONS = {
    USER_READ:"users:read",
    USER_UPDATE:"users:update",
    USER_DELETE:"users:delete",
}

export const ROLE_PERMISSIONS = {
    admin:[
        PERMISSIONS.USER_READ,
        PERMISSIONS.USER_UPDATE,
        PERMISSIONS.USER_DELETE,
    ],
    user:[],
}