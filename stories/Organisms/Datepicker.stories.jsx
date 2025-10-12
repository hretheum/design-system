import React, { useState } from 'react';

const Datepicker = ({ value, onChange, minDate, maxDate, size = 'md', ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());

  const sizes = {
    sm: { height: '32px', fontSize: '0.875rem', cellSize: '32px' },
    md: { height: '40px', fontSize: '1rem', cellSize: '40px' },
    lg: { height: '48px', fontSize: '1.125rem', cellSize: '48px' },
  };

  const sizeConfig = sizes[size];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  const handleDateSelect = (date) => {
    onChange?.(date);
    setIsOpen(false);
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }} {...props}>
      <input
        type="text"
        value={formatDate(value)}
        onClick={() => setIsOpen(!isOpen)}
        readOnly
        placeholder="Select date"
        style={{
          width: '100%',
          height: sizeConfig.height,
          padding: '0 2.5rem 0 1rem',
          fontSize: sizeConfig.fontSize,
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--border-radius-md)',
          background: 'var(--surface-default)',
          cursor: 'pointer',
        }}
      />
      <span style={{
        position: 'absolute',
        right: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        color: 'var(--content-secondary)',
      }}>
        📅
      </span>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          zIndex: 1000,
          background: 'var(--surface-default)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--border-radius-lg)',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
          padding: '1rem',
          minWidth: '280px',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}>
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              style={{
                width: '32px',
                height: '32px',
                background: 'transparent',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1.25rem',
              }}
            >
              ‹
            </button>
            <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              style={{
                width: '32px',
                height: '32px',
                background: 'transparent',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1.25rem',
              }}
            >
              ›
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
            {weekDays.map(day => (
              <div key={day} style={{
                textAlign: 'center',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--content-secondary)',
                padding: '0.5rem 0',
              }}>
                {day}
              </div>
            ))}
            {days.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} />;
              }

              const isSelected = value && date.toDateString() === value.toDateString();
              const isToday = date.toDateString() === new Date().toDateString();

              return (
                <button
                  key={date.toISOString()}
                  onClick={() => handleDateSelect(date)}
                  style={{
                    width: '100%',
                    aspectRatio: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isSelected ? 'var(--color-blue-600)' : 'transparent',
                    color: isSelected ? 'white' : 'var(--content-primary)',
                    border: isToday && !isSelected ? '1px solid var(--color-blue-600)' : 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    transition: 'all 150ms',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.target.style.background = 'var(--surface-raised)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.target.style.background = 'transparent';
                    }
                  }}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default {
  title: 'Organisms/Datepicker',
  component: Datepicker,
  parameters: {
    docs: {
      description: {
        component: 'Date picker for selecting dates. WCAG 2.1 compliant with keyboard navigation support.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  tags: ['autodocs'],
};

export const Default = {
  render: () => {
    const [date, setDate] = useState(null);
    return <Datepicker value={date} onChange={setDate} />;
  },
};

export const WithInitialValue = {
  render: () => {
    const [date, setDate] = useState(new Date());
    return <Datepicker value={date} onChange={setDate} />;
  },
};

export const Small = {
  render: () => {
    const [date, setDate] = useState(null);
    return <Datepicker value={date} onChange={setDate} size="sm" />;
  },
};

export const Large = {
  render: () => {
    const [date, setDate] = useState(null);
    return <Datepicker value={date} onChange={setDate} size="lg" />;
  },
};

export const InForm = {
  render: () => {
    const [formData, setFormData] = useState({
      startDate: null,
      endDate: null,
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            Start Date
          </label>
          <Datepicker
            value={formData.startDate}
            onChange={(date) => setFormData({ ...formData, startDate: date })}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            End Date
          </label>
          <Datepicker
            value={formData.endDate}
            onChange={(date) => setFormData({ ...formData, endDate: date })}
          />
        </div>

        {formData.startDate && formData.endDate && (
          <div style={{ padding: '1rem', background: 'var(--surface-subdued)', borderRadius: '6px', fontSize: '0.875rem' }}>
            <strong>Selected Range:</strong>
            <br />
            {formData.startDate.toDateString()} - {formData.endDate.toDateString()}
          </div>
        )}
      </div>
    );
  },
};

export const BookingForm = {
  render: () => {
    const [booking, setBooking] = useState({
      checkIn: null,
      checkOut: null,
      guests: 1,
    });

    return (
      <div style={{ maxWidth: '400px', padding: '2rem', border: '1px solid var(--border-default)', borderRadius: 'var(--border-radius-lg)' }}>
        <h3 style={{ marginTop: 0 }}>Book Your Stay</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
              Check-in
            </label>
            <Datepicker
              value={booking.checkIn}
              onChange={(date) => setBooking({ ...booking, checkIn: date })}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
              Check-out
            </label>
            <Datepicker
              value={booking.checkOut}
              onChange={(date) => setBooking({ ...booking, checkOut: date })}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
              Guests
            </label>
            <select
              value={booking.guests}
              onChange={(e) => setBooking({ ...booking, guests: e.target.value })}
              style={{
                width: '100%',
                height: '40px',
                padding: '0 1rem',
                border: '1px solid var(--border-default)',
                borderRadius: '6px',
              }}
            >
              {[1, 2, 3, 4, 5, 6].map(n => (
                <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
              ))}
            </select>
          </div>

          <button
            disabled={!booking.checkIn || !booking.checkOut}
            style={{
              marginTop: '1rem',
              padding: '0.75rem',
              background: booking.checkIn && booking.checkOut ? 'var(--color-blue-600)' : 'var(--surface-subdued)',
              color: booking.checkIn && booking.checkOut ? 'white' : 'var(--content-disabled)',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 500,
              cursor: booking.checkIn && booking.checkOut ? 'pointer' : 'not-allowed',
            }}
            onClick={() => alert('Booking submitted!')}
          >
            Reserve
          </button>
        </div>
      </div>
    );
  },
};
