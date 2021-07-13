const AccessControl = require("accesscontrol");

const adminAccess = {
  "create:any": ["*"],
  "read:any": ["*"],
  "update:any": ["*"],
  "delete:any": ["*"],
};

let grantsObject = {
  admin: {
    profile: adminAccess,
    files: adminAccess,
    file: adminAccess,
  },
  user: {
    profile: {
      "read:own": ["*", "!password", "!_id", "!date"],
      "update:own": ["*"],
    },
  },
};

const roles = new AccessControl(grantsObject);

module.exports = { roles };
