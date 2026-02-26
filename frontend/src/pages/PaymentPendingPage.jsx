import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Clock, CheckCircle, Home } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const PaymentPendingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id');
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    if (orderId) {
      checkPaymentStatus();
    }
  }, [orderId]);

  const checkPaymentStatus = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/manual-payments/payment-status/${orderId}`);
      setPaymentData(response.data);
    } catch (error) {
      console.error('Error checking payment status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50/50 to-blue-50/50 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full border-2">
        <CardHeader className="text-center bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <Clock className="w-10 h-10 text-yellow-600 animate-pulse" />
            </div>
          </div>
          <CardTitle className="text-3xl">Payment Under Verification</CardTitle>
          <CardDescription className="text-lg mt-2">
            We've received your payment details!
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8 space-y-6">
          <div className="text-center space-y-4">
            <div className="bg-cyan-50 dark:bg-cyan-950/20 p-6 rounded-lg border border-cyan-200 dark:border-cyan-800">
              <p className="text-sm text-muted-foreground mb-2">Order ID</p>
              <p className="text-2xl font-bold text-cyan-600">{orderId || 'N/A'}</p>
            </div>

            {paymentData && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="text-muted-foreground mb-1">Package</p>
                  <p className="font-semibold">{paymentData.package_name}</p>
                </div>
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="text-muted-foreground mb-1">Amount</p>
                  <p className="font-semibold">₹{paymentData.amount}</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800 space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-semibold">What happens next?</p>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li>• Our team will verify your payment within 2-24 hours</li>
                  <li>• You'll receive a confirmation email once verified</li>
                  <li>• Your subscription will be activated immediately after verification</li>
                  <li>• You can check your order status anytime using your Order ID</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm">
              <strong>Note:</strong> Please save your Order ID for future reference. 
              If you don't receive confirmation within 24 hours, please contact our support team.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex-1"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <Button
              onClick={checkPaymentStatus}
              className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
            >
              Refresh Status
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
