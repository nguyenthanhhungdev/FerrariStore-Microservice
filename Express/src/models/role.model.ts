import roleModel from "../configs/role.json"

class Role {
    private readonly role: { roles: { name: string }[] };
    constructor() {
        this.role = roleModel
    }

    getRoleByName = (name: string) => {
        return this.role.roles.find((role: { name: string }) => role.name === name)
    }

    getRole = () => {
        return this.role
    }

}

export default Role;