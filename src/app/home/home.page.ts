import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

declare let GoCartSDK: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  errorMessage: string = '';

  constructor() { }

  ngOnInit() {
    console.log('Environment is: ', environment);
    if (!environment.SkipifyMerchantID) {
      this.errorMessage = 'Please add your Skipify MerchantID to `src/environments/environment.ts` in order to continue';
    }
    else {
      this.loadSkipifySDK();
    }
  }

  private loadSkipifySDK() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://api-staging.gocartpay.com/merchants/' + environment.SkipifyMerchantID + '/sdk';
    document.body.appendChild(script);
    script.addEventListener('load', () => {
      this.renderSkipifyButton();
    });
  }

  private renderSkipifyButton() {
    new GoCartSDK.Button({
      orderDetailsCallback: async (actions: any) => {
        actions.createOrder({
          lineItems: [],
          subtotal: 1050,
          total: 1050,
          orderId: '12345',
          orderDescription: 'My test order',
          currencyCode: 'USD',
          purchaseDetails: [
            {
              level: 1,
              label: 'Store',
              description: 'My test store'
            },
          ]
        });
      },
      success: (orderId: string, customerInfo: any, shippingInfo: any, billingInfo: any, shippingMethod: any, taxes: any, transactionDetails: any) => {
        console.log('[Skipify] Successfully processed orderID: ', orderId);
        console.log('[Skipify] transactionDetails: ', transactionDetails);
        console.log('[Skipify] customerInfo: ', customerInfo);
        console.log('[Skipify] shippingInfo: ', shippingInfo);
        console.log('[Skipify] billingInfo: ', billingInfo);
        console.log('[Skipify] shippingMethod: ', shippingMethod);
        console.log('[Skipify] taxes: ', taxes);
      },
      error: (orderId: any, errorCode: any, errorMessage: any) => {
        console.warn('[Skipify] Error processing order. Code: ' + errorCode + ' | Message: ' + errorMessage);
      },
      getOrderId: (orderId: string) => {
        console.log('[Skipify] Opened modal for orderID: ', orderId);
      },
      onClose: () => {
        console.log('[Skipify] Closed');
      },
      theme: 'light',
    }).render('skipify-button-wrapper'); // searches the DOM and renders the GoCart button

    console.log('[Skipify] Rendered button');
  }
}
