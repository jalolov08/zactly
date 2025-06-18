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
    marginBottom: 40,
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
  avatarSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.teal,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: colors.white,
    fontSize: 36,
    fontWeight: 'bold',
  },
  changeAvatarButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  changeAvatarText: {
    color: colors.teal,
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.darkTeal,
    marginBottom: 12,
  },
  editButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  editButtonText: {
    color: colors.teal,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  form: {
    gap: 16,
  },
  error: {
    color: colors.error,
    textAlign: 'left',
  },
  saveButton: {
    marginTop: 8,
  },
  disabledInput: {
    opacity: 0.6,
  },
  settingsList: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingIconText: {
    fontSize: 18,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.darkTeal,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: colors.lightBlueGrey,
  },
  settingArrow: {
    fontSize: 18,
    color: colors.lightBlueGrey,
    fontWeight: 'bold',
  },
  actionsList: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionIconText: {
    fontSize: 18,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.darkTeal,
  },
  actionArrow: {
    fontSize: 18,
    color: colors.lightBlueGrey,
    fontWeight: 'bold',
  },
  dangerSection: {
    marginTop: 20,
    marginBottom: 40,
  },
  logoutButton: {
    marginBottom: 16,
  },
  deleteAccountButton: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  deleteAccountText: {
    color: colors.error,
    fontSize: 16,
    fontWeight: '500',
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoIconText: {
    fontSize: 18,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.lightBlueGrey,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.darkTeal,
  },
});
