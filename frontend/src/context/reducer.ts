import { ActionType, IUser, IInitialData } from "../types/index";

export const reducer = (state: IInitialData, action: ActionType) => {
  switch (action.type) {
    //
    case "USER_LOGIN": {
      if (action?.payload) {
        const role = action.payload?.isDoctor ? "doctor" : "patient";
        const user = {
          name: action.payload?.name,
          email: action.payload?.email,
          _id: action.payload?._id,
          joined: action.payload?.createdOn,
        };

        return { ...state, isLogin: true, role, user };
      }
      return state;
    }

    case "USER_LOGOUT": {
      return { ...state, isLogin: false, role: null, user: {} };
    }
    case "CHANGE_THEME": {
      return { ...state, darkTheme: !state.darkTheme };
    }
    case "CHANGE_NAME": {
      console.log("changing name");
      if (
        typeof action.payload === "string" &&
        action.payload.trim().length < 20 &&
        action.payload.trim().length > 3
      ) {
        return { ...state, name: action.payload };
      } else {
        return state;
      }
    }

    default: {
      return state;
    }
  }
};
