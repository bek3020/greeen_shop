import { useReduxSelector } from "../../hooks/useRedux";
import AuthorizationModal from "./authorization";

const Modol = () => {
  const { authorizationModalVisiblity } = useReduxSelector(
    (state) => state.modal
  );

  return (
    <>
      {authorizationModalVisiblity && <AuthorizationModal />}
    </>
  );
};

export default Modol;
