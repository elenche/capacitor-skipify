# Capacitor x Skipify Integration

This is a demo app showing the integration of Skipify (formerly GoCartPay) SDK integration with a CapacitorJS application (built with Ionic and Angular).
Implementing only the `Skipify Button` feature.

Successfully tested on platforms: `Web`, `Android`, `iOS`.

## Documentation

Use the former GoCartPay Staging URL and documentation [(link)](https://docs.gocartpay.com/docs/test-data).

## Features

- Dynamically initializing Skipify SDK with a MerchantID
- Rendering the `Pay with Skipify` button
- Processing payments

## Usage

1. Add your Skipify Merchant ID to the property `SkipifyMerchantID` in the file `src/environments/environment.ts`  
   e.g.: `SkipifyMerchantID: 'MERCHANT_ID'`

2. Add the following domains for whitelisting in `Skipify Merchant Portal -> Merchant Domains` [(link)](https://admin-staging.gocartpay.com/Overview/merchant-domains):

   - `http://localhost:8100` - for serving in browser
   - `http://localhost` - for mobile Android app
   - `capacitor://localhost` - for mobile iOS app. **Note: this isn't supported yet**

3. Run the app (see steps below)

4. Click the `Pay with Skipify` button and start the payment process

Use test users and credit card numbers from the [Skipify Docs](https://docs.gocartpay.com/docs/test-data).

## Installation

1. Clone or fork the project
2. Make sure your environment is ready to run the mobile apps [(link)](https://capacitorjs.com/docs/getting-started/environment-setup)
3. Run `npm install` to install all dependencies

## Testing

### Testing in browser

`ionic serve`

### Testing on device

**Note:** if testing on a simulator, ensure you have simulators installed on Android Studio or XCode.

Replace **platform** with _android_ or _ios_:

1. Run via Android Studio or XCode:

   `ionic cap build <platform>`  
    After the build finishes, Android Studio or XCode will be automatically opened and you can run the app through them.

2. Run via terminal:

   `ionic cap run <platform>`

   This should give you a list of connected devices or simulators to run the app on.

   If you want to run the app with `live reload` capabilities, run the following command:

   `ionic capacitor run <platform> --livereload`

### Inspecting the network traffic

`Android:` Open `chrome://inspect/#devices` in browser -> click on the connected device -> Network tab

`iOS:` Safari -> Developer tab (enable it if it's not there) -> Simulator/Device name -> Localhost link -> Network tab

## Make it your own

All features are coded in `HomePage` for ease of use.



The default SDK used is Skipify Production. You can change it to Staging by uncommenting line 30 in `home.page.ts`:
```
  private loadSkipifySDK() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    // Staging:
    // script.src = 'https://api-staging.gocartpay.com/merchants/' + environment.SkipifyMerchantID + '/sdk';
	
    // Production:
    script.src = 'https://api.gocartpay.com/merchants/' + environment.SkipifyMerchantID + '/sdk';
    
    document.body.appendChild(script);
    script.addEventListener('load', () => {
      console.log('[Skipify] Loaded SDK');
      this.renderSkipifyButton();
    });
  }
```
