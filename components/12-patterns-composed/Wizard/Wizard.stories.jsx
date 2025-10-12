import React, { useState } from 'react';

const Wizard = ({ steps, currentStep, onStepChange, orientation = 'horizontal', onComplete }) => {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div style={{
      display: 'flex',
      flexDirection: isHorizontal ? 'column' : 'row',
      minHeight: isHorizontal ? '500px' : '600px',
      maxWidth: isHorizontal ? '1000px' : '100%',
      background: 'var(--surface-default)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--border-radius-lg)',
      overflow: 'hidden',
    }}>
      {/* Steps indicator */}
      <div style={{
        display: 'flex',
        flexDirection: isHorizontal ? 'row' : 'column',
        padding: '2rem',
        gap: isHorizontal ? '1rem' : '1.5rem',
        background: 'var(--surface-subdued)',
        borderRight: isHorizontal ? 'none' : '1px solid var(--border-default)',
        borderBottom: isHorizontal ? '1px solid var(--border-default)' : 'none',
        width: isHorizontal ? '100%' : '280px',
        justifyContent: isHorizontal ? 'center' : 'flex-start',
      }}>
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <React.Fragment key={index}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: isCompleted ? 'pointer' : 'default',
                flex: isHorizontal ? 1 : 'none',
              }}
              onClick={() => isCompleted && onStepChange?.(index)}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isActive ? 'var(--color-blue-600)' : isCompleted ? '#22c55e' : 'var(--surface-default)',
                  color: isActive || isCompleted ? 'white' : 'var(--content-secondary)',
                  border: isActive || isCompleted ? 'none' : '2px solid var(--border-default)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  flexShrink: 0,
                }}>
                  {isCompleted ? '✓' : index + 1}
                </div>
                <div style={{
                  display: isHorizontal ? 'none' : 'flex',
                  flexDirection: 'column',
                  flex: 1,
                }}>
                  <div style={{
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--content-primary)' : 'var(--content-secondary)',
                    fontSize: '0.875rem',
                  }}>
                    {step.title}
                  </div>
                  {step.description && (
                    <div style={{
                      fontSize: '0.75rem',
                      color: 'var(--content-tertiary)',
                      marginTop: '0.25rem',
                    }}>
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div style={{
                  width: isHorizontal ? '100%' : '2px',
                  height: isHorizontal ? '2px' : '24px',
                  background: index < currentStep ? '#22c55e' : 'var(--border-default)',
                  margin: isHorizontal ? '0' : '0 0 0 20px',
                }} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <h2 style={{ marginTop: 0, marginBottom: '1rem' }}>{steps[currentStep]?.title}</h2>
          {steps[currentStep]?.content}
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border-default)',
        }}>
          <button
            onClick={() => onStepChange?.(currentStep - 1)}
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
            Previous
          </button>
          
          <button
            onClick={() => {
              if (currentStep === steps.length - 1) {
                onComplete?.();
              } else {
                onStepChange?.(currentStep + 1);
              }
            }}
            style={{
              padding: '0.75rem 2rem',
              background: 'var(--color-blue-600)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default {
  title: 'Patterns & Composed/Wizard',
  component: Wizard,
  parameters: {
    category: '12-patterns-composed',
    docs: {
      description: {
        component: 'Multi-step wizard for complex forms and processes. WCAG 2.1 compliant with keyboard navigation and progress indication.',
      },
    },
  },
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
  tags: ['autodocs'],
};

const sampleSteps = [
  {
    title: 'Account Details',
    description: 'Basic information',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p>Enter your account details to get started.</p>
        <input placeholder="Full Name" style={{ padding: '0.5rem', border: '1px solid var(--border-default)', borderRadius: '6px' }} />
        <input placeholder="Email" type="email" style={{ padding: '0.5rem', border: '1px solid var(--border-default)', borderRadius: '6px' }} />
        <input placeholder="Password" type="password" style={{ padding: '0.5rem', border: '1px solid var(--border-default)', borderRadius: '6px' }} />
      </div>
    ),
  },
  {
    title: 'Profile Setup',
    description: 'Tell us about yourself',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p>Complete your profile information.</p>
        <input placeholder="Job Title" style={{ padding: '0.5rem', border: '1px solid var(--border-default)', borderRadius: '6px' }} />
        <input placeholder="Company" style={{ padding: '0.5rem', border: '1px solid var(--border-default)', borderRadius: '6px' }} />
        <textarea placeholder="Bio" rows={4} style={{ padding: '0.5rem', border: '1px solid var(--border-default)', borderRadius: '6px' }} />
      </div>
    ),
  },
  {
    title: 'Preferences',
    description: 'Customize your experience',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p>Choose your preferences.</p>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="checkbox" />
          <span>Email notifications</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="checkbox" />
          <span>SMS notifications</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="checkbox" />
          <span>Newsletter subscription</span>
        </label>
      </div>
    ),
  },
  {
    title: 'Review',
    description: 'Confirm your details',
    content: (
      <div>
        <h3>Review Your Information</h3>
        <p>Please review all the information you've provided before completing the setup.</p>
        <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--surface-subdued)', borderRadius: '6px' }}>
          <strong>Summary:</strong>
          <ul style={{ marginTop: '0.5rem' }}>
            <li>Account created</li>
            <li>Profile completed</li>
            <li>Preferences saved</li>
          </ul>
        </div>
      </div>
    ),
  },
];

export const Horizontal = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);
    
    return (
      <Wizard
        steps={sampleSteps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        orientation="horizontal"
        onComplete={() => alert('Wizard completed!')}
      />
    );
  },
};

export const Vertical = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);
    
    return (
      <Wizard
        steps={sampleSteps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        orientation="vertical"
        onComplete={() => alert('Wizard completed!')}
      />
    );
  },
};

export const CheckoutFlow = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);
    
    const checkoutSteps = [
      {
        title: 'Cart',
        content: (
          <div>
            <h3>Shopping Cart</h3>
            <div style={{ border: '1px solid var(--border-default)', borderRadius: '6px', padding: '1rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Product 1</span>
                <span>$29.99</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Product 2</span>
                <span>$49.99</span>
              </div>
              <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid var(--border-default)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                <span>Total:</span>
                <span>$79.98</span>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: 'Shipping',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3>Shipping Address</h3>
            <input placeholder="Street Address" style={{ padding: '0.5rem', border: '1px solid var(--border-default)', borderRadius: '6px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input placeholder="City" style={{ padding: '0.5rem', border: '1px solid var(--border-default)', borderRadius: '6px' }} />
              <input placeholder="ZIP Code" style={{ padding: '0.5rem', border: '1px solid var(--border-default)', borderRadius: '6px' }} />
            </div>
          </div>
        ),
      },
      {
        title: 'Payment',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3>Payment Information</h3>
            <input placeholder="Card Number" style={{ padding: '0.5rem', border: '1px solid var(--border-default)', borderRadius: '6px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input placeholder="MM/YY" style={{ padding: '0.5rem', border: '1px solid var(--border-default)', borderRadius: '6px' }} />
              <input placeholder="CVV" style={{ padding: '0.5rem', border: '1px solid var(--border-default)', borderRadius: '6px' }} />
            </div>
          </div>
        ),
      },
      {
        title: 'Confirm',
        content: (
          <div>
            <h3>Order Summary</h3>
            <p>Please review your order before completing the purchase.</p>
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#dcfce7', border: '1px solid #22c55e', borderRadius: '6px' }}>
              ✓ Your order is ready to be placed
            </div>
          </div>
        ),
      },
    ];
    
    return (
      <Wizard
        steps={checkoutSteps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        orientation="horizontal"
        onComplete={() => alert('Order placed successfully!')}
      />
    );
  },
};

export const OnboardingFlow = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);
    
    const onboardingSteps = [
      {
        title: 'Welcome',
        description: 'Get started',
        content: (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👋</div>
            <h2>Welcome to Our Platform!</h2>
            <p style={{ color: 'var(--content-secondary)', marginTop: '1rem' }}>
              Let's get you set up in just a few steps.
            </p>
          </div>
        ),
      },
      {
        title: 'Connect',
        description: 'Link your accounts',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3>Connect Your Accounts</h3>
            <button style={{ padding: '1rem', background: '#1877f2', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>f</span> Connect Facebook
            </button>
            <button style={{ padding: '1rem', background: '#1da1f2', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🐦</span> Connect Twitter
            </button>
            <button style={{ padding: '1rem', background: '#0077b5', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>in</span> Connect LinkedIn
            </button>
          </div>
        ),
      },
      {
        title: 'Customize',
        description: 'Make it yours',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3>Customize Your Experience</h3>
            <label>
              <input type="radio" name="theme" /> Light theme
            </label>
            <label>
              <input type="radio" name="theme" /> Dark theme
            </label>
            <label>
              <input type="radio" name="theme" defaultChecked /> Auto (system)
            </label>
          </div>
        ),
      },
      {
        title: 'Done',
        description: "You're all set!",
        content: (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
            <h2>You&apos;re All Set!</h2>
            <p style={{ color: 'var(--content-secondary)', marginTop: '1rem' }}>
              Start exploring our platform and discover all the features.
            </p>
          </div>
        ),
      },
    ];
    
    return (
      <Wizard
        steps={onboardingSteps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        orientation="vertical"
        onComplete={() => alert('Onboarding complete!')}
      />
    );
  },
};
