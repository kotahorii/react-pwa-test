import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { Auth } from "./components/pages/Auth";
import { Feed } from "./components/pages/Feed";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";

const App = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid!,
            photoUrl: authUser.photoURL!,
            displayName: authUser.displayName!,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);
  return <>{user.user.uid ? <Feed /> : <Auth />}</>;
};

export default App;
