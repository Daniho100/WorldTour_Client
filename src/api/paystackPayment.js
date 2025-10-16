export const loadPaystackScript = (callback) => {
  // Check if the script is already loaded
  if (document.querySelector('script[src="https://js.paystack.co/v1/inline.js"]')) {
    callback(); // If script is already loaded, just run the callback
    return;
  }

  // Load the Paystack script only if not already loaded
  const script = document.createElement('script');
  script.src = 'https://js.paystack.co/v1/inline.js';
  script.onload = callback;
  document.body.appendChild(script);
};


export const payWithPaystack = (email, amount, reference, onSuccess, onClose) => {
  loadPaystackScript(() => {
    const publicKey = "pk_test_6bf08fd69fa0d344f3e8b2a4008fcb7466d5ca1f";

    const handler = window.PaystackPop.setup({
      key: publicKey, 
      reference: reference, // Ensure that your custom reference is used here
      email: email,
      amount: amount * 100, // Convert Naira to kobo
      currency: 'NGN',
      payment_method: 'card', // Specify that card payment should be auto-selected
      callback: (response) => {
        if (response.status === 'success') {
          // Call onSuccess when payment succeeds
          onSuccess(response.reference);
        } else {
          // If payment failed, you can navigate to the unsuccessful page
          onClose();
        }
      },
      onClose: () => {
        // Handle payment window close
        onClose(); // Call onClose to navigate to unsuccessful page
      }
    });

    handler.openIframe(); // Open Paystack payment modal
  });
};
