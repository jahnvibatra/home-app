import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { StyleSheet, Text, View } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';
import { colors, fonts } from '@/src/theme';
import { common, Label } from './ui';

export default function Assembling({ prompt }: { prompt: string }) {
  const reduced = useReducedMotion();
  return <View style={styles.content} testID="assembling-screen" accessibilityLiveRegion="polite">
    <View style={styles.orbit}>
      <MotiView from={{ opacity: 0.4, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'timing', duration: reduced ? 0 : 800, loop: !reduced, repeatReverse: true }} style={styles.halo} />
      <View style={styles.innerOrbit}><View style={styles.icon}><Feather name="moon" size={35} color={colors.brandPrimary} /></View></View>
      <View style={styles.orbitIcon}><Feather name="home" size={17} color={colors.brandPrimary} /></View>
    </View>
    <Label>A LITTLE THOUGHT GOES A LONG WAY</Label>
    <Text style={[common.title, styles.title]}>Making room{ '\n' }for a calmer evening.</Text>
    <Text testID="assembling-status" style={[common.subtitle, styles.center]}>Reading your devices…{ '\n' }drafting a routine.</Text>
    <View style={[common.card, styles.prompt]}><Feather name="message-circle" size={18} color={colors.brandPrimary} /><Text numberOfLines={3} style={styles.promptText}>“{prompt}”</Text></View>
    <View style={styles.reassurance}><Feather name="shield" size={14} color={colors.muted} /><Text style={styles.note}>Nothing changes until you say so.</Text></View>
  </View>;
}
const styles = StyleSheet.create({
  content: { alignItems: 'center', gap: 22, paddingTop: 32 }, orbit: { width: 174, height: 174, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  halo: { position: 'absolute', width: 174, height: 174, borderRadius: 87, backgroundColor: colors.brandSecondary }, innerOrbit: { width: 136, height: 136, borderRadius: 68, borderWidth: 1, borderColor: colors.surfaceSecondary, alignItems: 'center', justifyContent: 'center' },
  icon: { width: 94, height: 94, backgroundColor: colors.surfaceSecondary, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  orbitIcon: { position: 'absolute', right: 3, bottom: 22, width: 36, height: 36, borderRadius: 12, backgroundColor: colors.surfaceSecondary, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 30, lineHeight: 36, textAlign: 'center' }, center: { textAlign: 'center' }, prompt: { width: '100%', padding: 18, flexDirection: 'row', gap: 12, marginTop: 6 }, promptText: { fontFamily: fonts.medium, fontSize: 16, lineHeight: 23, color: colors.onSurface, flex: 1 },
  reassurance: { flexDirection: 'row', alignItems: 'center', gap: 7 }, note: { fontFamily: fonts.regular, fontSize: 12, color: colors.muted },
});