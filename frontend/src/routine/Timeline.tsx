import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { StyleSheet, Text, View } from 'react-native';
import { Easing, useReducedMotion } from 'react-native-reanimated';
import { colors, fonts } from '@/src/theme';
import { AssumptionBadge, AssumptionProps, InlineEditor } from './Assumption';
import { devices } from './data';
import { common, Label, Reveal, StatusPill } from './ui';

export default function Timeline({ time, temperature, testing, activeIndex, tested }: {
  time: AssumptionProps; temperature: AssumptionProps; testing: boolean; activeIndex: number; tested: boolean;
}) {
  const reduced = useReducedMotion();
  return <View testID="routine-timeline" style={styles.section}>
    <View style={styles.sectionHeading}><Text style={styles.title}>Your evening, in order</Text><Label>6 DEVICES</Label></View>
    <View style={styles.timeRow}><View style={styles.clock}><Feather name="clock" size={15} color={colors.brandPrimary} /></View><AssumptionBadge {...time} /><View style={styles.homeCondition}><Feather name="home" size={11} color={colors.muted} /><Text style={styles.homeText}>Someone’s home</Text></View></View>
    <InlineEditor {...time} />
    <View style={[common.card, styles.timeline]}>
      {devices.map((device, index) => {
        const offline = device.id === 'speaker';
        const active = testing && index === activeIndex;
        const done = tested || (testing && index < activeIndex);
        return <Reveal key={device.id} delay={index * 60}>
          <MotiView testID={`timeline-row-${device.id}`} animate={{ backgroundColor: active ? colors.brandSecondary : colors.surfaceSecondary, scale: active && !reduced ? 1.012 : 1 }} transition={{ type: 'timing', duration: reduced ? 0 : 250, easing: Easing.out(Easing.cubic) }} style={[styles.row, index < devices.length - 1 && styles.rowBorder]}>
            <View style={styles.iconColumn}>
              <View style={[styles.icon, active && styles.activeIcon, done && !offline && styles.doneIcon]}><Feather name={done && !offline ? 'check' : device.icon} size={18} color={offline ? colors.error : done ? colors.success : active ? colors.brandPrimary : colors.muted} /></View>
              {index < devices.length - 1 && <View style={styles.connector} />}
            </View>
            <View style={styles.details}>
              <View style={styles.roomRow}><Text style={styles.room}>{device.room}</Text><Text style={styles.device}>{device.device}</Text></View>
              {device.id === 'thermostat' ? <><View style={styles.temperature}><Text style={styles.action}>Set to</Text><AssumptionBadge {...temperature} /></View><InlineEditor {...temperature} /></> : <Text testID={`timeline-action-${device.id}`} style={styles.action}>{device.action}</Text>}
              {offline && <View style={styles.offlineNote}><StatusPill kind="offline" text={done ? 'skipped' : 'offline'} testID="speaker-offline-status" /><Text testID="speaker-offline-message" style={styles.skipText}>{done ? 'Skipped. Your other devices are all set.' : 'I’ll skip it and let you know.'}</Text></View>}
            </View>
            {done && !offline && <View testID={`test-complete-${device.id}`} accessibilityLabel="Completed" style={styles.doneMark}><Feather name="check" size={12} color={colors.success} /></View>}
          </MotiView>
        </Reveal>;
      })}
    </View>
    <View style={styles.note}><Feather name="shield" size={13} color={colors.muted} /><Text style={styles.noteText}>One device offline won’t stop the rest of your routine.</Text></View>
  </View>;
}
const styles = StyleSheet.create({
  section: { gap: 12 }, sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }, title: { fontFamily: fonts.semibold, fontSize: 19, color: colors.onSurface, letterSpacing: -0.4 },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 7, flexWrap: 'wrap' }, clock: { width: 25, alignItems: 'center' }, homeCondition: { flexDirection: 'row', gap: 4, alignItems: 'center', flexShrink: 1 }, homeText: { fontFamily: fonts.regular, fontSize: 10, color: colors.muted },
  timeline: { overflow: 'hidden' }, row: { flexDirection: 'row', paddingHorizontal: 14, paddingVertical: 15, gap: 12, minHeight: 79 }, rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  iconColumn: { width: 36, alignItems: 'center' }, icon: { width: 36, height: 36, borderRadius: 11, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceTertiary }, activeIcon: { backgroundColor: colors.surfaceSecondary }, doneIcon: { backgroundColor: colors.successSoft },
  connector: { position: 'absolute', width: 1, top: 43, bottom: -9, backgroundColor: colors.border }, details: { flex: 1 }, roomRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 7, alignItems: 'center', marginBottom: 4 }, room: { fontFamily: fonts.semibold, color: colors.onSurface, fontSize: 14 }, device: { fontFamily: fonts.mono, fontSize: 9, color: colors.muted, flexShrink: 1 }, action: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 20, color: colors.muted },
  temperature: { flexDirection: 'row', alignItems: 'center', gap: 7, flexWrap: 'wrap', marginVertical: -7 },
  offlineNote: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginTop: 8 }, skipText: { fontFamily: fonts.regular, fontSize: 11, lineHeight: 16, color: colors.error, flexShrink: 1 },
  doneMark: { position: 'absolute', right: 13, bottom: 14 }, note: { flexDirection: 'row', gap: 7, alignItems: 'center' }, noteText: { fontFamily: fonts.regular, fontSize: 11, lineHeight: 17, color: colors.muted, flex: 1 },
});