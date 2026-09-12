import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '@/src/theme';
import { AssumptionBadge, AssumptionProps, InlineEditor } from './Assumption';
import { common, Label } from './ui';

export default function Contract({ time, temperature }: { time: AssumptionProps; temperature: AssumptionProps }) {
  return <View testID="routine-contract" style={[common.card, styles.card]}>
    <View style={styles.heading}><Feather name="message-square" size={14} color={colors.brandPrimary} /><Label>HERE’S WHAT I’LL DO</Label></View>
    <View style={styles.when}><Text style={styles.contractText}>Every night at</Text><AssumptionBadge {...time} /></View>
    <InlineEditor {...time} />
    <Text style={styles.contractText}>when someone’s home, I’ll…</Text>
    <View style={styles.sentences}>
      <Sentence>Dim the living room + bedroom lights to a warm 20%.</Sentence>
      <Sentence>Lock the front door and lower the living room blinds.</Sentence>
      <View style={styles.tempSentence}><Text style={styles.bullet}>—</Text><View style={styles.tempWrap}><Text style={styles.sentence}>Set the thermostat to</Text><AssumptionBadge {...temperature} /></View></View>
      <InlineEditor {...temperature} />
      <Sentence>Pause the kitchen speaker — or skip it and let you know if it’s offline.</Sentence>
    </View>
    <View style={styles.foot}><View style={styles.assumedDot} /><Text style={styles.footText}>I filled in two details. Tap to make them yours.</Text></View>
  </View>;
}
function Sentence({ children }: { children: string }) {
  return <View style={styles.sentenceRow}><Text style={styles.bullet}>—</Text><Text style={styles.sentence}>{children}</Text></View>;
}
const styles = StyleSheet.create({
  card: { padding: 17 }, heading: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  when: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', columnGap: 7 }, contractText: { fontFamily: fonts.medium, fontSize: 16, color: colors.onSurface, lineHeight: 23 },
  sentences: { marginTop: 16, gap: 10 }, sentenceRow: { flexDirection: 'row', gap: 9 }, bullet: { color: colors.muted, fontFamily: fonts.regular, fontSize: 13, lineHeight: 21 },
  sentence: { fontFamily: fonts.regular, color: colors.onSurface, fontSize: 14, lineHeight: 21, flexShrink: 1 },
  tempSentence: { flexDirection: 'row', gap: 9, alignItems: 'center' }, tempWrap: { flex: 1, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', columnGap: 6 },
  foot: { borderTopWidth: 1, borderColor: colors.border, paddingTop: 13, marginTop: 15, flexDirection: 'row', gap: 7, alignItems: 'center' }, assumedDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.warning }, footText: { flex: 1, fontFamily: fonts.regular, fontSize: 11, lineHeight: 16, color: colors.muted },
});