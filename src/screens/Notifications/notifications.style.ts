import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors.constant';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  backButton: {
    marginBottom: 16,
  },
  header: {
    marginTop: 40,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.darkTeal,
    marginBottom: 8,
  },
  subtitle: {
    color: colors.lightBlueGrey,
  },
  error: {
    color: colors.error,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  settingsContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingIconText: {
    fontSize: 24,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.darkTeal,
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
    color: colors.lightBlueGrey,
    lineHeight: 20,
  },
  infoContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.darkTeal,
    marginBottom: 16,
  },
  infoList: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoBullet: {
    fontSize: 16,
    color: colors.teal,
    marginRight: 12,
    marginTop: 2,
  },
  infoText: {
    fontSize: 14,
    color: colors.lightBlueGrey,
    lineHeight: 20,
    flex: 1,
  },
  noteContainer: {
    backgroundColor: colors.lightBlue,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  noteText: {
    fontSize: 14,
    color: colors.darkTeal,
    lineHeight: 20,
    fontStyle: 'italic',
  },
});
