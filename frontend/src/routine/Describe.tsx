import { Feather } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, fonts } from '@/src/theme';
import { devices, suggestions } from './data';
import { common, Label, tap } from './ui';

export default function Describe({ prompt, setPrompt }: { prompt: string; setPrompt: (value: string) => void }) {
  return <View style={styles.content} testID="describe-screen">
    <View style={styles.intro}>
      <Label>A LITTLE LESS TO DO.</Label>
      <Text testID="describe-title" style={[common.title, styles.title]}>What should your{ '\n' }home do?</Text>
      <Text style={common.subtitle}>Tell us what you have in mind.{ '\n' }We’ll take care of the little details.</Text>
    </View>
    <View style={[common.card, styles.promptCard]}>
      <View style={styles.promptLabel}><Feather name="edit-3" size={14} color={colors.brandPrimary} /><Label>YOUR ROUTINE, IN YOUR WORDS</Label></View>
      <TextInput testID="routine-prompt-input" accessibilityLabel="Describe your routine" value={prompt} onChangeText={setPrompt} multiline maxLength={300}
        placeholder="What would make your day easier?" placeholderTextColor={colors.muted} style={styles.input} textAlignVertical="top" />
      <View style={styles.promptFoot}><View style={styles.smallLine} /><Text style={styles.promptHint}>A thought is all it takes.</Text></View>
    </View>
    <View style={styles.suggestions}>
      <Label>OR START WITH A MOMENT</Label>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow} contentContainerStyle={styles.chipContent} keyboardShouldPersistTaps="handled">
        {suggestions.map((suggestion, index) => <Pressable key={suggestion} testID={`suggestion-${index}-button`} accessibilityRole="button" accessibilityState={{ selected: prompt === suggestion }}
          hitSlop={{ top: 4, bottom: 4 }} onPress={() => { tap(); setPrompt(suggestion); }} style={({ pressed }) => [styles.chip, (prompt === suggestion || pressed) && styles.chipSelected]}>
          <Feather name={(['film', 'briefcase', 'sunrise'] as const)[index]} size={13} color={prompt === suggestion ? colors.brandPrimary : colors.muted} />
          <Text style={[styles.chipText, prompt === suggestion && styles.chipTextSelected]}>{suggestion}</Text>
        </Pressable>)}
      </ScrollView>
    </View>
    <View style={styles.homeCard}>
      <View style={styles.homeHeading}><Label>YOUR HOME, READY</Label><Text style={styles.deviceCount}>6 devices</Text></View>
      <View style={styles.devices}>{devices.map((device) => <View key={device.id} testID={`connected-device-${device.id}`} accessibilityLabel={`${device.room}, ${device.device}, ${device.id === 'speaker' ? 'offline' : 'connected'}`} style={[styles.deviceTile, device.id === 'speaker' && styles.offlineTile]}>
        <Feather name={device.icon} size={19} color={device.id === 'speaker' ? colors.error : colors.muted} />
        {device.id === 'speaker' && <View style={styles.offlineDot} />}
      </View>)}</View>
      <View style={styles.homeFoot}><View style={styles.readyDot} /><Text style={styles.homeNote}>5 ready</Text><Text style={styles.separator}>·</Text><Text style={styles.homeNote}>1 offline, thoughtfully handled</Text></View>
    </View>
  </View>;
}
const styles = StyleSheet.create({
  content: { gap: 20 }, intro: { gap: 10 }, title: { marginTop: 1 },
  promptCard: { padding: 16 }, promptLabel: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  input: { fontFamily: fonts.medium, fontSize: 23, lineHeight: 32, letterSpacing: -0.4, color: colors.onSurface, minHeight: 102, paddingTop: 18, paddingBottom: 16, paddingHorizontal: 0 },
  promptFoot: { flexDirection: 'row', alignItems: 'center', gap: 7 }, smallLine: { width: 17, height: 2, backgroundColor: colors.brandPrimary },
  promptHint: { fontFamily: fonts.regular, fontSize: 12, color: colors.muted },
  suggestions: { gap: 2 }, chipRow: { height: 56, flexGrow: 0, marginHorizontal: -20 }, chipContent: { paddingHorizontal: 20, gap: 8, alignItems: 'center' },
  chip: { height: 36, flexShrink: 0, borderRadius: 10, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceSecondary, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12 },
  chipSelected: { borderColor: colors.brandPrimary, backgroundColor: colors.brandSecondary }, chipText: { fontFamily: fonts.medium, fontSize: 12, color: colors.muted }, chipTextSelected: { color: colors.brandPrimary },
  homeCard: { borderTopWidth: 1, borderColor: colors.border, paddingTop: 16, gap: 10 }, homeHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  deviceCount: { fontFamily: fonts.mono, fontSize: 10, color: colors.muted }, devices: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  deviceTile: { flex: 1, height: 43, maxWidth: 49, borderRadius: 11, backgroundColor: colors.surfaceSecondary, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  offlineTile: { backgroundColor: colors.errorSoft, borderColor: colors.errorSoft }, offlineDot: { position: 'absolute', right: 6, top: 6, height: 4, width: 4, borderRadius: 2, backgroundColor: colors.error },
  homeFoot: { flexDirection: 'row', alignItems: 'center', gap: 6 }, readyDot: { height: 5, width: 5, borderRadius: 3, backgroundColor: colors.success }, homeNote: { fontFamily: fonts.regular, fontSize: 12, color: colors.muted }, separator: { color: colors.muted },
});