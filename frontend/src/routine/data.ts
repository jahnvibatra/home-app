export type Step = 'describe' | 'assembling' | 'proposed' | 'testing' | 'enabled';
export type Editor = 'time' | 'temperature' | null;
export const DEFAULT_PROMPT = 'Wind down the house at bedtime';
export const suggestions = ['Movie night', 'Leaving for work', 'Good morning'];

// Deliberately fixed sample: this prototype does not call AI or real devices.
export const devices = [
  { id: 'living-lights', icon: 'sun', room: 'Living room', device: 'PHILIPS HUE', action: 'Warm lights · 20%' },
  { id: 'bedroom-lights', icon: 'sun', room: 'Bedroom', device: 'LIFX', action: 'Warm lights · 20%' },
  { id: 'front-door', icon: 'lock', room: 'Front door', device: 'YALE', action: 'Lock the door' },
  { id: 'blinds', icon: 'align-justify', room: 'Living room', device: 'BLINDS', action: 'Lower the blinds' },
  { id: 'thermostat', icon: 'thermometer', room: 'Thermostat', device: 'NEST', action: 'Set to' },
  { id: 'speaker', icon: 'speaker', room: 'Kitchen', device: 'SONOS', action: 'Pause the speaker', offline: true },
] as const;

export function formatTime(minutes: number) {
  const hour = Math.floor(minutes / 60);
  return `${hour % 12 || 12}:${String(minutes % 60).padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
}