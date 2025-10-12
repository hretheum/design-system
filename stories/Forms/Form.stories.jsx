import React, { useState } from 'react';
import { Form } from '../../components/02-forms-inputs/Form/Form';
import { Input } from '../../components/02-forms-inputs/Input/Input';
import { Select } from '../../components/02-forms-inputs/Select/Select';
import { Checkbox } from '../../components/02-forms-inputs/Checkbox/Checkbox';
import { Button } from '../../components/01-actions-controls/Button/Button';
import { action } from '@storybook/addon-actions';
import { within, userEvent, expect } from '@storybook/test';

export default {
  title: 'Forms/Form',
  component: Form,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Accessible form wrapper with validation, error handling, loading states, and comprehensive form management.'
      }
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true
          }
        ]
      }
    }
  },
  argTypes: {
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal', 'inline'],
      description: 'Form layout direction'
    },
    spacing: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Spacing between form fields'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable entire form'
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state'
    },
    validateOnChange: {
      control: 'boolean',
      description: 'Validate fields on change'
    },
    validateOnBlur: {
      control: 'boolean',
      description: 'Validate fields on blur'
    },
    showErrorSummary: {
      control: 'boolean',
      description: 'Show error summary at top'
    },
    variant: {
      control: 'select',
      options: ['default', 'card', 'inline'],
      description: 'Visual variant'
    }
  }
};

// Basic Form
export const Default = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim() ? null : 'Name is required';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Valid email is required';
      case 'message':
        return value.trim().length >= 10 ? null : 'Message must be at least 10 characters';
      default:
        return null;
    }
  };
  
  const handleFieldChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    
    action('onFieldChange')(name, value);
  };
  
  const handleFieldBlur = (name, value) => {
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    action('onFieldBlur')(name, value, error);
  };
  
  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      action('onSubmit')(data);
      alert('Form submitted successfully!');
    }
    
    setIsSubmitting(false);
  };
  
  return (
    <Form
      onSubmit={handleSubmit}
      loading={isSubmitting}
      validateOnBlur={true}
      showErrorSummary={true}
    >
      <Form.Field error={errors.name}>
        <Form.Label htmlFor="name" required>Full Name</Form.Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(value) => handleFieldChange('name', value)}
          onBlur={(e) => handleFieldBlur('name', e.target.value)}
          placeholder="Enter your full name"
          aria-invalid={!!errors.name}
        />
        {errors.name && <Form.ErrorMessage>{errors.name}</Form.ErrorMessage>}
      </Form.Field>
      
      <Form.Field error={errors.email}>
        <Form.Label htmlFor="email" required>Email Address</Form.Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(value) => handleFieldChange('email', value)}
          onBlur={(e) => handleFieldBlur('email', e.target.value)}
          placeholder="your.email@example.com"
          aria-invalid={!!errors.email}
        />
        {errors.email && <Form.ErrorMessage>{errors.email}</Form.ErrorMessage>}
      </Form.Field>
      
      <Form.Field error={errors.message}>
        <Form.Label htmlFor="message" required>Message</Form.Label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleFieldChange('message', e.target.value)}
          onBlur={(e) => handleFieldBlur('message', e.target.value)}
          placeholder="Enter your message (minimum 10 characters)"
          rows={4}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: `1px solid ${errors.message ? '#dc2626' : '#d1d5db'}`,
            borderRadius: '6px',
            fontSize: '14px'
          }}
          aria-invalid={!!errors.message}
        />
        {errors.message && <Form.ErrorMessage>{errors.message}</Form.ErrorMessage>}
      </Form.Field>
      
      <Form.Actions>
        <Button type="submit" loading={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Form'}
        </Button>
        <Button variant="secondary" type="button">
          Cancel
        </Button>
      </Form.Actions>
    </Form>
  );
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const form = canvas.getByRole('form');
  const nameInput = canvas.getByLabelText(/full name/i);
  
  // Test form accessibility
  await expect(form).toBeInTheDocument();
  await expect(nameInput).toHaveAttribute('aria-invalid', 'false');
  
  // Test required field validation
  await userEvent.click(canvas.getByRole('button', { name: /submit/i }));
};

// Registration Form
export const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    terms: false,
    newsletter: true
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' }
  ];
  
  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.trim() ? null : `${name === 'firstName' ? 'First' : 'Last'} name is required`;
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Valid email is required';
      case 'password':
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) return 'Password must contain uppercase, lowercase, and number';
        return null;
      case 'confirmPassword':
        return value === formData.password ? null : 'Passwords do not match';
      case 'country':
        return value ? null : 'Please select a country';
      case 'terms':
        return value ? null : 'You must accept the terms and conditions';
      default:
        return null;
    }
  };
  
  const updateField = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'newsletter') { // newsletter is optional
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Registration successful!');
    }
    
    setIsSubmitting(false);
  };
  
  return (
    <Form
      onSubmit={handleSubmit}
      loading={isSubmitting}
      variant="card"
      spacing="md"
      showErrorSummary={true}
    >
      <Form.Header>
        <h2>Create Account</h2>
        <p>Join us today and get started in minutes</p>
      </Form.Header>
      
      <Form.Section title="Personal Information">
        <Form.Row>
          <Form.Field error={errors.firstName}>
            <Form.Label htmlFor="firstName" required>First Name</Form.Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(value) => updateField('firstName', value)}
              placeholder="John"
            />
            {errors.firstName && <Form.ErrorMessage>{errors.firstName}</Form.ErrorMessage>}
          </Form.Field>
          
          <Form.Field error={errors.lastName}>
            <Form.Label htmlFor="lastName" required>Last Name</Form.Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(value) => updateField('lastName', value)}
              placeholder="Doe"
            />
            {errors.lastName && <Form.ErrorMessage>{errors.lastName}</Form.ErrorMessage>}
          </Form.Field>
        </Form.Row>
        
        <Form.Field error={errors.country}>
          <Form.Label htmlFor="country" required>Country</Form.Label>
          <Select
            id="country"
            value={formData.country}
            onChange={(value) => updateField('country', value)}
            options={countries}
            placeholder="Select your country"
          />
          {errors.country && <Form.ErrorMessage>{errors.country}</Form.ErrorMessage>}
        </Form.Field>
      </Form.Section>
      
      <Form.Section title="Account Security">
        <Form.Field error={errors.email}>
          <Form.Label htmlFor="email" required>Email Address</Form.Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(value) => updateField('email', value)}
            placeholder="your.email@example.com"
          />
          <Form.HelpText>We'll never share your email with anyone else</Form.HelpText>
          {errors.email && <Form.ErrorMessage>{errors.email}</Form.ErrorMessage>}
        </Form.Field>
        
        <Form.Row>
          <Form.Field error={errors.password}>
            <Form.Label htmlFor="password" required>Password</Form.Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(value) => updateField('password', value)}
              placeholder="••••••••"
            />
            {errors.password && <Form.ErrorMessage>{errors.password}</Form.ErrorMessage>}
          </Form.Field>
          
          <Form.Field error={errors.confirmPassword}>
            <Form.Label htmlFor="confirmPassword" required>Confirm Password</Form.Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(value) => updateField('confirmPassword', value)}
              placeholder="••••••••"
            />
            {errors.confirmPassword && <Form.ErrorMessage>{errors.confirmPassword}</Form.ErrorMessage>}
          </Form.Field>
        </Form.Row>
      </Form.Section>
      
      <Form.Section title="Preferences">
        <Form.Field error={errors.terms}>
          <Checkbox
            checked={formData.terms}
            onChange={(checked) => updateField('terms', checked)}
            required
          >
            I agree to the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>
          </Checkbox>
          {errors.terms && <Form.ErrorMessage>{errors.terms}</Form.ErrorMessage>}
        </Form.Field>
        
        <Form.Field>
          <Checkbox
            checked={formData.newsletter}
            onChange={(checked) => updateField('newsletter', checked)}
          >
            Subscribe to our newsletter for updates and special offers
          </Checkbox>
        </Form.Field>
      </Form.Section>
      
      <Form.Actions>
        <Button type="submit" loading={isSubmitting} size="lg">
          Create Account
        </Button>
      </Form.Actions>
      
      <Form.Footer>
        <p>Already have an account? <a href="#">Sign in here</a></p>
      </Form.Footer>
    </Form>
  );
};
RegistrationForm.parameters = {
  docs: {
    description: {
      story: 'Comprehensive registration form with sections, validation, and various field types.'
    }
  }
};

// Login Form
export const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Simple validation
    const newErrors = {};
    if (!credentials.email) newErrors.email = 'Email is required';
    if (!credentials.password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Login successful!');
    }
    
    setIsSubmitting(false);
  };
  
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Form
        onSubmit={handleSubmit}
        loading={isSubmitting}
        variant="card"
        layout="vertical"
      >
        <Form.Header>
          <h2>Sign In</h2>
          <p>Welcome back! Please sign in to your account</p>
        </Form.Header>
        
        <Form.Field error={errors.email}>
          <Form.Label htmlFor="loginEmail" required>Email</Form.Label>
          <Input
            id="loginEmail"
            type="email"
            value={credentials.email}
            onChange={(value) => setCredentials(prev => ({ ...prev, email: value }))}
            placeholder="your.email@example.com"
            autoComplete="email"
          />
          {errors.email && <Form.ErrorMessage>{errors.email}</Form.ErrorMessage>}
        </Form.Field>
        
        <Form.Field error={errors.password}>
          <Form.Label htmlFor="loginPassword" required>Password</Form.Label>
          <Input
            id="loginPassword"
            type="password"
            value={credentials.password}
            onChange={(value) => setCredentials(prev => ({ ...prev, password: value }))}
            placeholder="••••••••"
            autoComplete="current-password"
          />
          {errors.password && <Form.ErrorMessage>{errors.password}</Form.ErrorMessage>}
        </Form.Field>
        
        <Form.Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Checkbox
            checked={credentials.rememberMe}
            onChange={(checked) => setCredentials(prev => ({ ...prev, rememberMe: checked }))}
          >
            Remember me
          </Checkbox>
          <a href="#" style={{ fontSize: '14px', color: '#3b82f6', textDecoration: 'none' }}>
            Forgot password?
          </a>
        </Form.Row>
        
        <Form.Actions>
          <Button type="submit" loading={isSubmitting} size="lg" style={{ width: '100%' }}>
            Sign In
          </Button>
        </Form.Actions>
        
        <Form.Footer>
          <p>Don't have an account? <a href="#">Sign up here</a></p>
        </Form.Footer>
      </Form>
    </div>
  );
};
LoginForm.parameters = {
  docs: {
    description: {
      story: 'Clean login form with proper authentication patterns.'
    }
  }
};

// Contact Form
export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium',
    category: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const subjects = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'billing', label: 'Billing Question' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'bug', label: 'Bug Report' }
  ];
  
  const priorities = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];
  
  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Message sent successfully!');
    setIsSubmitting(false);
  };
  
  return (
    <Form
      onSubmit={handleSubmit}
      loading={isSubmitting}
      layout="vertical"
      spacing="lg"
    >
      <Form.Header>
        <h2>Contact Us</h2>
        <p>Get in touch and we'll get back to you as soon as possible</p>
      </Form.Header>
      
      <Form.Row>
        <Form.Field>
          <Form.Label htmlFor="contactName" required>Name</Form.Label>
          <Input
            id="contactName"
            value={formData.name}
            onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
            placeholder="Your full name"
            required
          />
        </Form.Field>
        
        <Form.Field>
          <Form.Label htmlFor="contactEmail" required>Email</Form.Label>
          <Input
            id="contactEmail"
            type="email"
            value={formData.email}
            onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
            placeholder="your.email@example.com"
            required
          />
        </Form.Field>
      </Form.Row>
      
      <Form.Row>
        <Form.Field>
          <Form.Label htmlFor="contactSubject" required>Subject</Form.Label>
          <Select
            id="contactSubject"
            value={formData.subject}
            onChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
            options={subjects}
            placeholder="Select a subject"
            required
          />
        </Form.Field>
        
        <Form.Field>
          <Form.Label htmlFor="contactPriority">Priority</Form.Label>
          <Select
            id="contactPriority"
            value={formData.priority}
            onChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
            options={priorities}
          />
        </Form.Field>
      </Form.Row>
      
      <Form.Field>
        <Form.Label htmlFor="contactMessage" required>Message</Form.Label>
        <textarea
          id="contactMessage"
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          placeholder="Please describe your inquiry in detail..."
          rows={6}
          required
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            fontFamily: 'inherit',
            resize: 'vertical'
          }}
        />
        <Form.HelpText>Minimum 20 characters required</Form.HelpText>
      </Form.Field>
      
      <Form.Actions>
        <Button type="submit" loading={isSubmitting}>
          Send Message
        </Button>
        <Button variant="secondary" type="button">
          Save Draft
        </Button>
      </Form.Actions>
    </Form>
  );
};
ContactForm.parameters = {
  docs: {
    description: {
      story: 'Contact form with categorization and priority selection.'
    }
  }
};

// Inline Form
export const InlineForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    if (!email) {
      alert('Please enter an email address');
      return;
    }
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Subscribed successfully!');
    setEmail('');
    setIsSubmitting(false);
  };
  
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <h3>Subscribe to Our Newsletter</h3>
      <p style={{ color: '#6b7280', marginBottom: '24px' }}>
        Get the latest updates and exclusive content delivered to your inbox
      </p>
      
      <Form
        onSubmit={handleSubmit}
        layout="inline"
        variant="inline"
        loading={isSubmitting}
      >
        <Form.Field>
          <Form.Label htmlFor="newsletterEmail" srOnly>Email Address</Form.Label>
          <Input
            id="newsletterEmail"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="Enter your email address"
            size="lg"
            style={{ minWidth: '300px' }}
          />
        </Form.Field>
        
        <Form.Actions>
          <Button type="submit" loading={isSubmitting} size="lg">
            Subscribe
          </Button>
        </Form.Actions>
      </Form>
    </div>
  );
};
InlineForm.parameters = {
  docs: {
    description: {
      story: 'Inline form layout for simple actions like newsletter subscription.'
    }
  }
};

// Multi-Step Form
export const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: '',
    lastName: '',
    email: '',
    
    // Step 2: Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Step 3: Preferences
    notifications: true,
    newsletter: false,
    theme: 'light'
  });
  
  const totalSteps = 3;
  
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmit = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Form completed successfully!');
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Form.Section title="Personal Information">
            <Form.Row>
              <Form.Field>
                <Form.Label htmlFor="stepFirstName" required>First Name</Form.Label>
                <Input
                  id="stepFirstName"
                  value={formData.firstName}
                  onChange={(value) => updateField('firstName', value)}
                  placeholder="John"
                />
              </Form.Field>
              
              <Form.Field>
                <Form.Label htmlFor="stepLastName" required>Last Name</Form.Label>
                <Input
                  id="stepLastName"
                  value={formData.lastName}
                  onChange={(value) => updateField('lastName', value)}
                  placeholder="Doe"
                />
              </Form.Field>
            </Form.Row>
            
            <Form.Field>
              <Form.Label htmlFor="stepEmail" required>Email Address</Form.Label>
              <Input
                id="stepEmail"
                type="email"
                value={formData.email}
                onChange={(value) => updateField('email', value)}
                placeholder="your.email@example.com"
              />
            </Form.Field>
          </Form.Section>
        );
        
      case 2:
        return (
          <Form.Section title="Address Information">
            <Form.Field>
              <Form.Label htmlFor="stepAddress" required>Street Address</Form.Label>
              <Input
                id="stepAddress"
                value={formData.address}
                onChange={(value) => updateField('address', value)}
                placeholder="123 Main Street"
              />
            </Form.Field>
            
            <Form.Row>
              <Form.Field>
                <Form.Label htmlFor="stepCity" required>City</Form.Label>
                <Input
                  id="stepCity"
                  value={formData.city}
                  onChange={(value) => updateField('city', value)}
                  placeholder="New York"
                />
              </Form.Field>
              
              <Form.Field>
                <Form.Label htmlFor="stepState" required>State</Form.Label>
                <Input
                  id="stepState"
                  value={formData.state}
                  onChange={(value) => updateField('state', value)}
                  placeholder="NY"
                />
              </Form.Field>
              
              <Form.Field>
                <Form.Label htmlFor="stepZip" required>ZIP Code</Form.Label>
                <Input
                  id="stepZip"
                  value={formData.zipCode}
                  onChange={(value) => updateField('zipCode', value)}
                  placeholder="10001"
                />
              </Form.Field>
            </Form.Row>
          </Form.Section>
        );
        
      case 3:
        return (
          <Form.Section title="Preferences">
            <Form.Field>
              <Checkbox
                checked={formData.notifications}
                onChange={(checked) => updateField('notifications', checked)}
              >
                Enable push notifications
              </Checkbox>
            </Form.Field>
            
            <Form.Field>
              <Checkbox
                checked={formData.newsletter}
                onChange={(checked) => updateField('newsletter', checked)}
              >
                Subscribe to newsletter
              </Checkbox>
            </Form.Field>
            
            <Form.Field>
              <Form.Label htmlFor="stepTheme">Preferred Theme</Form.Label>
              <Select
                id="stepTheme"
                value={formData.theme}
                onChange={(value) => updateField('theme', value)}
                options={[
                  { value: 'light', label: 'Light' },
                  { value: 'dark', label: 'Dark' },
                  { value: 'auto', label: 'Auto' }
                ]}
              />
            </Form.Field>
          </Form.Section>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <Form variant="card">
      <Form.Header>
        <h2>Account Setup</h2>
        <div style={{ marginTop: '8px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '8px'
          }}>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>
              Step {currentStep} of {totalSteps}
            </span>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>
              {Math.round((currentStep / totalSteps) * 100)}% complete
            </span>
          </div>
          <div style={{ 
            width: '100%', 
            height: '8px', 
            backgroundColor: '#e5e7eb', 
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${(currentStep / totalSteps) * 100}%`,
              height: '100%',
              backgroundColor: '#3b82f6',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      </Form.Header>
      
      {renderStep()}
      
      <Form.Actions>
        {currentStep > 1 && (
          <Button variant="secondary" onClick={prevStep}>
            Previous
          </Button>
        )}
        
        {currentStep < totalSteps ? (
          <Button onClick={nextStep}>
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit}>
            Complete Setup
          </Button>
        )}
      </Form.Actions>
    </Form>
  );
};
MultiStepForm.parameters = {
  docs: {
    description: {
      story: 'Multi-step form with progress indicator and navigation.'
    }
  }
};

// Responsive Demo
export const ResponsiveDemo = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [layout, setLayout] = useState('vertical');
  
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <label>Form Layout: </label>
        <select 
          value={layout} 
          onChange={(e) => setLayout(e.target.value)}
        >
          <option value="vertical">Vertical</option>
          <option value="horizontal">Horizontal</option>
          <option value="inline">Inline</option>
        </select>
      </div>
      
      <Form layout={layout} variant="card">
        <Form.Field>
          <Form.Label htmlFor="responsiveName">Name</Form.Label>
          <Input
            id="responsiveName"
            value={formData.name}
            onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
            placeholder="Your name"
          />
        </Form.Field>
        
        <Form.Field>
          <Form.Label htmlFor="responsiveEmail">Email</Form.Label>
          <Input
            id="responsiveEmail"
            type="email"
            value={formData.email}
            onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
            placeholder="your.email@example.com"
          />
        </Form.Field>
        
        <Form.Actions>
          <Button type="submit">Submit</Button>
        </Form.Actions>
      </Form>
    </div>
  );
};
ResponsiveDemo.parameters = {
  docs: {
    description: {
      story: 'Demonstrates responsive form layouts across different configurations.'
    }
  }
};

// Accessibility Demo
export const AccessibilityDemo = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const validateField = (name, value) => {
    switch (name) {
      case 'username':
        if (!value) return 'Username is required';
        if (value.length < 3) return 'Username must be at least 3 characters';
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
        return null;
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        return null;
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return null;
      default:
        return null;
    }
  };
  
  const handleFieldChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };
  
  return (
    <Form
      aria-labelledby="accessibility-form-title"
      validateOnChange={true}
      showErrorSummary={true}
    >
      <Form.Header>
        <h2 id="accessibility-form-title">Create Account</h2>
        <p>All fields are required. Form validation happens in real-time.</p>
      </Form.Header>
      
      <Form.Field error={errors.username}>
        <Form.Label htmlFor="accessibilityUsername" required>Username</Form.Label>
        <Input
          id="accessibilityUsername"
          value={formData.username}
          onChange={(value) => handleFieldChange('username', value)}
          placeholder="Enter username"
          aria-invalid={!!errors.username}
          aria-describedby="username-description username-error"
          autoComplete="username"
        />
        <Form.HelpText id="username-description">
          3+ characters, letters, numbers, and underscores only
        </Form.HelpText>
        {errors.username && (
          <Form.ErrorMessage id="username-error">{errors.username}</Form.ErrorMessage>
        )}
      </Form.Field>
      
      <Form.Field error={errors.password}>
        <Form.Label htmlFor="accessibilityPassword" required>Password</Form.Label>
        <Input
          id="accessibilityPassword"
          type="password"
          value={formData.password}
          onChange={(value) => handleFieldChange('password', value)}
          placeholder="Enter password"
          aria-invalid={!!errors.password}
          aria-describedby="password-description password-error"
          autoComplete="new-password"
        />
        <Form.HelpText id="password-description">
          Minimum 8 characters required
        </Form.HelpText>
        {errors.password && (
          <Form.ErrorMessage id="password-error">{errors.password}</Form.ErrorMessage>
        )}
      </Form.Field>
      
      <Form.Field error={errors.confirmPassword}>
        <Form.Label htmlFor="accessibilityConfirmPassword" required>Confirm Password</Form.Label>
        <Input
          id="accessibilityConfirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(value) => handleFieldChange('confirmPassword', value)}
          placeholder="Confirm password"
          aria-invalid={!!errors.confirmPassword}
          aria-describedby="confirm-password-error"
          autoComplete="new-password"
        />
        {errors.confirmPassword && (
          <Form.ErrorMessage id="confirm-password-error">{errors.confirmPassword}</Form.ErrorMessage>
        )}
      </Form.Field>
      
      <Form.Actions>
        <Button 
          type="submit" 
          disabled={Object.values(errors).some(error => error !== null) || 
                   Object.values(formData).some(value => !value)}
        >
          Create Account
        </Button>
      </Form.Actions>
      
      <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
        <h4>Accessibility Features:</h4>
        <ul style={{ fontSize: '14px', color: '#4b5563', marginTop: '8px' }}>
          <li>Proper form labeling with aria-labelledby</li>
          <li>Field descriptions linked with aria-describedby</li>
          <li>Error messages with unique IDs for screen readers</li>
          <li>Real-time validation with aria-invalid</li>
          <li>Required field indicators</li>
          <li>Logical tab order and keyboard navigation</li>
          <li>Error summary for form-level issues</li>
          <li>Appropriate autocomplete attributes</li>
        </ul>
      </div>
    </Form>
  );
};
AccessibilityDemo.parameters = {
  docs: {
    description: {
      story: 'Demonstrates comprehensive accessibility features and ARIA support.'
    }
  }
};
