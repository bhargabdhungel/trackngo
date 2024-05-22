import { useSession, signIn, signOut } from "next-auth/react";

const useAuth = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const signInUser = () => {
    signIn("google");
  };

  const signOutUser = () => {
    signOut();
  };

  return {
    user: session?.user,
    loading,
    signIn: signInUser,
    signOut: signOutUser,
  };
};

export default useAuth;
