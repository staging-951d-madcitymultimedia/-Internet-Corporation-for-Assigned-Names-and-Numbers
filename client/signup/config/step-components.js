const stepNameToModuleName = {
	'add-ons': 'add-ons',
	'clone-start': 'clone-start',
	'clone-destination': 'clone-destination',
	'clone-credentials': 'clone-credentials',
	'clone-point': 'clone-point',
	'clone-jetpack': 'clone-jetpack',
	'clone-ready': 'clone-ready',
	'clone-cloning': 'clone-cloning',
	courses: 'courses',
	'creds-confirm': 'creds-confirm',
	'creds-complete': 'creds-complete',
	'creds-permission': 'creds-permission',
	domains: 'domains',
	'domain-only': 'domains',
	'domains-launch': 'domains',
	'domains-store': 'domains',
	'domains-theme-preselected': 'domains',
	'mailbox-domain': 'domains',
	emails: 'emails',
	mailbox: 'emails',
	'from-url': 'import-url',
	/* import-url will eventually replace from-url step. Forgive temporary naming. */
	'import-url': 'import-url-onboarding',
	'intent-screen': 'intent-screen',
	launch: 'launch-site',
	plans: 'plans',
	'plans-new': 'plans',
	'plans-business': 'plans',
	'plans-ecommerce': 'plans',
	'plans-pro': 'plans',
	'plans-starter': 'plans',
	'plans-import': 'plans',
	'plans-launch': 'plans',
	'plans-newsletter': 'plans',
	'plans-link-in-bio': 'plans',
	'plans-personal': 'plans',
	'plans-premium': 'plans',
	'plans-site-selected': 'plans',
	'plans-store-nux': 'plans-atomic-store',
	'select-domain': 'domains',
	site: 'site',
	'rewind-migrate': 'rewind-migrate',
	'rewind-were-backing': 'rewind-were-backing',
	'rewind-form-creds': 'rewind-form-creds',
	'site-or-domain': 'site-or-domain',
	'site-picker': 'site-picker',
	'site-title': 'site-title',
	'site-options': 'site-options',
	'store-options': 'site-options',
	'store-features': 'store-features',
	'site-type-with-theme': 'site-type',
	'starting-point': 'starting-point',
	test: 'test-step',
	themes: 'theme-selection',
	'themes-site-selected': 'theme-selection',
	'template-first-themes': 'theme-selection',
	user: 'user',
	'user-new': 'user',
	'oauth2-user': 'user',
	'oauth2-name': 'user',
	'videopress-site': 'videopress-site',
	'reader-landing': 'reader-landing',
	'p2-details': 'p2-details',
	'p2-site': 'p2-site',
	'p2-get-started': 'p2-get-started',
	'p2-confirm-email': 'p2-confirm-email',
	'p2-complete-profile': 'p2-complete-profile',
	'p2-join-workspace': 'p2-join-workspace',
	'plans-business-monthly': 'plans',
	'plans-ecommerce-monthly': 'plans',
	'plans-personal-monthly': 'plans',
	'plans-premium-monthly': 'plans',
	'design-setup-site': 'design-picker',
	'new-or-existing-site': 'new-or-existing-site',
	'difm-site-picker': 'difm-site-picker',
	'difm-design-setup-site': 'design-picker',
	'difm-options': 'site-options',
	'difm-page-picker': 'page-picker',
	'website-content': 'website-content',
	intent: 'intent',
	'select-site': 'woocommerce-install/select-site',
	'store-address': 'woocommerce-install/step-store-address',
	'business-info': 'woocommerce-install/step-business-info',
	confirm: 'woocommerce-install/confirm',
	transfer: 'woocommerce-install/transfer',
	'social-profiles': 'social-profiles',
};

export function getStepModuleName( stepName ) {
	return stepNameToModuleName[ stepName ] || '';
}

export async function getStepComponent( stepName ) {
	const moduleName = stepNameToModuleName[ stepName ];
	const module = await import(
		/* webpackChunkName: "async-load-signup-steps-[request]" */
		/* webpackInclude: /signup\/steps\/[0-9a-z/-]+\/index\.[j|t]sx$/ */
		/* webpackExclude: /signup\/steps\/[0-9a-z/-]+\/test\/index\.[j|t]sx$/ */
		`calypso/signup/steps/${ moduleName }`
	);
	return module.default;
}
