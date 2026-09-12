import { Feather } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useReducedMotion } from 'react-native-reanimated';
import { colors, fonts } from '@/src/theme';
import Assembling from '@/src/routine/Assembling';
import Contract from '@/src/routine/Contract';
import Describe from '@/src/routine/Describe';
import Enabled from '@/src/routine/Enabled';
import Header from '@/src/routine/Header';
import Timeline from '@/src/routine/Timeline';
import { formatTime } from '@/src/routine/data';
import { Button, common, Label, Reveal, StatusPill, TextButton } from '@/src/routine/ui';
import { useRoutine } from '@/src/routine/useRoutine';

export default function RoutineStudio() {
  const routine = useRoutine();
  const { step, tested } = routine;
  const scrollRef = useRef<ScrollView>(null);
  const timelineY = useRef(0);
  const reduced = useReducedMotion();
  const review = step === 'proposed' || step === 'testing';

  useEffect(() => {
    if (step === 'testing') scrollRef.current?.scrollTo({ y: Math.max(0, timelineY.current - 8), animated: !reduced });
    else if (step !== 'proposed' || !tested) scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [step, tested, reduced]);

  useEffect(() => {
    if (step === 'testing' && routine.activeIndex >= 3) {
      scrollRef.current?.scrollTo({ y: timelineY.current + (routine.activeIndex - 2) * 80, animated: !reduced });
    }
  }, [routine.activeIndex, step, reduced]);

  return <SafeAreaView edges={['top', 'bottom']} style={styles.safe}>
    <KeyboardAvoidingView style={styles.safe} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.frame}>
        <Header step={step} />
        <ScrollView ref={scrollRef} testID="routine-scroll" style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
          <Reveal key={review ? 'review' : step}>
            {step === 'describe' && <Describe prompt={routine.prompt} setPrompt={routine.setPrompt} />}
            {step === 'assembling' && <Assembling prompt={routine.prompt} />}
            {review && <View style={styles.review} testID="proposed-screen">
              <View style={styles.reviewHeading}><View style={styles.reviewText}><Label>A QUIETER END TO YOUR DAY</Label><View style={styles.titleRow}><Text style={common.title} testID="routine-title">Goodnight</Text><StatusPill kind={tested ? 'success' : 'edited'} text={tested ? 'tested' : 'draft'} /></View><Text style={styles.reviewSubtitle}>Your words. A thoughtful little plan.</Text></View><View style={styles.moon}><Feather name="moon" size={26} color={colors.brandPrimary} /></View></View>
              <Contract time={routine.assumption('time', 'contract')} temperature={routine.assumption('temperature', 'contract')} />
              <View onLayout={(event) => { timelineY.current = event.nativeEvent.layout.y; }}>
                <Timeline time={routine.assumption('time', 'timeline')} temperature={routine.assumption('temperature', 'timeline')} testing={step === 'testing'} activeIndex={routine.activeIndex} tested={tested} />
              </View>
              {tested && <Reveal><View testID="test-result-banner" style={styles.testResult}><Feather name="check-circle" size={20} color={colors.success} /><View style={styles.resultCopy}><Text style={styles.resultTitle}>A smooth test run.</Text><Text style={styles.resultBody}>5 devices responded. Kitchen speaker skipped.</Text></View></View></Reveal>}
            </View>}
            {step === 'enabled' && <Enabled enabled={routine.enabled} time={formatTime(routine.minutes)} temperature={routine.temperature} onToggle={routine.toggle} onTest={routine.test} tested={tested} />}
          </Reveal>
        </ScrollView>
        {step !== 'assembling' && <View style={styles.footer} testID="routine-actions">
          {step === 'describe' && <><Button label="Create routine" testID="create-routine-button" onPress={routine.create} disabled={!routine.prompt.trim()} /><View style={styles.footerNote}><Feather name="sliders" size={12} color={colors.muted} /><Text style={styles.note}>You review it. You decide.</Text></View></>}
          {review && <>
            {step === 'testing' ? <View testID="test-running-status" style={styles.testingStatus} accessibilityLiveRegion="polite"><ActivityIndicator size="small" color={colors.brandPrimary} /><View><Text style={styles.testingTitle}>A little preview of tonight…</Text><Text style={styles.note}>Test run · {Math.min(routine.activeIndex + 1, 6)} of 6 devices</Text></View></View> : <>
              {tested && <Text testID="test-turn-on-prompt" style={styles.looksRight}>Looks right? Turn it on.</Text>}
              <View style={styles.actionRow}><View style={styles.primaryAction}><Button label={tested ? 'Turn on' : 'Test run now'} icon={tested ? 'power' : 'play'} onPress={tested ? routine.enable : routine.test} testID={tested ? 'turn-on-primary-button' : 'test-run-button'} /></View><View style={styles.secondaryAction}><Button label={tested ? 'Test again' : 'Turn on'} onPress={tested ? routine.test : routine.enable} testID={tested ? 'test-repeat-button' : 'turn-on-button'} secondary /></View></View>
              <TextButton label="Ask again" onPress={routine.askAgain} testID="ask-again-button" muted />
            </>}
          </>}
          {step === 'enabled' && <Button label={routine.enabled ? 'Turn routine off' : 'Turn routine on'} icon="power" onPress={routine.toggle} testID="routine-off-button" secondary={routine.enabled} />}
          <Text testID="prototype-disclosure" style={styles.prototype}>PROTOTYPE · NO REAL DEVICES WILL CHANGE</Text>
        </View>}
      </View>
    </KeyboardAvoidingView>
  </SafeAreaView>;
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface }, frame: { flex: 1, width: '100%', maxWidth: 600, alignSelf: 'center' }, scroll: { flex: 1 }, scrollContent: { paddingHorizontal: 20, paddingTop: 28, paddingBottom: 24, flexGrow: 1 },
  review: { gap: 24 }, reviewHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 }, reviewText: { flex: 1 }, titleRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 5 },
  reviewSubtitle: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted, lineHeight: 20 }, moon: { width: 54, height: 54, borderRadius: 18, backgroundColor: colors.brandSecondary, alignItems: 'center', justifyContent: 'center' },
  footer: { paddingHorizontal: 20, paddingTop: 13, paddingBottom: 10, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.surface }, footerNote: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 12 }, note: { fontFamily: fonts.regular, fontSize: 12, color: colors.muted, lineHeight: 18 },
  actionRow: { flexDirection: 'row', gap: 10 }, primaryAction: { flex: 1.45 }, secondaryAction: { flex: 1 }, prototype: { fontFamily: fonts.mono, fontSize: 8, lineHeight: 12, letterSpacing: 0.65, color: colors.muted, textAlign: 'center', marginTop: 7 },
  testingStatus: { minHeight: 79, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 13 }, testingTitle: { fontFamily: fonts.medium, fontSize: 16, color: colors.onSurface, marginBottom: 4 }, looksRight: { textAlign: 'center', color: colors.success, fontFamily: fonts.medium, fontSize: 14, marginBottom: 12 },
  testResult: { backgroundColor: colors.successSoft, borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }, resultCopy: { flex: 1 }, resultTitle: { fontFamily: fonts.semibold, color: colors.success, fontSize: 15 }, resultBody: { fontFamily: fonts.regular, color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 3 },
});