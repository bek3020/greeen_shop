import { useReduxSelector } from "../../hooks/useRedux"
import AuthorizationModal from "./authorization"

const Modol = () => {
      const {authorizationModalVisibility} = useReduxSelector(state => state.modal)
  return (
      <>
        {authorizationModalVisibility && <AuthorizationModal/>}
    </>
  )
}

export default Modol