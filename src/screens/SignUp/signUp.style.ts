import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors.constant';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  keyboardAvoid: {
    flex: 1,
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
  form: {
    gap: 16,
  },
  error: {
    color: colors.error,
    textAlign: 'center',
  },
  signUpButton: {
    marginTop: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.lightGrey,
  },
  dividerText: {
    marginHorizontal: 16,
    color: colors.lightBlueGrey,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  loginText: {
    color: colors.teal,
    fontWeight: '600',
  },
});
