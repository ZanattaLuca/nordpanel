export {};

declare global {
  interface Window {
    nordvpn: {
      getCountries: () => Promise<string>;
      account: () => Promise<string>;
    };
  }
}