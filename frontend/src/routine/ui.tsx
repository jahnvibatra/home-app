import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { MotiView } from 'moti';
import { ComponentProps, ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Easing, useReducedMotion } from 'react-native-reanimated';
import { colors, fonts } from '@/src/theme';

export type IconName = ComponentProps<typeof Feather>['name'];
export const tap = () => { void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {}); };
export const successHaptic = () => { void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {}); };

export function Button({ label, onPress, testID, secondary = false, disabled = false, icon }: {
  label: string; onPress: () => void; testID: string; secondary?: boolean; disabled?: boolean; icon?: IconName;
}) {
  return <Pressable accessibilityRole="button" accessibilityState={{ disabled }} disabled={disabled} onPress={onPress} testID={testID}
    style={({ pressed }) => [styles.button, secondary && styles.secondary, pressed && (secondary ? styles.secondaryPressed : styles.pressed), disabled && styles.disabled]}>
    {icon && <Feather name={icon} size={18} color={secondary ? colors.brandPrimary : colors.onBrandPrimary} />}
    <Text style={[styles.buttonLabel, secondary && styles.secondaryLabel]}>{label}</Text>
    {!secondary && !icon && <Feather name="arrow-right" size={19} color={colors.onBrandPrimary} />}
  </Pressable>;
}
export function TextButton({ label, onPress, testID, muted = false }: { label: string; onPress: () => void; testID: string; muted?: boolean }) {
  return <Pressable accessibilityRole="button" onPress={onPress} testID={testID} style={({ pressed }) => [styles.textButton, pressed && styles.disabled]}>
    <Text style={[styles.link, muted && { color: colors.muted }]}>{label}</Text>
  </Pressable>;
}
export function Label({ children, testID }: { children: ReactNode; testID?: string }) {
  return <Text testID={testID} style={styles.label}>{children}</Text>;
}
export function Reveal({ children, delay = 0, style }: { children: ReactNode; delay?: number; style?: ComponentProps<typeof MotiView>['style'] }) {
  const reduced = useReducedMotion();
  return <MotiView from={{ opacity: reduced ? 1 : 0, translateY: reduced ? 0 : 10 }} animate={{ opacity: 1, translateY: 0 }}
    transition={{ type: 'timing', duration: reduced ? 0 : 350, delay: reduced ? 0 : delay, easing: Easing.out(Easing.cubic) }} style={style}>{children}</MotiView>;
}
export function StatusPill({ kind, text, testID }: { kind: 'assumed' | 'edited' | 'offline' | 'success'; text?: string; testID?: string }) {
  return <View testID={testID} style={[styles.pill, { backgroundColor: kind === 'assumed' ? colors.warningSoft : kind === 'offline' ? colors.errorSoft : kind === 'success' ? colors.successSoft : colors.surfaceTertiary }]}>
    <Text style={[styles.pillText, { color: kind === 'assumed' ? colors.warning : kind === 'offline' ? colors.error : kind === 'success' ? colors.success : colors.muted }]}>{text || kind}</Text>
  </View>;
}
export const common = StyleSheet.create({
  title: { fontFamily: fonts.bold, fontSize: 36, lineHeight: 41, letterSpacing: -1.2, color: colors.onSurface },
  subtitle: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 24, color: colors.muted },
  card: { backgroundColor: colors.surfaceSecondary, borderRadius: 16, borderWidth: 1, borderColor: colors.border, boxShadow: [{ offsetX: 0, offsetY: 4, blurRadius: 16, color: colors.shadow }] },
  body: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 24, color: colors.onSurface },
});
const styles = StyleSheet.create({
  button: { minHeight: 56, borderRadius: 12, backgroundColor: colors.brandPrimary, flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  secondary: { backgroundColor: colors.surfaceSecondary, borderWidth: 1, borderColor: colors.borderStrong },
  pressed: { backgroundColor: colors.pressed }, secondaryPressed: { backgroundColor: colors.brandSecondary }, disabled: { opacity: 0.5 },
  buttonLabel: { fontFamily: fonts.semibold, fontSize: 16, color: colors.onBrandPrimary }, secondaryLabel: { color: colors.brandPrimary },
  textButton: { minHeight: 44, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 14 },
  link: { color: colors.brandPrimary, fontSize: 14, fontFamily: fonts.medium },
  label: { fontFamily: fonts.mono, color: colors.muted, fontSize: 10, lineHeight: 16, letterSpacing: 1.4 },
  pill: { paddingHorizontal: 7, paddingVertical: 3, borderRadius: 5, alignSelf: 'flex-start' },
  pillText: { fontFamily: fonts.mono, fontSize: 10, lineHeight: 14 },
});