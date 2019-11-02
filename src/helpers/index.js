import _ from "lodash";

// Helper functions
export const dismissModalHandler = (modalsOpened, setStateCallback) => {
  modalsOpened = _.mapValues(modalsOpened, () => false);

  setStateCallback({
    modalsOpened
  });
};
