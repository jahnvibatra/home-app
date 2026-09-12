import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';
import { colors, fonts } from '@/src/theme';
import { common, Label, StatusPill, tap, TextButton } from './ui';

export default function Enabled({ enabled, time, temperature, onToggle, onTest, tested }: {
  enabled: boolean; time: string; temperature: number; onToggle: () => void; onTest: () => void; tested: boolean;
}) {
  const reduced = useReducedMotion();
  return <View style={styles.content} testID="enabled-screen" accessibilityLiveRegion="polite">
    <View style={styles.successArea}>
      <MotiView key={String(enabled)} from={{ opacity: reduced ? 1 : 0.4, scale: reduced ? 1 : 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'timing', duration: reduced ? 0 : 350 }} style={[styles.halo, !enabled && styles.offHalo]}>
        <View style={[styles.successIcon, !enabled && styles.offIcon]}><Feather name={enabled ? 'check' : 'moon'} size={36} color={enabled ? colors.success : colors.muted} /></View>
      </MotiView>
      <Label>{enabled ? 'ONE LESS THING ON YOUR MIND' : 'YOUR HOME, YOUR CALL'}</Label>
      <Text testID="enabled-title" style={[common.title, styles.title]}>Goodnight routine{ '\n' }is {enabled ? 'on.' : 'off.'}</Text>
      <Text style={[common.subtitle, styles.subtitle]}>{enabled ? 'Let the day go, Priya.\nYour home can take it from here.' : 'Take the evening as it comes.\nYour routine is here when you need it.'}</Text>
    </View>
    <View style={[common.card, styles.routineCard]}>
      <View style={styles.routineHead}><View style={styles.moon}><Feather name="moon" size={22} color={colors.brandPrimary} /></View><View style={styles.nameWrap}><Text style={styles.name}>Goodnight</Text><Text style={styles.schedule} testID="enabled-time">EVERY NIGHT · {time}</Text></View><Pressable testID="routine-enabled-toggle" role="switch" accessibilityRole="switch" accessibilityLabel="Goodnight routine" aria-checked={enabled} accessibilityState={{ checked: enabled }} onPress={() => { tap(); onToggle(); }} style={styles.toggleTarget}><View style={[styles.toggleTrack, !enabled && styles.toggleTrackOff]}><MotiView animate={{ translateX: enabled ? 20 : 0 }} transition={{ type: 'timing', duration: reduced ? 0 : 200 }} style={styles.toggleThumb} /></View></Pressable></View>
      <View style={styles.detail}><Feather name="home" size={14} color={colors.muted} /><Text style={styles.detailText}>Only when someone’s home</Text></View>
      <View style={styles.detail}><Feather name="thermometer" size={14} color={colors.muted} /><Text style={styles.detailText} testID="enabled-temperature">Warm lights. Locked door. A comfortable {temperature}°C.</Text></View>
      <View style={styles.cardFoot}><StatusPill kind={enabled ? 'success' : 'edited'} text={enabled ? 'routine enabled' : 'routine paused'} /><Text style={styles.saved}>You’re always in control.</Text></View>
    </View>
    <View testID="enabled-offline-notice" style={styles.offline}><Feather name="wifi-off" size={16} color={colors.error} /><View style={styles.offlineText}><Text style={styles.offlineTitle}>The kitchen speaker is still offline.</Text><Text style={styles.offlineBody}>I’ll skip it and let you know. Everything else is ready.</Text></View></View>
    {tested && <View testID="enabled-test-result" style={styles.result}><Feather name="check-circle" size={15} color={colors.success} /><Text style={styles.resultText}>Test complete · 5 ready, 1 safely skipped</Text></View>}
    <TextButton testID="test-again-button" label="Test run once more" onPress={onTest} />
  </View>;
}
const styles = StyleSheet.create({
  content: { gap: 22 }, successArea: { alignItems: 'center', gap: 16, paddingTop: 8 }, halo: { width: 106, height: 106, borderRadius: 53, backgroundColor: colors.successSoft, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  offHalo: { backgroundColor: colors.surfaceTertiary }, successIcon: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.surfaceSecondary, borderWidth: 1, borderColor: colors.successSoft, justifyContent: 'center', alignItems: 'center' }, offIcon: { borderColor: colors.border },
  title: { fontSize: 33, lineHeight: 38, textAlign: 'center' }, subtitle: { textAlign: 'center', fontSize: 15, lineHeight: 23 },
  routineCard: { padding: 16, gap: 17 }, routineHead: { flexDirection: 'row', alignItems: 'center', gap: 10 }, moon: { width: 43, height: 43, backgroundColor: colors.brandSecondary, borderRadius: 12, justifyContent: 'center', alignItems: 'center' }, nameWrap: { flex: 1 }, name: { fontFamily: fonts.semibold, fontSize: 18, color: colors.onSurface }, schedule: { fontFamily: fonts.mono, fontSize: 9, color: colors.muted, marginTop: 5 },
  toggleTarget: { width: 50, height: 44, justifyContent: 'center' }, toggleTrack: { width: 50, height: 30, borderRadius: 15, padding: 3, backgroundColor: colors.brandPrimary }, toggleTrackOff: { backgroundColor: colors.borderStrong }, toggleThumb: { width: 24, height: 24, borderRadius: 12, backgroundColor: colors.surfaceSecondary },
  detail: { flexDirection: 'row', gap: 9, alignItems: 'center' }, detailText: { flex: 1, fontFamily: fonts.regular, fontSize: 12, lineHeight: 18, color: colors.muted }, cardFoot: { borderTopWidth: 1, borderColor: colors.border, paddingTop: 13, flexDirection: 'row', justifyContent: 'space-between', gap: 7, alignItems: 'center', flexWrap: 'wrap' }, saved: { fontFamily: fonts.regular, fontSize: 10, color: colors.muted },
  offline: { flexDirection: 'row', gap: 10, paddingHorizontal: 3 }, offlineText: { flex: 1, gap: 4 }, offlineTitle: { fontFamily: fonts.medium, fontSize: 12, color: colors.onSurface }, offlineBody: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 18, color: colors.muted }, result: { flexDirection: 'row', gap: 8, justifyContent: 'center', alignItems: 'center' }, resultText: { color: colors.success, fontFamily: fonts.medium, fontSize: 12 },
});