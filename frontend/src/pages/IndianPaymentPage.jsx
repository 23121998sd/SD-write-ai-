import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Copy, Check, CreditCard, Smartphone, ArrowLeft, Upload } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const IndianPaymentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const packageId = searchParams.get('package');
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [bankDetails, setBankDetails] = useState(null);
  const [upiDetails, setUpiDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState('');
  const [showProofForm, setShowProofForm] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    transactionId: '',
    notes: ''
  });

  // Package details
  const packages = {
    starter: { name: 'Starter', amount: 2400, features: ['10K words/month', '5 AI tools'] },
    pro: { name: 'Pro', amount: 6500, features: ['100K words/month', '20+ AI tools'] },
    enterprise: { name: 'Enterprise', amount: 'Custom', features: ['Unlimited'] }
  };

  const selectedPackage = packages[packageId] || packages.pro;
  const orderId = `ORD${Date.now().toString(36).toUpperCase()}`;

  useEffect(() => {
    fetchPaymentDetails();
  }, []);

  const fetchPaymentDetails = async () => {
    try {
      const [bankRes, upiRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/manual-payments/bank-details`),
        axios.get(`${BACKEND_URL}/api/manual-payments/upi-details`)
      ]);
      setBankDetails(bankRes.data);
      setUpiDetails(upiRes.data);
    } catch (error) {
      console.error('Error fetching payment details:', error);
      toast.error('Failed to load payment details');
    }
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(''), 2000);
  };

  const handleSubmitProof = async () => {
    if (!formData.userName || !formData.userEmail) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/manual-payments/submit-payment`, {
        package_id: packageId,
        package_name: selectedPackage.name,
        amount: selectedPackage.amount,
        currency: 'INR',
        payment_method: selectedMethod,
        transaction_id: formData.transactionId,
        user_name: formData.userName,
        user_email: formData.userEmail,
        user_phone: formData.userPhone,
        notes: formData.notes
      });

      toast.success('Payment submitted for verification!');
      navigate(`/payment-pending?order_id=${response.data.order_id}`);
    } catch (error) {
      console.error('Error submitting payment:', error);
      toast.error(error.response?.data?.detail || 'Failed to submit payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50/50 to-blue-50/50 dark:from-gray-900 dark:to-gray-950 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        {!showProofForm ? (
          <>
            {/* Package Summary */}
            <Card className="mb-6 border-2">
              <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30">
                <CardTitle>Payment for {selectedPackage.name} Plan</CardTitle>
                <CardDescription>Complete your payment to activate your subscription</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Amount to Pay</p>
                    <p className="text-3xl font-bold text-cyan-600">₹{selectedPackage.amount}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <Badge variant="outline" className="text-base">{orderId}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Tabs value={selectedMethod} onValueChange={setSelectedMethod}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="upi" className="gap-2">
                  <Smartphone className="w-4 h-4" />
                  UPI Payment
                </TabsTrigger>
                <TabsTrigger value="bank" className="gap-2">
                  <CreditCard className="w-4 h-4" />
                  Bank Transfer
                </TabsTrigger>
              </TabsList>

              {/* UPI Payment */}
              <TabsContent value="upi">
                {upiDetails && (
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-cyan-600" />
                        Pay via UPI
                      </CardTitle>
                      <CardDescription>Use any UPI app to complete payment</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 p-6 rounded-lg border-2 border-cyan-200 dark:border-cyan-800">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-xs">UPI ID</Label>
                            <div className="flex items-center gap-2 mt-1">
                              <code className="flex-1 text-lg font-mono bg-white dark:bg-gray-900 px-4 py-3 rounded border">
                                {upiDetails.upi_details.upi_id}
                              </code>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleCopy(upiDetails.upi_details.upi_id, 'upi')}
                              >
                                {copied === 'upi' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              </Button>
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs">Amount</Label>
                            <div className="text-2xl font-bold text-cyan-600 mt-1">₹{selectedPackage.amount}</div>
                          </div>
                          <div>
                            <Label className="text-xs">Reference (Add in notes)</Label>
                            <div className="flex items-center gap-2 mt-1">
                              <code className="flex-1 font-mono bg-white dark:bg-gray-900 px-4 py-2 rounded border">
                                {orderId}
                              </code>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleCopy(orderId, 'order')}
                              >
                                {copied === 'order' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="font-semibold mb-2">Instructions:</p>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                          {upiDetails.instructions.map((instruction, idx) => (
                            <li key={idx}>{instruction}</li>
                          ))}
                        </ol>
                      </div>

                      <Button
                        onClick={() => setShowProofForm(true)}
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 py-6 text-lg"
                      >
                        I've Completed Payment
                        <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Bank Transfer */}
              <TabsContent value="bank">
                {bankDetails && (
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-cyan-600" />
                        Bank Transfer Details
                      </CardTitle>
                      <CardDescription>NEFT / IMPS / RTGS</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 p-6 rounded-lg border-2 border-cyan-200 dark:border-cyan-800">
                        <div className="space-y-4">
                          {[
                            { label: 'Account Name', value: bankDetails.bank_details.account_name },
                            { label: 'Account Number', value: bankDetails.bank_details.account_number },
                            { label: 'IFSC Code', value: bankDetails.bank_details.ifsc_code },
                            { label: 'Bank Name', value: bankDetails.bank_details.bank_name },
                            { label: 'Branch', value: bankDetails.bank_details.branch },
                            { label: 'Account Type', value: bankDetails.bank_details.account_type }
                          ].map((item, idx) => (
                            <div key={idx}>
                              <Label className="text-xs">{item.label}</Label>
                              <div className="flex items-center gap-2 mt-1">
                                <code className="flex-1 font-mono bg-white dark:bg-gray-900 px-4 py-2 rounded border">
                                  {item.value}
                                </code>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleCopy(item.value, item.label)}
                                >
                                  {copied === item.label ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </Button>
                              </div>
                            </div>
                          ))}
                          <div>
                            <Label className="text-xs">Amount</Label>
                            <div className="text-2xl font-bold text-cyan-600 mt-1">₹{selectedPackage.amount}</div>
                          </div>
                          <div>
                            <Label className="text-xs">Reference / Remark</Label>
                            <div className="flex items-center gap-2 mt-1">
                              <code className="flex-1 font-mono bg-white dark:bg-gray-900 px-4 py-2 rounded border">
                                {orderId}
                              </code>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleCopy(orderId, 'order-bank')}
                              >
                                {copied === 'order-bank' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="font-semibold mb-2">Instructions:</p>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                          {bankDetails.instructions.map((instruction, idx) => (
                            <li key={idx}>{instruction}</li>
                          ))}
                        </ol>
                      </div>

                      <Button
                        onClick={() => setShowProofForm(true)}
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 py-6 text-lg"
                      >
                        I've Completed Payment
                        <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </>
        ) : (
          /* Payment Proof Form */
          <Card className="border-2">
            <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30">
              <CardTitle>Submit Payment Proof</CardTitle>
              <CardDescription>Upload your payment details for verification</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name *</Label>
                  <Input
                    placeholder="John Doe"
                    value={formData.userName}
                    onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Email Address *</Label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.userEmail}
                    onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label>Phone Number (Optional)</Label>
                <Input
                  placeholder="+91 98765 43210"
                  value={formData.userPhone}
                  onChange={(e) => setFormData({ ...formData, userPhone: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Transaction ID / UTR Number *</Label>
                <Input
                  placeholder="Enter your transaction ID or UTR number"
                  value={formData.transactionId}
                  onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  You can find this in your payment confirmation SMS/email
                </p>
              </div>

              <div>
                <Label>Additional Notes (Optional)</Label>
                <Textarea
                  placeholder="Any additional information..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm">
                  <strong>Note:</strong> Your payment will be verified within 2-24 hours. 
                  You'll receive a confirmation email once your subscription is activated.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowProofForm(false)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmitProof}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                >
                  {loading ? 'Submitting...' : 'Submit for Verification'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
