import React, { useState } from 'react';

const Stepper = ({ steps, currentStep, orientation = 'horizontal', size = 'md' }) => {
  const isHorizontal = orientation === 'horizontal';

  const sizes = {
    sm: { circle: '32px', fontSize: '0.875rem', gap: '0.5rem' },
    md: { circle: '40px', fontSize: '1rem', gap: '0.75rem' },
    lg: { circle: '48px', fontSize: '1.125rem', gap: '1rem' },
  };

  const sizeConfig = sizes[size];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isHorizontal ? 'row' : 'column',
        alignItems: isHorizontal ? 'center' : 'flex-start',
        gap: isHorizontal ? '1rem' : '0',
      }}
    >
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <React.Fragment key={index}>
            <div
              style={{
                display: 'flex',
                flexDirection: isHorizontal ? 'column' : 'row',
                alignItems: 'center',
                gap: sizeConfig.gap,
                flex: isHorizontal ? 1 : 'none',
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: isHorizontal ? 'column' : 'row',
                alignItems: 'center',
                gap: sizeConfig.gap,
              }}>
                <div
                  style={{
                    width: sizeConfig.circle,
                    height: sizeConfig.circle,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isActive
                      ? 'var(--color-blue-600)'
                      : isCompleted
                      ? '#22c55e'
                      : 'var(--surface-default)',
                    color: isActive || isCompleted ? 'white' : 'var(--content-secondary)',
                    border: isActive || isCompleted ? 'none' : '2px solid var(--border-default)',
                    fontWeight: 600,
                    fontSize: sizeConfig.fontSize,
                    transition: 'all 200ms',
                  }}
                >
                  {isCompleted ? '✓' : index + 1}
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isHorizontal ? 'center' : 'flex-start',
                    textAlign: isHorizontal ? 'center' : 'left',
                  }}
                >
                  <div
                    style={{
                      fontWeight: isActive ? 600 : 400,
                      color: isActive
                        ? 'var(--content-primary)'
                        : isCompleted
                        ? 'var(--content-secondary)'
                        : 'var(--content-tertiary)',
                      fontSize: sizeConfig.fontSize,
                    }}
                  >
                    {step.label}
                  </div>
                  {step.description && (
                    <div
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--content-tertiary)',
                        marginTop: '0.25rem',
                      }}
                    >
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div
                style={{
                  width: isHorizontal ? '100%' : '2px',
                  height: isHorizontal ? '2px' : '32px',
                  background: index < currentStep ? '#22c55e' : 'var(--border-default)',
                  margin: isHorizontal ? '0' : `0 0 0 ${parseInt(sizeConfig.circle) / 2 - 1}px`,
                  flexShrink: 0,
                  transition: 'background 200ms',
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default {
  title: 'Navigation & Wayfinding/Stepper',
  component: Stepper,
  parameters: {
    category: '03-navigation-wayfinding',
    docs: {
      description: {
        component: 'Progress stepper for showing multi-step processes. WCAG 2.1 compliant with clear visual indicators.',
      },
    },
  },
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  tags: ['autodocs'],
};

const sampleSteps = [
  { label: 'Order Placed', description: 'Your order has been received' },
  { label: 'Processing', description: 'Preparing your items' },
  { label: 'Shipped', description: 'Out for delivery' },
  { label: 'Delivered', description: 'Package arrived' },
];

export const Horizontal = {
  args: {
    steps: sampleSteps,
    currentStep: 2,
    orientation: 'horizontal',
  },
};

export const Vertical = {
  args: {
    steps: sampleSteps,
    currentStep: 2,
    orientation: 'vertical',
  },
};

export const Small = {
  args: {
    steps: sampleSteps,
    currentStep: 1,
    size: 'sm',
  },
};

export const Medium = {
  args: {
    steps: sampleSteps,
    currentStep: 1,
    size: 'md',
  },
};

export const Large = {
  args: {
    steps: sampleSteps,
    currentStep: 1,
    size: 'lg',
  },
};

export const FirstStep = {
  args: {
    steps: sampleSteps,
    currentStep: 0,
  },
};

export const LastStep = {
  args: {
    steps: sampleSteps,
    currentStep: 3,
  },
};

export const ThreeSteps = {
  args: {
    steps: [
      { label: 'Account', description: 'Create your account' },
      { label: 'Profile', description: 'Add your details' },
      { label: 'Complete', description: 'Finish setup' },
    ],
    currentStep: 1,
  },
};

export const WithoutDescriptions = {
  args: {
    steps: [
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' },
      { label: 'Step 4' },
    ],
    currentStep: 2,
  },
};

export const Interactive = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
      { label: 'Personal Info', description: 'Your basic details' },
      { label: 'Address', description: 'Where you live' },
      { label: 'Payment', description: 'Billing information' },
      { label: 'Review', description: 'Confirm details' },
    ];

    return (
      <div>
        <Stepper steps={steps} currentStep={currentStep} />
        
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
            disabled={currentStep === 0}
            style={{
              padding: '0.5rem 1rem',
              background: currentStep === 0 ? 'var(--surface-subdued)' : 'transparent',
              border: '1px solid var(--border-default)',
              borderRadius: '6px',
              cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentStep(s => Math.min(steps.length - 1, s + 1))}
            disabled={currentStep === steps.length - 1}
            style={{
              padding: '0.5rem 1rem',
              background: currentStep === steps.length - 1 ? 'var(--surface-subdued)' : 'var(--color-blue-600)',
              color: currentStep === steps.length - 1 ? 'var(--content-disabled)' : 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: currentStep === steps.length - 1 ? 'not-allowed' : 'pointer',
            }}
          >
            {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    );
  },
};

export const OrderTracking = {
  render: () => {
    const steps = [
      { label: 'Order Confirmed', description: 'Dec 10, 2:30 PM' },
      { label: 'Processing', description: 'Dec 10, 3:15 PM' },
      { label: 'Shipped', description: 'Dec 11, 9:00 AM' },
      { label: 'Out for Delivery', description: 'Expected today' },
      { label: 'Delivered', description: 'Pending' },
    ];

    return (
      <div style={{ padding: '2rem', background: 'var(--surface-subdued)', borderRadius: 'var(--border-radius-lg)' }}>
        <h3 style={{ marginTop: 0 }}>Track Your Order</h3>
        <p style={{ color: 'var(--content-secondary)', marginBottom: '2rem' }}>
          Order #12345 • Estimated delivery: Dec 12
        </p>
        <Stepper steps={steps} currentStep={2} orientation="vertical" />
      </div>
    );
  },
};

export const OnboardingProgress = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
      { label: 'Welcome', description: 'Getting started' },
      { label: 'Profile', description: 'Tell us about you' },
      { label: 'Preferences', description: 'Customize your experience' },
      { label: 'Invite Team', description: 'Collaborate together' },
      { label: 'Done', description: 'You\'re all set!' },
    ];

    const stepContent = [
      <div key={0}>
        <h2>Welcome to our platform!</h2>
        <p>Let's get you set up in just a few steps.</p>
      </div>,
      <div key={1}>
        <h2>Create your profile</h2>
        <input placeholder="Full Name" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-default)', borderRadius: '6px', marginTop: '1rem' }} />
      </div>,
      <div key={2}>
        <h2>Set your preferences</h2>
        <p>Choose your notification settings.</p>
      </div>,
      <div key={3}>
        <h2>Invite your team</h2>
        <input placeholder="Email addresses" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-default)', borderRadius: '6px', marginTop: '1rem' }} />
      </div>,
      <div key={4}>
        <h2>You're all set!</h2>
        <p>Start exploring the platform.</p>
      </div>,
    ];

    return (
      <div style={{ maxWidth: '800px' }}>
        <Stepper steps={steps} currentStep={currentStep} size="sm" />
        
        <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--surface-subdued)', borderRadius: 'var(--border-radius-lg)', minHeight: '200px' }}>
          {stepContent[currentStep]}
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
          <button
            onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
            disabled={currentStep === 0}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'transparent',
              border: '1px solid var(--border-default)',
              borderRadius: '6px',
              cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
              opacity: currentStep === 0 ? 0.5 : 1,
            }}
          >
            Back
          </button>
          <button
            onClick={() => {
              if (currentStep === steps.length - 1) {
                alert('Onboarding complete!');
              } else {
                setCurrentStep(s => s + 1);
              }
            }}
            style={{
              padding: '0.75rem 2rem',
              background: 'var(--color-blue-600)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
          </button>
        </div>
      </div>
    );
  },
};
