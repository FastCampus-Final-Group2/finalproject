import { myMenusService } from "./myMenus";
import { usernameService } from "./username";

const localStorage = {
  myMenus: myMenusService,
  username: usernameService,
};

export default localStorage;
