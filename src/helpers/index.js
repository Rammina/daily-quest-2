// Helper functions
export const dismissModalHandler = (modalsOpened, setStateCallback) => {

  		const modalsOpened = _.mapValues(modalsOpened, () => false)

    	setStateCallback({      
   			modalsOpened
    	});
}