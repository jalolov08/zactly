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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: 12,
    backgroundColor: colors.white,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: colors.black,
  },
  otpInputFocused: {
    borderColor: colors.teal,
  },
  error: {
    color: colors.error,
    textAlign: 'left',
  },
  verifyButton: {
    marginTop: 8,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  resendText: {
    color: colors.lightBlueGrey,
  },
  resendButton: {
    marginLeft: 4,
  },
  resendButtonText: {
    color: colors.teal,
    fontWeight: '600',
  },
});
