import roles  from '../configs/role.json' ;

class Permission {
    private permissions: any[];
    constructor() {
        this.permissions = []
    }

    getPermissionByRoleName = (roleName: string) => {
        const role = roles.roles.find((r) => r.name === roleName)
        return role ? role.permissions : []
    }
}

export default Permission;