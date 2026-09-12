import { useEffect, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import { AssumptionProps } from './Assumption';
import { DEFAULT_PROMPT, devices, formatTime, Step } from './data';
import { successHaptic, tap } from './ui';

// One screen state drives the complete slice; no services or persistence.
export function useRoutine() {
  const [step, setStep] = useState<Step>('describe');
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [minutes, setMinutes] = useState(22 * 60 + 30);
  const [temperature, setTemperature] = useState(20);
  const [edited, setEdited] = useState({ time: false, temperature: false });
  const [editor, setEditor] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [tested, setTested] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const returnToEnabled = useRef(false);

  useEffect(() => {
    if (step !== 'assembling') return;
    const timer = setTimeout(() => setStep('proposed'), 1600);
    return () => clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    if (step !== 'testing') return;
    let index = -1;
    const timer = setInterval(() => {
      index += 1;
      if (index < devices.length) { setActiveIndex(index); tap(); }
      else {
        clearInterval(timer);
        setTested(true);
        setActiveIndex(-1);
        setStep(returnToEnabled.current ? 'enabled' : 'proposed');
      }
    }, 300);
    return () => clearInterval(timer);
  }, [step]);

  function create() {
    if (!prompt.trim()) return;
    Keyboard.dismiss(); tap();
    setMinutes(1350); setTemperature(20); setEdited({ time: false, temperature: false });
    setEditor(null); setTested(false); setEnabled(false); setStep('assembling');
  }
  function test() {
    tap(); setEditor(null); returnToEnabled.current = step === 'enabled';
    setActiveIndex(-1); setTested(false); setStep('testing');
  }
  function enable() { successHaptic(); setEnabled(true); setEditor(null); setStep('enabled'); }
  function toggle() { if (!enabled) successHaptic(); setEnabled((value) => !value); }
  function askAgain() { tap(); setEditor(null); setStep('describe'); }
  function assumption(kind: 'time' | 'temperature', location: string): AssumptionProps {
    const id = `${location}-${kind}`;
    return {
      id, kind, value: kind === 'time' ? formatTime(minutes) : `${temperature}°C`, edited: edited[kind],
      expanded: editor === id, onToggle: () => setEditor((value) => value === id ? null : id), disabled: step === 'testing',
      atMin: kind === 'temperature' && temperature <= 10, atMax: kind === 'temperature' && temperature >= 30,
      onChange: (direction) => {
        if (kind === 'time') setMinutes((value) => (value + direction * 15 + 1440) % 1440);
        else setTemperature((value) => Math.max(10, Math.min(30, value + direction)));
        setEdited((value) => ({ ...value, [kind]: true }));
        setTested(false);
      },
    };
  }
  return { step, prompt, setPrompt, minutes, temperature, edited, activeIndex, tested, enabled, create, test, enable, toggle, askAgain, assumption };
}