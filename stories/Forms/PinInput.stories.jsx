import React, { useState } from 'react';
import { PinInput } from '../../components/02-forms-inputs/PinInput/PinInput';
import { action } from '@storybook/addon-actions';
import { within, userEvent, expect } from '@storybook/test';

export default {
  title: 'Forms/PinInput',
  component: PinInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Accessible PIN/OTP input with auto-focus, keyboard navigation, paste support, and customizable field count.'
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
    length: {
      control: { type: 'number', min: 3, max: 8 },
      description: 'Number of PIN fields'
    },
    value: {
      control: 'text',
      description: 'Controlled PIN value'
    },
    defaultValue: {
      control: 'text',
      description: 'Initial PIN value'
    },
    type: {
      control: 'select',
      options: ['number', 'text', 'password'],
      description: 'Input type for each field'
    },
    mask: {
      control: 'boolean',
      description: 'Mask the input values'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all fields'
    },
    autoFocus: {
      control: 'boolean',
      description: 'Auto-focus first field on mount'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder for each field'
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled'],
      description: 'Visual variant'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the fields'
    }
  }
};

const Template = (args) => {
  const [pin, setPin] = useState(args.defaultValue || '');
  const [isComplete, setIsComplete] = useState(false);
  
  const handleChange = (value) => {
    setPin(value);
    setIsComplete(value.length === (args.length || 4));
    action('onChange')(value);
  };
  
  const handleComplete = (value) => {
    action('onComplete')(value);
  };
  
  const handleInvalid = (error) => {
    action('onInvalid')(error);
  };

  return (
    <div style={{ padding: '20px' }}>
      <PinInput
        {...args}
        value={args.value !== undefined ? args.value : pin}
        onChange={handleChange}
        onComplete={handleComplete}
        onInvalid={handleInvalid}
      />
      
      <div style={{ marginTop: '16px' }}>
        <p style={{ color: '#6b7280' }}>Current PIN: {args.value !== undefined ? args.value : pin}</p>
        <p style={{ color: isComplete ? '#059669' : '#6b7280' }}>
          Status: {isComplete ? 'Complete ✓' : 'Incomplete'}
        </p>
      </div>
    </div>
  );
};

// Default PIN Input (4 digits)
export const Default = Template.bind({});
Default.args = {
  length: 4,
  type: 'number',
  placeholder: '0',
  autoFocus: true,
  'aria-label': '4-digit PIN'
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const firstInput = canvas.getAllByRole('textbox')[0];
  
  // Test accessibility
  await expect(firstInput).toBeInTheDocument();
  await expect(firstInput).toHaveAttribute('aria-label');
  
  // Test typing
  await userEvent.type(firstInput, '1234');
};

// 6-digit OTP
export const SixDigitOTP = Template.bind({});
SixDigitOTP.args = {
  length: 6,
  type: 'number',
  placeholder: '0',
  autoFocus: true,
  variant: 'outlined',
  'aria-label': '6-digit verification code'
};
SixDigitOTP.parameters = {
  docs: {
    description: {
      story: '6-digit OTP input commonly used for two-factor authentication.'
    }
  }
};
SixDigitOTP.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const inputs = canvas.getAllByRole('textbox');
  
  // Test sequential input
  await userEvent.type(inputs[0], '1');
  await userEvent.type(inputs[1], '2');
  await userEvent.type(inputs[2], '3');
};

// Masked PIN
export const MaskedPIN = Template.bind({});
MaskedPIN.args = {
  length: 4,
  type: 'password',
  mask: true,
  placeholder: '•',
  'aria-label': 'Secure PIN entry'
};
MaskedPIN.parameters = {
  docs: {
    description: {
      story: 'PIN input with masked values for security.'
    }
  }
};

// Text PIN (Letters)
export const TextPIN = Template.bind({});
TextPIN.args = {
  length: 5,
  type: 'text',
  placeholder: 'A',
  variant: 'filled',
  'aria-label': 'Text-based PIN'
};
TextPIN.parameters = {
  docs: {
    description: {
      story: 'PIN input that accepts letters and numbers.'
    }
  }
};

// Large Size
export const Large = Template.bind({});
Large.args = {
  length: 4,
  type: 'number',
  size: 'lg',
  variant: 'outlined',
  'aria-label': 'Large PIN input'
};

// Small Size
export const Small = Template.bind({});
Small.args = {
  length: 4,
  type: 'number',
  size: 'sm',
  'aria-label': 'Small PIN input'
};

// Disabled State
export const Disabled = Template.bind({});
Disabled.args = {
  length: 4,
  type: 'number',
  disabled: true,
  defaultValue: '12',
  'aria-label': 'Disabled PIN input'
};
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const inputs = canvas.getAllByRole('textbox');
  
  // Test all inputs are disabled
  inputs.forEach(async (input) => {
    await expect(input).toBeDisabled();
  });
};

// Banking PIN Demo
export const BankingPIN = () => {
  const [pin, setPin] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const correctPin = '1234';
  const maxAttempts = 3;
  
  const handleComplete = (value) => {
    if (isLocked) return;
    
    if (value === correctPin) {
      setShowSuccess(true);
      setAttempts(0);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= maxAttempts) {
        setIsLocked(true);
      }
      
      // Clear PIN after failed attempt
      setTimeout(() => {
        setPin('');
      }, 1000);
    }
  };
  
  const handleReset = () => {
    setPin('');
    setAttempts(0);
    setIsLocked(false);
    setShowSuccess(false);
  };
  
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h3>Banking PIN Entry</h3>
      <p style={{ color: '#6b7280', marginBottom: '24px' }}>
        Enter your 4-digit PIN (Hint: 1234)
      </p>
      
      <div style={{ marginBottom: '24px' }}>
        <PinInput
          length={4}
          type="password"
          value={pin}
          onChange={setPin}
          onComplete={handleComplete}
          disabled={isLocked || showSuccess}
          mask={true}
          size="lg"
          aria-label="Banking PIN"
        />
      </div>
      
      {attempts > 0 && !showSuccess && (
        <div style={{ 
          color: '#dc2626', 
          marginBottom: '16px',
          padding: '8px',
          backgroundColor: '#fef2f2',
          borderRadius: '4px'
        }}>
          Incorrect PIN. {maxAttempts - attempts} attempts remaining.
        </div>
      )}
      
      {isLocked && (
        <div style={{ 
          color: '#dc2626', 
          marginBottom: '16px',
          padding: '12px',
          backgroundColor: '#fef2f2',
          borderRadius: '8px',
          border: '1px solid #fecaca'
        }}>
          Account locked due to too many failed attempts.
          <br />
          <button 
            onClick={handleReset}
            style={{ 
              marginTop: '8px',
              padding: '6px 12px',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reset (Demo Only)
          </button>
        </div>
      )}
      
      {showSuccess && (
        <div style={{ 
          color: '#059669', 
          marginBottom: '16px',
          padding: '12px',
          backgroundColor: '#f0fdf4',
          borderRadius: '8px',
          border: '1px solid #bbf7d0'
        }}>
          ✅ PIN verified successfully!
          <br />
          <button 
            onClick={handleReset}
            style={{ 
              marginTop: '8px',
              padding: '6px 12px',
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reset Demo
          </button>
        </div>
      )}
    </div>
  );
};
BankingPIN.parameters = {
  docs: {
    description: {
      story: 'Banking-style PIN entry with security features and attempt limits.'
    }
  }
};

// SMS Verification
export const SMSVerification = () => {
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  
  React.useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);
  
  const handleComplete = async (value) => {
    setIsVerifying(true);
    
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (value === '123456') {
      setIsVerified(true);
    } else {
      setCode('');
      alert('Invalid verification code. Try 123456.');
    }
    
    setIsVerifying(false);
  };
  
  const handleResend = () => {
    setTimeLeft(30);
    setCanResend(false);
    setCode('');
    alert('New verification code sent!');
  };
  
  return (
    <div style={{ padding: '20px', textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
      <h3>SMS Verification</h3>
      <p style={{ color: '#6b7280', marginBottom: '24px' }}>
        Enter the 6-digit code sent to your phone
        <br />
        <small>(Use 123456 for demo)</small>
      </p>
      
      <div style={{ marginBottom: '24px' }}>
        <PinInput
          length={6}
          type="number"
          value={code}
          onChange={setCode}
          onComplete={handleComplete}
          disabled={isVerifying || isVerified}
          variant="outlined"
          size="lg"
          aria-label="SMS verification code"
        />
      </div>
      
      {isVerifying && (
        <div style={{ color: '#3b82f6', marginBottom: '16px' }}>
          🔄 Verifying code...
        </div>
      )}
      
      {isVerified && (
        <div style={{ 
          color: '#059669', 
          marginBottom: '16px',
          padding: '12px',
          backgroundColor: '#f0fdf4',
          borderRadius: '8px'
        }}>
          ✅ Phone number verified successfully!
        </div>
      )}
      
      {!isVerified && (
        <div style={{ fontSize: '14px', color: '#6b7280' }}>
          {canResend ? (
            <button 
              onClick={handleResend}
              style={{
                background: 'none',
                border: 'none',
                color: '#3b82f6',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Resend code
            </button>
          ) : (
            <span>Resend code in {timeLeft}s</span>
          )}
        </div>
      )}
    </div>
  );
};
SMSVerification.parameters = {
  docs: {
    description: {
      story: 'SMS verification flow with resend functionality and timer.'
    }
  }
};

// App Lock Screen
export const AppLockScreen = () => {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  
  const correctPasscode = '0000';
  
  const handleComplete = (value) => {
    if (value === correctPasscode) {
      setIsUnlocked(true);
    } else {
      setAttempts(prev => prev + 1);
      // Vibration effect simulation
      document.body.style.animation = 'shake 0.5s';
      setTimeout(() => {
        document.body.style.animation = '';
        setPasscode('');
      }, 500);
    }
  };
  
  return (
    <div style={{ 
      padding: '40px 20px',
      textAlign: 'center',
      minHeight: '400px',
      backgroundColor: isUnlocked ? '#f0fdf4' : '#1f2937',
      color: isUnlocked ? '#1f2937' : 'white',
      borderRadius: '12px'
    }}>
      {!isUnlocked ? (
        <>
          <div style={{ marginBottom: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
            <h2>Enter Passcode</h2>
            <p style={{ color: '#9ca3af' }}>Enter your 4-digit passcode to unlock</p>
            <p style={{ color: '#9ca3af', fontSize: '12px' }}>(Hint: 0000)</p>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <PinInput
              length={4}
              type="password"
              value={passcode}
              onChange={setPasscode}
              onComplete={handleComplete}
              mask={true}
              size="lg"
              placeholder="○"
              aria-label="App unlock passcode"
            />
          </div>
          
          {attempts > 0 && (
            <div style={{ color: '#f87171', fontSize: '14px' }}>
              Failed attempts: {attempts}
            </div>
          )}
        </>
      ) : (
        <>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔓</div>
          <h2>Welcome Back!</h2>
          <p style={{ color: '#6b7280' }}>App unlocked successfully</p>
          <button 
            onClick={() => {
              setIsUnlocked(false);
              setPasscode('');
              setAttempts(0);
            }}
            style={{
              marginTop: '24px',
              padding: '12px 24px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Lock Again
          </button>
        </>
      )}
      
      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
        `}
      </style>
    </div>
  );
};
AppLockScreen.parameters = {
  docs: {
    description: {
      story: 'Mobile app-style lock screen with visual feedback.'
    }
  }
};

// Responsive Demo
export const ResponsiveDemo = () => {
  const [pin, setPin] = useState('');
  const [viewportSize, setViewportSize] = useState('desktop');
  
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <label>Viewport Size: </label>
        <select 
          value={viewportSize} 
          onChange={(e) => setViewportSize(e.target.value)}
        >
          <option value="mobile">Mobile</option>
          <option value="tablet">Tablet</option>
          <option value="desktop">Desktop</option>
        </select>
      </div>
      
      <div style={{ 
        width: viewportSize === 'mobile' ? '300px' : 
               viewportSize === 'tablet' ? '500px' : '100%',
        border: '1px dashed #ccc',
        padding: '16px',
        textAlign: 'center'
      }}>
        <PinInput
          length={viewportSize === 'mobile' ? 4 : 6}
          value={pin}
          onChange={setPin}
          size={viewportSize === 'mobile' ? 'sm' : 'md'}
          variant={viewportSize === 'mobile' ? 'filled' : 'outlined'}
          aria-label={`PIN input for ${viewportSize} viewport`}
        />
      </div>
      
      <p style={{ marginTop: '8px', textAlign: 'center' }}>PIN: {pin}</p>
    </div>
  );
};
ResponsiveDemo.parameters = {
  docs: {
    description: {
      story: 'Demonstrates responsive behavior across different viewport sizes.'
    }
  }
};

// Accessibility Demo
export const AccessibilityDemo = () => {
  const [pin, setPin] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  const handleChange = (value) => {
    setPin(value);
    setIsComplete(value.length === 4);
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h3 id="pin-heading">Security PIN Entry</h3>
        <p id="pin-description" style={{ color: '#6b7280' }}>
          Enter your 4-digit security PIN. Use arrow keys to navigate between fields.
          Backspace will move to the previous field.
        </p>
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <PinInput
          length={4}
          type="number"
          value={pin}
          onChange={handleChange}
          aria-labelledby="pin-heading"
          aria-describedby="pin-description pin-status"
          autoFocus={true}
        />
      </div>
      
      <div id="pin-status" style={{ 
        padding: '8px 12px',
        backgroundColor: isComplete ? '#f0fdf4' : '#f8fafc',
        border: `1px solid ${isComplete ? '#bbf7d0' : '#e2e8f0'}`,
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        Status: {isComplete ? 'PIN complete' : `${pin.length}/4 digits entered`}
      </div>
      
      <div style={{ marginTop: '16px', fontSize: '14px', color: '#6b7280' }}>
        <strong>Accessibility features:</strong>
        <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
          <li>Screen reader announcements for PIN progress</li>
          <li>Keyboard navigation with arrow keys</li>
          <li>Auto-focus management</li>
          <li>ARIA labeling and descriptions</li>
          <li>Visual focus indicators</li>
        </ul>
      </div>
    </div>
  );
};
AccessibilityDemo.parameters = {
  docs: {
    description: {
      story: 'Demonstrates comprehensive accessibility features and ARIA support.'
    }
  }
};
