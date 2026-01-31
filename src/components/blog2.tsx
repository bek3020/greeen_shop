import React from "react";
import { useReduxDispatch, useReduxSelector } from "../hooks/useRedux";
import { setAuthorizationModalVisibility } from "../redux/modol-store";

const Blog2: React.FC = () => {
  const dispatch = useReduxDispatch();
  const { user } = useReduxSelector((state) => state.user);

  const openAuthModal = () => {
    dispatch(setAuthorizationModalVisibility());
  };

  if (user) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-[#46A358]/5 to-white font-sans overflow-hidden">
      <div className="w-[95%] max-w-[1200px] mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Would you like to join newsletters?
          </h2>

          <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-8 px-4">
            In order to start receiving our news, all you have to do is enter your email address. 
            Everything else will be taken care of by us. We will send you emails containing information 
            about game. We don't spam.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-8">
            <input
              type="email"
              placeholder="enter your email address..."
              className="w-full sm:flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#46A358] text-gray-700"
            />
            <button
              onClick={openAuthModal}
              className="w-full sm:w-auto bg-[#46a358] hover:bg-[#3d8f4d] text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-lg shadow-green-500/30"
            >
              Join
            </button>
          </div>

          <p className="text-gray-400 text-sm">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Blog2;