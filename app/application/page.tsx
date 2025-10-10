/** @format */

'use client';

import type React from 'react';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Download, FileText, MapPin, Phone, Building2 } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

export default function ApplicationPage() {
  const [formData, setFormData] = useState({
    // Personal Information
    title: '',
    surname: '',
    firstName: '',
    middleName: '',
    occupation: '',
    nationality: '',
    stateOfOrigin: '',
    gender: '',
    dateOfBirth: '',
    contactPhone: '',
    residentialAddress: '',
    email: '',
    maritalStatus: '',
    nationalIdNumber: '',
    taxIdNumber: '',
    idType: '',

    // Next of Kin
    nokName: '',
    nokAddress: '',
    nokPhone: '',
    nokRelationship: '',
    nokEmail: '',

    // Payment
    sourceOfFund: '',
    floorLevel: '',
    paymentMode: '',
    installmentPeriod: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Submit form data to API
      const response = await fetch(
        `https://fombina-backend.onrender.com/api/applications`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error('Failed to submit application');

      setSubmitStatus('success');
      // Reset form
      setFormData({
        title: '',
        surname: '',
        firstName: '',
        middleName: '',
        occupation: '',
        nationality: '',
        stateOfOrigin: '',
        gender: '',
        dateOfBirth: '',
        contactPhone: '',
        residentialAddress: '',
        email: '',
        maritalStatus: '',
        nationalIdNumber: '',
        taxIdNumber: '',
        idType: '',
        nokName: '',
        nokAddress: '',
        nokPhone: '',
        nokRelationship: '',
        nokEmail: '',
        sourceOfFund: '',
        floorLevel: '',
        paymentMode: '',
        installmentPeriod: '',
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadPDF = () => {
    // Trigger PDF download
    window.open('/documents/fombina-tower-application-form.pdf', '_blank');
  };

  return (
    <div className='min-h-screen'>
      <Navigation />

      {/* Hero Section */}
      <section className='relative h-[50vh] flex items-center justify-center overflow-hidden'>
        <div className='absolute inset-0 z-0'>
          <img
            src='/luxury-office-interior-with-city-view.jpg'
            alt='Application Hero'
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-foreground/75 to-foreground/60' />
        </div>
        <div className='relative z-10 container mx-auto px-4 text-center'>
          <h1 className='font-serif text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in text-balance drop-shadow-2xl'>
            Application Form
          </h1>
          <p className='text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-lg'>
            Secure your premium space at Fombina Tower
          </p>
        </div>
      </section>

      {/* Pricing & Info Section */}
      <section className='py-16 bg-primary/5'>
        <div className='container mx-auto px-4 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
            <Card className='border-2 border-primary/20 shadow-lg'>
              <CardContent className='p-6 text-center'>
                <Building2 className='mx-auto mb-4 text-primary' size={40} />
                <div className='text-3xl font-bold text-foreground mb-2'>
                  49 m²
                </div>
                <div className='text-sm text-muted-foreground'>Space Size</div>
              </CardContent>
            </Card>
            <Card className='border-2 border-primary shadow-lg bg-primary/5'>
              <CardContent className='p-6 text-center'>
                <FileText className='mx-auto mb-4 text-primary' size={40} />
                <div className='text-3xl font-bold text-foreground mb-2'>
                  ₦360M
                </div>
                <div className='text-sm text-muted-foreground'>Total Price</div>
                <div className='text-xs text-muted-foreground mt-2'>
                  Other currencies accepted
                </div>
              </CardContent>
            </Card>
            <Card className='border-2 border-primary/20 shadow-lg'>
              <CardContent className='p-6 text-center'>
                <Download className='mx-auto mb-4 text-primary' size={40} />
                <div className='text-3xl font-bold text-foreground mb-2'>
                  40%
                </div>
                <div className='text-sm text-muted-foreground'>
                  Initial Deposit
                </div>
              </CardContent>
            </Card>
          </div>

          <div className='mt-8 text-center'>
            <Badge variant='outline' className='text-lg px-6 py-2'>
              Application Fee: ₦100,000
            </Badge>
          </div>
        </div>
      </section>

      {/* Download Option */}
      <section className='py-12 bg-background'>
        <div className='container mx-auto px-4 lg:px-8'>
          <Card className='max-w-4xl mx-auto border-2 border-primary/20 shadow-xl'>
            <CardContent className='p-8'>
              <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
                <div className='flex-1'>
                  <h3 className='font-serif text-2xl font-bold text-foreground mb-2'>
                    Prefer a Physical Form?
                  </h3>
                  <p className='text-muted-foreground'>
                    Download the PDF application form, fill it out, and submit
                    it at our office
                  </p>
                  <div className='mt-4 space-y-2 text-sm text-muted-foreground'>
                    <div className='flex items-center gap-2'>
                      <MapPin size={16} className='text-primary' />
                      <span>Plot 1839, Kur Muhd Avenue, CBD, FCT Abuja</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Phone size={16} className='text-primary' />
                      <span>09028132452, 08163686368</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={downloadPDF}
                  size='lg'
                  className='bg-primary hover:bg-primary/90 gap-2'
                >
                  <Download size={20} />
                  Download PDF Form
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Online Application Form */}
      <section className='py-24 bg-muted/30'>
        <div className='container mx-auto px-4 lg:px-8'>
          <div className='max-w-4xl mx-auto'>
            <div className='text-center mb-12'>
              <h2 className='font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance'>
                Online Application
              </h2>
              <p className='text-lg text-muted-foreground leading-relaxed'>
                Fill out the form below to apply online. All fields marked with
                * are required.
              </p>
            </div>

            <Card className='border-none shadow-2xl'>
              <CardContent className='p-8 md:p-12'>
                <form onSubmit={handleSubmit} className='space-y-10'>
                  {/* Personal Information */}
                  <div>
                    <h3 className='font-serif text-2xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20'>
                      Personal Information
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div>
                        <Label htmlFor='title'>Title *</Label>
                        <Input
                          id='title'
                          name='title'
                          required
                          value={formData.title}
                          onChange={handleChange}
                          placeholder='Mr./Mrs./Dr.'
                        />
                      </div>
                      <div>
                        <Label htmlFor='surname'>Surname *</Label>
                        <Input
                          id='surname'
                          name='surname'
                          required
                          value={formData.surname}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor='firstName'>First Name *</Label>
                        <Input
                          id='firstName'
                          name='firstName'
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor='middleName'>Middle Name</Label>
                        <Input
                          id='middleName'
                          name='middleName'
                          value={formData.middleName}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor='occupation'>Occupation *</Label>
                        <Input
                          id='occupation'
                          name='occupation'
                          required
                          value={formData.occupation}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor='nationality'>Nationality *</Label>
                        <Input
                          id='nationality'
                          name='nationality'
                          required
                          value={formData.nationality}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor='stateOfOrigin'>State of Origin *</Label>
                        <Input
                          id='stateOfOrigin'
                          name='stateOfOrigin'
                          required
                          value={formData.stateOfOrigin}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor='gender'>Gender *</Label>
                        <select
                          id='gender'
                          name='gender'
                          required
                          value={formData.gender}
                          onChange={handleChange}
                          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                        >
                          <option value=''>Select Gender</option>
                          <option value='male'>Male</option>
                          <option value='female'>Female</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor='dateOfBirth'>Date of Birth *</Label>
                        <Input
                          id='dateOfBirth'
                          name='dateOfBirth'
                          type='date'
                          required
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor='contactPhone'>Contact Phone *</Label>
                        <Input
                          id='contactPhone'
                          name='contactPhone'
                          type='tel'
                          required
                          value={formData.contactPhone}
                          onChange={handleChange}
                        />
                      </div>
                      <div className='md:col-span-2'>
                        <Label htmlFor='residentialAddress'>
                          Residential Address *
                        </Label>
                        <Textarea
                          id='residentialAddress'
                          name='residentialAddress'
                          required
                          value={formData.residentialAddress}
                          onChange={handleChange}
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor='email'>Email Address *</Label>
                        <Input
                          id='email'
                          name='email'
                          type='email'
                          required
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor='maritalStatus'>Marital Status *</Label>
                        <select
                          id='maritalStatus'
                          name='maritalStatus'
                          required
                          value={formData.maritalStatus}
                          onChange={handleChange}
                          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                        >
                          <option value=''>Select Status</option>
                          <option value='single'>Single</option>
                          <option value='married'>Married</option>
                          <option value='divorced'>Divorced</option>
                          <option value='other'>Other</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor='nationalIdNumber'>
                          National ID Number *
                        </Label>
                        <Input
                          id='nationalIdNumber'
                          name='nationalIdNumber'
                          required
                          value={formData.nationalIdNumber}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor='taxIdNumber'>
                          Tax ID Number (Corporate)
                        </Label>
                        <Input
                          id='taxIdNumber'
                          name='taxIdNumber'
                          value={formData.taxIdNumber}
                          onChange={handleChange}
                        />
                      </div>
                      <div className='md:col-span-2'>
                        <Label htmlFor='idType'>Valid Means of ID *</Label>
                        <select
                          id='idType'
                          name='idType'
                          required
                          value={formData.idType}
                          onChange={handleChange}
                          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                        >
                          <option value=''>Select ID Type</option>
                          <option value='voters-card'>Voter's Card</option>
                          <option value='intl-passport'>
                            International Passport
                          </option>
                          <option value='drivers-license'>
                            Driver's License
                          </option>
                          <option value='national-id'>
                            National Identity Card
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Source of Fund */}
                  <div>
                    <h3 className='font-serif text-2xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20'>
                      Source of Fund
                    </h3>
                    <div>
                      <Label htmlFor='sourceOfFund'>Source of Fund *</Label>
                      <select
                        id='sourceOfFund'
                        name='sourceOfFund'
                        required
                        value={formData.sourceOfFund}
                        onChange={handleChange}
                        className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                      >
                        <option value=''>Select Source</option>
                        <option value='salaries'>
                          Salaries and Allowances
                        </option>
                        <option value='cooperative'>
                          Cooperative Contribution
                        </option>
                        <option value='business'>Business Income</option>
                        <option value='property-sales'>
                          Sales of Personal Property
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Next of Kin */}
                  <div>
                    <h3 className='font-serif text-2xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20'>
                      Next of Kin Details
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div className='md:col-span-2'>
                        <Label htmlFor='nokName'>Name of Next of Kin *</Label>
                        <Input
                          id='nokName'
                          name='nokName'
                          required
                          value={formData.nokName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className='md:col-span-2'>
                        <Label htmlFor='nokAddress'>Address *</Label>
                        <Textarea
                          id='nokAddress'
                          name='nokAddress'
                          required
                          value={formData.nokAddress}
                          onChange={handleChange}
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor='nokPhone'>Phone Number *</Label>
                        <Input
                          id='nokPhone'
                          name='nokPhone'
                          type='tel'
                          required
                          value={formData.nokPhone}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor='nokRelationship'>Relationship *</Label>
                        <Input
                          id='nokRelationship'
                          name='nokRelationship'
                          required
                          value={formData.nokRelationship}
                          onChange={handleChange}
                        />
                      </div>
                      <div className='md:col-span-2'>
                        <Label htmlFor='nokEmail'>Email Address *</Label>
                        <Input
                          id='nokEmail'
                          name='nokEmail'
                          type='email'
                          required
                          value={formData.nokEmail}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div>
                    <h3 className='font-serif text-2xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20'>
                      Payment Details
                    </h3>
                    <div className='space-y-6'>
                      <div className='p-6 bg-primary/5 rounded-lg border-2 border-primary/20'>
                        <div className='text-center mb-4'>
                          <div className='text-sm text-muted-foreground mb-2'>
                            Total Price for 49 Square Meters
                          </div>
                          <div className='text-3xl font-bold text-foreground'>
                            ₦360,000,000
                          </div>
                          <div className='text-sm text-muted-foreground mt-1'>
                            (Three Hundred and Sixty Million Naira)
                          </div>
                          <div className='text-xs text-muted-foreground mt-2'>
                            Other currencies are acceptable at the prevailing
                            rate as at the time of payment
                          </div>
                        </div>
                        <div className='text-center pt-4 border-t border-primary/20'>
                          <div className='text-sm text-muted-foreground mb-1'>
                            Initial Deposit Required
                          </div>
                          <div className='text-2xl font-bold text-primary'>
                            ₦144,000,000 (40%)
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor='floorLevel'>
                          Preferred Floor Level *
                        </Label>
                        <Input
                          id='floorLevel'
                          name='floorLevel'
                          required
                          value={formData.floorLevel}
                          onChange={handleChange}
                          placeholder='e.g., Ground Floor, 1st Floor, etc.'
                        />
                      </div>

                      <div>
                        <Label htmlFor='paymentMode'>Mode of Payment *</Label>
                        <select
                          id='paymentMode'
                          name='paymentMode'
                          required
                          value={formData.paymentMode}
                          onChange={handleChange}
                          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                        >
                          <option value=''>Select Payment Mode</option>
                          <option value='outright'>Outright Payment</option>
                          <option value='installment'>
                            Installmental Payment
                          </option>
                        </select>
                      </div>

                      {formData.paymentMode === 'installment' && (
                        <div>
                          <Label htmlFor='installmentPeriod'>
                            Installment Period *
                          </Label>
                          <select
                            id='installmentPeriod'
                            name='installmentPeriod'
                            required
                            value={formData.installmentPeriod}
                            onChange={handleChange}
                            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                          >
                            <option value=''>Select Period</option>
                            <option value='6-months'>6 Months</option>
                            <option value='12-months'>12 Months</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className='p-6 bg-muted/50 rounded-lg'>
                    <h4 className='font-semibold text-foreground mb-4'>
                      Terms and Conditions
                    </h4>
                    <div className='space-y-3 text-sm text-muted-foreground max-h-60 overflow-y-auto'>
                      <p>
                        a. Subscriber must pay the stipulated non-refundable
                        cost of Application Form (₦100,000) before application
                        can be processed for Letter of Offer.
                      </p>
                      <p>
                        b. Completed Application Form should be submitted with
                        one recent passport photograph each of the applicant and
                        his/her Next of kin.
                      </p>
                      <p>
                        c. Successful applicant shall be contacted through the
                        contact address/email address supplied in this form and
                        will be issued a letter of Offer by UEP/D when all
                        conditions are fulfilled.
                      </p>
                      <p>
                        d. The submission and acceptance of Application Form
                        shall not be construed as a guarantee for allocation,
                        unless backed up by payment in compliance with the
                        conditions contained in the letter of Offer to be issued
                        after receiving the completed Application Form.
                      </p>
                      <p>
                        e. All payments should be made via bank draft or direct
                        transfer to the bank account provided in the letter of
                        Offer. Cash payments are not acceptable.
                      </p>
                      <p>
                        f. In the event that an applicant failed to make payment
                        as stipulated, UEP/D shall have the right to withdraw
                        approval without notice to the applicant.
                      </p>
                      <p>
                        g. UEP/D shall not be liable for the payment of interest
                        for the deposit paid, loss of earnings or any other loss
                        suffered by the applicant deriving explicitly from the
                        rejection of any application or revocation of offer.
                      </p>
                      <p>
                        h. Letter of Allocation will only be issued after full
                        payment within the offer period.
                      </p>
                    </div>
                    <div className='mt-4 flex items-center gap-2'>
                      <input
                        type='checkbox'
                        id='acceptTerms'
                        required
                        className='w-4 h-4'
                      />
                      <label
                        htmlFor='acceptTerms'
                        className='text-sm text-foreground'
                      >
                        I agree with the above terms and conditions *
                      </label>
                    </div>
                  </div>

                  {submitStatus === 'success' && (
                    <div className='p-4 bg-primary/10 text-primary rounded-lg'>
                      Thank you! Your application has been submitted
                      successfully. We'll contact you within 24-48 hours.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className='p-4 bg-destructive/10 text-destructive rounded-lg'>
                      Sorry, there was an error submitting your application.
                      Please try again or contact us directly.
                    </div>
                  )}

                  <Button
                    type='submit'
                    size='lg'
                    className='w-full bg-primary hover:bg-primary/90 text-lg py-6'
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? 'Submitting Application...'
                      : 'Submit Application'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Office Information */}
      <section className='py-16 bg-background'>
        <div className='container mx-auto px-4 lg:px-8'>
          <div className='max-w-4xl mx-auto'>
            <h3 className='font-serif text-3xl font-bold text-foreground mb-8 text-center'>
              Visit Our Office
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <Card className='border-none shadow-lg'>
                <CardContent className='p-6'>
                  <div className='flex items-start gap-4'>
                    <MapPin
                      className='text-primary flex-shrink-0 mt-1'
                      size={24}
                    />
                    <div>
                      <h4 className='font-semibold mb-2'>Office Address</h4>
                      <p className='text-muted-foreground text-sm leading-relaxed'>
                        Plot 1839, Kur Muhd Avenue
                        <br />
                        Central Business District
                        <br />
                        FCT Abuja, Nigeria
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className='border-none shadow-lg'>
                <CardContent className='p-6'>
                  <div className='flex items-start gap-4'>
                    <Phone
                      className='text-primary flex-shrink-0 mt-1'
                      size={24}
                    />
                    <div>
                      <h4 className='font-semibold mb-2'>Contact Numbers</h4>
                      <p className='text-muted-foreground text-sm'>
                        09028132452
                      </p>
                      <p className='text-muted-foreground text-sm'>
                        08163686368
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className='mt-8 grid grid-cols-2 md:grid-cols-4 gap-4'>
              <img
                src='/luxury-skyscraper-at-sunset.jpg'
                alt='Fombina Tower Exterior'
                className='w-full h-32 object-cover rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer'
                onClick={() =>
                  window.open('/luxury-skyscraper-at-sunset.jpg', '_blank')
                }
              />
              <img
                src='/luxury-office-interior-with-city-view.jpg'
                alt='Office Interior'
                className='w-full h-32 object-cover rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer'
                onClick={() =>
                  window.open(
                    '/luxury-office-interior-with-city-view.jpg',
                    '_blank'
                  )
                }
              />
              <img
                src='/modern-luxury-skyscraper-architectural-render.jpg'
                alt='Architectural Render'
                className='w-full h-32 object-cover rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer'
                onClick={() =>
                  window.open(
                    '/modern-luxury-skyscraper-architectural-render.jpg',
                    '_blank'
                  )
                }
              />
              <img
                src='/luxury-skyscraper-architectural-render.jpg'
                alt='Tower View'
                className='w-full h-32 object-cover rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer'
                onClick={() =>
                  window.open(
                    '/luxury-skyscraper-architectural-render.jpg',
                    '_blank'
                  )
                }
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
