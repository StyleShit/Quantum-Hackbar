browser.devtools.panels.create(
		"Quantum Hackbar",          // title
		"/icons/icon.png",          // icon
		"/devtools/panel.html"      // content
	).then((newPanel) => {
		// newPanel.onShown.addListener(initialisePanel);
		// newPanel.onHidden.addListener(unInitialisePanel);
});