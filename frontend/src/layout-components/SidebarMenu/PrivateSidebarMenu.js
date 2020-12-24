import React from "react";
import SidebarMenuListItem from "./SidebarMenuListItem";
const PrivateLink = (role, menu, depth) => {
  //console.log(menu);
  if ("*" === menu.role || menu.role.includes(role)) {
    //console.log(menu);
    return (
      <SidebarMenuListItem
        depth={depth}
        href={menu.to}
        icon={menu.icon}
        key={menu.label}
        label={menu.badge}
        title={menu.label}
      />
    );
  }
};

/*const mapStateToProps = (state) => ({
  auth: state.auth,
});*/

//export default connect(mapStateToProps)(PrivateLink);
export default PrivateLink;
