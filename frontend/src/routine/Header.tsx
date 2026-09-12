import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '@/src/theme';
import { Step } from './data';

export default function Header({ step }: { step: Step }) {
  const current = step === 'enabled' ? 2 : step === 'proposed' || step === 'testing' ? 1 : 0;
  return <View style={styles.header} testID="routine-header">
    <View style={styles.brandRow}>
      <View style={styles.brand}><View style={styles.logo}><Feather name="home" size={20} color={colors.brandPrimary} /></View><Text style={styles.wordmark}>haven<Text style={styles.period}>.</Text></Text></View>
      <View style={styles.home}><Feather name="map-pin" size={11} color={colors.muted} /><Text style={styles.homeLabel}>PRIYA’S HOME</Text></View>
    </View>
    <View style={styles.progress} testID="routine-progress" accessibilityLabel={`Step ${current + 1} of 3: ${['Describe', 'Review', 'Enjoy'][current]}`}>
      {['Describe', 'Review', 'Enjoy'].map((label, index) => <View key={label} style={styles.progressPart}>
        <View style={styles.stepLabel}>{index < current ? <Feather name="check" size={12} color={colors.brandPrimary} /> : <Text style={[styles.number, index <= current && styles.active]}>{`0${index + 1}`}</Text>}<Text style={[styles.label, index === current && styles.active]}>{label}</Text></View>
        <View style={[styles.line, index <= current && styles.activeLine]} />
      </View>)}
    </View>
  </View>;
}
const styles = StyleSheet.create({
  header: { backgroundColor: colors.surface, paddingHorizontal: 20, paddingTop: 10, paddingBottom: 4 },
  brandRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 25 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 9 }, logo: { height: 34, width: 34, backgroundColor: colors.brandSecondary, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  wordmark: { fontFamily: fonts.bold, color: colors.onSurface, fontSize: 28, letterSpacing: -1.3 }, period: { color: colors.brandPrimary },
  home: { flexDirection: 'row', gap: 5, alignItems: 'center' }, homeLabel: { fontFamily: fonts.mono, fontSize: 9, color: colors.muted, letterSpacing: 0.6 },
  progress: { flexDirection: 'row', gap: 12 }, progressPart: { flex: 1 }, stepLabel: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingBottom: 11 },
  number: { fontFamily: fonts.mono, fontSize: 10, color: colors.muted }, label: { fontFamily: fonts.medium, fontSize: 12, color: colors.muted },
  active: { color: colors.brandPrimary }, line: { height: 2, backgroundColor: colors.border, borderRadius: 2 }, activeLine: { backgroundColor: colors.brandPrimary },
});