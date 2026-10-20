import React from 'react';
import { vi, describe, it, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NumericObservation } from '@openmrs/esm-framework';
import VitalsHeaderItem from './vitals-header-item.component';

const mockNumericObservation = vi.mocked(NumericObservation);
const testProps = { unitName: 'Temp', value: '36.5', unitSymbol: '°C', patientUuid: 'test-patient-uuid' };

describe('VitalsHeaderItem', () => {
  it('renders a vital sign in the vitals header', () => {
    render(<VitalsHeaderItem {...testProps} />);

    expect(screen.getByText('Temp')).toBeInTheDocument();
    expect(screen.getByText(/36\.5/)).toBeInTheDocument();
    expect(screen.getByText(/°C/)).toBeInTheDocument();
  });

  it('handles empty unit symbol gracefully', () => {
    const propsWithEmptyUnit = { ...testProps, unitSymbol: '' };
    render(<VitalsHeaderItem {...propsWithEmptyUnit} />);

    expect(screen.getByText('Temp')).toBeInTheDocument();
    expect(screen.getByText(/36\.5/)).toBeInTheDocument();
  });

  it('handles undefined unit symbol gracefully', () => {
    const propsWithUndefinedUnit = { ...testProps, unitSymbol: undefined };
    render(<VitalsHeaderItem {...propsWithUndefinedUnit} />);

    expect(screen.getByText('Temp')).toBeInTheDocument();
    expect(screen.getByText(/36\.5/)).toBeInTheDocument();
  });

  it('passes correct props to NumericObservation', () => {
    render(<VitalsHeaderItem patientUuid="test-patient-uuid" unitName="Temp" value={0} unitSymbol="DEG C" />);

    expect(mockNumericObservation).toHaveBeenCalledWith(
      expect.objectContaining({ value: 0, unit: 'DEG C', label: 'Temp', variant: 'card' }),
      expect.anything(),
    );
  });

  it('displays 0 as a value instead of "Not available"', () => {
    render(<VitalsHeaderItem unitName="Temp" value={0} unitSymbol="DEG C" />);

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('DEG C')).toBeInTheDocument();
    expect(screen.queryByText('Not available')).not.toBeInTheDocument();
  });

  it('displays "Not available" when value is an empty string', () => {
    render(<VitalsHeaderItem unitName="Temp" value="" unitSymbol="DEG C" />);

    expect(screen.getByText('Not available')).toBeInTheDocument();
    expect(screen.queryByText('DEG C')).not.toBeInTheDocument();
  });
});
