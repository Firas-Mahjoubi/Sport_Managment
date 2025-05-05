const AppConfigs = {
	default: {
		useFirebase: true,
		siteHomeURL: null,
		siteLogoURL: null,
		pitchCenterADURL: null,
		thumbnailWidth: 320,	// height calculated from proportions
	},
	coatchingfutsal: {
		useFirebase: true,
		siteHomeURL: '/',
		siteLogoURL: '/TacticsBoard/ext/cf_logo.png',
		signInURL: '/Account/LoginRegister',
		signOutURL: '/Account/LogOff',
		getUserURL: '/Account/GetUser',
		saveURL: '/TacticsBoard/SaveTactic',
		loadURL: '/TacticsBoard/TacticsLoad',
		loadSharedURL: '/TacticsBoard/TacticsLoadShared',
		listURL: '/TacticsBoard/GetTacticsList',
		deleteURL: '/TacticsBoard/DeleteTactic',
		thumbnailWidth: 1280,	// height calculated from proportions
	}
}

export default AppConfigs;