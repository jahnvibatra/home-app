import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';
import { colors, fonts } from '@/src/theme';
import { StatusPill, tap } from './ui';

export type AssumptionProps = {
  id: string; value: string; kind: 'time' | 'temperature'; edited: boolean;
  expanded: boolean; onToggle: () => void; onChange: (direction: number) => void;
  disabled?: boolean; atMin?: boolean; atMax?: boolean;
};
export function AssumptionBadge({ id, value, edited, expanded, onToggle, disabled }: AssumptionProps) {
  const reduced = useReducedMotion();
  return <Pressable testID={`${id}-assumption-button`} accessibilityRole="button" accessibilityLabel={`Edit ${value}, ${edited ? 'edited' : 'assumed'}`} accessibilityState={{ expanded, disabled }} disabled={disabled} onPress={() => { tap(); onToggle(); }} style={({ pressed }) => [styles.badge, pressed && styles.pressed]}>
    <MotiView key={value} from={{ opacity: reduced ? 1 : 0.4, translateY: reduced ? 0 : 3 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: reduced ? 0 : 200 }}>
      <Text testID={`${id}-value`} style={styles.value}>{value}</Text>
    </MotiView>
    <StatusPill kind={edited ? 'edited' : 'assumed'} />
    <Feather name={expanded ? 'chevron-up' : 'chevron-down'} size={12} color={colors.muted} />
  </Pressable>;
}
export function InlineEditor({ id, value, kind, expanded, onToggle, onChange, atMin, atMax }: AssumptionProps) {
  const reduced = useReducedMotion();
  if (!expanded) return null;
  return <MotiView testID={`${id}-editor`} from={{ opacity: reduced ? 1 : 0, translateY: reduced ? 0 : -4 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: reduced ? 0 : 250 }} style={styles.editor}>
    <Text style={styles.editorTitle}>{kind === 'time' ? 'Make the evening yours' : 'Find your comfortable'}</Text>
    <View style={styles.stepper}>
      <Pressable testID={`${id}-decrease-button`} accessibilityRole="button" accessibilityLabel={`Decrease ${kind}`} accessibilityState={{ disabled: atMin }} disabled={atMin} onPress={() => { tap(); onChange(-1); }} style={({ pressed }) => [styles.stepButton, (pressed || atMin) && styles.pressed]}><Feather name="minus" size={18} color={colors.brandPrimary} /></Pressable>
      <Text style={styles.stepValue} testID={`${id}-editor-value`}>{value}</Text>
      <Pressable testID={`${id}-increase-button`} accessibilityRole="button" accessibilityLabel={`Increase ${kind}`} accessibilityState={{ disabled: atMax }} disabled={atMax} onPress={() => { tap(); onChange(1); }} style={({ pressed }) => [styles.stepButton, (pressed || atMax) && styles.pressed]}><Feather name="plus" size={18} color={colors.brandPrimary} /></Pressable>
    </View>
    <View style={styles.editorFoot}><Text style={styles.hint}>{kind === 'time' ? '15-minute steps · every night' : '1°C steps · 10–30°C'}</Text><Pressable accessibilityRole="button" onPress={onToggle} testID={`${id}-done-button`} style={styles.done}><Text style={styles.doneText}>Done</Text><Feather name="check" size={13} color={colors.brandPrimary} /></Pressable></View>
  </MotiView>;
}
const styles = StyleSheet.create({
  badge: { minHeight: 44, flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 6 }, pressed: { opacity: 0.55 },
  value: { color: colors.onSurface, fontFamily: fonts.mono, fontSize: 13, lineHeight: 21 },
  editor: { borderRadius: 12, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 12, paddingTop: 14, marginTop: 2, marginBottom: 10 },
  editorTitle: { fontFamily: fonts.medium, fontSize: 13, color: colors.muted, textAlign: 'center', marginBottom: 12 }, stepper: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  stepButton: { width: 44, height: 44, borderRadius: 10, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceSecondary, alignItems: 'center', justifyContent: 'center' },
  stepValue: { flex: 1, textAlign: 'center', fontFamily: fonts.mono, fontSize: 19, color: colors.onSurface }, editorFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 3 }, hint: { fontFamily: fonts.regular, fontSize: 10, color: colors.muted, flexShrink: 1 },
  done: { minHeight: 44, minWidth: 54, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }, doneText: { color: colors.brandPrimary, fontFamily: fonts.semibold, fontSize: 12 },
});