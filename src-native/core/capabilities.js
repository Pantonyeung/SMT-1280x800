export const CAPABILITY_PROFILES = Object.freeze({
  smt: Object.freeze({
    profile: 'smt',
    production: true,
    physicalPrint: true,
    createPrintJob: true,
    mobileSafeArea: false,
  }),
  mobile: Object.freeze({
    profile: 'mobile',
    production: true,
    physicalPrint: false,
    createPrintJob: true,
    mobileSafeArea: true,
  }),
  wide: Object.freeze({
    profile: 'wide',
    production: true,
    physicalPrint: false,
    createPrintJob: true,
    mobileSafeArea: false,
  }),
  qa: Object.freeze({
    profile: 'qa',
    production: false,
    physicalPrint: false,
    createPrintJob: false,
    mobileSafeArea: true,
  }),
});

export function getCapabilities(profile) {
  const capabilities = CAPABILITY_PROFILES[profile];
  if (!capabilities) throw new Error(`Unknown capability profile: ${profile}`);
  return capabilities;
}
